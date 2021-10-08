import { DefaultTemplateClipObjectDuration } from '@constants/magic'
import { magicFabric } from '@lib/fabric/magic'
import {
  GqlVideo_video_magicTemplate,
  GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
} from '@lib/gqlTypes/emz'
import { roundToDecimalPlaces } from '@lib/fabric'
import { diff, Diff } from 'deep-diff'
import _ from 'lodash'
import { getActiveClipFromId } from '../template/clip'
import { validateTemplateClipCanvasObject } from '../template/validation'
import * as graphqlScalar from '@lib/graphql'
import { fabric } from 'fabric'
import { FabricObject } from '@lib/graphql'

interface ICanvasArrayObjectified {
  [x: string]: FabricObject
}

export const convertObjectsToCanvasObjects = (
  objects: FabricObject[],
  canvas?: fabric.Canvas,
): Promise<fabric.Object[]> => {
  return new Promise<fabric.Object[]>((resolve) => {
    magicFabric.util.enlivenObjects(
      objects,
      (_objects: fabric.Object[]) => {
        let origRenderOnAddRemove
        if (canvas !== undefined) {
          origRenderOnAddRemove = canvas.renderOnAddRemove
          canvas.renderOnAddRemove = false
        }

        resolve(_objects)

        if (canvas !== undefined) {
          canvas.renderOnAddRemove = origRenderOnAddRemove
          canvas.requestRenderAll()
        }
      },
      undefined,
    )
  })
}

export const safeConvertObjectsToCanvasObjects = async (
  objects: FabricObject[],
  canvas?: fabric.Canvas,
): Promise<fabric.Object[] | null> => {
  return await convertObjectsToCanvasObjects(objects, canvas).catch((error) => {
    console.error(`Error converting to canvas objects: `, error.message)
    return null
  })
}

const getObjectsTobeUpdated = (
  differrences: Diff<FabricObject[], FabricObject[]>[],
  clip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
) => {
  const objectsToUpdate = []
  for (const { path } of differrences) {
    const objectIndex = path[0]
    const objectToUpdate = clip.objects[objectIndex]
    if (!objectsToUpdate.includes(objectToUpdate))
      objectsToUpdate.push(objectToUpdate)
  }
  return objectsToUpdate
}

// Depreciated
export const updateObjectsOnCanvasForcefully = async (
  differrences: Diff<FabricObject[], FabricObject[]>[],
  clip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
  canvas: fabric.Canvas,
): Promise<fabric.Canvas> => {
  const objectsToUpdate = getObjectsTobeUpdated(differrences, clip)

  const canvasObjects = await safeConvertObjectsToCanvasObjects(
    objectsToUpdate,
    canvas,
  )

  if (!canvasObjects) return

  const currentObjects = canvas.getObjects()

  canvasObjects.forEach((o) => {
    const currentObjectIndex = currentObjects.findIndex(
      (obj) => obj._id === o._id,
    )
    const currentObject =
      currentObjectIndex >= 0 ? currentObjects[currentObjectIndex] : undefined
    if (currentObject === undefined) return
    canvas.remove(currentObject)
    o.isNewObject = true
    canvas.add(o)
    canvas.moveTo(o, currentObjectIndex)
  })

  return canvas
}

export const attachListenerOnMultipleCanvasEvents = (
  eventNames: string[],
  canvas: fabric.Canvas,
  listener: ({ target }: fabric.IEvent) => void,
): void => {
  for (const eventName of eventNames) {
    canvas.on(eventName, listener)
  }
}

export const applyClipDifferrencesOnCanvas = async (
  oldClip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
  newClip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
  canvas: fabric.Canvas,
): Promise<fabric.Canvas> => {
  const canvasObjects = canvas.getObjects()

  const oldObjectsObjectified = oldClip.objects.reduce<ICanvasArrayObjectified>(
    (obj, item) => ((obj[item._id] = item), obj),
    {},
  )
  const newObjectsObjectified = newClip.objects.reduce<ICanvasArrayObjectified>(
    (obj, item) => ((obj[item._id] = item), obj),
    {},
  )

  const addObject = async (objectToUpdate: FabricObject) => {
    if (!objectToUpdate) return // TODO: Check why objectIndex is not in clip.objects when quickly add images on canvas
    const [newCanvasObject] = await convertObjectsToCanvasObjects(
      [objectToUpdate],
      canvas,
    )
    newCanvasObject.isNewObject = true
    canvas.add(newCanvasObject)

    // setting position in array
    const index = newClip.objects.findIndex(
      (object) => object._id === newCanvasObject._id,
    )
    if (index === -1) return
    newCanvasObject.moveTo(index)
  }

  const removeObject = (objectToUpdate: FabricObject) => {
    const canvasObject = canvasObjects.find(
      (obj) => obj._id === objectToUpdate._id,
    )
    if (!canvasObject) return
    canvas.remove(canvasObject)
  }

  const updateObject = (
    objectToUpdate: FabricObject,
    key: string,
    value: unknown,
  ) => {
    const canvasObject = canvasObjects.find(
      (obj) => obj._id === objectToUpdate._id,
    )
    if (!canvasObject) return

    canvasObject.set(key as keyof fabric.Object, value)
  }

  const applyDifferrence = async (
    differrence: Diff<ICanvasArrayObjectified, ICanvasArrayObjectified>,
  ) => {
    const objectIndex = differrence.path[0]
    if (differrence.kind === `N` && differrence.path.length === 1) {
      const objectToUpdate = newObjectsObjectified[objectIndex]
      return addObject(objectToUpdate)
    }
    if (differrence.kind === `D` && differrence.path.length === 1) {
      const objectToUpdate = oldObjectsObjectified[objectIndex]
      return removeObject(objectToUpdate)
    }
    if (differrence.path.length < 2) return
    // update object
    const objectToUpdate = newObjectsObjectified[objectIndex]
    const key = differrence.path[1]
    const newValue = objectToUpdate[differrence.path[1]]
    updateObject(objectToUpdate, key, newValue)
  }

  const differrences = diff(oldObjectsObjectified, newObjectsObjectified)
  if (!differrences) return

  await Promise.all(differrences.map(applyDifferrence))

  canvas.requestRenderAll()

  return canvas
}

export const addNewClipObjectToTemplate = (
  fabricObject: FabricObject,
  currentFrame: number,
  template: GqlVideo_video_magicTemplate,
  activeTemplateClipId: graphqlScalar.ObjectId,
  updateTemplateFromClip: (
    clip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
  ) => void,
): void => {
  const clip = getActiveClipFromId(
    activeTemplateClipId,
    template,
  ) as GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas
  const _clip = _.cloneDeep(clip)

  if (!fabricObject) return
  const errors = validateTemplateClipCanvasObject(fabricObject)
  if (errors.length > 0) return console.error(errors)

  fabricObject.startAt = roundToDecimalPlaces(currentFrame / template.fps, 2)
  fabricObject.endAt = fabricObject.startAt + DefaultTemplateClipObjectDuration

  updateTemplateFromClip({
    ..._clip,
    objects: [..._clip.objects, fabricObject],
  })
}
