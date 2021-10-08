import { timelineFabric } from '.'
export const addMagicTimeLineCanvasFunctions = (
  _fabric: typeof timelineFabric,
): void => {
  _fabric.Canvas.prototype.getCanvasTimelineWidth = function () {
    return getCanvasTimelineWidth(this)
  }
}

export const setTimelineCanvasSize = (
  canvas: fabric.Canvas,
  wrapperElement: HTMLElement,
): void => {
  if (!canvas) return
  const height = window.innerHeight - wrapperElement.offsetTop
  const width = window.innerWidth - wrapperElement.offsetLeft

  wrapperElement.style.width = `${width}px`
  wrapperElement.style.height = `${height}px`
  canvas.setDimensions({
    width: (width - 30) * canvas.timelineZoom,
    height,
  })
}

const getCanvasTimelineWidth = (canvas: fabric.Canvas): number => {
  if (canvas.paddingX === undefined) return canvas.width
  return canvas.width - canvas.paddingX * 2
}
