import { magicFabric } from '../magic'
import { addFabricCustomObjects } from './objects'
import { addMagicTimeLineCanvasFunctions } from './canvas'
addFabricCustomObjects(magicFabric)
addMagicTimeLineCanvasFunctions(magicFabric)

export const timelineFabric = magicFabric
