import { FC, useEffect, useRef, useState } from 'react'
import { magicFabric } from '@lib/fabric'
import { setCanvasSize } from '@lib/fabric/magic'
import _ from 'lodash'
import {
  continueRender,
  delayRender,
  Sequence,
  useCurrentFrame,
} from 'remotion'
import {
  GqlTemplateVersion_templateVersion_magicTemplate,
  GqlTemplateVersion_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
  MagicTemplateClipType,
} from '@lib/gqlTypes/emz'
import { useLatest } from 'react-use'
// import { MagicPlayerTimeline } from './MagicPlayerTimeline'

interface IMagicRenderClipProps {
  template: GqlTemplateVersion_templateVersion_magicTemplate
  clip: GqlTemplateVersion_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas
}

export const MagicPlayer: FC<IMagicRenderClipProps> = ({ template, clip }) => {
  const [currentFrame, setCurrentFrame] = useState(useCurrentFrame())
  const [_canvas, setCanvas] = useState<fabric.Canvas>()
  const fps = template.fps

  const currentTime = Math.floor(currentFrame / fps) // in seconds
  const maxFrames = clip.duration * fps // in seconds
  const frameInterval = 1000 / fps
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>(null)
  const currentFrameRef = useLatest<number>(currentFrame)
  const intervalIdRef = useLatest<NodeJS.Timeout>(intervalId)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const isPlayingRef = useLatest<boolean>(isPlaying)

  if (clip.type !== MagicTemplateClipType.CANVAS)
    throw new Error(`Clip not of type canvas`)

  // Refs
  const canvasWrapperRef = useRef<HTMLDivElement>()
  const canvasElementRef = useRef<HTMLCanvasElement>()

  const destroyCanvas = () => {
    try {
      _canvas?.dispose()
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }

  const loadTemplateToCanvas = () => {
    const handle = delayRender()
    destroyCanvas()

    const newCanvas = new magicFabric.Canvas(canvasElementRef.current.id, {
      selection: false,
      backgroundColor: clip.background,
      preserveObjectStacking: true,
    })
    setCanvasSize(newCanvas, template, canvasWrapperRef.current)

    newCanvas.clip = clip
    newCanvas.template = template
    newCanvas.currentFrame = currentFrame
    newCanvas.isMagicRendering = false
    newCanvas.isPlaying = isPlaying

    newCanvas.loadFromJSON(clip, () => {
      continueRender(handle)
    })

    // Events
    setCanvas(newCanvas)
  }

  const onFrameChangeHandler = async () => {
    if (!_canvas) return
    const handle = delayRender()
    _canvas.frameChangedRecently = true
    await _canvas.setCurrentFrame(currentFrame)
    _canvas.smartRenderAll()
    continueRender(handle)
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

  useEffect(() => {
    onFrameChangeHandler()
  }, [currentFrame])

  //   useEffect(() => {
  //     if (!_canvas) return
  //     _canvas.setIsPlaying(playing)
  //   }, [playing])

  useEffect(() => {
    if (!_canvas) return
    _canvas.clip = clip
  }, [clip])

  useEffect(() => {
    if (!_canvas || !template) return
    _canvas.template = template
  }, [template, _canvas])

  useEffect(() => {
    loadTemplateToCanvas()
  }, [])

  return (
    <>
      <Sequence from={0} durationInFrames={template.fps * clip.duration}>
        <div style={{ width: `100%`, height: `100%` }} ref={canvasWrapperRef}>
          <canvas id={`canvas-${clip._id}`} ref={canvasElementRef}></canvas>
        </div>
      </Sequence>
      {/* <MagicPlayerTimeline
        template={template}
        currentTime={currentTime}
        duration={clip.duration}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        tick={tick}
        unTick={unTick}
        fps={fps}
        currentFrame={currentFrame}
        clip={clip}
        setCurrentFrame={setCurrentFrame}
      /> */}
    </>
  )
}
