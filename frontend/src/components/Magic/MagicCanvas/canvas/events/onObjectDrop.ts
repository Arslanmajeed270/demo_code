import { GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas } from '@lib/gqlTypes/emz'
import { FabricObject } from '@lib/graphql'
import { addNewClipObjectToTemplate } from '..'

const getEventDataObject = (
  e: DragEvent,
  format = `text/plain`,
): FabricObject => {
  const data = e.dataTransfer.getData(format)
  if (!data) return
  try {
    return JSON.parse(data)
  } catch (error) {
    return null
  }
}

export const handleCanvasDropEvent =
  (
    canvas: fabric.Canvas,
    activeClipRef: React.MutableRefObject<GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas>,
    updateTemplateFromClip: (
      clip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
    ) => void,
  ) =>
  async ({ e }: fabric.IEvent): Promise<void> => {
    const event = e as unknown as DragEvent
    event.preventDefault()
    event.stopPropagation()
    const activeClip = activeClipRef.current

    const fabricObject = getEventDataObject(event)

    const zoom = canvas.getZoom()

    fabricObject.left = event.offsetX / zoom
    fabricObject.top = event.offsetY / zoom

    addNewClipObjectToTemplate(
      fabricObject,
      canvas.currentFrame,
      canvas.template,
      activeClip._id,
      updateTemplateFromClip,
    )
  }
