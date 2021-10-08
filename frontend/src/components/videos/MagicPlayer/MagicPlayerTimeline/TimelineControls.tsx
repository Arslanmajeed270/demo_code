import React from 'react'
import { humanizeDurationLite } from '@lib/utils/time'
import _ from 'lodash'

interface ITimelineControlsProps {
  currentTime: number
  duration: number
  isPlaying: boolean
  togglePlay: () => void
  tick: () => void
  unTick: () => void
}

export const TimelineControls: React.FC<ITimelineControlsProps> = ({
  currentTime,
  duration,
  isPlaying,
  togglePlay,
  tick,
  unTick,
}) => {
  return (
    <div className="grid grid-cols-3 overflow-auto xl:grid-cols-3 w-full lg:grid-cols-3 gap-2 md:gap-1 sm:gap-1 py-1 border-b">
      {/* First column  */}
      <div className="flex items-center lg:justify-start md:justify-center sm:justify-center xs:justify-center"></div>
      {/* second column */}
      <div className="flex items-center justify-center place-content-center gap-7">
        <div
          title="Previous Frame"
          className="pr-2 pl-2 py-1 cursor-pointer rounded-lg hover:bg-gray-100"
          onClick={unTick}
        >
          <i className="fa fa-backward text-gray-500 text-xs"></i>
        </div>
        <div
          className="pr-2 pl-3 pt-2 pb-1 cursor-pointer rounded-lg hover:bg-gray-100"
          onClick={togglePlay}
        >
          {!isPlaying && (
            <i title="Play" className="fa fa-play fa-2x text-gray-500" />
          )}
          {isPlaying && (
            <i title="Pause" className="fa fa-pause fa-2x text-gray-500" />
          )}
        </div>
        <div
          className="pr-2 pl-2 py-1 cursor-pointer rounded-lg hover:bg-gray-100"
          onClick={tick}
        >
          <i
            title="Next Frame"
            className="fa fa-forward text-gray-500 text-xs"
          ></i>
        </div>
        <div className="mt-1">
          <p className="text-gray-500">
            {humanizeDurationLite(currentTime, true, false)}
            {` `}
            <span className="text-gray-400">
              / {humanizeDurationLite(duration, true, false)}
            </span>
          </p>
        </div>
      </div>
      {/* third column */}
      <div className="flex items-center lg:justify-end md:justify-center sm:justify-center xs:justify-center gap-2 md:gap-1 sm:gap-1 xs:gap-1 px-3"></div>
    </div>
  )
}
