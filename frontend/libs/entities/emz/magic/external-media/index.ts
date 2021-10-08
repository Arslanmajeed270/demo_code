import { gql } from '@apollo/client'

// Queries
export const GQL_MAGIC_EM_IMAGES = gql`
  query GqlMagicEMImages($page: Float!, $limit: Float, $searchQuery: String) {
    magicEMImages(page: $page, limit: $limit, searchQuery: $searchQuery) {
      title
      description
      height
      urls {
        thumbnail
        primary
        secondary
      }
      width
      source
    }
  }
`

export const GQL_MAGIC_EM_VIDEOS = gql`
  query GqlMagicEMVideos($page: Float!, $limit: Float, $searchQuery: String) {
    magicEMVideos(page: $page, limit: $limit, searchQuery: $searchQuery) {
      duration
      image {
        primary
        secondary
        thumbnail
      }
      videos {
        fileSize
        mimeType
        quality
        height
        width
        uri
      }
      sourceUri
      user {
        name
        uri
      }
      source
    }
  }
`
export const GQL_MAGIC_EM_AUDIOS = gql`
  query GqlMagicEMAudios($offset: String, $limit: String, $query: String) {
    magicEMAudios(offset: $offset, limit: $limit, query: $query) {
      uri
      title
    }
  }
`
