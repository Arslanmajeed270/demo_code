import { gql } from '@apollo/client'

export const GQLM_DELETE_VIDEO = gql`
  mutation GqlMDeleteVideo($_id: ObjectId!) {
    deleteVideo(_id: $_id) {
      message
      success
    }
  }
`
export const GQLM_UPDATE_VIDEO = gql`
  mutation GqlMUpdateVideo(
    $_id: ObjectId!
    $public: Boolean
    $slug: String
    $title: String
  ) {
    updateVideo(_id: $_id, public: $public, slug: $slug, title: $title) {
      _id
      createdAt
      errorMessage
      fileStorageFile {
        _id
        createdAt
        fileMediaId
        media {
          _id
          createdAt
          files {
            data {
              ... on MediaFileAudioMimeDataDto {
                duration
                type
              }
              ... on MediaFileImageMimeDataDto {
                aspectRatio
                height
                type
                width
              }
              ... on MediaFileVideoMimeDataDto {
                aspectRatio
                bitRate
                codecName
                duration
                height
                type
                width
              }
            }
            fileName
            mimeType
            original
            s3SignedUrl
            size
          }
          name
          orgId
          public
          state
          totalSize
          type
          updatedAt
          userId
        }
        mediaType
        name
        orgId
        parentFileStorageId
        public
        readonly
        totalSize
        updatedAt
        userId
      }
      fileStorageFileId
      magicTemplate {
        _id
        audio {
          file {
            ... on MagicTemplateSourceFileUri {
              type
              url
            }
            ... on MagicTemplateSourceMedia {
              mediaId
              type
            }
          }
          loopAudio
          outputVolume
        }
        clips {
          ... on MagicTemplateClipCanvas {
            _id
            background
            duration
            objects
            type
          }
          ... on MagicTemplateClipSimple {
            _id
            background
            duration
            type
          }
        }
        createdAt
        fps
        height
        scripts {
          _id
          inputData
          object {
            _id
            code
            createdAt
            language
            orgId
            public
            title
            updatedAt
            userId
          }
        }
        updatedAt
        width
      }
      orgId
      public
      purpose
      slug
      status
      template {
        _id
        title
        variables
        version
      }
      title
      updatedAt
      user {
        email
        firstName
        id
        lastName
        status
      }
      userId
    }
  }
`
export const GQLM_VIDEO = gql`
  mutation GqlMVideo(
    $magicTemplate: MagicTemplateInputDto
    $orgId: Uuid!
    $public: Boolean
    $purpose: EmeezoVideoPurpose!
    $slug: String
    $template: EmzVideoTemplateInputDto
    $title: String
  ) {
    video(
      magicTemplate: $magicTemplate
      orgId: $orgId
      public: $public
      purpose: $purpose
      slug: $slug
      template: $template
      title: $title
    ) {
      _id
      createdAt
      errorMessage
      fileStorageFile {
        _id
        createdAt
        fileMediaId
        media {
          _id
          createdAt
          files {
            data {
              ... on MediaFileAudioMimeDataDto {
                duration
                type
              }
              ... on MediaFileImageMimeDataDto {
                aspectRatio
                height
                type
                width
              }
              ... on MediaFileVideoMimeDataDto {
                aspectRatio
                bitRate
                codecName
                duration
                height
                type
                width
              }
            }
            fileName
            mimeType
            original
            s3SignedUrl
            size
          }
          name
          orgId
          public
          state
          totalSize
          type
          updatedAt
          userId
        }
        mediaType
        name
        orgId
        parentFileStorageId
        public
        readonly
        totalSize
        updatedAt
        userId
      }
      fileStorageFileId
      magicTemplate {
        _id
        audio {
          file {
            ... on MagicTemplateSourceFileUri {
              type
              url
            }
            ... on MagicTemplateSourceMedia {
              mediaId
              type
            }
          }
          loopAudio
          outputVolume
        }
        clips {
          ... on MagicTemplateClipCanvas {
            _id
            background
            duration
            objects
            type
          }
          ... on MagicTemplateClipSimple {
            _id
            background
            duration
            type
          }
        }
        createdAt
        fps
        height
        scripts {
          _id
          inputData
          object {
            _id
            code
            createdAt
            language
            orgId
            public
            title
            updatedAt
            userId
          }
        }
        updatedAt
        width
      }
      orgId
      public
      purpose
      slug
      status
      template {
        _id
        title
        variables
        version
      }
      title
      updatedAt
      user {
        email
        firstName
        id
        lastName
        status
      }
      userId
    }
  }
`
export const GQL_VIDEO = gql`
  query GqlVideo($_id: ObjectId!) {
    video(_id: $_id) {
      _id
      createdAt
      errorMessage
      fileStorageFile {
        _id
        createdAt
        fileMediaId
        media {
          _id
          createdAt
          files {
            data {
              ... on MediaFileAudioMimeDataDto {
                duration
                type
              }
              ... on MediaFileImageMimeDataDto {
                aspectRatio
                height
                type
                width
              }
              ... on MediaFileVideoMimeDataDto {
                aspectRatio
                bitRate
                codecName
                duration
                height
                type
                width
              }
            }
            fileName
            mimeType
            original
            s3SignedUrl
            size
          }
          name
          orgId
          public
          state
          totalSize
          type
          updatedAt
          userId
        }
        mediaType
        name
        orgId
        parentFileStorageId
        public
        readonly
        totalSize
        updatedAt
        userId
      }
      fileStorageFileId
      magicTemplate {
        _id
        audio {
          file {
            ... on MagicTemplateSourceFileUri {
              type
              url
            }
            ... on MagicTemplateSourceMedia {
              mediaId
              type
            }
          }
          loopAudio
          outputVolume
        }
        clips {
          ... on MagicTemplateClipCanvas {
            _id
            background
            duration
            objects
            type
          }
          ... on MagicTemplateClipSimple {
            _id
            background
            duration
            type
          }
        }
        createdAt
        fps
        height
        scripts {
          _id
          inputData
          object {
            _id
            code
            createdAt
            language
            orgId
            public
            title
            updatedAt
            userId
          }
        }
        updatedAt
        width
      }
      orgId
      public
      purpose
      slug
      status
      template {
        _id
        title
        variables
        version
      }
      title
      updatedAt
      user {
        email
        firstName
        id
        lastName
        status
      }
      userId
    }
  }
`
export const GQL_VIDEOS = gql`
  query GqlVideos($filter: GetVideosFilterReqDto) {
    videos(filter: $filter) {
      _id
      createdAt
      errorMessage
      fileStorageFile {
        _id
        createdAt
        fileMediaId
        media {
          _id
          createdAt
          files {
            data {
              ... on MediaFileAudioMimeDataDto {
                duration
                type
              }
              ... on MediaFileImageMimeDataDto {
                aspectRatio
                height
                type
                width
              }
              ... on MediaFileVideoMimeDataDto {
                aspectRatio
                bitRate
                codecName
                duration
                height
                type
                width
              }
            }
            fileName
            mimeType
            original
            s3SignedUrl
            size
          }
          name
          orgId
          public
          state
          totalSize
          type
          updatedAt
          userId
        }
        mediaType
        name
        orgId
        parentFileStorageId
        public
        readonly
        totalSize
        updatedAt
        userId
      }
      fileStorageFileId
      magicTemplate {
        _id
        audio {
          file {
            ... on MagicTemplateSourceFileUri {
              type
              url
            }
            ... on MagicTemplateSourceMedia {
              mediaId
              type
            }
          }
          loopAudio
          outputVolume
        }
        clips {
          ... on MagicTemplateClipCanvas {
            _id
            background
            duration
            objects
            type
          }
          ... on MagicTemplateClipSimple {
            _id
            background
            duration
            type
          }
        }
        createdAt
        fps
        height
        scripts {
          _id
          inputData
          object {
            _id
            code
            createdAt
            language
            orgId
            public
            title
            updatedAt
            userId
          }
        }
        updatedAt
        width
      }
      orgId
      public
      purpose
      slug
      status
      template {
        _id
        title
        variables
        version
      }
      title
      updatedAt
      user {
        email
        firstName
        id
        lastName
        status
      }
      userId
    }
  }
`
export const GQL_VIDEO_BY_SLUG = gql`
  query GqlVideoBySlug($slug: String!) {
    videoBySlug(slug: $slug) {
      _id
      createdAt
      errorMessage
      fileStorageFile {
        _id
        createdAt
        fileMediaId
        media {
          _id
          createdAt
          files {
            data {
              ... on MediaFileAudioMimeDataDto {
                duration
                type
              }
              ... on MediaFileImageMimeDataDto {
                aspectRatio
                height
                type
                width
              }
              ... on MediaFileVideoMimeDataDto {
                aspectRatio
                bitRate
                codecName
                duration
                height
                type
                width
              }
            }
            fileName
            mimeType
            original
            s3SignedUrl
            size
          }
          name
          orgId
          public
          state
          totalSize
          type
          updatedAt
          userId
        }
        mediaType
        name
        orgId
        parentFileStorageId
        public
        readonly
        totalSize
        updatedAt
        userId
      }
      fileStorageFileId
      magicTemplate {
        _id
        audio {
          file {
            ... on MagicTemplateSourceFileUri {
              type
              url
            }
            ... on MagicTemplateSourceMedia {
              mediaId
              type
            }
          }
          loopAudio
          outputVolume
        }
        clips {
          ... on MagicTemplateClipCanvas {
            _id
            background
            duration
            objects
            type
          }
          ... on MagicTemplateClipSimple {
            _id
            background
            duration
            type
          }
        }
        createdAt
        fps
        height
        scripts {
          _id
          inputData
          object {
            _id
            code
            createdAt
            language
            orgId
            public
            title
            updatedAt
            userId
          }
        }
        updatedAt
        width
      }
      orgId
      public
      purpose
      slug
      status
      template {
        _id
        title
        variables
        version
      }
      title
      updatedAt
      user {
        email
        firstName
        id
        lastName
        status
      }
      userId
    }
  }
`
