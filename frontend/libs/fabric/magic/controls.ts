import { fabric as _fabric } from 'fabric'

export const applyFabricMagicControlsDesign = (
  fabric: typeof _fabric,
): void => {
  fabric.Object.prototype.borderColor = `#2DB5FF`
  fabric.Object.prototype.cornerColor = `#5DCEFA`
  fabric.Object.prototype.cornerStrokeColor = `#76B0CD`
  fabric.Object.prototype.cornerStyle = `circle`
  fabric.Object.prototype.cornerSize = 12
  fabric.Object.prototype.controls.mtr.offsetY = -25
  fabric.Object.prototype.transparentCorners = false

  const oldControlML = _fabric.Object.prototype.controls.ml.actionHandler
  const oldControlMR = _fabric.Object.prototype.controls.mr.actionHandler
  _fabric.Object.prototype.controls.ml.actionHandler = function (
    eventData,
    transform,
    x,
    y,
  ) {
    if (transform.target.controlML)
      return transform.target.controlML(eventData, transform, x, y)
    return oldControlML(eventData, transform, x, y)
  }
  _fabric.Object.prototype.controls.mr.actionHandler = function (
    eventData,
    transform,
    x,
    y,
  ) {
    if (transform.target.controlMR)
      return transform.target.controlMR(eventData, transform, x, y)
    return oldControlMR(eventData, transform, x, y)
  }
}
