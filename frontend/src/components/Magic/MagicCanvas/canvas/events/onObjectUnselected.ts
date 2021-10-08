import { IMagicSidePanelListItem } from '@components/Magic/MagicSidePanel'
import { MagicStickyPanelClipsItem } from '@constants/magic/magicSidePanel'
import { ObjectId } from '@lib/graphql/types'

export const handleCanvasUnselectEvent =
  (
    setActiveTemplateClipId: (_id: ObjectId) => void,
    setMagicSidePanelItem: (magicSidePanel: IMagicSidePanelListItem) => void,
  ) =>
  (): void => {
    setActiveTemplateClipId(null)
    setMagicSidePanelItem(MagicStickyPanelClipsItem)
  }
