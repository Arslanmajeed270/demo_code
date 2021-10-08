import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import { InputText } from '@lib/components/tail-kit/form/input-text/InputText'
import { useLazyQuery } from '@apollo/client'
import { GQL_MAGIC_EM_AUDIOS } from '@lib/entities'
import { Spinner } from '@lib/components/tail-kit/elements/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  GqlMagicEMAudios,
  GqlMagicEMAudiosVariables,
  GqlMagicEMAudios_magicEMAudios,
} from '@lib/gqlTypes/emz'
import { AudioPlayerUI } from './AudioPlayerUI'
import {
  MagicExternalMediaPageLimit,
  MagicUploadMediaItem,
} from '@constants/magic'
import { useDispatch } from 'react-redux'
import {
  IMagicSidePanelListComponentProps,
  IMagicSidePanelListItem,
} from '../..'
import { setMagicSidePanelItem, setMediaType } from '@redux/actions'
import { MediaType } from '@lib/gqlTypes/asp'

export const MagicSidePanelAudios: React.FC<IMagicSidePanelListComponentProps> =
  ({ template, updateTemplate, updateTemplateFromClip }) => {
    const { t } = useTranslation(`magic`)

    const dispatch = useDispatch()
    const _setMagicSidePanelItem = (
      magicSidePanel: IMagicSidePanelListItem,
      mediaType: MediaType,
    ) => {
      dispatch(setMagicSidePanelItem(magicSidePanel))
      dispatch(setMediaType(mediaType))
    }
    const [searchQuery, setSearchQuery] = useState(``)
    const [audio, setAudio] = useState<GqlMagicEMAudios_magicEMAudios[]>([])
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [playingAudioRef, setPlayingAudioRef] =
      useState<HTMLAudioElement>(undefined)
    const [loadAudio, { loading, error }] = useLazyQuery<
      GqlMagicEMAudios,
      GqlMagicEMAudiosVariables
    >(GQL_MAGIC_EM_AUDIOS, {
      fetchPolicy: `cache-first`,
      onCompleted: ({ magicEMAudios }) => {
        const hasMore = magicEMAudios.length > 0
        const newAudio = page > 1 ? [...audio, ...magicEMAudios] : magicEMAudios
        setHasMore(hasMore)
        setAudio(newAudio)
      },
    })

    const _loadAudio = async (page = 0) => {
      setPage(page)
      if (page === 0 && searchQuery !== ``) setAudio([])
      loadAudio({
        variables: {
          offset: `${page}`,
          query: searchQuery.length === 0 ? undefined : searchQuery,
        },
      })
    }

    useEffect(() => {
      searchQuery.length === 0 ? _loadAudio() : null
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
              onEnter={() => _loadAudio()}
            />
          </div>
          <div className="border-2 rounded-md text-gray-400 cursor-pointer">
            <i
              onClick={() => _loadAudio()}
              className="far fa-search p-3 mt-0.5"
            ></i>
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
            _setMagicSidePanelItem(MagicUploadMediaItem, MediaType.AUDIO)
          }
        >
          <div>
            <h1 className="text-lg">{t(`upload-audio`)}</h1>
          </div>
          <div className=" w-24">
            <i className="float-right fal fa-cloud-upload-alt fa-2x"></i>
          </div>
        </div>
        {audio && (
          <InfiniteScroll
            style={{ overflowY: `hidden` }}
            dataLength={audio.length}
            next={() => _loadAudio(page + MagicExternalMediaPageLimit)}
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
                <b>{t(`no-more-sound`)}</b>
              </div>
            }
            scrollableTarget="MagicSidePanelScroll"
          >
            {audio.map((audio: GqlMagicEMAudios_magicEMAudios, index) => (
              <div className="w-auto mt-4 mx-1" key={index}>
                <AudioPlayerUI
                  playingAudioRef={playingAudioRef}
                  setPlayingAudioRef={setPlayingAudioRef}
                  audio={audio}
                  template={template}
                  updateTemplate={updateTemplate}
                  updateTemplateFromClip={updateTemplateFromClip}
                />
              </div>
            ))}
          </InfiniteScroll>
        )}

        {!audio && !error && (
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
