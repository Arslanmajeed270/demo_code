import {
  GqlVideo_video_magicTemplate_clips,
  MagicTemplateClipType,
} from '@lib/gqlTypes/emz'

import React from 'react'

interface IClipProps {
  clip: GqlVideo_video_magicTemplate_clips
  clipNumber: number
  isActive: boolean
  createNewBlankClip: () => void
  removeClip: (e) => void
  cloneTemplateClip: (e) => void
  setActiveTemplateClip: () => void
}

export const ClipLayout: React.FC<IClipProps> = (props) => {
  const {
    createNewBlankClip,
    clip,
    clipNumber,
    cloneTemplateClip,
    removeClip,
    setActiveTemplateClip,
    isActive,
  } = props

  const getClipThumbnailSource = (clip) => {
    if (clip.type !== MagicTemplateClipType.CANVAS) return ``
    const imageLayer = clip.objects.find(
      (object) => object.type === `image`,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any
    return imageLayer?.src
  }

  return (
    <div className="group">
      <div
        className={`mx-1 mb-2.5 cursor-pointer relative border-4 border-blue-400 ${
          isActive ? `border-opacity-100` : `border-opacity-0`
        } ${!isActive && `group-hover:border-opacity-50`}`}
      >
        <span className="absolute z-10 left-0 top-0 bg-black bg-opacity-70 w-6 h-6 rounded-br-md m-auto text-center text-white opacity-0 group-hover:opacity-100">
          {clipNumber}
        </span>
        <div className="flex absolute z-10 top-0.5 right-0 opacity-0 group-hover:opacity-100">
          <span
            onClick={cloneTemplateClip}
            className="mx-0.5 bg-black px-2 py-0.5 bg-opacity-70 rounded-lg"
          >
            <i className="far fa-clone text-white" />
          </span>
          <span
            className="mx-0.5 bg-black px-2 py-0.5 bg-opacity-70 rounded-lg"
            onClick={removeClip}
          >
            <i className="far fa-trash text-white" />
          </span>
        </div>
        <div>
          <img
            onClick={setActiveTemplateClip}
            className="h-40 w-full object-cover"
            src={getClipThumbnailSource(clip)}
          />
        </div>
        <div
          className="flex absolute z-10 -bottom-4 bg-opacity-70 inset-x-2/4 opacity-0 group-hover:opacity-100"
          onClick={createNewBlankClip}
        >
          <span className="-ml-3 px-2 py-0.5 rounded-full text-center bg-blue-400 opacity-0 group-hover:opacity-100">
            <i className="fa fa-plus text-white" />
          </span>
        </div>
      </div>
    </div>
  )
}
