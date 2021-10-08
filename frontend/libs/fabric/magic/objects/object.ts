import { FabricObject } from '@lib/graphql'
import { fabric } from 'fabric'
import _ from 'lodash'
import { updateFabricObjectFunction } from '.'
import {
  CanvasObjectDropScaleReduceBy,
  FCOInitializedEventName,
  FCOPropertySetEventNamePrefix,
  propsToExportFromFabricObject,
} from '..'

export const applyFabricObjectModifications = (
  _fabric: typeof fabric,
): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prototype = _fabric.Object.prototype as any

  // Updating set field
  const originalSet = prototype.set
  prototype.set = function (key, newValue) {
    const oldValue = this[key]
    originalSet.call(this, key, newValue)
    if (oldValue !== newValue) {
      this.fire(`${FCOPropertySetEventNamePrefix}${key}`, {
        old: oldValue,
        new: newValue,
      })
    }
  }

  const objectInitializedFunc = ($this?: fabric.Object) =>
    function () {
      const _this: fabric.Object = $this || this
      if (_this.canvas?.isTimeline) return

      setTimeout(() => {
        // Because canvas is defined later after object is initialized
        if (!_this?.canvas) return
        if (_this.canvas?.isTimeline) return
        if (_this.isNewObject === true) {
          const objectNewHeight =
            _this.canvas.template.width * CanvasObjectDropScaleReduceBy
          _this.scaleToHeight(objectNewHeight)
          _this.isNewObject = false
        }
        _this.canvas.requestRenderAll()
      })
    }

  updateFabricObjectFunction(
    _fabric,
    `Object`,
    `initialize`,
    ($this: fabric.Object) => {
      $this.on(FCOInitializedEventName, objectInitializedFunc($this))
    },
  )
  _fabric.Object.prototype.initialized = objectInitializedFunc()

  // extend fabric object
  updateFabricObjectFunction(
    _fabric,
    `Object`,
    `toObject`,
    function ($this: fabric.Object, object: FabricObject) {
      if (!$this.canvas) return object
      if ($this.canvas.isTimeline) return object
      const objectified = exportCustomPropsFromFabricObject(object, $this)
      return safeTimeframeToObject($this, objectified)
    },
    false,
  )

  // should object render
  updateFabricObjectFunction(
    _fabric,
    `Object`,
    `isNotVisible`,
    function ($this: fabric.Object, isNotVisible: boolean) {
      if (!$this.canvas) return isNotVisible
      if ($this.canvas.isTimeline) return isNotVisible
      const shouldRender = shouldFabricObjectRender($this)
      const shouldHaveControls = shouldRender && !$this.canvas.isPlaying
      setFabricObjectHasControls($this, shouldHaveControls)
      return !shouldRender || isNotVisible
    },
    false,
  )
}

export const shouldFabricObjectRender = (object: fabric.Object): boolean => {
  if (!object.canvas.template) return true

  const fps = object.canvas.template.fps
  const startAtFrame = object.startAt * fps
  const endAtFrame = object.endAt * fps
  const currentFrame = object.canvas.currentFrame

  if (currentFrame >= startAtFrame && currentFrame <= endAtFrame) return true
  return false
}

const setFabricObjectHasControls = (
  object: fabric.Object,
  hasControls: boolean,
): void => {
  object.hasControls = hasControls
  object.selectable = hasControls
  object.hasBorders = hasControls
  object.evented = hasControls
}

export const getClipFabricObject = (object: fabric.Object) => {
  if (!object.canvas) return
  if (!object.canvas.clip) return

  const clipObjects: FabricObject[] = object.canvas.clip.objects
  return clipObjects.find((clipObject) => clipObject._id === object._id)
}

const safeTimeframeToObject = (
  canvasObject: fabric.Object,
  object: FabricObject,
): FabricObject => {
  const fps = canvasObject.canvas.template.fps
  const startAtFrame = object.startAt * fps
  if (!canvasObject.canvas) return object
  if (canvasObject.canvas.currentFrame === startAtFrame) return object

  const clipObject = getClipFabricObject(canvasObject)

  if (!clipObject) return object

  if (!object.keyframes || object.keyframes.length === 0) return object

  const keyframePropertes = object.keyframes.map(
    (keyframe) => keyframe.propertyPath,
  )

  return keyframePropertes.reduce<FabricObject>((_object, keyframeProperty) => {
    const anyObject = _object as any
    const value = _.get(anyObject, keyframeProperty)
    _.set(anyObject, keyframeProperty, value)
    return _object
  }, object)
}

export const exportCustomPropsFromFabricObject = <T = unknown>(
  object: T,
  fromObject: FabricObject,
): T => {
  const customProps = propsToExportFromFabricObject.reduce(
    (_customProps, prop) =>
      (_customProps = { ..._customProps, [prop]: fromObject[prop] }),
    {},
  )
  return {
    ...object,
    ...customProps,
  }
}
