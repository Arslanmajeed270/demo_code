// eslint-disable-next-line @typescript-eslint/triple-slash-reference

import { fabric } from 'fabric'
import { applyFabricMagicControlsDesign } from './controls'
import { applyFabricMagicDefaultConstants } from './constants'
import { addMagicCanvasFunctions } from './canvas'
import { addFabricObjectIds } from './objectIds'
import { addFabricCustomObjects } from './objects'

applyFabricMagicDefaultConstants(fabric)
applyFabricMagicControlsDesign(fabric)
addMagicCanvasFunctions(fabric)
addFabricObjectIds(fabric)
addFabricCustomObjects(fabric)

export const magicFabric = fabric
