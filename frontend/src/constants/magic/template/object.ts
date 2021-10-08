import { FabricObject } from '@lib/graphql'
import { DefaultTemplateClipObjectDuration } from '.'

export const TCCOBase: FabricObject = {
  _id: null, // generate new id
  type: `base`,
  version: `4.5.1`,
  startAt: 0,
  endAt: DefaultTemplateClipObjectDuration,
}

export const TCCObjectBase: FabricObject = {
  ...TCCOBase,
  type: `object`,
  originX: `center`,
  originY: `center`,
  left: 0,
  top: 0,
  width: 300,
  height: 300,
  fill: `rgba(0,0,0,0)`,
  scaleX: 1,
  scaleY: 1,
  angle: 0,
  opacity: 1,
  visible: true,
}
