import { roundToDecimalPlaces } from '@lib/fabric'
import {
  CanvasObjectVideoRenderDelay,
  FCOInitializedEventName,
  FCOPropertySetEventNamePrefix,
} from '../..'

export const fabricMediaObjectBase = {
  type: undefined, // define type
  // initialize can be of type function(options) or function(property, options), like for text.
  // no other signatures allowed.
  initialize(options: fabric.IVideoOptions | fabric.IAudioOptions): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const mediaElement = document.createElement(options.type)
    mediaElement.src = options.src
    mediaElement.crossOrigin = options.crossOrigin || `anonymous`
    this.mediaStartAt = options.mediaStartAt || 0
    this.muteMedia = options.muteMedia || false
    this.mediaVolume = options.mediaVolume || 1
    this._element = mediaElement

    if (options.type === `video`) {
      options.width = undefined
      options.height = undefined
    }

    this.callSuper(`initialize`, mediaElement, options)

    this._element.onloadedmetadata = () => {
      if (!this._element) return
      if (options.type === `video`) {
        this._element.width = this._element.videoWidth
        this._element.height = this._element.videoHeight
      }
      this._element.currentTime = this.mediaStartAt
      this._element.muted = this.muteMedia
      this._element.volume = this.mediaVolume

      options.src = this._element.src
      this.setElement(this._element, options)
      this.setCoords()

      this.canvas?.fire(`object:modified`, { target: this })
      this.fire(FCOInitializedEventName)
      this.canvas?.requestRenderAll()
    }

    this.on(`${FCOPropertySetEventNamePrefix}muteMedia`, () => {
      this._element.muted = this.muteMedia
    })
    this.on(`${FCOPropertySetEventNamePrefix}mediaVolume`, () => {
      this._element.volume = this.mediaVolume
    })

    if (options.type === `video`) {
      this.on(`${FCOPropertySetEventNamePrefix}filters`, () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const imagePrototype = fabric.Image.prototype as any
        imagePrototype._initFilters.call(this, this.filters, (filters) => {
          this.filters = filters || []
          this.applyFilters()
        })
      })

      this.on(`${FCOPropertySetEventNamePrefix}resizeFilter`, () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const imagePrototype = fabric.Image.prototype as any
        imagePrototype._initFilters.call(
          this,
          this.resizeFilter,
          (resizeFilters) => {
            this.resizeFilters = resizeFilters[0]
          },
        )
      })
    }
  },

  _render(ctx: CanvasRenderingContext2D): void {
    this.callSuper(`_render`, ctx)
  },

  async _delayRenderAll(delay = CanvasObjectVideoRenderDelay): Promise<void> {
    if (delay === 0) return this.canvas?.smartRenderAll()
    return new Promise<null>((resolve) => {
      setTimeout(() => {
        this.canvas?.smartRenderAll()
        resolve(null)
      }, delay)
    })
  },

  async loadFrame(): Promise<void> {
    const mediaElement = this._element
    const newTime = this.getMediaTime()
    if (newTime === mediaElement.currentTime) return

    mediaElement.currentTime = newTime

    return new Promise<null>((resolve) => {
      if (!this.canvas.isMagicRendering || this.type === `audio`) resolve(null)
      mediaElement.addEventListener(
        `seeked`,
        async () => {
          // Improve me: This is ensures frame perfectness but slows down render.
          // Please see this issue for context: https://github.com/remotion-dev/remotion/issues/200
          await this._delayRenderAll()
          resolve(null)
        },
        { once: true },
      )
      mediaElement.addEventListener(
        `ended`,
        () => {
          this.canvas.smartRenderAll()
          resolve(null)
        },
        {
          once: true,
        },
      )
      mediaElement.addEventListener(
        `error`,
        (err) => {
          console.error(err)
          this.canvas.smartRenderAll()
          resolve(null)
        },
        {
          once: true,
        },
      )
    })
  },

  async mediaSyncOnPlaying(): Promise<void> {
    const fps = this.canvas.template.fps
    const currentFrame = this.canvas.currentFrame
    const shouldBeTime =
      roundToDecimalPlaces(currentFrame / fps, 2) -
      this.startAt +
      this.mediaStartAt

    if (this._element.paused === true) await this.replayMedia()

    const isTime = this._element.currentTime
    const timeShift = Math.abs(shouldBeTime - isTime)
    if (timeShift > 0.45 && !this._element.ended) {
      // Time has shifted by timeShift, fixing it by seeking
      // If scrubbing around, adjust timing
      // or if time shift is bigger than 0.2sec
      await this.loadFrame()
    }
  },

  async onCurrentFrameChange(currentFrame: number): Promise<void> {
    const fps = this.canvas.template.fps
    const startAtFrame = this.startAt * fps
    const endAtFrame = this.endAt * fps
    const isPlaying = this.canvas.isPlaying

    if (!isPlaying) return this.loadFrame()

    if (currentFrame >= startAtFrame && currentFrame <= endAtFrame)
      await this.mediaSyncOnPlaying()
    if (
      (currentFrame < startAtFrame || currentFrame > endAtFrame) &&
      this._element.paused === false
    )
      await this.pauseMedia()
  },

  async onIsPlayingChange(): Promise<void> {
    if (!this.canvas.isPlaying) this._element.pause()
    await this.loadFrame()
  },

  async replayMedia(): Promise<void> {
    await this.loadFrame()
    this.playMedia()
  },

  playMedia(): void {
    this._element.play()
  },

  async pauseMedia(): Promise<void> {
    this._element.pause()
    this._element.currentTime = this.mediaStartAt
    await this.loadFrame()
  },

  getMediaTime(): number {
    const fps = this.canvas.template.fps
    const currentFrame = this.canvas.currentFrame
    const startAtFrame = this.startAt * fps
    const mediaStartAtFrame = this.mediaStartAt * fps

    const mediaFramesProgressed = currentFrame - startAtFrame
    const currentVideoFrame =
      mediaStartAtFrame +
      (mediaFramesProgressed >= 0 ? mediaFramesProgressed : 0)

    if (this.src.endsWith(`mp4`)) {
      // In Chrome, for MP4s, if 30fps, the first frame is still displayed at 0.033333
      // even though after that it increases by 0.033333333 each.
      // So frame = 0 in Remotion is like frame = 1 for the browser
      return (currentVideoFrame + 1) / fps
    }

    if (this.src.endsWith(`webm`)) {
      // For WebM medias, we need to add a little bit of shift to get the right frame.
      const msPerFrame = 1000 / fps
      const msShift = msPerFrame / 2
      return (currentVideoFrame * msPerFrame + msShift) / 1000
    }

    // For audio, we don't do any shift correction
    return currentVideoFrame / fps
  },
}
