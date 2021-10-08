import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'
import { GQL_MAGIC_EM_IMAGES } from 'libs/entities'
import { useLazyQuery } from '@apollo/client'

import { onDragStartFabricObject } from './utils'

import { getNewTCCOObjectBase } from '@components/Magic/MagicCanvas/template'
import { MagicUploadMediaItem } from '@constants/magic/magicSidePanel'
import { IMagicSidePanelListItem } from '..'
import { useDispatch } from 'react-redux'
import { setMagicSidePanelItem, setMediaType } from '@redux/actions'
import { useUpdate } from 'react-use'
import { InputText, Spinner } from '@lib/components/tail-kit'
import {
  GqlMagicEMImages,
  GqlMagicEMImagesVariables,
  GqlMagicEMImages_magicEMImages,
} from '@lib/gqlTypes/emz'
import { MediaType } from '@lib/gqlTypes/asp'

interface IImageProps {
  image: GqlMagicEMImages_magicEMImages
}
const Image = ({ image }: IImageProps): React.ReactElement => {
  const update = useUpdate()
  const baseTCCO = getNewTCCOObjectBase()
  const tcooObject: fabric.IImageOptions = {
    ...baseTCCO,
    name: `Image (${
      image.title || baseTCCO._id.substring(baseTCCO._id.length - 3)
    })`,
    type: `image`,
    src: image.urls.secondary,
    crossOrigin: `anonymous`,
    ...({ shadow: {} } as any), // TODO fix this by fixing rxjs, as it make issue on timeline drag first time
  }

  return (
    <img
      className="h-40 w-full rounded-md object-cover cursor-pointer"
      src={image.urls.thumbnail}
      data-media={image.urls.secondary}
      onDragStart={onDragStartFabricObject(tcooObject)}
      onDragEnd={update}
      data-type={`image`}
      alt={image.description}
      draggable={true}
    ></img>
  )
}

export const MagicSidePanelImages: React.FC = () => {
  const { t } = useTranslation(`magic`)

  const dispatch = useDispatch()
  const _setMagicSidePanelItem = (
    magicSidePanel: IMagicSidePanelListItem,
    mediaType: MediaType,
  ) => {
    dispatch(setMagicSidePanelItem(magicSidePanel))
    dispatch(setMediaType(mediaType))
  }
  const [images, setImages] = useState<GqlMagicEMImages_magicEMImages[]>([])
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState(``)
  const [hasMore, setHasMore] = useState(true)

  const [loadImages, { loading, error }] = useLazyQuery<
    GqlMagicEMImages,
    GqlMagicEMImagesVariables
  >(GQL_MAGIC_EM_IMAGES, {
    fetchPolicy: `cache-first`,
    onCompleted: ({ magicEMImages }) => {
      const hasMore = magicEMImages.length > 0
      const newImages = page > 1 ? [...images, ...magicEMImages] : magicEMImages
      setHasMore(hasMore)
      setImages(newImages)
    },
  })

  const _loadImages = async (page = 1) => {
    setPage(page)
    if (page === 1 && searchQuery !== ``) setImages([])
    loadImages({
      variables: {
        page,
        searchQuery: searchQuery.length === 0 ? undefined : searchQuery,
      },
    })
  }

  useEffect(() => {
    searchQuery.length === 0 ? _loadImages() : null
  }, [searchQuery])

  return (
    <div className="mt-4">
      <div className="flex space-x-3.5 mb-2">
        <div className="w-72 text-3xl">
          <InputText
            name="searchQuery"
            type="text"
            placeholder={t(`search-here`)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onEnter={() => _loadImages()}
          />
        </div>
        <div
          className="border-2 rounded-md text-gray-400 cursor-pointer"
          onClick={() => _loadImages()}
        >
          <i className="far fa-search p-3 mt-0.5"></i>
        </div>
        {searchQuery && (
          <div
            className="border-2 rounded-md text-red-400 cursor-pointer"
            onClick={() => {
              setSearchQuery(``)
            }}
          >
            <i className="far fa-times p-3 mt-0.5"></i>
          </div>
        )}
      </div>
      <div
        className="h-24 rounded-md cursor-pointer bg-gray-200 flex text-gray-700 p-8"
        onClick={() =>
          _setMagicSidePanelItem(MagicUploadMediaItem, MediaType.IMAGE)
        }
      >
        <div>
          <h1 className="text-lg">{t(`upload-image`)}</h1>
        </div>
        <div className=" w-24">
          <i className="float-right fal fa-cloud-upload-alt fa-2x"></i>
        </div>
      </div>
      {images && (
        <InfiniteScroll
          style={{ overflowY: `hidden` }}
          dataLength={images.length}
          next={() => _loadImages(page + 1)}
          hasMore={hasMore}
          loader={
            !error && (
              <div className="text-center mb-3 mt-5">
                <Spinner />
              </div>
            )
          }
          endMessage={
            <div className="text-center mt-10 text-gray-300">
              <b>{t(`no-more-image`)}</b>
            </div>
          }
          scrollableTarget="MagicSidePanelScroll"
        >
          <div className="grid grid-cols-2 gap-3 mt-4">
            {images.map((image: GqlMagicEMImages_magicEMImages, index) => (
              <Image key={index} image={image} />
            ))}
          </div>
        </InfiniteScroll>
      )}
      {!images && !error && (
        <div className="text-center mt-10 text-gray-300">
          {loading && <Spinner />}
        </div>
      )}
      {!loading && error && (
        <div className="text-center mt-10 text-gray-300">
          <i className="fa-3x far fa-jack-o-lantern"></i>
          <p>{t(`no-image`)}</p>
        </div>
      )}
    </div>
  )
}
