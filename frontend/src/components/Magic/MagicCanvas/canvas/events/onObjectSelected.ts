import { IMagicSidePanelListItem } from '@components/Magic/MagicSidePanel'
import { MagicStickyPanelObjectPropertiesItem } from '@constants/magic/magicSidePanel'
import { ObjectId } from '@lib/graphql/types'

export const handleCanvasSelectEvent =
  (
    setActiveTemplateClipObjectId: (_id: ObjectId) => void,
    setMagicSidePanelItem: (magicSidePanel: IMagicSidePanelListItem) => void,
  ) =>
  ({ target }: fabric.IEvent): void => {
    if (target === null || !target._id) return
    setActiveTemplateClipObjectId(target._id)
    setMagicSidePanelItem(MagicStickyPanelObjectPropertiesItem)
  }
