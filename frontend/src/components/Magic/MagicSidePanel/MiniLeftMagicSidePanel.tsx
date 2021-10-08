import { EmzDocument } from '@lib/constants'
import { MagicSidePanelList } from '@constants/magic/magicSidePanel'
import { IMagicSidePanelListItem } from '.'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { setMagicSidePanelItem } from '@redux/actions'
import { ScrollBarDiv } from '@lib/components'
import { useRouter } from 'next/router'
import { EmzAppRoutes } from '@lib/constants'
import { useTranslation } from 'react-i18next'

const MiniLeftMagicSidePanelItems = (
  setMagicSidePanel: (magicSidePanel: IMagicSidePanelListItem) => void,
  activeStickyPanel: IMagicSidePanelListItem,
): JSX.Element[] =>
  MagicSidePanelList.map((magicSidePanelItem, index) => {
    if (magicSidePanelItem.hideOnMiniPanel) return
    const { t } = useTranslation(`magic`)
    return (
      <div
        key={index}
        className="mb-7 cursor-pointer"
        onClick={() => setMagicSidePanel(magicSidePanelItem)}
      >
        <div className="flex flex-col ">
          <i
            className={`${magicSidePanelItem.icon} fa-lg ${
              magicSidePanelItem.name === activeStickyPanel.name
                ? `text-primary`
                : `text-gray-300`
            }`}
            id={t(magicSidePanelItem.name)}
          ></i>

          <span
            className={`${
              magicSidePanelItem.name === activeStickyPanel.name
                ? `text-primary`
                : `text-gray-300`
            } text-xs mt-3`}
          >
            {t(magicSidePanelItem.name)}
          </span>
        </div>
      </div>
    )
  })

export const MiniLeftMagicSidePanel: React.FC = (props) => {
  const dispatch = useDispatch()
  const setMagicSidePanel = (magicSidePanel: IMagicSidePanelListItem) => {
    dispatch(setMagicSidePanelItem(magicSidePanel))
  }
  const router = useRouter()
  const {
    magicSidePanel: { stickySidePanelItem },
    magicIframe: { enabled, iframeOptions },
  } = useSelector((state: RootState) => state)

  const onClick = () => {
    if (!enabled) return router.push(EmzAppRoutes.dashboard)
    // redirect to iframe page
    const query = Object.keys(iframeOptions).reduce((result, queryKey) => {
      const value = iframeOptions[queryKey]
      return {
        ...result,
        [queryKey]: String(value),
      }
    }, {})
    router.push({ pathname: EmzAppRoutes.iframeMagic, query })
  }

  return (
    <div className="flex">
      <ScrollBarDiv className="h-screen w-24 border-r-2 ">
        <div className="m-2 text-center ">
          <img
            className="w-16 h-12 mt-5 mb-16 rounded-full mx-auto cursor-pointer"
            src={EmzDocument.logo}
            alt={EmzDocument.title}
            onClick={onClick}
          ></img>
          {MiniLeftMagicSidePanelItems(setMagicSidePanel, stickySidePanelItem)}
        </div>
      </ScrollBarDiv>
    </div>
  )
}
