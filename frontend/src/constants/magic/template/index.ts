import { DefaultMagicTemplateBlankClip } from './clip'
import { GqlVideo_video_magicTemplate } from '@lib/gqlTypes/emz'
import ObjectID from 'bson-objectid'

export * from './clip'
export * from './constants'

export const DefaultMagicTemplate: GqlVideo_video_magicTemplate = {
  __typename: `MagicTemplate`,
  fps: 30,
  height: 1080,
  width: 1920,
  clips: [DefaultMagicTemplateBlankClip],
  scripts: [],
  _id: new ObjectID().toString(),
  audio: undefined,
  createdAt: new Date(),
  updatedAt: new Date(),
}
