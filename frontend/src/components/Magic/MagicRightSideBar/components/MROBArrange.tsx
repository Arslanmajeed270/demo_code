import { GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas } from '@lib/gqlTypes/emz'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface IMROBArrangeProps {
  canvas: fabric.Canvas
  selectedObjectIndex: number
  clip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas
  updateTemplateFromClip: (
    clip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
  ) => void
}

export const MROBArrange: React.FC<IMROBArrangeProps> = ({
  canvas,
  selectedObjectIndex,
  clip,
  updateTemplateFromClip,
}) => {
  const { t } = useTranslation(`magic`)
  const canvasObject = canvas._objects[selectedObjectIndex]

  const updateTemplate = () => {
    clip.objects = canvas.toObject().objects
    updateTemplateFromClip(clip)
  }

  const sendBackward = () => {
    canvasObject.sendBackwards()
    updateTemplate()
  }

  const bringForward = () => {
    canvasObject.bringForward()
    updateTemplate()
  }

  const sendBack = () => {
    canvasObject.sendToBack()
    updateTemplate()
  }

  const bringFront = () => {
    canvasObject.bringToFront()
    updateTemplate()
  }

  return (
    <>
      <div
        className="mx-2 my-2 text-center cursor-pointer"
        title={t(`send-backward`)}
        onClick={sendBackward}
      >
        <i className="fas fa-send-backward" />
      </div>
      <div
        className="mx-2 my-2 text-center cursor-pointer"
        title={t(`bring-forward`)}
        onClick={bringForward}
      >
        <i className="fas fa-bring-forward" />
      </div>
      <div
        className="mx-2 my-2 text-center cursor-pointer"
        title={t(`send-back`)}
        onClick={sendBack}
      >
        <i className="fas fa-send-back" />
      </div>
      <div
        className="mx-2 my-2 text-center cursor-pointer"
        title={t(`bring-front`)}
        onClick={bringFront}
      >
        <i className="fas fa-bring-front" />
      </div>
    </>
  )
}
