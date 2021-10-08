// import Packages
import { useState, useRef, useEffect } from 'react'
import { useWindowSize } from 'react-use'

import { timelineFabric, setTimelineCanvasSize } from '@lib/fabric/timeline'
import { FCOPropertySetEventNamePrefix } from '@lib/fabric/magic'
import { TimelineCanvasPaddingX } from '@constants/magic/timeline'
import {
  GqlVideo_video_magicTemplate,
  GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
} from '@lib/gqlTypes/emz'

interface IMagicPlayerTimelineSeekBarProps {
  template: GqlVideo_video_magicTemplate
  fps: number
  duration: number
  currentFrame: number
  isPlaying: boolean
  clip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas
  setCurrentFrame: (frame: number) => void
}

export const MagicPlayerTimelineSeekBar: React.FC<IMagicPlayerTimelineSeekBarProps> =
  ({
    template,
    fps,
    duration,
    currentFrame,
    isPlaying,
    clip,
    setCurrentFrame,
  }) => {
    // States
    const [_canvas, setCanvas] = useState<fabric.Canvas>()
    const [timelineSeekBar, setTimelineSeekBar] =
      useState<fabric.TimelineSeekBar>()

    // Reference
    const canvasWrapperRef = useRef<HTMLDivElement>()
    const canvasElementRef = useRef<HTMLCanvasElement>()

    // const variables
    const totalFrames = duration * fps

    const { width: windowWidth, height: windowHeight } = useWindowSize()

    useEffect(() => {
      if (!_canvas) return
      _canvas.clear()
      setTimelineCanvasSize(_canvas, canvasWrapperRef.current)
      addTimelineSeekBar(_canvas)

      canvasWrapperRef.current.scrollLeft =
        _canvas.width * (currentFrame / totalFrames) -
        canvasWrapperRef.current.clientWidth / 2
    }, [windowHeight, windowWidth])

    useEffect(() => {
      if (!template) return
      initCanvas()
    }, [template])

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
      if (currentFrame > totalFrames || frame < 0) return setCurrentFrame(0)
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
      newCanvas.clip = clip
      newCanvas.template = template
      newCanvas.currentFrame = currentFrame
      newCanvas.isPlaying = isPlaying
      newCanvas.isMagicRendering = false
      newCanvas.paddingX = TimelineCanvasPaddingX
      setTimelineCanvasSize(newCanvas, canvasWrapperRef.current)
      setCanvas(newCanvas)
      loadTemplateOnCanvas(newCanvas)
      canvasWrapperRef.current.scrollLeft = oldScrollLeft
      canvasWrapperRef.current.scrollTop = oldScrollTop
    }

    const loadTemplateOnCanvas = (canvas: fabric.Canvas) => {
      if (!canvas) return
      addTimelineSeekBar(canvas)
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
