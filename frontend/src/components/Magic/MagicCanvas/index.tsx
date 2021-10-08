import React, { useEffect, useRef, useState } from 'react'
import { magicFabric } from '@lib/fabric'
import { setCanvasSize } from '@lib/fabric/magic'
import { MagicRightSideBar } from '../MagicRightSideBar'
import _ from 'lodash'
import { useKey, useLatest, usePrevious, useWindowSize } from 'react-use'
import {
  handleCanvasDropEvent,
  handleCanvasObjectModifiedEvent,
  handleCanvasUnselectEvent,
} from './canvas/events'
import {
  setActiveTemplateClipObjectId,
  setCurrentFrame,
  setMagicSidePanelItem,
} from '@redux/actions'
import { IMagicSidePanelListItem } from '../MagicSidePanel'
import { useDispatch, useSelector } from 'react-redux'
import { ObjectId } from '@lib/graphql/types'
import { RootState } from '@redux/reducers'
import { getActiveClipFromId, getActiveClipObjectFromId } from './template/clip'
import { handleCanvasSelectEvent } from './canvas/events'
import {
  applyClipDifferrencesOnCanvas,
  attachListenerOnMultipleCanvasEvents,
} from './canvas'
import { setIsEditingTextBox } from '@redux/slices/magic/template'
import {
  GqlVideo_video_magicTemplate,
  GqlVideo_video_magicTemplate_clips,
  GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
  MagicTemplateClipType,
} from '@lib/gqlTypes/emz'

interface IMagicCanvasProps {
  template: GqlVideo_video_magicTemplate
  updateTemplateFromClip: (clip: GqlVideo_video_magicTemplate_clips) => void
}

export const MagicCanvas: React.FC<IMagicCanvasProps> = (props) => {
  const dispatch = useDispatch()

  const {
    magicTemplate: { activeTemplateClipId, activeTemplateClipObjectId },
    magicTimeline: { currentFrame, isPlaying },
  } = useSelector((state: RootState) => state)

  const { template, updateTemplateFromClip } = props
  const previousTemplate = usePrevious(template)
  const [_canvas, setCanvas] = useState<fabric.Canvas>()
  const { width: windowWidth, height: windowHeight } = useWindowSize()

  const [isUpdatingCanvas, setIsUpdatingCanvas] = useState<boolean>(false)

  const activeClipIndex = getActiveClipFromId(
    activeTemplateClipId,
    template,
    true,
  ) as number
  const activeClip =
    activeClipIndex >= 0
      ? (template.clips[
          activeClipIndex
        ] as GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas)
      : undefined
  const activeClipRef = useLatest(activeClip)

  if (activeClip && activeClip.type !== MagicTemplateClipType.CANVAS)
    throw new Error(`Clip not of type canvas`)

  const [edgeDetection] = useState<number>(20)

  const selectedObjectIndex = activeClip
    ? (getActiveClipObjectFromId(
        activeTemplateClipObjectId,
        activeClip,
        true,
      ) as number)
    : -1
  const selectedObject =
    selectedObjectIndex >= 0 ? activeClip.objects[selectedObjectIndex] : null
  const selectedObjectRef = useLatest(selectedObject)

  // Refs
  const canvasWrapperRef = useRef<HTMLDivElement>()
  const canvasElementRef = useRef<HTMLCanvasElement>()

  const _setCurrentFrame = (frame: number) => {
    dispatch(setCurrentFrame(frame))
  }
  const _setMagicSidePanelItem = (magicSidePanel: IMagicSidePanelListItem) => {
    dispatch(setMagicSidePanelItem(magicSidePanel))
  }
  const _setActiveTemplateClipObjectId = (id: ObjectId) => {
    dispatch(setActiveTemplateClipObjectId(id))
  }
  const _setIsEditingTextBox = (isEditingTextBox: boolean) => {
    dispatch(setIsEditingTextBox(isEditingTextBox))
  }

  const destroyCanvas = () => {
    try {
      _canvas?.dispose()
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }

  const loadTemplateToCanvas = () => {
    if (!activeClip) return
    destroyCanvas()

    const newCanvas = new magicFabric.Canvas(canvasElementRef.current.id, {
      selection: false,
      backgroundColor: activeClip.background,
      preserveObjectStacking: true,
    })
    setCanvasSize(newCanvas, template, canvasWrapperRef.current, {
      x: -60,
      y: -50,
    })

    newCanvas.isTimeline = false
    newCanvas.clip = activeClip
    newCanvas.template = template
    newCanvas.currentFrame = currentFrame
    newCanvas.isPlaying = isPlaying
    newCanvas.isMagicRendering = false

    newCanvas.loadFromJSON(activeClip, null)

    // Events
    setCanvas(newCanvas)
    newCanvas.applyMagicEditorEventHandlers(newCanvas, { edgeDetection })
    newCanvas.on(
      `object:modified`,
      handleCanvasObjectModifiedEvent(activeClipRef, updateTemplateFromClip),
    )
    newCanvas.on(
      `drop`,
      handleCanvasDropEvent(newCanvas, activeClipRef, updateTemplateFromClip),
    )
    attachListenerOnMultipleCanvasEvents(
      [`selection:created`, `selection:updated`],
      newCanvas,
      handleCanvasSelectEvent(
        _setActiveTemplateClipObjectId,
        _setMagicSidePanelItem,
      ),
    )
    newCanvas.on(
      `selection:cleared`,
      handleCanvasUnselectEvent(
        _setActiveTemplateClipObjectId,
        _setMagicSidePanelItem,
      ),
    )
    newCanvas.on(`text:editing:entered`, () => _setIsEditingTextBox(true))
    newCanvas.on(`text:editing:exited`, () => _setIsEditingTextBox(false))
  }

  const onFrameChangeHandler = async () => {
    if (!_canvas) return
    _canvas.frameChangedRecently = true
    await _canvas.setCurrentFrame(currentFrame)
    _canvas.smartRenderAll()
  }

  useEffect(() => {
    onFrameChangeHandler()
  }, [currentFrame])

  useEffect(() => {
    if (!_canvas) return
    _canvas.setIsPlaying(isPlaying)
    _canvas.requestRenderAll()
  }, [isPlaying])

  useEffect(() => {
    if (!activeClip) return
    if (!_canvas) return loadTemplateToCanvas()
    const oldClipId = _canvas.clip._id

    // Update canvas clip
    _canvas.clip = activeClip

    if (oldClipId === activeClip._id) return // we dont want to re initialize canvas if clip id hasnt changed

    // re-initialize canvas
    _setCurrentFrame(0)
    loadTemplateToCanvas()
  }, [activeClip])

  useEffect(() => {
    if (!_canvas) return
    setCanvasSize(_canvas, template, canvasWrapperRef.current, {
      x: -60,
      y: -50,
    })
  }, [windowWidth, windowHeight])

  useEffect(() => {
    if (!_canvas || !template) return
    _canvas.template = template
    // TODO: Use change in clip to run this instead
    updateCanvasFromTemplate()
  }, [template])

  const updateCanvasFromTemplate = () => {
    if (isUpdatingCanvas || !_canvas) return
    setIsUpdatingCanvas(true)
    setTimeout(async () => {
      await updateCanvasObjects()
      setIsUpdatingCanvas(false)
    })
  }

  const updateCanvasObjects = async () => {
    if (!activeClipRef.current) return
    const _prevClip = getActiveClipFromId(
      activeTemplateClipId,
      previousTemplate,
    ) as GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas
    try {
      await applyClipDifferrencesOnCanvas(
        _prevClip,
        activeClipRef.current,
        _canvas,
      )
    } catch (error) {
      console.error(`Error updating canvas from template: `, error.message)
      updateTemplateFromClip(_prevClip) // reverting back
    }
  }

  const deleteObject = () => {
    if (!selectedObjectRef.current) return
    const clonedClip = _.cloneDeep({
      ...activeClipRef.current,
      objects: activeClipRef.current.objects.filter(
        (obj) => obj._id !== selectedObjectRef.current._id,
      ),
    })
    updateTemplateFromClip(clonedClip)
  }
  useKey(`Delete`, deleteObject)

  return (
    <>
      {activeClip && (
        <div
          className="w-full p-5 bg-gray-300 h-3/4 flex"
          ref={canvasWrapperRef}
        >
          <canvas
            id="magicCanvas"
            ref={canvasElementRef}
            className="shadow-lg"
          ></canvas>
          {selectedObject && (
            <MagicRightSideBar
              selectedObjectIndex={selectedObjectIndex}
              selectedObject={selectedObject}
              clip={activeClip}
              deleteObject={deleteObject}
              canvas={_canvas}
              updateTemplateFromClip={updateTemplateFromClip}
            />
          )}
        </div>
      )}
    </>
  )
}
