import { GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas } from '@lib/gqlTypes/emz'

export const handleCanvasObjectModifiedEvent =
  (
    clipRef: React.MutableRefObject<GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas>,
    updateTemplateFromClip: (
      clip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
    ) => void,
  ) =>
  ({ target }: fabric.IEvent): void => {
    const updatedObject = target
    const clip = clipRef.current
    if (!clip) return
    const index = clip.objects.findIndex((obj) => obj._id === updatedObject._id)
    clip.objects[index] = updatedObject.toObject()
    updateTemplateFromClip(clip)
  }
