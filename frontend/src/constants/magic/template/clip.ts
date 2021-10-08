import { DefaultTemplateClipDuration } from './constants'
import ObjectID from 'bson-objectid'
import {
  MagicTemplateClipType,
  GqlTemplate_template_templateVersion_magicTemplate_clips,
} from '@lib/gqlTypes/emz'

export const DefaultMagicTemplateBlankClip: GqlTemplate_template_templateVersion_magicTemplate_clips =
  {
    __typename: `MagicTemplateClipCanvas`,
    _id: new ObjectID().toString(),
    type: MagicTemplateClipType.CANVAS,
    duration: DefaultTemplateClipDuration,
    background: `#FFFFFF`,
    objects: [],
  }
