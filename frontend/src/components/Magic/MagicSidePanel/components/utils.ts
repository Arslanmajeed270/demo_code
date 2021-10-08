import { FabricObject } from '@lib/graphql'
import { DragEventHandler } from 'react'

export const onDragStartFabricObject: (data: FabricObject) => DragEventHandler =
  (fabricObject: FabricObject) => {
    return (event) =>
      event.dataTransfer.setData(`text/plain`, JSON.stringify(fabricObject))
  }

type IGetMediaDesiredDimensionsParam = {
  video: number | string
  width: number | string
} & unknown

export const getMediaDesiredDimensions = <T = IGetMediaDesiredDimensionsParam>(
  medias: T[],
): T => {
  // IMPLMENT work here
  return medias[0]
}
