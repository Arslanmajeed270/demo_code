import { fabric as _fabric } from 'fabric'

export const applyFabricMagicDefaultConstants = (
  fabric: typeof _fabric,
): void => {
  fabric.magic = true
}

export const propsToExportFromFabricObject = [
  `_id`,
  `type`,
  `version`,
  `name`,
  `startAt`,
  `endAt`,
  `keyframes`,
]

export const FCOPropertySetEventNamePrefix = `object:property:`
export const FCOInitializedEventName = `object:initialized`
export const FCOCurrentFrameChange = `canvas:currentFrameChange`
export const FCOIsPlayingChange = `canvas:isPlayingChange`

export const CanvasObjectDropScaleReduceBy = 0.2

export const CanvasObjectVideoRenderDelay = 0
