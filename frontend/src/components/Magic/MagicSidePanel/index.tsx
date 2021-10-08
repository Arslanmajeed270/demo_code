import React from 'react'

import { MiniLeftMagicSidePanel } from './MiniLeftMagicSidePanel'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { MagicOverlaySidePanel } from './MagicOverlaySidePanel'
import { MagicStickyPanel } from './MagicStickyPanel'
import {
  GqlVideo_video_magicTemplate,
  GqlVideo_video_magicTemplate_clips,
} from '@lib/gqlTypes/emz'

export interface IMagicSidePanelListComponentProps {
  template: GqlVideo_video_magicTemplate
  updateTemplate: (template: GqlVideo_video_magicTemplate) => void
  updateTemplateFromClip?: (clip: GqlVideo_video_magicTemplate_clips) => void
}

export interface IMagicSidePanelListItem {
  name: string
  icon?: string
  component: React.FC<IMagicSidePanelListComponentProps>
  isRight?: boolean
  hideOnMiniPanel?: boolean
  wrapperClassName?: string
  isSticky?: boolean
}

export const MagicSidePanel: React.FC<
  Omit<IMagicSidePanelListComponentProps, `setMagicSidePanelItem`>
> = (props) => {
  const { template, updateTemplate, updateTemplateFromClip } = props
  const magicSidePanel = useSelector(
    ({ magicSidePanel }: RootState) => magicSidePanel,
  )
  return (
    <>
      <MagicOverlaySidePanel
        template={template}
        updateTemplate={updateTemplate}
        overlaySidePanelItem={magicSidePanel.overlaySidePanelItem}
        updateTemplateFromClip={updateTemplateFromClip}
      />
      <MiniLeftMagicSidePanel />
      <div className="h-screen w-80 border-r-2 p-2">
        <MagicStickyPanel
          template={template}
          updateTemplate={updateTemplate}
          stickyPanelItem={magicSidePanel.stickySidePanelItem}
          updateTemplateFromClip={updateTemplateFromClip}
        />
      </div>
    </>
  )
}
