import { gql } from '@apollo/client'

export const GQL_MAGIC_FONTS = gql`
  query GqlMagicFonts {
    magicFonts {
      family
      variants
    }
  }
`
