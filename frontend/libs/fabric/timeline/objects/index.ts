import { createTimelineKeyframe } from './timelineKeyframe'
import { createTimelineObject } from './timelineObject'
import { createTimelineSeekBar } from './timelineSeekBar'

export const addFabricCustomObjects = (_fabric: typeof fabric): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fabricAny = _fabric as any
  fabricAny.TimelineObject = createTimelineObject(_fabric)
  fabricAny.TimelineSeekBar = createTimelineSeekBar(_fabric)
  fabricAny.TimelineKeyframe = createTimelineKeyframe(_fabric)
}
