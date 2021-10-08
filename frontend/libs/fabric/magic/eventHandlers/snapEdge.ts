export const getCanvasSnapEdgeEventHandler =
  (canvas: fabric.Canvas, edgeDetectionByPx: number) =>
  (e: fabric.IEvent): void => {
    const obj = e.target
    obj.setCoords() //Sets corner position coordinates based on current angle, width and height

    if (obj.left < edgeDetectionByPx) {
      obj.left = 0
    }

    if (obj.top < edgeDetectionByPx) {
      obj.top = 0
    }

    if (obj.width + obj.left > canvas.width - edgeDetectionByPx) {
      obj.left = canvas.width - obj.width
    }

    if (obj.height + obj.top > canvas.height - edgeDetectionByPx) {
      obj.top = canvas.height - obj.height
    }

    canvas.forEachObject(function (target) {
      const activeObject = canvas.getActiveObject()

      if (target === activeObject) return

      if (
        Math.abs(activeObject.oCoords.tr.x - target.oCoords.tl.x) <
        edgeDetectionByPx
      ) {
        activeObject.left = target.left - activeObject.width
      }
      if (
        Math.abs(activeObject.oCoords.tl.x - target.oCoords.tr.x) <
        edgeDetectionByPx
      ) {
        activeObject.left = target.left + target.width
      }
      if (
        Math.abs(activeObject.oCoords.br.y - target.oCoords.tr.y) <
        edgeDetectionByPx
      ) {
        activeObject.top = target.top - activeObject.height
      }
      if (
        Math.abs(target.oCoords.br.y - activeObject.oCoords.tr.y) <
        edgeDetectionByPx
      ) {
        activeObject.top = target.top + target.height
      }
    })
  }
