import { createAudioObject } from './audio'
import { applyFabricCanvasModifications } from './canvas'
import { applyImageObjectModifications } from './image'
import { applyFabricObjectModifications } from './object'
import { applyTextObjectModifications } from './text'
import { createVideoObject } from './video'

export const addFabricCustomObjects = (_fabric: typeof fabric): void => {
  applyFabricCanvasModifications(_fabric)
  applyFabricObjectModifications(_fabric)
  applyImageObjectModifications(_fabric)
  applyTextObjectModifications(_fabric)
  _fabric.Video = createVideoObject(_fabric)
  _fabric.Audio = createAudioObject(_fabric)
}

export const updateFabricObjectFunction = (
  _fabric: typeof fabric,
  namespace: string,
  functionName: string,
  newFunction: (...args) => void,
  after = true,
): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prototype = _fabric[namespace].prototype as any

  const func = (toExtendFunc) =>
    function (...args) {
      let toReturn: unknown
      if (!after) {
        toReturn = _fabric.util.object.extend(
          toExtendFunc.call(this, ...args),
          {},
        )
        args = [toReturn, ...args]
      }
      toReturn = newFunction(this, ...args)
      if (after)
        toReturn = _fabric.util.object.extend(
          toExtendFunc.call(this, ...args),
          toReturn || {},
        )
      return toReturn
    }

  prototype[functionName] = ((toExtendFunc) => {
    return func(toExtendFunc)
  })(prototype[functionName])
}
