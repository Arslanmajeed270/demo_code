import { GqlMagicFonts_magicFonts } from '@lib/gqlTypes/emz'
import { loadFontsOnDocument } from '../../utils'
import { updateFabricObjectFunction } from '.'
import { FCOPropertySetEventNamePrefix } from '../constants'

export const applyTextObjectModifications = (_fabric: typeof fabric): void => {
  const _loadFontOnDocument = async (fontFamily: string) => {
    const font: GqlMagicFonts_magicFonts = {
      __typename: `MagicFontsResDto`,
      family: fontFamily,
      variants: [],
    }
    try {
      await loadFontsOnDocument([font])
    } catch (error) {
      console.error(`Error loading font: `, error.message)
    }
  }
  updateFabricObjectFunction(
    _fabric,
    `Text`,
    `initialize`,
    async function ($this: fabric.Text, _, options: fabric.TextOptions) {
      const loadFont = async () => {
        if (!options.fontFamily) return $this.initialized()
        await _loadFontOnDocument(options.fontFamily)
        $this.dirty = true

        // clearing fonts width cache
        const fontFamily = $this.fontFamily.toLowerCase()
        delete _fabric.charWidthsCache[fontFamily]

        $this.initDimensions()
        $this.initialized()
      }
      await loadFont()
      $this.on(`${FCOPropertySetEventNamePrefix}fontFamily`, loadFont)
    },
  )
}
