/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="fabric" />

import {
  GqlTemplateVersion_templateVersion_magicTemplate,
  GqlTemplateVersion_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
} from '@lib/gqlTypes/emz'
import { ObjectId } from '@lib/graphql'

// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  namespace fabric {
    let magic: boolean

    interface ICanvasEventHandlersOptions {
      edgeDetection: number
    }
    interface Canvas {
      currentFrame: number
      isTimeline: boolean
      isPlaying: boolean
      isMagicRendering: boolean
      frameChangedRecently: boolean
      template: GqlTemplateVersion_templateVersion_magicTemplate
      clip: GqlTemplateVersion_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas
      timelineZoom?: number
      paddingX?: number
      getCanvasTimelineWidth?: () => number
      applyMagicEditorEventHandlers(
        canvas: Canvas,
        options: ICanvasEventHandlersOptions,
      ): void
      getObjectById(_id: ObjectId): fabric.Object
      removeObjectById(_id: ObjectId): void
      setCurrentFrame(currentFrame: number): Promise<void>
      setIsPlaying(isPlaying: boolean): void
      smartRenderAll(): void
      __eventListeners: any
    }

    interface IObjectKeyframe {
      propertyPath: string
      time: number
      value: unknown
      easingFunction?: keyof fabric.IUtilAnimEase | `easeLinear` | `none`
    }
    interface IBaseOptions {
      _id: string
      type?: string
      name?: string
      version: string
      keyframes?: IObjectKeyframe[]
      startAt: number
      endAt: number
      isNewObject?: boolean
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IObjectOptions extends IBaseOptions {}
    interface Object {
      _id: string
      version: string
      keyframes?: IObjectKeyframe[]
      startAt: number
      endAt: number
      isNewObject?: boolean
      initialized: () => void
      controlML?: Control[`actionHandler`]
      controlMR?: Control[`actionHandler`]
    }
    interface IImageOptions {
      src: string
    }

    interface IMediaOptions extends IBaseOptions {
      type: `audio` | `video`
      mediaStartAt: number
      mediaVolume: number
      muteMedia: boolean
      src: string
      crossOrigin?: string
    }

    interface Image {
      _element: HTMLImageElement
      resizeFilter: any
    }

    interface IVideoOptions extends IMediaOptions, IImageOptions {
      type: `video`
    }
    interface IAudioOptions extends IMediaOptions {
      type: `audio`
    }

    type Video = IVideoOptions
    type Audio = IAudioOptions

    let Video: any
    let Audio: any
  }
}
