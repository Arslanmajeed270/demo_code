import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'
import { GQL_MAGIC_FONTS } from 'libs/entities'
import { useQuery } from '@apollo/client'
import { MagicExternalMediaPageLimit } from 'src/constants/magic'
import { Property } from 'csstype'
import { loadFontsOnDocument } from '@lib/fabric/utils'
import { MagicFontItem } from './MagicFontItem'
import { Spinner } from '@lib/components'
import { GqlMagicFonts, GqlMagicFonts_magicFonts } from '@lib/gqlTypes/emz'

export interface IFontsDisplayed {
  font: GqlMagicFonts_magicFonts
  weight: Property.FontWeight
  italic: boolean
}
interface IMagicFontsProps {
  searchQuery: string
}

export const MagicFonts: React.FC<IMagicFontsProps> = ({ searchQuery }) => {
  const { t } = useTranslation(`magic`)
  const [fontsDisplayed, setFontsDisplayed] = useState<IFontsDisplayed[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const getFontsShownObject = (
    font: GqlMagicFonts_magicFonts,
  ): IFontsDisplayed => {
    return {
      font,
      weight: null,
      italic: false,
    }
  }
  const loadFonts = async (page = 0, freshList = false) => {
    setPage(page)
    if (!fontsResponse) return
    const sliceStart = page * MagicExternalMediaPageLimit
    const nextNFontsToLoad = fontsResponse.magicFonts
      .filter((font) => {
        return searchQuery !== ``
          ? font.family
              .toLocaleLowerCase()
              .indexOf(searchQuery.toLocaleLowerCase()) > -1
          : true
      })
      .slice(sliceStart, sliceStart + MagicExternalMediaPageLimit)
      .map<IFontsDisplayed>(getFontsShownObject)
    const newFontsToDisplay = [
      ...(freshList ? [] : fontsDisplayed),
      ...nextNFontsToLoad,
    ]
    loadFontsOnDocument(
      newFontsToDisplay.map((fontDisplayed) => fontDisplayed.font),
    )
    setFontsDisplayed(newFontsToDisplay)
    if (!nextNFontsToLoad.length) setHasMore(false)
  }
  const { data: fontsResponse, loading } = useQuery<GqlMagicFonts>(
    GQL_MAGIC_FONTS,
    {
      fetchPolicy: `cache-first`,
      onCompleted: () => {
        loadFonts(0)
      },
    },
  )
  const setFontStyle = (
    family: string,
    weight?: Property.FontWeight,
    italic?: boolean,
  ) => {
    const fontDisplayedIndex = fontsDisplayed.findIndex(
      (fontDisplayed) => fontDisplayed.font.family === family,
    )
    if (fontDisplayedIndex === -1) return
    const fontDisplayed = fontsDisplayed[fontDisplayedIndex]
    fontsDisplayed[fontDisplayedIndex] = {
      font: fontDisplayed.font,
      weight,
      italic,
    }
    setFontsDisplayed([...fontsDisplayed])
  }
  useEffect(() => {
    loadFonts(0, true)
  }, [searchQuery])
  return (
    <div>
      {fontsDisplayed && !loading && (
        <InfiniteScroll
          style={{ overflowY: `hidden` }}
          dataLength={fontsDisplayed.length}
          next={() => {
            loadFonts(page + 1)
          }}
          hasMore={hasMore}
          loader={Spinner}
          endMessage={<></>}
          scrollableTarget="MagicSidePanelScroll"
        >
          {fontsDisplayed.map((font, index) => (
            <MagicFontItem
              key={index}
              font={font}
              handleFontStyle={setFontStyle}
            />
          ))}
        </InfiniteScroll>
      )}
      {!fontsDisplayed.length && (
        <div className="text-center mt-10 text-gray-300">
          {loading && <Spinner />}
          {!loading && (
            <>
              <i className="fa-3x far fa-jack-o-lantern"></i>
              <p>{t(`no-font`)}</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
