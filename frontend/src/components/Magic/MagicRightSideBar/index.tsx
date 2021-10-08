import React, { useState } from 'react'
import { MROBArrange } from './components/MROBArrange'
import { HideOnClickOutside } from '@lib/components'
import { GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas } from '@lib/gqlTypes/emz'
import { FabricObject } from '@lib/graphql'

export interface IRightSideBarListItem {
  name: string
  icon: JSX.Element
  component?: JSX.Element
  function?: () => void
}

interface IMagicRightSideBarProps {
  selectedObject: FabricObject
  selectedObjectIndex: number
  canvas: fabric.Canvas
  clip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas
  updateTemplateFromClip: (
    clip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
  ) => void
  deleteObject: () => void
}

export const MagicRightSideBar: React.FC<IMagicRightSideBarProps> = (props) => {
  const [magicSidePanelItem, setMagicSidePanelItem] =
    useState<IRightSideBarListItem>()

  const handleSideBar = () => {
    setMagicSidePanelItem(null)
  }

  const rightSideBarItems: IRightSideBarListItem[] = [
    {
      name: `Arrange`,
      icon: <i className="fas fa-layer-group" />,
      component: (
        <MROBArrange
          clip={props.clip}
          selectedObjectIndex={props.selectedObjectIndex}
          canvas={props.canvas}
          updateTemplateFromClip={props.updateTemplateFromClip}
        />
      ),
    },
    {
      name: `Trash`,
      icon: <i className="fas fa-trash" />,
      function: props.deleteObject,
    },
  ]

  return (
    <div className="fixed right-0 text-center rounded-l inset-y-1/3 inline-table w-10 bg-white text-gray-500">
      {rightSideBarItems?.map((item: IRightSideBarListItem, index: number) => {
        return (
          <div
            key={index}
            className="text-center my-4 mx-2.5 cursor-pointer relative"
            onClick={() => {
              setMagicSidePanelItem(item)
              if (item.function !== undefined) item.function()
            }}
          >
            {item.icon}
          </div>
        )
      })}
      {magicSidePanelItem && magicSidePanelItem.component !== undefined && (
        <HideOnClickOutside
          show={true}
          handleView={(isSet) => !isSet && handleSideBar()}
        >
          <div className="flex flex-wrap bg-white absolute w-20 text-center rounded right-11 p-1 top-0">
            {magicSidePanelItem.component}
          </div>
        </HideOnClickOutside>
      )}
    </div>
  )
}
