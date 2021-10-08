import React, { useState, useEffect } from 'react'
import { IMagicSidePanelListComponentProps, IMagicSidePanelListItem } from '.'
import {
  setMagicSidePanelItem,
  setOverlaySidePanelWrapperClass,
  unsetMediaType,
} from '@redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { HideOnClickOutside, ScrollBarDiv } from '@lib/components'
import { useTranslation } from 'react-i18next'
import { RootState } from '@redux/reducers'

interface IMagicOverlaySidePanelProps
  extends IMagicSidePanelListComponentProps {
  overlaySidePanelItem: IMagicSidePanelListItem
}

export const MagicOverlaySidePanel: React.FC<IMagicOverlaySidePanelProps> = (
  props,
) => {
  const { t } = useTranslation(`magic`)
  const [toggle, setToggle] = useState(true)
  const {
    overlaySidePanelItem: magicSidePanelItem,
    template,
    updateTemplate,
    updateTemplateFromClip,
  } = props
  const dispatch = useDispatch()
  const setMagicSidePanel = (magicSidePanel: IMagicSidePanelListItem) => {
    dispatch(setMagicSidePanelItem(magicSidePanel))
  }
  const { overlaySidePanelWrapperClass: sidePanelWrapperClass } = useSelector(
    (state: RootState) => state.magicSidePanel,
  )

  useEffect(() => {
    if (magicSidePanelItem) return setToggle(true)
    setToggle(false)
  }, [magicSidePanelItem])

  const hidePanel = () => {
    setToggle(false)
    setTimeout(() => {
      setMagicSidePanel(null)
      dispatch(unsetMediaType())
      dispatch(setOverlaySidePanelWrapperClass(``))
    }, 300)
  }
  return (
    <>
      <div
        className={`${
          !magicSidePanelItem
            ? `hidden`
            : magicSidePanelItem.isRight
            ? `absolute z-20 inset-y-0 right-0`
            : `absolute z-20 inset-y-0 left-0`
        }`}
      >
        <ScrollBarDiv
          className={`${
            magicSidePanelItem?.wrapperClassName || ``
          } h-screen w-96
          ${sidePanelWrapperClass}
        ${
          !toggle
            ? `${
                magicSidePanelItem?.isRight
                  ? `translate-x-full`
                  : `-translate-x-full`
              } duration-300`
            : ` translate-x-0 duration-500`
        } border border-r-2 bg-white transform  transition ease-in-out`}
          id="MagicSidePanelScroll"
        >
          {magicSidePanelItem && (
            <HideOnClickOutside
              show={magicSidePanelItem != undefined}
              handleView={(isSet) => !isSet && hidePanel()}
            >
              <div className="flex flex-col sm:flex-row sm:justify-around h-screen">
                <div className="w-full p-6">
                  <div className="flex">
                    <div className="w-full text-3xl">
                      <h1>{t(magicSidePanelItem.name)}</h1>
                    </div>
                    <div
                      onClick={hidePanel}
                      className="bg-gray-200 rounded-md text-gray-400 cursor-pointer mb-2"
                    >
                      <i className="far fa-times p-3 mt-0.5"></i>
                    </div>
                  </div>
                  <magicSidePanelItem.component
                    template={template}
                    updateTemplate={updateTemplate}
                    updateTemplateFromClip={updateTemplateFromClip}
                  />
                </div>
              </div>
            </HideOnClickOutside>
          )}
        </ScrollBarDiv>
      </div>
    </>
  )
}
