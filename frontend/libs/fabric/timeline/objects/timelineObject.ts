const DragLinesPadding = {
  first: 5,
  second: 9,
}
const TextPaddingLeft = 20

export const createTimelineObject = (
  _fabric: typeof fabric,
): fabric.TimelineObject => {
  const TimelineObject = _fabric.util.createClass(_fabric.Group, {
    type: `timelineObject`,
    // initialize can be of type function(options) or function(property, options), like for text.
    // no other signatures allowed.
    initialize(options: fabric.ITimelineObjectOptions) {
      this.options = options
      this.trackName = options.object.name || options.object._id
      this.addTimelineObjectElements(options)
      this.on(`mouseup`, () => {
        if (!this.canvas || !this.canvas.getContext()) return
        this.canvas.fire(`object:modified:custom`, { target: this }) // TODO: Try to use object:modified instead, but it produces a bug on draging track (fix it by adding if condition here)
      })
    },
    _controlsVisibility: {
      bl: false,
      br: false,
      mb: false,
      ml: true,
      mr: true,
      mt: false,
      tl: false,
      tr: false,
      mtr: false,
    },
    _render(ctx: CanvasRenderingContext2D) {
      this.callSuper(`_render`, ctx)
    },
    addTimelineObjectElements(options: fabric.ITimelineObjectOptions) {
      const commonOptions = {
        _id: options.object._id,
        version: options.object.version,
        startAt: options.object.startAt,
        endAt: options.object.endAt,
      }
      const lineCommonOptions = {
        ...commonOptions,
        width: 2,
        height: options.height - 8,
        top: options.height / 5,
        fill: options.fill,
      }
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      this.baseRect = new _fabric.Rect({
        ...commonOptions,
        width: options.width,
        height: options.height,
        fill: options.fill,
        opacity: 0.6,
        stroke: `${options.fill}`,
        strokeWidth: 2,
        rx: 3,
        ry: 3,
      })
      this.leftLine1 = new _fabric.Rect({
        ...lineCommonOptions,
        left: DragLinesPadding.first,
      })
      this.leftLine2 = new _fabric.Rect({
        ...lineCommonOptions,
        left: DragLinesPadding.second,
      })
      this.rightLine1 = new _fabric.Rect({
        ...lineCommonOptions,
        left: options.width - DragLinesPadding.first,
      })
      this.rightLine2 = new _fabric.Rect({
        ...lineCommonOptions,
        left: options.width - DragLinesPadding.second,
      })
      this.trackNameObject = new _fabric.Text(this.trackName, {
        ...commonOptions,
        originX: `left`,
        originY: `top`,
        left: TextPaddingLeft,
        top: options.height / 6,
        fontSize: options.height * 0.7,
        fill: options.fill,
      })
      this.width = options.width
      this._updateGroupObjects()

      this.callSuper(
        `initialize`,
        [
          this.baseRect,
          this.leftLine1,
          this.leftLine2,
          this.rightLine1,
          this.rightLine2,
          this.trackNameObject,
        ],
        {
          ...options,
          padding: 0,
          hasBorders: false,
          cornerSize: 20,
          transparentCorners: true,
          cornerStrokeColor: `transparent`,
          lockMovementY: true,
          lockMovementX: false,
          lockScalingY: true,
          lockScalingX: false,
          hoverCursor: `pointer`,
          moveCursor: `pointer`,
          cornerStyle: `rect`,
          borderColor: `transparent`,
        },
      )
    },
    _updateGroupObjects() {
      this.setTrackNameTextWidthToFitTrack()
      this.setLinesVisibility()
    },
    setTrackNameTextWidthToFitTrack() {
      if (!this.trackNameObject) return
      if (this.width === 0) return this.trackNameObject.set(`text`, ``)
      const widthError = 35
      let charsToRemove = 1
      let charsToAdd =
        this.trackNameObject.text.length === 0
          ? 0
          : this.trackNameObject.text.length - 3

      // Adding chars untill no space left
      while (
        this.width > this.trackNameObject.width + widthError &&
        charsToAdd <= this.trackName.length
      ) {
        const finalTrackNameLength = charsToAdd
        const stringToAppend =
          finalTrackNameLength !== this.trackName.length ? `...` : ``
        const newTrackName = this.trackName.substring(0, finalTrackNameLength)
        this.trackNameObject.set(`text`, newTrackName + stringToAppend)
        charsToAdd++
      }

      // Removing chars untill no space left
      while (
        this.width < this.trackNameObject.width + widthError &&
        charsToRemove <= this.trackName.length
      ) {
        const finalTrackNameLength = this.trackName.length - charsToRemove
        const stringToAppend = finalTrackNameLength > 0 ? `...` : ``
        const newTrackName = this.trackName.substring(0, finalTrackNameLength)
        this.trackNameObject.set(`text`, newTrackName + stringToAppend)
        charsToRemove++
      }
    },
    setLinesVisibility() {
      const visible = this.width > DragLinesPadding.second * 2
      this.leftLine1.visible = visible
      this.leftLine2.visible = visible
      this.rightLine1.visible = visible
      this.rightLine2.visible = visible
    },
    set(key, value) {
      if (key === `left` && this.canvas) {
        value = this.getUpdatedTimelineObjectLeft(value)
      }
      if (key === `width` && this.canvas) {
        value = this.getUpdatedTimelineObjectWidth(value)
      }
      this.callSuper(`set`, key, value)
    },
    getUpdatedTimelineObjectLeft(targetLeft: number): number {
      // return targetLeft
      const timelineWidth = this.canvas.getCanvasTimelineWidth()

      if (targetLeft < this.canvas.paddingX) return this.canvas.paddingX
      if (targetLeft + this.width > this.canvas.paddingX + timelineWidth)
        targetLeft = timelineWidth + this.canvas.paddingX - this.width

      const totalFrames = this.canvas.clip.duration * this.canvas.template.fps
      const frameTimelineSpacing = timelineWidth / totalFrames
      const updatedLeft =
        Math.round(targetLeft / frameTimelineSpacing) * frameTimelineSpacing
      this.width =
        Math.round(this.width / frameTimelineSpacing) * frameTimelineSpacing
      return updatedLeft
    },
    getUpdatedTimelineObjectWidth(targetWidth: number): number {
      // return targetWidth
      const timelineWidth = this.canvas.getCanvasTimelineWidth()
      const totalFrames = this.canvas.clip.duration * this.canvas.template.fps
      const frameTimelineSpacing = timelineWidth / totalFrames

      if (targetWidth <= 0) return frameTimelineSpacing
      // TODO:  Below commented out code introduces a bug, but its better if we add this if-condition or a variant of it's (NOT CRITICAL) (Bug is:- if you drag track at the end and the use controlML to change it quickly then the end of track is no longer end of it)
      // if (this.left + targetWidth > this.canvas.paddingX + timelineWidth)
      //   targetWidth = timelineWidth + this.canvas.paddingX - this.left
      const updatedWidth =
        Math.round(targetWidth / frameTimelineSpacing) * frameTimelineSpacing

      if (updatedWidth <= 0) return frameTimelineSpacing
      return updatedWidth
    },
    controlML: function (e) {
      const pointer = this.canvas.getPointer(e)
      const newLeft = pointer.x
      const newWidth = this.width + (this.left - newLeft)
      this.setNewPosition(newLeft, newWidth)
    },
    controlMR: function (e) {
      const pointer = this.canvas.getPointer(e)
      const newWidth = pointer.x - this.left
      this.setNewPosition(this.left, newWidth)
    },
    setNewPosition(left: number, _width: number) {
      const timelineWidth = this.canvas.getCanvasTimelineWidth()
      const totalFrames = this.canvas.clip.duration * this.canvas.template.fps
      const frameTimelineSpacing = timelineWidth / totalFrames

      const width = this.getUpdatedTimelineObjectWidth(_width)
      const newChildObjectLeft = -width / 2

      if (left !== this.left && left < this.canvas.paddingX) return
      if (left + width > this.canvas.paddingX + timelineWidth) return
      if (this.left <= left && width === frameTimelineSpacing) return

      // Setting new properties
      this.leftLine1.set(`left`, newChildObjectLeft + DragLinesPadding.first)
      this.leftLine2.set(`left`, newChildObjectLeft + DragLinesPadding.second)
      this.rightLine1.set(
        `left`,
        newChildObjectLeft + width - DragLinesPadding.first,
      )
      this.rightLine2.set(
        `left`,
        newChildObjectLeft + width - DragLinesPadding.second,
      )
      this.trackNameObject.set(`left`, newChildObjectLeft + TextPaddingLeft)
      this.baseRect.set(`left`, newChildObjectLeft)
      this.baseRect.set(`width`, width)
      this.set(`width`, width)
      this.set(`left`, left)

      // Set text length
      this._updateGroupObjects()

      // Turning off cache
      this.objectCaching = false

      // Render
      this.canvas.renderAll()

      // Setting cache to default
      this.objectCaching = _fabric.Object.prototype.objectCaching
    },
  })

  return TimelineObject
}
