import { getNewTCCOObjectBase } from '@components/Magic/MagicCanvas/template'
import { getMediaWithDimensions } from '@components/Magic/MagicCanvas/template/media'

import { onDragStartFabricObject } from '../utils'
import { humanizeDurationLite } from '@lib/utils'
import { useUpdate } from 'react-use'
import {
  GqlMagicEMVideos_magicEMVideos,
  GqlMagicEMVideos_magicEMVideos_videos,
} from '@lib/gqlTypes/emz'
import { GqlVideo_video_magicTemplate } from '@lib/gqlTypes/emz'
import { FabricObject } from '@lib/graphql'

interface IVideoProps {
  video: GqlMagicEMVideos_magicEMVideos
  setPlayableVideo: (
    playableVideo: GqlMagicEMVideos_magicEMVideos_videos[],
  ) => void
  template: GqlVideo_video_magicTemplate
}

export const VideoUi = ({
  video,
  setPlayableVideo,
  template,
}: IVideoProps): React.ReactElement => {
  const videoToUse = getMediaWithDimensions(
    video.videos,
    template.width,
    template.height,
  )
  if (!videoToUse) return <></>
  const update = useUpdate()
  const baseTCCO = getNewTCCOObjectBase()
  const tcooObject: FabricObject = {
    ...baseTCCO,
    name: `Video (${baseTCCO._id.substring(baseTCCO._id.length - 3)})`,
    type: `video`,
    src: videoToUse.uri,
    crossOrigin: `anonymous`,
    mediaStartAt: 0,
    muteMedia: false,
    mediaVolume: 1,
    ...({ shadow: {} } as any), // TODO fix this by fixing rxjs, as it make issue on timeline drag first time
  }
  return (
    <div
      className="h-40 relative shadow-md cursor-pointer"
      onClick={() => setPlayableVideo(video.videos)}
    >
      <img
        className="h-40 w-full rounded-md object-cover"
        src={video.image && video.image.thumbnail && video.image.thumbnail}
        alt="video"
        data-media={videoToUse.uri}
        data-width={videoToUse.width}
        data-height={videoToUse.height}
        onDragStart={onDragStartFabricObject(tcooObject)}
        onDragEnd={update}
        draggable={true}
        data-type={`video`}
      ></img>
      <i className="fal fa-play-circle fa-2x absolute top-2/4 left-2/4 duration-300 ease-in-out hover:scale-150 text-white transform -translate-x-2/4 -translate-y-2/4"></i>
      <small className="absolute bottom-1 right-3 text-white">
        {humanizeDurationLite(video.duration)}
      </small>
    </div>
  )
}
