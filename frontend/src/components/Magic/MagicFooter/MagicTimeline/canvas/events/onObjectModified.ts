import { GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas } from '@lib/gqlTypes/emz'
import { FabricObject } from '@lib/graphql'
import { roundToDecimalPlaces } from '@lib/fabric'
import { diff } from 'deep-diff'
import _ from 'lodash'

export const handleTimelineCanvasObjectModifiedEvent =
  (
    canvas: fabric.Canvas,
    clipRef: React.MutableRefObject<GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas>,
    updateTemplateFromClip: (
      clip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
    ) => void,
  ) =>
  (event: fabric.IEvent): void => {
    if (event.target.type === `timelineObject`)
      return onTimelineObjectModified(
        event,
        canvas,
        clipRef.current,
        updateTemplateFromClip,
      )
    if (event.target.type === `timelineKeyframe`)
      return onTimelineKeyframeModified(
        event,
        canvas,
        clipRef.current,
        updateTemplateFromClip,
      )
  }

const onTimelineKeyframeModified = (
  { target }: fabric.IEvent,
  canvas: fabric.Canvas,
  clip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
  updateTemplateFromClip: (
    clip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
  ) => void,
) => {
  const updatedTimelineKeyframe = target as fabric.TimelineKeyframe
  const clipCloned = _.cloneDeep(clip)
  const index = clipCloned.objects.findIndex(
    (obj) => obj._id === updatedTimelineKeyframe.object._id,
  )
  const clipObject = clipCloned.objects[index]
  const clonedClipObject = _.cloneDeep(clipObject)
  const newClipClip = getModifiedClipObjectFromTimelineKeyframe(
    canvas,
    updatedTimelineKeyframe,
    clipCloned.duration,
    clonedClipObject,
  )

  // Returning if not differrence
  if (!diff(clipObject, newClipClip)) return

  clipCloned.objects[index] = newClipClip
  updateTemplateFromClip(clipCloned)
}

const onTimelineObjectModified = (
  { target }: fabric.IEvent,
  canvas: fabric.Canvas,
  clip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
  updateTemplateFromClip: (
    clip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
  ) => void,
) => {
  const updatedTimelineObject = target as fabric.TimelineObject
  const clipCloned = _.cloneDeep(clip)
  const index = clipCloned.objects.findIndex(
    (obj) => obj._id === updatedTimelineObject.object._id,
  )
  if (index === -1) return

  const clipObject = clipCloned.objects[index]
  const clonedClipObject = _.cloneDeep(clipObject)
  const newClipClip = getModifiedClipObjectFromTimelineObject(
    canvas,
    updatedTimelineObject,
    clipCloned.duration,
    clonedClipObject,
  )

  // Returning if not differrence
  if (!diff(clipObject, newClipClip)) return

  clipCloned.objects[index] = newClipClip
  updateTemplateFromClip(clipCloned)
}

const getModifiedClipObjectFromTimelineObject = (
  canvas: fabric.Canvas,
  timelineObject: fabric.TimelineObject,
  clipDuration: number,
  clipObject: FabricObject,
): FabricObject => {
  const fps = canvas.template.fps
  const totalFrames = clipDuration * fps
  const timelineWidth = canvas.getCanvasTimelineWidth()
  const timelineObjectLeftPercentage =
    (timelineObject.left - canvas.paddingX) / timelineWidth
  const timelineObjectRightPercentage =
    timelineObjectLeftPercentage + timelineObject.width / timelineWidth
  const newStartAtFrame = Math.round(timelineObjectLeftPercentage * totalFrames)
  const newEndAtFrame = Math.round(timelineObjectRightPercentage * totalFrames)

  const newStartAt = roundToDecimalPlaces(newStartAtFrame / fps, 2) // rounding to two decimal places
  const newEndAt = roundToDecimalPlaces(newEndAtFrame / fps, 2) // rounding to two decimal places

  // In case of video, we increase mediaStartAt propotional to startAt
  const isMedia = clipObject.type === `video` || clipObject.type === `video`
  if (
    isMedia &&
    clipObject.endAt === newEndAt &&
    newStartAt !== clipObject.startAt
  ) {
    const mediaClipObject = clipObject as fabric.IMediaOptions
    const suggestedMediaStartAt =
      mediaClipObject.mediaStartAt + (newStartAt - clipObject.startAt)
    const newMediaStartAt =
      suggestedMediaStartAt > 0 ? suggestedMediaStartAt : 0
    mediaClipObject.mediaStartAt = roundToDecimalPlaces(newMediaStartAt, 2)
  }

  const changeInStartAt = newStartAt - clipObject.startAt
  clipObject.keyframes = clipObject.keyframes?.map((keyframe) => {
    keyframe.time = roundToDecimalPlaces(keyframe.time + changeInStartAt, 2)
    return keyframe
  })

  clipObject.startAt = newStartAt
  clipObject.endAt = newEndAt
  return clipObject
}

const getModifiedClipObjectFromTimelineKeyframe = (
  canvas: fabric.Canvas,
  timelineKeyframe: fabric.TimelineKeyframe,
  clipDuration: number,
  clipObject: FabricObject,
): FabricObject => {
  const fps = canvas.template.fps
  const totalFrames = clipDuration * fps
  const timelineWidth = canvas.getCanvasTimelineWidth()
  const timelineKeyframeLeftPercentage =
    (timelineKeyframe.left - canvas.paddingX) / timelineWidth
  const newKeyframeFrame = Math.round(
    timelineKeyframeLeftPercentage * totalFrames,
  )

  const newKeyframeTime = roundToDecimalPlaces(newKeyframeFrame / fps, 2) // rounding to two decimal places

  if (clipObject.keyframes[timelineKeyframe.keyframeIndex])
    clipObject.keyframes[timelineKeyframe.keyframeIndex].time = newKeyframeTime

  return clipObject
}
