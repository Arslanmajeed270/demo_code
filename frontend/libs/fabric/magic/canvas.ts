import { magicFabric } from './magicFabric'
import { GqlVideo_video_magicTemplate } from '@lib/gqlTypes/emz'

export const addMagicCanvasFunctions = (_fabric: typeof magicFabric): void => {
  _fabric.Canvas.prototype.applyMagicEditorEventHandlers = (
    canvas: fabric.Canvas, // TODO: Make use of "this" variable rather than asking for a canvas
    options,
  ) => {
    applyMagicEditorEventHandlers(canvas, options)
  }
}

export const applyMagicEditorEventHandlers = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canvas: fabric.Canvas,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options: fabric.ICanvasEventHandlersOptions,
): void => {
  // canvas.on(
  //   `object:moving`,
  //   getCanvasSnapEdgeEventHandler(canvas, options.edgeDetection),
  // )
}

export const getCanvasSize = (
  template: GqlVideo_video_magicTemplate,
  wrapperElement: HTMLElement,
  padding = { x: 0, y: 0 },
): { width: number; height: number; zoom: number } => {
  const wrapperHeight = wrapperElement.offsetHeight + padding.y

  const wrapperOffsetWidthByWindow =
    window.innerWidth - wrapperElement.offsetLeft
  const wrapperWidth =
    (wrapperOffsetWidthByWindow > wrapperElement.offsetWidth
      ? wrapperOffsetWidthByWindow
      : wrapperElement.offsetWidth) + padding.x

  const templateAspectRatio = template.width / template.height
  const wrapperAspectRatio = wrapperWidth / wrapperHeight

  const height =
    wrapperAspectRatio < templateAspectRatio
      ? (wrapperHeight * wrapperAspectRatio) / templateAspectRatio
      : wrapperHeight
  const width =
    wrapperAspectRatio > templateAspectRatio
      ? wrapperWidth * (templateAspectRatio / wrapperAspectRatio)
      : wrapperWidth

  const zoom = width / template.width

  return {
    height,
    width,
    zoom,
  }
}

export const setCanvasSize = (
  canvas: fabric.Canvas,
  template: GqlVideo_video_magicTemplate,
  wrapperElement: HTMLElement,
  padding = { x: 0, y: 0 },
): void => {
  const { width, height, zoom } = getCanvasSize(
    template,
    wrapperElement,
    padding,
  )
  canvas.setDimensions({
    width,
    height,
  })
  canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0])
}
