import { nestedObjectKeysWithDot } from '@lib/fabric'
import { FabricObject } from '@lib/graphql'
import { fabric } from 'fabric'
import _ from 'lodash'
import { updateFabricObjectFunction } from '.'
import { FCOCurrentFrameChange, FCOIsPlayingChange } from '../constants'
import { getClipFabricObject, shouldFabricObjectRender } from './object'

const FabricObjectPropertyPathsThatSetsCoords: string[] = [
  `left`,
  `top`,
  `width`,
  `height`,
  `scaleX`,
  `scaleY`,
  `angle`,
]

const EasingFunctions = {
  ...fabric.util.ease,
  easeLinear(t: number, b: number, c: number, d: number) {
    return b + (t / d) * c
  },
}

export const applyFabricCanvasModifications = (
  _fabric: typeof fabric,
): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prototype = _fabric.Canvas.prototype as any

  // Optimization can be done here on below 2 prototype functions
  // (use set instead of prototype.setCurrentFrame and remove fire/onCurrentFrameChange
  // and make apporpiate changes in sub classes)
  prototype.setCurrentFrame = async function (currentFrame: number) {
    this.currentFrame = currentFrame
    this.fire(FCOCurrentFrameChange, currentFrame)
    await Promise.all(
      this._objects.map(
        async (object) =>
          object.onCurrentFrameChange &&
          (await object.onCurrentFrameChange(currentFrame)),
      ),
    )
  }
  prototype.setIsPlaying = function (isPlaying: boolean) {
    this.isPlaying = isPlaying
    this.fire(FCOIsPlayingChange, isPlaying)
    this._objects.forEach(
      (object) =>
        object.onIsPlayingChange && object.onIsPlayingChange(isPlaying),
    )
  }
  prototype.smartRenderAll = function () {
    if (this.isMagicRendering) return this.renderAll()
    this.requestRenderAll()
  }

  // update keyframes render
  updateFabricObjectFunction(
    _fabric,
    `Canvas`,
    `_renderObjects`,
    function (
      $this: fabric.Canvas,
      _: CanvasRenderingContext2D,
      objects: fabric.Object[],
    ) {
      if ($this.isTimeline) return
      if (!$this.frameChangedRecently) return
      for (const object of objects) {
        updateFabricObjectPrerender(object)
      }
      $this.frameChangedRecently = false
    },
  )
}

const updateFabricObjectPrerender = (object: fabric.Object) => {
  const shouldRender = shouldFabricObjectRender(object)
  if (!shouldRender) return
  const clipObject = getClipFabricObject(object)
  if (!clipObject) return
  setFabricObjectKeyframeValues(object, object.canvas)

  const propertyKeyframes = getPropertyPathFromKeyframes(clipObject)
  const keyframeProperties = Object.keys(propertyKeyframes)

  for (const keyframeProperty of keyframeProperties) {
    if (FabricObjectPropertyPathsThatSetsCoords.includes(keyframeProperty))
      object.setCoords()
  }

  if (keyframeProperties?.length > 0)
    setFabricObjectNonKeyframeValues(object, clipObject, keyframeProperties)
}

interface IFabricObjectPropertyKeyframes {
  [x: string]: fabric.IObjectKeyframe[]
}

const getPropertyPathFromKeyframes = (clipObject: FabricObject) =>
  clipObject.keyframes?.reduce<IFabricObjectPropertyKeyframes>(
    (_propertyKeyframes, keyframe) => {
      const keyframePropertyPath = keyframe.propertyPath
      if (!_propertyKeyframes[keyframePropertyPath])
        _propertyKeyframes[keyframePropertyPath] = []

      _propertyKeyframes[keyframePropertyPath].push(keyframe)

      return _propertyKeyframes
    },
    {},
  ) || {}

export const setFabricObjectKeyframeValues = (
  object: FabricObject | fabric.Object,
  canvas: fabric.Canvas,
): FabricObject => {
  if (!canvas.template) return
  if (!object.keyframes) return

  const propertyPathKeyframes = getPropertyPathFromKeyframes(object)

  const keyframeProperties = Object.keys(propertyPathKeyframes)

  for (const keyframePropertyPath of keyframeProperties) {
    propertyPathKeyframes[keyframePropertyPath].sort((a, b) => a.time - b.time) // sorting based on time

    // We add main property value as keyframe if the keyframe time for the lowest time is greater that clipObject.time
    const fistKeyframe = propertyPathKeyframes[keyframePropertyPath][0]
    if (fistKeyframe.time > object.startAt)
      propertyPathKeyframes[keyframePropertyPath].unshift({
        // Adding first key frame from orginal base value
        propertyPath: keyframePropertyPath,
        value: fistKeyframe.value,
        time: object.startAt,
      })

    setFabricObjectKeyframeValue(
      object,
      canvas,
      keyframePropertyPath,
      propertyPathKeyframes[keyframePropertyPath],
    )
  }

  return object
}

const setFabricObjectKeyframeValue = (
  object: FabricObject | fabric.Object,
  canvas: fabric.Canvas,
  keyframePropertyPath: string,
  keyframes: fabric.IObjectKeyframe[],
) => {
  const isFabricObject = !!(object as fabric.Object).set
  const _object = isFabricObject
    ? (object as fabric.Object)
    : (object as FabricObject)

  const fps = canvas.template.fps
  const currentFrame = canvas.currentFrame

  const orderedPropertyKeyframes = keyframes.sort((a, b) => a.time - b.time)

  const targetKeyframeIndex = orderedPropertyKeyframes.findIndex(
    ({ time }, index) => {
      const frame = time * fps
      if (index === 0) return currentFrame === frame
      const previousKeyframe = orderedPropertyKeyframes[index - 1]
      const previousKeyframeFrame = previousKeyframe.time * fps
      if (currentFrame >= previousKeyframeFrame && currentFrame <= frame)
        return true
      return false
    },
  )
  const firstKeyframe = orderedPropertyKeyframes[0]
  const lastKeyframe =
    orderedPropertyKeyframes[orderedPropertyKeyframes.length - 1]

  const setObject = (value) => {
    const fabricObject = object as fabric.Object
    const propertiesArray = keyframePropertyPath.split(`.`)
    const isNested = propertiesArray.length > 1
    return isFabricObject && !isNested
      ? fabricObject.set(keyframePropertyPath as keyof fabric.Object, value)
      : _.set(_object, keyframePropertyPath, value)
  }

  if (targetKeyframeIndex === -1) return setObject(lastKeyframe.value)

  if (targetKeyframeIndex === 0) return setObject(firstKeyframe.value)

  const targetKeyframe = orderedPropertyKeyframes[targetKeyframeIndex]
  const previousKeyframe = orderedPropertyKeyframes[targetKeyframeIndex - 1]

  const newValue = getFabricObjectKeyframeValue(
    canvas,
    targetKeyframe,
    previousKeyframe,
  )

  setObject(newValue)
}

const getFabricObjectKeyframeValue = (
  canvas: fabric.Canvas,
  keyframe: fabric.IObjectKeyframe,
  previousKeyframe?: fabric.IObjectKeyframe,
) => {
  const fps = canvas.template.fps
  const currentFrame = canvas.currentFrame

  const currentTime = currentFrame / fps
  const keyframeFrame = keyframe.time * fps

  if (
    typeof keyframe.value !== `number` ||
    typeof previousKeyframe.value !== `number` ||
    keyframe.easingFunction === undefined ||
    keyframe.easingFunction === `none`
  )
    return currentFrame === keyframeFrame
      ? keyframe.value
      : previousKeyframe.value

  const keyframeProgress =
    (currentTime - previousKeyframe.time) /
    (keyframe.time - previousKeyframe.time)

  return EasingFunctions[keyframe.easingFunction](
    keyframeProgress,
    previousKeyframe.value,
    keyframe.value - previousKeyframe.value,
    1,
  )
}

const setFabricObjectNonKeyframeValues = (
  object: fabric.Object,
  clipObject: FabricObject,
  keyframePropertyPaths: string[],
) => {
  const clipPropertyPaths = nestedObjectKeysWithDot(clipObject)

  clipPropertyPaths.forEach((clipPropertyPath) => {
    if (keyframePropertyPaths.includes(clipPropertyPath)) return
    const propertiesArray = clipPropertyPath.split(`.`)
    const isNested = propertiesArray.length > 1
    try {
      isNested
        ? _.set(object, clipPropertyPath, _.get(clipObject, clipPropertyPath))
        : object.set(
            clipPropertyPath as keyof fabric.Object,
            _.get(clipObject, clipPropertyPath),
          )
    } catch (error) {
      console.error(
        `Unable to set non-keyframe object values`,
        clipPropertyPath,
        clipObject,
      )
    }
  })
}
