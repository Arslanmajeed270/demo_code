import { getTccObjectFormSchema } from '@constants'
import { ITCCOSchema } from '@interfaces/emeezoVideo'
import { recursiveObjectValueProcessor, removeNulls } from '@utils'

import Ajv from 'ajv'
import {
  GqlVideo_video_magicTemplate,
  GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
} from '@lib/gqlTypes/emz'
import { FabricObject } from '@lib/graphql'
const ajv = new Ajv()

export const validateTemplateClipCanvasObject = (
  clipObject: FabricObject,
): Ajv.ErrorObject[] => {
  const formSchema = getTccObjectFormSchema(clipObject.type)
  return validateTemplateClipCanvasObjectSchema(clipObject, formSchema)
}

const validateTemplateClipCanvasObjectSchema = (
  clipObject: FabricObject,
  { jsonSchema }: ITCCOSchema,
) => {
  const validate = ajv.compile(jsonSchema)
  if (validate(clipObject)) return []
  const errors: Ajv.ErrorObject[] = validate.errors
  // Throw error
  return errors
}

const cleanTemplateClipObject = (
  clipObject: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
): GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas => {
  // removing all null
  const nullsRemoved = removeNulls(clipObject)

  const valueProcessor = (value: any) => {
    if (value === `number`)
      return Number(Math.round((value + `e2`) as any) + `e-2`)
    return value
  }
  return recursiveObjectValueProcessor(
    nullsRemoved,
    valueProcessor,
  ) as GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas
}

export const cleanTemplate = (
  template: GqlVideo_video_magicTemplate,
): GqlVideo_video_magicTemplate => {
  template.clips = template.clips.map(
    (
      clip: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
    ) => cleanTemplateClipObject(clip),
  )
  return template
}
