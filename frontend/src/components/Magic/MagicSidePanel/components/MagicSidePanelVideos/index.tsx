import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLazyQuery } from '@apollo/client'
import Draggable from 'react-draggable'

import { VideoUi } from './VideoUi'
import { PlayableVideo } from './PlayableVideo'
import { MagicUploadMediaItem } from '@constants/magic/magicSidePanel'
import { setMagicSidePanelItem, setMediaType } from '@redux/actions'
import { useDispatch } from 'react-redux'
import {
  IMagicSidePanelListComponentProps,
  IMagicSidePanelListItem,
} from '../..'
import { InputText, Spinner } from '@lib/components'
import {
  GqlMagicEMVideos,
  GqlMagicEMVideosVariables,
  GqlMagicEMVideos_magicEMVideos,
  GqlMagicEMVideos_magicEMVideos_videos,
} from '@lib/gqlTypes/emz'
import { GQL_MAGIC_EM_VIDEOS } from '@lib/entities/emz/magic'
import { MediaType } from '@lib/gqlTypes/asp'

export const MagicSidePanelVideos: React.FC<IMagicSidePanelListComponentProps> =
  ({ template }) => {
    const { t } = useTranslation(`magic`)

    const dispatch = useDispatch()
    const _setMagicSidePanelItem = (
      magicSidePanel: IMagicSidePanelListItem,
      mediaType: MediaType,
    ) => {
      dispatch(setMagicSidePanelItem(magicSidePanel))
      dispatch(setMediaType(mediaType))
    }
    const [videos, setVideos] = useState<GqlMagicEMVideos_magicEMVideos[]>([])
    const [page, setPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState(``)
    const [hasMore, setHasMore] = useState(true)
    const [playableVideo, setPlayableVideo] =
      useState<GqlMagicEMVideos_magicEMVideos_videos[]>(null)
    const [activeDrags, setActiveDrags] = useState(0)

    const onStart = () => {
      setActiveDrags(activeDrags + activeDrags)
    }

    const onStop = () => {
      setActiveDrags(activeDrags - activeDrags)
    }
    const [loadVideos, { loading, error }] = useLazyQuery<
      GqlMagicEMVideos,
      GqlMagicEMVideosVariables
    >(GQL_MAGIC_EM_VIDEOS, {
      fetchPolicy: `cache-first`,
      onCompleted: ({ magicEMVideos }) => {
        const hasMore = magicEMVideos.length > 0
        const newVideos =
          page > 1 ? [...videos, ...magicEMVideos] : magicEMVideos
        setHasMore(hasMore)
        setVideos(newVideos)
      },
    })

    const _loadVideos = async (page = 1) => {
      setPage(page)
      if (page === 1 && searchQuery !== ``) setVideos([])
      loadVideos({
        variables: {
          page,
          searchQuery: searchQuery.length === 0 ? undefined : searchQuery,
        },
      })
    }

    useEffect(() => {
      searchQuery.length === 0 ? _loadVideos() : null
    }, [searchQuery])
    const dragHandlers = { onStart: onStart, onStop: onStop }
    return (
      <div className="mt-4">
        <div className="flex space-x-3.5 mb-2 ">
          <div className="w-72 text-3xl">
            <InputText
              name="searchQuery"
              type="text"
              placeholder={t(`search-here`)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onEnter={() => _loadVideos()}
            />
          </div>
          <div
            className="border-2 rounded-md text-gray-400 cursor-pointer"
            onClick={() => _loadVideos()}
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
          className="h-24 rounded-md bg-gray-200 flex text-gray-700 p-8 cursor-pointer"
          onClick={() =>
            _setMagicSidePanelItem(MagicUploadMediaItem, MediaType.VIDEO)
          }
        >
          <div>
            <h1 className="text-lg">{t(`upload-video`)}</h1>
          </div>
          <div className=" w-32">
            <i className="float-right fal fa-cloud-upload-alt fa-2x"></i>
          </div>
        </div>
        {playableVideo && (
          <Draggable {...dragHandlers}>
            <div className="sticky inset-0 z-10 mt-8 rounded-md bg-white shadow-3xl">
              <PlayableVideo url={playableVideo[0]?.uri} />
              <i
                onClick={() => setPlayableVideo(null)}
                className="fal fa-times fa-1x absolute cursor-pointer text-white -right-0 top-4 duration-300 ease-in-out hover:scale-150  transform -translate-x-4 -translate-y-1"
              ></i>
            </div>
          </Draggable>
        )}
        {videos && (
          <InfiniteScroll
            style={{ overflowY: `hidden` }}
            dataLength={videos.length}
            next={() => _loadVideos(page + 1)}
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
              {videos.map((video: GqlMagicEMVideos_magicEMVideos, index) => (
                <VideoUi
                  key={index}
                  video={video}
                  setPlayableVideo={setPlayableVideo}
                  template={template}
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
        {!videos && (
          <div className="text-center mt-10 text-gray-300">
            {loading && <Spinner />}
          </div>
        )}
        {!loading && error && (
          <div className="text-center mt-10 text-gray-300">
            <i className="fa-3x far fa-jack-o-lantern"></i>
            <p>{t(`no-video`)}</p>
          </div>
        )}
      </div>
    )
  }
