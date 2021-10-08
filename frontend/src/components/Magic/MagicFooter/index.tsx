import {
  setCurrentFrame,
  setIsPlaying,
  setObjectKeyframesVisible,
} from '@redux/actions'
import { RootState } from '@redux/reducers'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActiveClipFromId } from '../MagicCanvas/template/clip'
import { MagicControls } from './MagicControls'
import { MagicTimeline } from './MagicTimeline/index'
import { useState } from 'react'
import {
  GqlVideo_video_magicTemplate,
  GqlVideo_video_magicTemplate_clips,
  GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
} from '@lib/gqlTypes/emz'

interface IMagicFooter {
  template: GqlVideo_video_magicTemplate
  updateTemplateFromClip: (clip: GqlVideo_video_magicTemplate_clips) => void
}

export const MagicFooter: React.FC<IMagicFooter> = ({
  template,
  updateTemplateFromClip,
}) => {
  const dispatch = useDispatch()
  const [timelineZoom, setTimelineZoom] = useState(1)
  const {
    magicTimeline: { currentFrame, isPlaying, objectKeyframesVisible },
    magicTemplate: { activeTemplateClipId },
  } = useSelector((state: RootState) => state)

  const activeClip = getActiveClipFromId(
    activeTemplateClipId,
    template,
  ) as GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas

  const _setCurrentFrame = (frame: number) => {
    dispatch(setCurrentFrame(frame))
  }
  const _setIsPlaying = (isPlaying: boolean) => {
    dispatch(setIsPlaying(isPlaying))
  }

  const hideAllKeyFrames = () => {
    dispatch(setObjectKeyframesVisible({}))
  }

  return (
    <>
      {activeClip && (
        <div className="h-1/4 flex flex-col">
          <div>
            <MagicControls
              activeClip={activeClip}
              template={template}
              currentFrame={currentFrame}
              isPlaying={isPlaying}
              setCurrentFrame={_setCurrentFrame}
              setIsPlaying={_setIsPlaying}
              setTimelineZoom={setTimelineZoom}
              timelineZoom={timelineZoom}
              objectKeyframesVisible={objectKeyframesVisible}
              updateTemplateFromClip={updateTemplateFromClip}
              hideAllKeyFrames={hideAllKeyFrames}
            />
          </div>
          <div className="flex-1 h-full">
            <MagicTimeline
              activeClip={activeClip}
              template={template}
              currentFrame={currentFrame}
              isPlaying={isPlaying}
              setCurrentFrame={_setCurrentFrame}
              timelineZoom={timelineZoom}
              objectKeyframesVisible={objectKeyframesVisible}
              updateTemplateFromClip={updateTemplateFromClip}
            />
          </div>
        </div>
      )}
    </>
  )
}
