import { MagicSidePanelPublishItem } from '@constants/magic/magicSidePanel'
import { Button } from '@lib/components'
import { setMagicSidePanelItem } from '@redux/actions'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { IMagicSidePanelListItem } from '../MagicSidePanel'

const MagicPublishButton: React.FC = () => {
  const { t } = useTranslation(`magic`)
  const publishIcon = <i className="fas fa-upload text-sm mx-2" />
  const dispatch = useDispatch()
  const setMagicSidePanel = (magicSidePanel: IMagicSidePanelListItem) => {
    dispatch(setMagicSidePanelItem(magicSidePanel))
  }
  return (
    <div className="w-28 mx-2">
      <Button
        color="green"
        icon={publishIcon}
        fontWeight={`font-light`}
        label={t(`publish`)}
        onClick={() => setMagicSidePanel(MagicSidePanelPublishItem)}
      ></Button>
    </div>
  )
}

export default MagicPublishButton
