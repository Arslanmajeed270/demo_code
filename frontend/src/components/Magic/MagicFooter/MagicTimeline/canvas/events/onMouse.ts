import { IMagicSidePanelListItem } from '@components/Magic/MagicSidePanel'
import { ObjectId } from '@lib/graphql/types'
import { handleTimelineCanvasSelectEvent } from './onObjectSelected'

let isMouseDragging = false
let shouldMoveTimelineSeekBar = false

export const handleTimelineCanvasMouseEvent =
  (
    canvas: fabric.Canvas,
    timelineSeekBar: fabric.TimelineSeekBar,
    setActiveTemplateClipObjectId: (_id: ObjectId) => void,
    setMagicSidePanelItem: (magicSidePanel: IMagicSidePanelListItem) => void,
  ) =>
  (event: fabric.IEvent): void => {
    // Setting dragging
    if (event.e.type === `mousedown`) {
      shouldMoveTimelineSeekBar = event.target === null
    }
    if (event.e.type === `mouseup`) {
      isMouseDragging = false
      shouldMoveTimelineSeekBar = false
    }

    // Logic
    if (shouldMoveTimelineSeekBar && timelineSeekBar)
      moveTimelineSeekBar(timelineSeekBar, event)
    if (
      event.target !== null &&
      event.target.type === `timelineObject` &&
      !shouldMoveTimelineSeekBar
    )
      selectTimelineCanvasObject(
        canvas,
        event,
        setActiveTemplateClipObjectId,
        setMagicSidePanelItem,
      )

    // Setting dragging
    if (event.e.type === `mousedown`) {
      isMouseDragging = true
    }
  }

const selectTimelineCanvasObject = (
  canvas: fabric.Canvas,
  event: fabric.IEvent,
  setActiveTemplateClipObjectId: (_id: ObjectId) => void,
  setMagicSidePanelItem: (magicSidePanel: IMagicSidePanelListItem) => void,
) => {
  const {
    target,
    e: { type },
  } = event
  if (type === `mousemove`) return canvas._setActiveObject(target)
  if (type === `mousedown` && target._id) {
    handleTimelineCanvasSelectEvent(
      setActiveTemplateClipObjectId,
      setMagicSidePanelItem,
    )(event)
  }
}

const moveTimelineSeekBar = (
  timelineSeekBar: fabric.TimelineSeekBar,
  { absolutePointer }: fabric.IEvent,
) => {
  timelineSeekBar.set(`left`, absolutePointer.x)
}
