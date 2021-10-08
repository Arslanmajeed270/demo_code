import { fabricMediaObjectBase } from './lib/media'

export const createVideoObject = (_fabric: typeof fabric): unknown => {
  const Video = _fabric.util.createClass(_fabric.Image, {
    type: `video`,
    // initialize can be of type function(options) or function(property, options), like for text.
    // no other signatures allowed.
    ...fabricMediaObjectBase,

    toObject() {
      return _fabric.util.object.extend(this.callSuper(`toObject`), {
        mediaStartAt: this.mediaStartAt,
        muteMedia: this.muteMedia,
        mediaVolume: this.mediaVolume,
      })
    },
  })

  Video.fromObject = (_object, callback) => {
    const object = fabric.util.object.clone(_object)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const imagePrototype = fabric.Image.prototype as any
    imagePrototype._initFilters.call(object, object.filters, (filters) => {
      object.filters = filters || []
      imagePrototype._initFilters.call(
        object,
        [object.resizeFilter],
        (resizeFilters) => {
          object.resizeFilter = resizeFilters[0]
          fabric.util.enlivenObjects(
            [object.clipPath],
            (enlivedProps) => {
              object.clipPath = enlivedProps[0]
              const video = new fabric.Video(object)
              callback(video, false)
            },
            undefined,
          )
        },
      )
    })
  }

  return Video
}
