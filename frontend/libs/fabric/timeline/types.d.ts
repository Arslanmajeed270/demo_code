/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="fabric" />

import { FabricObject } from '@lib/graphql'

// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  namespace fabric {
    interface ITimelineObjectOptions
      extends Omit<
        fabric.IRectOptions,
        // eslint-disable-next-line quotes
        'version' | 'keyframes' | 'startAt' | 'endAt' | '_id'
      > {
      object: FabricObject
    }
    type ITimelineSeekBarOptions = Omit<
      fabric.IRectOptions,
      // eslint-disable-next-line quotes
      'version' | 'keyframes' | 'startAt' | 'endAt' | '_id'
    >
    interface ITimelineKeyframeOptions
      extends Omit<
        fabric.IRectOptions,
        // eslint-disable-next-line quotes
        'version' | 'keyframes' | 'startAt' | 'endAt' | '_id'
      > {
      object: FabricObject
      keyframeIndex: number
    }

    class TimelineObject extends Object {
      constructor(options: ITimelineObjectOptions)
      type: `timelineObject`
      object: FabricObject
    }
    class TimelineSeekBar extends Object {
      constructor(options: ITimelineSeekBarOptions)
      type: `timelineSeekBar`
    }
    class TimelineKeyframe extends Object {
      constructor(options: ITimelineKeyframeOptions)
      type: `timelineKeyframe`
      object: FabricObject
      keyframeIndex: number
    }
  }
}
