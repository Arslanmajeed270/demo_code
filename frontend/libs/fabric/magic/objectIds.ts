import { ObjectId } from '@lib/graphql/types'
import { magicFabric } from './magicFabric'
import ObjectID from 'bson-objectid'

export const addFabricObjectIds = (_fabric: typeof magicFabric): void => {
  _fabric.Canvas.prototype.add = (function (originalFn) {
    return function (...args) {
      args.forEach((obj) => {
        if (obj._id == null) {
          obj._id = new ObjectID().toString()
        }
      })
      originalFn.call(this, ...args)

      return this
    }
  })(_fabric.Canvas.prototype.add)

  _fabric.Object.prototype.toObject = ((originalFn) => {
    return function (properties) {
      return _fabric.util.object.extend(originalFn.call(this, properties), {
        _id: this._id,
      })
    }
  })(_fabric.Object.prototype.toObject)

  /**
   * Function of every new fabric.Canvas.
   * Returns the fabric object with a given id, return null if no object matching the id is found
   *
   * @function getObjectById
   * @param {int} id
   * id to look for
   */
  _fabric.Canvas.prototype.getObjectById = function (_id: ObjectId) {
    let object = null
    const objects: fabric.Object[] = this.getObjects()
    for (let i = 0, len = this.size(); i < len; i++) {
      if (_id === objects[i]._id) {
        object = objects[i]
        break
      }
    }

    return object
  }

  _fabric.Canvas.prototype.removeObjectById = function (_id: ObjectId) {
    let object = null
    const objects: fabric.Object[] = this.getObjects()
    for (let i = 0, len = this.size(); i < len; i++) {
      if (_id === objects[i]._id) {
        object = objects[i]
        break
      }
    }
    this.remove(object)
  }

  _fabric.Canvas.prototype.toJSON = ((toJSON) => {
    return function (propertiesToInclude) {
      return _fabric.util.object.extend(
        toJSON.call(this, propertiesToInclude),
        {
          _id: this._id,
        },
      )
    }
  })(_fabric.Canvas.prototype.toJSON)
}
