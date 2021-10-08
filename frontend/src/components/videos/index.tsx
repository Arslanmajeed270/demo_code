import React, { FC, useEffect, useState } from 'react'
import { VideoTableActions } from './VideoTableActions'
import { Column } from 'react-table'
import {
  Button,
  InputText,
  LayoutHeader,
  Loader,
  Modal,
  ScrollBarDiv,
  SocialModal,
  Spinner,
  Table,
} from '@lib/components'
import { GQLM_DELETE_VIDEO, GQL_VIDEOS } from '@lib/entities'
import { useLazyQuery, useMutation } from '@apollo/client'
import {
  EmeezoVideoStatus,
  GqlMDeleteVideo,
  GqlMDeleteVideoVariables,
  GqlVideos,
  GqlVideosVariables,
  GqlVideos_videos,
  GqlVideos_videos_fileStorageFile_media_files,
} from '@lib/gqlTypes/emz'
import { EMZ_FRONTEND_URL } from '@lib/constants'
import moment from 'moment'
import _ from 'lodash'
import { ObjectId } from '@lib/graphql'
import {
  TemplateOnSelectPurpose,
  Templates,
} from '@components/dashboard/template'
import { downloadVideo } from '@lib/utils'
import { VideoIcon } from '@public/icons/customIcons/VideoIcon'
import { GRAY_COLOR } from '@lib/constants'
import router from 'next/router'
import { LOAD_VIDEO_INTERVAL_DURATION } from '@constants/emeezoVideo'
import { useTranslation } from 'react-i18next'
import { toastify } from '@lib/utils'

interface ITempVideoData {
  templateName: string
  videoName: JSX.Element | string
  createdAt: string
  status: JSX.Element
  actions?: JSX.Element
}

export const getOriginalMedia = (
  media: GqlVideos_videos_fileStorageFile_media_files[],
): string => {
  for (const data of media) {
    if (data.original) {
      return data.s3SignedUrl
    }
  }
}

export const VideosLayout: FC = () => {
  const { t } = useTranslation([`video`, `common`])
  const [isLoading, setIsLoading] = useState(true)

  const [showSocialModal, setShowSocialModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [deleteVideoId, setDeletedVideoId] = useState<ObjectId>()
  const [videos, setVideos] = useState<GqlVideos_videos[]>([])
  const [searchQuery, setSearchQuery] = useState<string>(``)
  const [loadTimeoutId, setLoadTimeoutId] = useState(null)
  const [searchLoading, setSearchLoading] = useState<boolean>(false)

  const [activeUrl, setActiveUrl] = useState(null)

  const tempVideoColumns: Column<ITempVideoData>[] = [
    {
      Header: t(`video:video-name`),
      accessor: `videoName`, // accessor is the "key" in the data
    },
    {
      Header: t(`video:template-name`),
      accessor: `templateName`,
    },
    {
      Header: t(`video:created-at`),
      accessor: `createdAt`, // accessor is the "key" in the data
    },
    {
      Header: t(`video:status`),
      accessor: `status`, // accessor is the "key" in the data
    },
    {
      Header: t(`video:actions`),
      accessor: `actions`, // accessor is the "key" in the data
    },
  ]

  const shareActionHandler = (url: string) => {
    setShowSocialModal(true)
    setActiveUrl(url)
  }

  const deleteActionHandler = (_id: string) => {
    setDeletedVideoId(_id)
    deleteVideo({
      variables: { _id },
    })
  }

  const downloadVideoHandler = (
    mediaUrl: string,
    mediaTitle: string,
    mediaStatus: EmeezoVideoStatus,
  ) => {
    if (mediaStatus !== EmeezoVideoStatus.COMPLETED) {
      toastify.Warn(`Video can't be download please wait to complete`)
      return
    }
    downloadVideo(mediaUrl, mediaTitle)
  }

  const modifiedTempVideoData: ITempVideoData[] = videos.map((data) => {
    let mediaUrl = ``
    if (
      data.status === EmeezoVideoStatus.COMPLETED &&
      data?.fileStorageFile !== null
    ) {
      mediaUrl = getOriginalMedia(data.fileStorageFile.media.files)
    }

    const videoUrl = EMZ_FRONTEND_URL + `/v/` + data.slug

    return {
      videoName:
        data.status === EmeezoVideoStatus.COMPLETED ? (
          <div className="cursor-pointer" onClick={() => router.push(videoUrl)}>
            {data.title}
          </div>
        ) : (
          data.title
        ),
      templateName: data.template.title,
      createdAt: moment(data.createdAt).format(`MMMM Do, YYYY`),
      status: (
        <div>
          <p
            className={`p-2 text-center w-auto text-white rounded-full ${
              data.status === EmeezoVideoStatus.COMPLETED
                ? `bg-green-400`
                : data.status === EmeezoVideoStatus.ERROR
                ? `bg-red-500`
                : data.status === EmeezoVideoStatus.PROCESSING
                ? `bg-blue-400`
                : data.status === EmeezoVideoStatus.QUEUED
                ? `bg-yellow-400`
                : null
            } `}
          >
            {data.status}
          </p>
        </div>
      ),
      actions: (
        <VideoTableActions
          status={data.status}
          url={videoUrl}
          shareActionHandler={shareActionHandler}
          downloadActionHandler={() =>
            downloadVideoHandler(mediaUrl, data.title, data.status)
          }
          deleteActionHandler={() => deleteActionHandler(data._id)}
        />
      ),
    }
  })

  const [deleteVideo] = useMutation<GqlMDeleteVideo, GqlMDeleteVideoVariables>(
    GQLM_DELETE_VIDEO,
    {
      onCompleted() {
        const updatedVideos = _.cloneDeep(videos)
        const deletedVideoIndex = updatedVideos.findIndex(
          (item) => item._id === deleteVideoId,
        )
        updatedVideos.splice(deletedVideoIndex, 1)
        setVideos(updatedVideos)
      },
      onError(error) {
        toastify.Error(error.message)
      },
    },
  )

  const [loadVideos] = useLazyQuery<GqlVideos, GqlVideosVariables>(GQL_VIDEOS, {
    onCompleted(data) {
      setVideos(data.videos)
      setIsLoading(false)
      setSearchLoading(false)
    },
    onError(error) {
      setIsLoading(false)
    },
  })

  const startLoadRefreshing = () => {
    if (loadTimeoutId) clearTimeout(loadTimeoutId)
    const runTimeout = () =>
      setTimeout(async () => {
        await _loadVideos()
        setLoadTimeoutId(runTimeout())
      }, LOAD_VIDEO_INTERVAL_DURATION)
    runTimeout()
  }

  const stopLoadRefreshing = () => {
    if (!loadTimeoutId) return
    clearTimeout(loadTimeoutId)
    setLoadTimeoutId(null)
  }

  const _loadVideos = () => {
    loadVideos({
      variables: {
        filter: {
          query: searchQuery || undefined,
        },
      },
    })
  }

  useEffect(() => {
    if (!loadTimeoutId && searchQuery === ``) {
      _loadVideos()
      startLoadRefreshing()
    }
    return stopLoadRefreshing
  }, [loadTimeoutId, searchQuery])

  const searchVideo = () => {
    setSearchLoading(true)
    stopLoadRefreshing()
    _loadVideos()
  }

  return (
    <Loader isLoading={isLoading}>
      <ScrollBarDiv className="h-full w-full">
        {showModal && (
          <Modal
            title={t(`select-template`)}
            hideModal={() => setShowModal(false)}
          >
            <Templates
              onSelectPurpose={TemplateOnSelectPurpose.CREATE_VIDEO}
              hideOptions={true}
              onVideoCreated={() => setShowModal(false)}
            />
          </Modal>
        )}
        <SocialModal
          url={activeUrl}
          showModal={showSocialModal}
          setShowModal={setShowSocialModal}
        />
        <LayoutHeader title={`Videos`} icon={<VideoIcon color={GRAY_COLOR} />}>
          <div className="flex gap-2">
            <Button
              label={t(`common:create`)}
              color={`primary`}
              icon={<i className={`fa fa-plus pr-2`} />}
              className="py-2 px-4 flex"
              onClick={() => setShowModal(true)}
            />
          </div>
          <InputText
            className="rounded-none"
            name="search"
            type="text"
            placeholder={t(`common:search`)}
            onEnter={searchVideo}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={
              searchLoading ? (
                <Spinner />
              ) : (
                <i className="fas fa-search" onClick={searchVideo} />
              )
            }
          />
          {searchQuery && (
            <div
              className="border-2 bg-white rounded-md text-red-400 cursor-pointer flex items-center"
              onClick={() => {
                setSearchQuery(``)
              }}
            >
              <i className="far fa-times px-3"></i>
            </div>
          )}
        </LayoutHeader>
        {modifiedTempVideoData.length === 0 ? (
          <div className="m-auto my-10">
            <h1 className="text-center font-bold text-red-500 text-xl">
              {t(`video:video-greeting`)}
            </h1>
            <h1 className="text-center font-bold text-red-500 text-xl">
              {t(`video:new-video-message`)}
              <i className="fal fa-level-up-alt ml-2" />
            </h1>
          </div>
        ) : (
          <Table<ITempVideoData>
            columns={tempVideoColumns}
            data={modifiedTempVideoData}
          />
        )}
      </ScrollBarDiv>
    </Loader>
  )
}
