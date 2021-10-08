import { fabricMediaObjectBase } from './lib/media'
import { exportCustomPropsFromFabricObject } from './object'

export const createAudioObject = (_fabric: typeof fabric): unknown => {
  const Audio = _fabric.util.createClass(_fabric.Image, {
    type: `audio`,
    // initialize can be of type function(options) or function(property, options), like for text.
    // no other signatures allowed.
    ...fabricMediaObjectBase,

    toObject() {
      const currentObject = this.callSuper(`toObject`)
      const audioObject = {
        mediaStartAt: this.mediaStartAt,
        muteMedia: this.muteMedia,
        mediaVolume: this.mediaVolume,
        src: this.src,
        crossOrigin: this.crossOrigin,
      }
      return exportCustomPropsFromFabricObject(audioObject, currentObject)
    },
  })

  Audio.fromObject = (_object, callback) => {
    const object = fabric.util.object.clone(_object)
    const audio = new fabric.Audio(object)
    callback(audio, false)
  }

  return Audio
}
