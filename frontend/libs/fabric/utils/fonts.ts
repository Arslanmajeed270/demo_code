import { GOOGLE_FONTS_API } from '../'
import { GqlMagicFonts_magicFonts } from '@lib/gqlTypes/emz'
import FontFaceObserver from 'fontfaceobserver'

const loadedFonts = []
export const loadFontsOnDocument = async (
  fontsToLoad: GqlMagicFonts_magicFonts[],
): Promise<unknown[]> => {
  const loadFont = (
    fontToLoad: GqlMagicFonts_magicFonts,
    callbackOnLoad: (value: unknown) => void,
    callbackOnError: () => void,
  ) => {
    // If we found that found is already loaded then we return
    if (loadedFonts.find((loadedFont) => loadedFont === fontToLoad.family))
      return
    const link = document.createElement(`link`)
    const variantsToLoad: {
      weight: number
      italic: boolean
    }[] = fontToLoad.variants
      .map((variant) => {
        const isItalic = variant.indexOf(`italic`) !== -1
        const weight = isItalic ? variant.replace(`italic`, ``) : variant
        return {
          weight: parseInt(weight),
          italic: isItalic,
        }
      })
      .filter((variant) => !isNaN(variant.weight))
      .sort((a, b) => a.weight - b.weight) // Asscending Order
      .sort((a, b) => (a.italic ? 1 : 0) - (b.italic ? 1 : 0)) // Asscending Order
    const weights = variantsToLoad.reduce((weights, variant, index, array) => {
      return (
        `${weights}${variant.italic ? `1` : `0`},${variant.weight}` +
        (index === array.length - 1 ? `` : `;`)
      )
    }, ``)
    link.rel = `stylesheet`
    link.type = `text/css`
    link.href =
      GOOGLE_FONTS_API +
      fontToLoad.family +
      (weights ? `:ital,wght@${weights}` : ``)
    loadedFonts.push(fontToLoad.family)

    document.head.appendChild(link)

    const font = new FontFaceObserver(fontToLoad.family)

    font.load(null, 10000).then(callbackOnLoad, callbackOnError)
  }
  const promises = fontsToLoad.map(
    (fontToLoad) =>
      new Promise((resolve, reject) => loadFont(fontToLoad, resolve, reject)),
  )
  return Promise.all(promises)
}
