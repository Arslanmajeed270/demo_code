import TemplateVersionCard from '@components/Magic/MagicSidePanel/components/MagicSidePanelPublish/TemplateVersionCard'
import { Button, ScrollBarDiv } from '@lib/components'
import { GqlTemplateVersion_templateVersion } from '@lib/gqlTypes/emz'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const templateVersionList: GqlTemplateVersion_templateVersion[] = []

const MagicSidePanelPublish: React.FC = () => {
  const { t } = useTranslation(`magic`)
  const [activeTemplateIndex, setActiveTemplateIndex] = useState(0)
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0)
  const setActiveTemplateVersion = (index: number) => {
    setSelectedTemplateIndex(index)
    setActiveTemplateIndex(index)
  }
  return (
    <div>
      <div className="flex flex-col w-full h-screen mt-6 ">
        <ScrollBarDiv className="h-full mb-56 border-t border-b">
          {templateVersionList.map((version, index) => (
            <div key={index} onClick={() => setSelectedTemplateIndex(index)}>
              <TemplateVersionCard
                templateVersion={version}
                isSelected={index === selectedTemplateIndex}
                isActive={index === activeTemplateIndex}
                setActive={() => setActiveTemplateVersion(index)}
                downBorder={index !== templateVersionList.length - 1}
              />
            </div>
          ))}
        </ScrollBarDiv>
      </div>
      <div className="absolute inset-x-8 bottom-8 w-5/6">
        <Button
          className="h-16"
          color="green"
          icon={<i className="fas fa-share-square text-sm mx-2"></i>}
          fontWeight="font-light"
          label={t(`publish`)}
        ></Button>
      </div>
    </div>
  )
}
export default MagicSidePanelPublish
