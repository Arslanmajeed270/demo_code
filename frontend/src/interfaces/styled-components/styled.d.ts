// #region Global Imports
import 'styled-components'
// #endregion Global Imports
type CommonColors = `transparent` | `darkGrey` | `blackGrey` | `white`

type ExtendedColors =
  | CommonColors
  | `toggleBorder`
  | `gradient`
  | `background`
  | `headerBg`
  | `cardsBg`
  | `textColor`
  | `dodgerBlue`

// eslint-disable-next-line quotes
declare module 'styled-components' {
  export interface BaseTheme {
    colors: Record<CommonColors, string>
  }

  export interface DefaultTheme extends BaseTheme {
    colors: Record<ExtendedColors, string>
  }
}
