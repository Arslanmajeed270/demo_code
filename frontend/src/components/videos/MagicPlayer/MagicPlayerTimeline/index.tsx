import {
  GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
  GqlVideo_video_magicTemplate,
} from '@lib/gqlTypes/emz'
import React from 'react'
import { MagicPlayerTimelineSeekBar } from './MagicPlayerTimelineSeekBar'
import { TimelineControls } from './TimelineControls'

interface IMagicPlayerTimelineProps {
  template: GqlVideo_video_magicTemplate
  currentTime: number
  duration: number
  isPlaying: boolean
  togglePlay: () => void
  tick: () => void
  unTick: () => void

  fps: number
  currentFrame: number
  clip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas
  setCurrentFrame: (frame: number) => void
}

export const MagicPlayerTimeline: React.FC<IMagicPlayerTimelineProps> = ({
  template,
  currentTime,
  duration,
  isPlaying,
  togglePlay,
  tick,
  unTick,

  fps,
  currentFrame,
  clip,
  setCurrentFrame,
}) => {
  return (
    <>
      <div className="h-1/4 flex flex-col">
        <div>
          <TimelineControls
            currentTime={currentTime}
            duration={duration}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            tick={tick}
            unTick={unTick}
          />
        </div>
        <div className="flex-1 h-full">
          <MagicPlayerTimelineSeekBar
            template={template}
            fps={fps}
            duration={duration}
            currentFrame={currentFrame}
            isPlaying={isPlaying}
            clip={clip}
            setCurrentFrame={setCurrentFrame}
          />
        </div>
      </div>
    </>
  )
}
