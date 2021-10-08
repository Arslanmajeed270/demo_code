import { MagicSidePanelExportItem } from '@constants/magic/magicSidePanel'
import { Button } from '@lib/components'
import { setMagicSidePanelItem } from '@redux/actions'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { IMagicSidePanelListItem } from '../MagicSidePanel'

const MagicExportButton: React.FC = () => {
  const { t } = useTranslation(`magic`)
  const exportIcon = <i className="fas fa-upload text-sm mx-2" />
  const dispatch = useDispatch()
  const setMagicSidePanel = (magicSidePanel: IMagicSidePanelListItem) => {
    dispatch(setMagicSidePanelItem(magicSidePanel))
  }
  return (
    <div className="w-28 mr-5">
      <Button
        color="indigo"
        icon={exportIcon}
        fontWeight={`font-light`}
        label={t(`export`)}
        onClick={() => setMagicSidePanel(MagicSidePanelExportItem)}
      ></Button>
    </div>
  )
}

export default MagicExportButton
