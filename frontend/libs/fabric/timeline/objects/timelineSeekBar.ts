import { TimelineSeekbarColor } from '@lib/fabric'

export const createTimelineSeekBar = (
  _fabric: typeof fabric,
): fabric.TimelineSeekBar => {
  const TimelineSeekBar = _fabric.util.createClass(_fabric.Group, {
    type: `timelineSeekBar`,
    // initialize can be of type function(options) or function(property, options), like for text.
    // no other signatures allowed.
    initialize(options: fabric.ITimelineSeekBarOptions) {
      const seekBarWidth = 10
      const seekBarTriangleWidth = 40
      const triangle = new fabric.Triangle({
        _id: ``,
        version: ``,
        width: seekBarTriangleWidth,
        height: seekBarTriangleWidth / 2,
        left: seekBarTriangleWidth / 2 - seekBarWidth / 2,
        top: 0,
        angle: 180,
        fill: TimelineSeekbarColor,
        startAt: 0,
        endAt: 0,
      })

      const dashed = new fabric.Line([0, 0, options.height, 0], {
        _id: ``,
        version: ``,
        strokeDashArray: [5, 5],
        stroke: TimelineSeekbarColor,
        angle: 90,
        left: -seekBarWidth / 2,
        top: 0,
        strokeWidth: 1.7,
        startAt: 0,
        endAt: 0,
        hasBorders: false,
      })

      // Adding empty object with width seekBarWidth and left seekBarWidth, so we can big holding point for seek bar
      const emptyObject = new fabric.Object({
        _id: ``,
        version: ``,
        left: seekBarWidth + 2,
        top: 0,
        startAt: 0,
        endAt: 0,
        hasBorders: false,
        width: seekBarWidth,
      })

      // eslint-disable-next-line @typescript-eslint/no-this-alias
      this.callSuper(`initialize`, [triangle, dashed, emptyObject], {
        ...options,
        width: seekBarWidth,
        fill: TimelineSeekbarColor,
        top: 0,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockRotation: true,
        hasControls: false,
        hasBorders: false,
        borderColor: `transparent`,
        hoverCursor: `ew-resize`,
        moveCursor: `grabbing`,
        orginX: `left`,
      })
    },
    _render(ctx: CanvasRenderingContext2D) {
      this.callSuper(`_render`, ctx)
    },
    set(key, value) {
      if (key === `left` && this.canvas) {
        value = this.getUpdatedSeekBarLeft(value)
      }
      this.callSuper(`set`, key, value)
    },
    getUpdatedSeekBarLeft(targetLeft: number): number {
      if (targetLeft < this.canvas.paddingX) return this.canvas.paddingX
      if (targetLeft > this.canvas.width - this.canvas.paddingX)
        return this.canvas.width - this.canvas.paddingX

      const timelineWidth = this.canvas.getCanvasTimelineWidth()
      const totalFrames = this.canvas.clip.duration * this.canvas.template.fps
      const frameTimelineSpacing = timelineWidth / totalFrames
      const updatedLeft =
        Math.round(targetLeft / frameTimelineSpacing) * frameTimelineSpacing
      return updatedLeft
    },
    _controlsVisibility: {
      bl: false,
      br: false,
      mb: false,
      ml: false,
      mr: false,
      mt: false,
      tl: false,
      tr: false,
      mtr: false,
    },
  })

  return TimelineSeekBar
}
