import { ScrollBarDiv } from '@lib/components'
import styled from 'styled-components'

import { IMagicSidePanelListComponentProps, IMagicSidePanelListItem } from '.'

interface IMagicStickyPanelProps extends IMagicSidePanelListComponentProps {
  stickyPanelItem: IMagicSidePanelListItem
}
export const MagicStickyPanel: React.FC<IMagicStickyPanelProps> = (props) => {
  const { stickyPanelItem, template, updateTemplate } = props
  if (!stickyPanelItem) return <div></div>
  return (
    <MagicStickyPanelWrapper className="h-full">
      <div className="flex flex-col sm:justify-around ">
        <div className="w-full p-2">
          <div className="w-full text-gray-600 text-2xl">
            {stickyPanelItem.name}
          </div>
        </div>
        <stickyPanelItem.component
          template={template}
          updateTemplate={updateTemplate}
        />
      </div>
    </MagicStickyPanelWrapper>
  )
}

const MagicStickyPanelWrapper = styled(ScrollBarDiv)`
  min-width: 260px;
`
