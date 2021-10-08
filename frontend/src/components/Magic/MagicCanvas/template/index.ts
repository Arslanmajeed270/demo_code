import { TCCOBase, TCCObjectBase } from '@constants/magic/template/object'
import { FabricObject } from '@lib/graphql'

import ObjectID from 'bson-objectid'

export const getNewTCCOBase = (): FabricObject => {
  return {
    ...TCCOBase,
    _id: new ObjectID().toString(),
  }
}

export const getNewTCCOObjectBase = (): FabricObject => {
  return {
    ...TCCObjectBase,
    _id: new ObjectID().toString(),
  }
}
