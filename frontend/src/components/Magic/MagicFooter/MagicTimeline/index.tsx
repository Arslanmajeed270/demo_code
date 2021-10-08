// import Packages
import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useWindowSize, useLatest } from 'react-use'

import { addTimelineTracks } from './canvas'
import { ObjectId } from '@lib/graphql/types'
import { timelineFabric, setTimelineCanvasSize } from '@lib/fabric/timeline'
import { FCOPropertySetEventNamePrefix } from '@lib/fabric/magic'
import {
  IMagicTimelineState,
  setActiveTemplateClipObjectId,
  setMagicSidePanelItem,
} from '@redux/actions'
import { attachListenerOnMultipleCanvasEvents } from '../../MagicCanvas/canvas'
import { IMagicSidePanelListItem } from '../../MagicSidePanel'
import { TimelineCanvasPaddingX } from '@constants/magic/timeline'
import {
  handleTimelineCanvasMouseEvent,
  handleTimelineCanvasObjectModifiedEvent,
  handleTimelineCanvasSelectEvent,
} from './canvas/events'
import {
  GqlVideo_video_magicTemplate,
  GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
  MagicTemplateClipType,
} from '@lib/gqlTypes/emz'
interface IMagicTimelineProps {
  template: GqlVideo_video_magicTemplate
  timelineZoom: number
  currentFrame: number
  isPlaying: boolean
  activeClip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas
  objectKeyframesVisible: IMagicTimelineState[`objectKeyframesVisible`]
  setCurrentFrame: (frame: number) => void
  updateTemplateFromClip: (
    clip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
  ) => void
}

export const MagicTimeline: React.FC<IMagicTimelineProps> = ({
  template,
  timelineZoom,
  currentFrame,
  isPlaying,
  activeClip,
  objectKeyframesVisible,
  setCurrentFrame,
  updateTemplateFromClip,
}) => {
  const dispatch = useDispatch()

  // States
  const [_canvas, setCanvas] = useState<fabric.Canvas>()
  const [timelineSeekBar, setTimelineSeekBar] =
    useState<fabric.TimelineSeekBar>()

  // Reference
  const canvasWrapperRef = useRef<HTMLDivElement>()
  const canvasElementRef = useRef<HTMLCanvasElement>()
  const timelineSeekBarRef = useLatest<fabric.TimelineSeekBar>(timelineSeekBar)
  const isMouseDragingRef = useRef<boolean>(false)

  // const variables
  const { fps } = template
  const totalFrames = activeClip.duration * fps
  const currentFrameRef = useLatest<number>(currentFrame)

  const { width: windowWidth, height: windowHeight } = useWindowSize()
  const activeClipRef = useLatest(activeClip)

  if (activeClip && activeClip.type !== MagicTemplateClipType.CANVAS)
    throw new Error(`Clip not of type canvas`)

  useEffect(() => {
    if (!_canvas) return
    _canvas.timelineZoom = timelineZoom
    _canvas.clear()
    setTimelineCanvasSize(_canvas, canvasWrapperRef.current)
    addTimelineTracks(_canvas, activeClip, template.fps, objectKeyframesVisible)
    addTimelineSeekBar(_canvas)

    canvasWrapperRef.current.scrollLeft =
      _canvas.width * (currentFrame / totalFrames) -
      canvasWrapperRef.current.clientWidth / 2
  }, [windowHeight, windowWidth, timelineZoom])

  useEffect(() => {
    if (!template) return
    initCanvas()
  }, [template, objectKeyframesVisible])

  useEffect(() => {
    updateTimelineSeekBarPosition()
  }, [currentFrame, timelineSeekBar])

  const destroyCanvas = () => {
    try {
      if (!_canvas) return
      _canvas.__eventListeners = {}
      _canvas.dispose()
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }

  const updateTimelineSeekBarPosition = () => {
    if (!_canvas || !timelineSeekBar) return
    const videoProgressed = currentFrame / totalFrames
    const left =
      _canvas.paddingX + videoProgressed * _canvas.getCanvasTimelineWidth()
    timelineSeekBar.set({
      left,
    })
    timelineSeekBar.setCoords()
    if (_canvas.getContext()) _canvas.requestRenderAll()
  }

  const _setCurrentFrame = (frame: number) => {
    if (currentFrameRef.current > totalFrames || frame < 0)
      return setCurrentFrame(0)
    setCurrentFrame(frame)
  }
  const initCanvas = () => {
    const oldScrollLeft = canvasWrapperRef.current.scrollLeft
    const oldScrollTop = canvasWrapperRef.current.scrollTop
    destroyCanvas()
    const newCanvas = new timelineFabric.Canvas(canvasElementRef.current.id, {
      selection: false,
      preserveObjectStacking: true,
    })
    newCanvas.isTimeline = true
    newCanvas.clip = activeClip
    newCanvas.template = template
    newCanvas.currentFrame = currentFrame
    newCanvas.isPlaying = isPlaying
    newCanvas.isMagicRendering = false
    newCanvas.paddingX = TimelineCanvasPaddingX
    newCanvas.timelineZoom = timelineZoom
    setTimelineCanvasSize(newCanvas, canvasWrapperRef.current)
    setCanvas(newCanvas)
    loadTemplateOnCanvas(newCanvas)
    canvasWrapperRef.current.scrollLeft = oldScrollLeft
    canvasWrapperRef.current.scrollTop = oldScrollTop
  }

  const loadTemplateOnCanvas = (canvas: fabric.Canvas) => {
    if (!canvas) return
    isMouseDragingRef.current = false
    addTimelineTracks(canvas, activeClip, template.fps, objectKeyframesVisible)
    addTimelineSeekBar(canvas)

    attachListenerOnMultipleCanvasEvents(
      [`selection:created`, `selection:updated`],
      canvas,
      handleTimelineCanvasSelectEvent(
        _setActiveTemplateClipObjectId,
        _setMagicSidePanelItem,
      ),
    )

    attachListenerOnMultipleCanvasEvents(
      [`mouse:down`, `mouse:move`, `mouse:up`],
      canvas,
      handleTimelineCanvasMouseEvent(
        canvas,
        timelineSeekBarRef.current,
        _setActiveTemplateClipObjectId,
        _setMagicSidePanelItem,
      ),
    )

    canvas.on(
      `object:modified:custom`,
      handleTimelineCanvasObjectModifiedEvent(
        canvas,
        activeClipRef,
        updateTemplateFromClip,
      ),
    )
  }

  // Adding timeline seek bar into canvas
  const addTimelineSeekBar = (canvas: fabric.Canvas) => {
    const _timelineSeekBar = new timelineFabric.TimelineSeekBar({
      left: 0,
      height: canvas.getHeight(),
    })

    _timelineSeekBar.on(`${FCOPropertySetEventNamePrefix}left`, () => {
      const seekBarProgressed =
        (_timelineSeekBar.left - canvas.paddingX) /
        canvas.getCanvasTimelineWidth()
      const frame = Math.round(seekBarProgressed * totalFrames)
      _setCurrentFrame(frame)
    })

    canvas.add(_timelineSeekBar)
    setTimelineSeekBar(_timelineSeekBar)
  }

  const _setActiveTemplateClipObjectId = (id: ObjectId) => {
    dispatch(setActiveTemplateClipObjectId(id))
  }

  const _setMagicSidePanelItem = (magicSidePanel: IMagicSidePanelListItem) => {
    dispatch(setMagicSidePanelItem(magicSidePanel))
  }

  return (
    <div ref={canvasWrapperRef} className="w-full overflow-auto">
      <canvas
        ref={canvasElementRef}
        id="timeLine"
        className="w-full h-full"
      ></canvas>
    </div>
  )
}
