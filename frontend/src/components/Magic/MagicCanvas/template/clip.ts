import {
  GqlVideo_video_magicTemplate,
  GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
} from '@lib/gqlTypes/emz'
import * as graphqlScalar from '@lib/graphql'
import { FabricObject } from '@lib/graphql'

export const getActiveClipFromId = (
  templateClipId: graphqlScalar.ObjectId,
  template: GqlVideo_video_magicTemplate,
  returnIndex = false,
):
  | GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas
  | number => {
  const search = (clip) => clip._id === templateClipId
  return returnIndex
    ? template.clips.findIndex(search)
    : (template.clips.find(
        search,
      ) as GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas)
}

export const getActiveClipObjectFromId = (
  clipObjectId: graphqlScalar.ObjectId,
  clip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
  returnIndex = false,
): FabricObject | number => {
  const search = (object) => object._id === clipObjectId
  return returnIndex
    ? clip.objects.findIndex(search)
    : clip.objects.find(search)
}
