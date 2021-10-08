import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { GQL_VIDEO_BY_SLUG } from '@lib/entities'

import { getOriginalMedia } from '@components/videos'
import { Avatar, Loader, ScrollBarDiv } from '@lib/components'
import moment from 'moment'
import {
  GqlVideoBySlug,
  GqlVideoBySlugVariables,
} from '@lib/gqlTypes/emz/__generated__/GqlVideoBySlug'
import { EmzAppRoutes } from '@lib/constants'
import { USER_AVATAR } from '@lib/constants'

const VideoPlayer = (): ReactNode => {
  const router = useRouter()
  const { slug } = router.query

  const { data, loading } = useQuery<GqlVideoBySlug, GqlVideoBySlugVariables>(
    GQL_VIDEO_BY_SLUG,
    {
      variables: {
        slug: slug as string,
      },
      fetchPolicy: `cache-and-network`,
      onError() {
        router.push(EmzAppRoutes.errorPage)
      },
    },
  )

  const video = data && data.videoBySlug
  let mediaUrl = ``
  if (video) {
    mediaUrl = getOriginalMedia(
      video && video.fileStorageFile && video.fileStorageFile.media.files,
    )
  }

  return (
    <div className="h-screen w-full">
      <Loader isLoading={loading}>
        <ScrollBarDiv className="w-full h-screen bg-gray-100">
          <div className="w-full h-full flex items-center">
            <div className="m-auto w-3/5">
              <video
                className="m-auto rounded-md border-2"
                src={mediaUrl}
                controls
              />
              <div className="pt-3 text-2xl m-auto text-gray-700">
                {video && video.title}
              </div>
              <div className="flex gap-1 items-center mt-2">
                <Avatar size="small" img={USER_AVATAR} />
                <div className="text-base">
                  <p className="text-gray-800 dark:text-white">
                    {video && video.user && video.user.firstName}
                  </p>
                </div>
                <div className="text-sm flex-1 text-right mr-2">
                  <p className="text-gray-800 dark:text-white italic">
                    {moment(video && video.createdAt).format(`MMMM Do, YYYY`)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollBarDiv>
      </Loader>
    </div>
  )
}
export default VideoPlayer
