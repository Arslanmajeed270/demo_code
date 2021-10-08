import { IMagicSidePanelListItem } from '@components/Magic/MagicSidePanel'
import { MagicStickyPanelObjectPropertiesItem } from '@constants/magic/magicSidePanel'
import { ObjectId } from '@lib/graphql/types'

export const handleTimelineCanvasSelectEvent =
  (
    setActiveTemplateClipObjectId: (_id: ObjectId) => void,
    setMagicSidePanelItem: (magicSidePanel: IMagicSidePanelListItem) => void,
  ) =>
  ({ target }: fabric.IEvent): void => {
    if (target === null || !(target as any).object) return
    if (target.type === `timelineObject`)
      return onTimelineObjectSelect(
        target as fabric.TimelineObject,
        setActiveTemplateClipObjectId,
        setMagicSidePanelItem,
      )
    if (target.type === `timelineKeyframe`)
      return onTimelineKeyframeSelect(
        target as fabric.TimelineKeyframe,
        setMagicSidePanelItem,
      )
  }

const onTimelineObjectSelect = (
  timelineObject: fabric.TimelineObject,
  setActiveTemplateClipObjectId: (_id: ObjectId) => void,
  setMagicSidePanelItem: (magicSidePanel: IMagicSidePanelListItem) => void,
) => {
  setActiveTemplateClipObjectId(timelineObject.object._id)
  setMagicSidePanelItem(MagicStickyPanelObjectPropertiesItem)
}

const onTimelineKeyframeSelect = (
  timelineKeyframe: fabric.TimelineKeyframe,
  setMagicSidePanelItem: (magicSidePanel: IMagicSidePanelListItem) => void,
) => {
  // setActiveTemplateClipObjectId(timelineKeyframe.object._id)
  // setMagicSidePanelItem(MagicStickyPanelObjectPropertiesItem)
}
