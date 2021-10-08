import { timelineFabric } from '@lib/fabric/timeline'
import { stringToColor } from '@lib/utils'
import {
  TimelineObjectGap,
  TimelineObjectMargin,
  TimelineObjectHeight,
} from '@constants/magic/timeline/objects'
import { TimelineKeyframeSize } from '@lib/fabric'
import { IMagicTimelineState } from '@redux/actions'
import _ from 'lodash'
import {
  GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
  MagicTemplateClipType,
} from '@lib/gqlTypes/emz'
import { FabricObject } from '@lib/graphql'

export const addTimelineTracks = (
  canvas: fabric.Canvas,
  clip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
  fps: number,
  objectKeyframesVisible: IMagicTimelineState[`objectKeyframesVisible`],
): void => {
  const totalFrames = clip.duration * fps
  const timelineWidth = canvas.getCanvasTimelineWidth()
  let top = TimelineObjectGap

  if (clip.type !== MagicTemplateClipType.CANVAS)
    throw new Error(`Clip not of type canvas`)

  const reversedClipObjects = [...clip.objects].reverse()

  reversedClipObjects.forEach((object: FabricObject) => {
    const startAtFrame = object.startAt * fps
    const endAtFrame = object.endAt * fps
    const width = ((endAtFrame - startAtFrame) / totalFrames) * timelineWidth
    const left = canvas.paddingX + (startAtFrame / totalFrames) * timelineWidth

    const timelineObject = new timelineFabric.TimelineObject({
      top,
      left,
      width,
      height: TimelineObjectHeight,
      fill: object.type && stringToColor(object.type),
      object,
    })

    top += TimelineObjectMargin
    canvas.add(timelineObject)
    addTimelineKeyframes(canvas, timelineObject, objectKeyframesVisible)
  })
  const minHeight = canvas.getHeight()
  const newHeight = top + TimelineObjectGap
  if (newHeight > minHeight) canvas.setHeight(newHeight)
  canvas.requestRenderAll()
}

// Adding timeline keyframes into canvas
const addTimelineKeyframes = (
  canvas: fabric.Canvas,
  timelineObject: fabric.TimelineObject,
  objectKeyframesVisible: IMagicTimelineState[`objectKeyframesVisible`],
) => {
  const object = timelineObject.object
  const timelineWidth = canvas.getCanvasTimelineWidth()
  const fps = canvas.template.fps
  const totalFrames = canvas.clip.duration * fps

  const keyframeVisible = objectKeyframesVisible[object._id]
  if (!keyframeVisible || !keyframeVisible.propertyPath) return

  const visiblePropertyKeyframes = object.keyframes
    ? object.keyframes.filter(
        (keyframe) => keyframe.propertyPath === keyframeVisible.propertyPath,
      )
    : []

  for (const index in visiblePropertyKeyframes) {
    const keyframe = visiblePropertyKeyframes[index]
    const keyframeFrame = Math.round(keyframe.time * fps)

    const left = canvas.paddingX + timelineWidth * (keyframeFrame / totalFrames)
    const top =
      timelineObject.top + timelineObject.height * 0.5 - TimelineKeyframeSize
    const _timelineKeyframe = new timelineFabric.TimelineKeyframe({
      keyframeIndex: parseInt(index),
      left,
      top,
      object,
    })
    canvas.add(_timelineKeyframe)
  }
}
