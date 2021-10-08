import { TimelineKeyframeColor, TimelineKeyframeSize } from '@lib/fabric'

export const createTimelineKeyframe = (
  _fabric: typeof fabric,
): fabric.TimelineKeyframe => {
  const TimelineKeyframe = _fabric.util.createClass(_fabric.Polygon, {
    type: `timelineKeyframe`,
    initialize(options: fabric.ITimelineKeyframeOptions) {
      this.callSuper(
        `initialize`,
        [
          { x: -TimelineKeyframeSize, y: 0 },
          { x: 0, y: TimelineKeyframeSize },
          { x: TimelineKeyframeSize, y: 0 },
          { x: 0, y: -TimelineKeyframeSize },
        ],
        {
          ...options,
          fill: TimelineKeyframeColor,
          lockMovementY: true,
          lockScalingX: true,
          lockScalingY: true,
          lockRotation: true,
          hasControls: false,
          hasBorders: false,
          borderColor: `transparent`,
          hoverCursor: `ew-resize`,
          moveCursor: `grabbing`,
          orginX: `center`,
          strokeLineJoin: `round`,
          strokeWidth: TimelineKeyframeSize * 0.5,
          stroke: TimelineKeyframeColor,
        },
      )
      this.on(`mouseup`, () => {
        if (!this.canvas || !this.canvas.getContext()) return
        this.canvas.fire(`object:modified:custom`, { target: this }) // TODO: Try to use object:modified instead, but it produces a bug on draging track (fix it by adding if condition here)
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
  })

  return TimelineKeyframe
}
