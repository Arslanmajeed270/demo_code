import _ from 'lodash'

type IGetMediaDimensions = { width: number; height: number }
export const getMediaWithDimensions = <T extends IGetMediaDimensions>(
  medias: Array<T>,
  maxWidth: number,
  maxHeight: number,
): T => {
  return _.sortBy(medias, `width`)
    .reverse()
    .find((media) => media.width <= maxWidth && media.height <= maxHeight)
}
