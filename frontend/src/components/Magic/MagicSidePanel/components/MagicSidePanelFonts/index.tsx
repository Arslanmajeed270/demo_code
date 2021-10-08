import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MagicFonts } from '@components/Magic/MagicFonts'
import { InputText } from '@lib/components'

export const MagicSidePanelFonts: React.FC = () => {
  const { t } = useTranslation(`magic`)
  const [searchQuery, setSearchQuery] = useState(``)

  return (
    <div className="mt-4">
      <div className="flex space-x-3.5 mb-2">
        <div className="w-full text-3xl">
          <InputText
            name="searchQuery"
            type="text"
            placeholder={t(`search-here`)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <MagicFonts searchQuery={searchQuery} />
    </div>
  )
}
