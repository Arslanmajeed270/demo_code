import React, { useEffect, useState } from 'react'
import { humanizeDurationLite } from '@lib/utils/time'
import { useKey, useLatest } from 'react-use'
import { IMagicTimelineState, setMagicSidePanelItem } from '@redux/actions'
import { IMagicSidePanelListItem } from '../MagicSidePanel'
import { useDispatch, useSelector } from 'react-redux'
import {
  MagicUploadMediaItem,
  TimelineZoomIncrement,
  TimelineZoomMax,
} from '@constants'
import { RootState } from '@redux/reducers'
import { getActiveClipObjectFromId } from '../MagicCanvas/template/clip'
import { roundToDecimalPlaces } from '@lib/fabric'
import _ from 'lodash'
import ObjectID from 'bson-objectid'
import {
  GqlVideo_video_magicTemplate,
  GqlVideo_video_magicTemplate_clips,
  GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
} from '@lib/gqlTypes/emz'
import { useTranslation } from 'react-i18next'

interface IMagicControlsProps {
  currentFrame: number
  isPlaying: boolean
  template: GqlVideo_video_magicTemplate
  activeClip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas
  setCurrentFrame: (frame: number) => void
  setIsPlaying: (isPlaying: boolean) => void
  setTimelineZoom: (timelineZoomParam: number) => void
  timelineZoom: number
  objectKeyframesVisible: IMagicTimelineState[`objectKeyframesVisible`]
  updateTemplateFromClip: (clip: GqlVideo_video_magicTemplate_clips) => void
  hideAllKeyFrames: () => void
}

export const MagicControls: React.FC<IMagicControlsProps> = ({
  currentFrame,
  isPlaying,
  template: { fps },
  activeClip,
  setCurrentFrame,
  setIsPlaying,
  setTimelineZoom,
  timelineZoom,
  objectKeyframesVisible,
  updateTemplateFromClip,
  hideAllKeyFrames,
}) => {
  const { t } = useTranslation(`magic`)
  const { activeTemplateClipObjectId, isEditingTextBox } = useSelector(
    ({ magicTemplate }: RootState) => magicTemplate,
  )

  const currentTime = Math.floor(currentFrame / fps) // in seconds
  const maxFrames = activeClip.duration * fps // in seconds
  const frameInterval = 1000 / fps
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>(null)
  const currentFrameRef = useLatest<number>(currentFrame)
  const intervalIdRef = useLatest<NodeJS.Timeout>(intervalId)
  const isPlayingRef = useLatest<boolean>(isPlaying)
  const isEditingTextBoxRef = useLatest<boolean>(isEditingTextBox)

  const showHideAllKeyframeButton =
    Object.keys(objectKeyframesVisible).length > 0

  const selectedObjectIndex = getActiveClipObjectFromId(
    activeTemplateClipObjectId,
    activeClip,
    true,
  ) as number
  const selectedObject =
    selectedObjectIndex >= 0 ? activeClip.objects[selectedObjectIndex] : null
  const dispatch = useDispatch()

  const _setMagicSidePanelItem = (magicSidePanel: IMagicSidePanelListItem) => {
    dispatch(setMagicSidePanelItem(magicSidePanel))
  }

  const tick = () => {
    if (currentFrameRef.current >= maxFrames) return setCurrentFrame(0)
    setCurrentFrame(currentFrameRef.current + 1)
  }

  const unTick = () => {
    if (currentFrameRef.current <= 0)
      return currentFrameRef.current === 0 ? null : setCurrentFrame(0)
    setCurrentFrame(currentFrameRef.current - 1)
  }

  const play = () => {
    const intervalId = setInterval(tick, frameInterval)
    setIntervalId(intervalId)
    setIsPlaying(true)
  }
  const pause = () => {
    setIsPlaying(false)
  }

  const _clearInterval = () => {
    if (intervalIdRef.current) clearInterval(intervalIdRef.current)
    setIntervalId(null)
  }

  const togglePlay = () => {
    _clearInterval()
    if (isPlayingRef.current) return pause()
    play()
  }
  useKey(` `, (event) => {
    if (isEditingTextBoxRef.current) return
    event.preventDefault()
    togglePlay()
  })
  useKey(`ArrowLeft`, (event) => {
    event.preventDefault()
    unTick()
  })
  useKey(`ArrowRight`, (event) => {
    event.preventDefault()
    tick()
  })
  useEffect(() => _clearInterval, [])

  // Editing controls
  const splitTrack = () => {
    if (!selectedObject) return
    const selectedObjectStartAtFrame = selectedObject.startAt * fps
    const selectedObjectEndAtFrame = selectedObject.endAt * fps
    if (
      currentFrame <= selectedObjectStartAtFrame ||
      currentFrame >= selectedObjectEndAtFrame
    )
      return
    const clonedActiveClipObject = _.cloneDeep(activeClip)
    const oldClipObjectEndAt = roundToDecimalPlaces(currentFrame / fps, 2)
    const newClipObjectStartAt = roundToDecimalPlaces(currentFrame / fps, 2)
    const newClipObject = {
      ...selectedObject,
      _id: new ObjectID().toString(),
      startAt: newClipObjectStartAt,
    }
    if (newClipObject.type === `video`) {
      const newVideoClipObject = newClipObject as fabric.IVideoOptions
      const suggestedVideoStartAt =
        newVideoClipObject.mediaStartAt +
        (newClipObjectStartAt - selectedObject.startAt)
      const newVideoStartAt =
        suggestedVideoStartAt > 0 ? suggestedVideoStartAt : 0
      newVideoClipObject.mediaStartAt = roundToDecimalPlaces(newVideoStartAt, 2)
    }
    clonedActiveClipObject.objects[selectedObjectIndex].endAt =
      oldClipObjectEndAt
    clonedActiveClipObject.objects.splice(
      selectedObjectIndex + 1,
      0,
      newClipObject,
    )
    updateTemplateFromClip(clonedActiveClipObject)
  }

  return (
    <div className="grid grid-cols-3 overflow-auto xl:grid-cols-3 w-full lg:grid-cols-3 gap-2 md:gap-1 sm:gap-1 py-1 border-b">
      {/* First column  */}
      <div className="flex items-center lg:justify-start md:justify-center sm:justify-center xs:justify-center">
        <div
          onClick={() => _setMagicSidePanelItem(MagicUploadMediaItem)}
          className="flex px-2"
        >
          <div className="flex items-center gap-2 hover:bg-gray-100 text-white font-bold p-2 rounded cursor-pointer">
            <i className="fa fa-plus-square-o inline-block fa- text-gray-500"></i>
            <p className="text-xs font-light text-gray-500 inline-block">
              {t(`add-media`)}
            </p>
          </div>
        </div>
        <div>
          <p className="text-gray-300 mt-1">|</p>
        </div>
        <div className="flex px-2" onClick={splitTrack}>
          <div className="flex items-center gap-4 md:gap-1 sm:gap-1 xs:gap-1 hover:bg-gray-100 text-white font-bold py-2 px-2 rounded cursor-pointer">
            <i className="fa fa-scissors fa-md text-gray-500"></i>
            <p className="text-sm font-light text-gray-500 inline-block">
              {t(`split`)}
            </p>
          </div>
        </div>
        {showHideAllKeyframeButton && (
          <>
            <div>
              <p className="text-gray-300 mt-1">|</p>
            </div>
            <div className="flex px-2" onClick={hideAllKeyFrames}>
              <div className="flex items-center text-xs gap-4 md:gap-1 sm:gap-1 xs:gap-1 hover:bg-gray-100 text-white font-bold py-2 px-2 rounded cursor-pointer">
                <i className="fa fa-eye-slash fa- text-gray-500"></i>
                <p className="text-sm font-light text-gray-500 inline-block">
                  {t(`hide-all-key-frames`)}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
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
              / {humanizeDurationLite(activeClip.duration, true, false)}
            </span>
            {/* :00:<span className="text-gray-400">0</span> */}
          </p>
        </div>
      </div>
      {/* third column */}
      <div className="flex items-center lg:justify-end md:justify-center sm:justify-center xs:justify-center gap-2 md:gap-1 sm:gap-1 xs:gap-1 px-3">
        <div className="px-2 py-1 cursor-pointer rounded-lg hover:bg-gray-100">
          <i className="fa fa-volume-up text-sm text-gray-500"></i>
        </div>
        <div>
          <p className="text-gray-300">|</p>
        </div>
        <div
          onClick={() =>
            setTimelineZoom(
              timelineZoom > 1 ? timelineZoom - TimelineZoomIncrement : 1,
            )
          }
          className="px-2 py-1 cursor-pointer rounded-lg hover:bg-gray-100"
        >
          <i className="fa fa-minus text-xs text-gray-500"></i>
        </div>
        <div
          className="mt-1 px-2 py-1 cursor-pointer rounded-lg hover:bg-gray-100"
          onClick={() => setTimelineZoom(1)}
        >
          <p className="text-xs text-gray-500">{t(`fit-timeline`)}</p>
        </div>
        <div
          onClick={() =>
            setTimelineZoom(
              timelineZoom < TimelineZoomMax
                ? timelineZoom + TimelineZoomIncrement
                : timelineZoom,
            )
          }
          className="px-2 py-1 cursor-pointer rounded-lg hover:bg-gray-100"
        >
          <i className="fa fa-plus text-xs text-gray-500"></i>
        </div>
        <div>
          <p className="text-gray-300">|</p>
        </div>
        {/* <div className="px-2 py-1 cursor-pointer rounded-lg hover:bg-gray-100">
          <i className="fa fa-random text-gray-500 text-sm"></i>
        </div> */}
      </div>
    </div>
  )
}
