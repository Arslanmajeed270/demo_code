import { gql } from '@apollo/client'

export const GQLM_COPY_FILE_STORAGE = gql`
  mutation GqlMCopyFileStorage(
    $_id: ObjectId!
    $targetFileStorageId: ObjectId
    $targetOrgId: Uuid
  ) {
    copyFileStorage(
      _id: $_id
      targetFileStorageId: $targetFileStorageId
      targetOrgId: $targetOrgId
    ) {
      _id
      createdAt
      name
      orgId
      parentFileStorageId
      public
      readonly
      totalSize
      updatedAt
      userId
    }
  }
`
export const GQLM_COPY_FILE_STORAGE_FILE = gql`
  mutation GqlMCopyFileStorageFile(
    $_id: ObjectId!
    $targetFileStorageId: ObjectId
    $targetOrgId: Uuid
  ) {
    copyFileStorageFile(
      _id: $_id
      targetFileStorageId: $targetFileStorageId
      targetOrgId: $targetOrgId
    ) {
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
  }
`
export const GQLM_FILE_STORAGE = gql`
  mutation GqlMFileStorage(
    $name: String!
    $orgId: Uuid
    $parentFileStorageId: ObjectId
    $public: Boolean
  ) {
    fileStorage(
      name: $name
      orgId: $orgId
      parentFileStorageId: $parentFileStorageId
      public: $public
    ) {
      fileStorage {
        _id
        createdAt
        name
        orgId
        parentFileStorageId
        public
        readonly
        totalSize
        updatedAt
        userId
      }
      fileStorageAncestors {
        _id
        createdAt
        name
        orgId
        parentFileStorageId
        public
        readonly
        totalSize
        updatedAt
        userId
      }
      fileStorageChildren {
        _id
        createdAt
        name
        orgId
        parentFileStorageId
        public
        readonly
        totalSize
        updatedAt
        userId
      }
      files {
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
    }
  }
`
export const GQLM_DELETE_FILE_STORAGE = gql`
  mutation GqlMDeleteFileStorage($_id: ObjectId!) {
    deleteFileStorage(_id: $_id) {
      message
      success
    }
  }
`
export const GQLM_DELETE_FILE_STORAGE_FILE = gql`
  mutation GqlMDeleteFileStorageFile($_id: ObjectId!) {
    deleteFileStorageFile(_id: $_id) {
      message
      success
    }
  }
`
export const GQL_FILE_STORAGE = gql`
  query GqlFileStorage(
    $_id: ObjectId
    $orgId: Uuid
    $search: SearchFileStorageReqDto
  ) {
    fileStorage(_id: $_id, orgId: $orgId, search: $search) {
      fileStorage {
        _id
        createdAt
        name
        orgId
        parentFileStorageId
        public
        readonly
        totalSize
        updatedAt
        userId
      }
      fileStorageAncestors {
        _id
        createdAt
        name
        orgId
        parentFileStorageId
        public
        readonly
        totalSize
        updatedAt
        userId
      }
      fileStorageChildren {
        _id
        createdAt
        name
        orgId
        parentFileStorageId
        public
        readonly
        totalSize
        updatedAt
        userId
      }
      files {
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
    }
  }
`
export const GQLM_MEDIA_UPLOAD_REQUEST_UPLOADED = gql`
  mutation GqlMMediaUploadRequestUploaded($_id: ObjectId!) {
    mediaUploadRequestUploaded(_id: $_id) {
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
  }
`
export const GQLM_MEDIA_UPLOAD_REQUEST = gql`
  mutation GqlMMediaUploadRequest(
    $name: String
    $orgId: Uuid
    $parentFileStorageId: ObjectId
    $public: Boolean
    $purpose: MediaUploadRequestPurpose
    $type: MediaType!
  ) {
    mediaUploadRequest(
      name: $name
      orgId: $orgId
      parentFileStorageId: $parentFileStorageId
      public: $public
      purpose: $purpose
      type: $type
    ) {
      _id
      createdAt
      errorMessage
      name
      orgId
      parentFileStorageId
      presignedPost {
        fields
        url
      }
      public
      purpose
      state
      type
      updatedAt
      userId
    }
  }
`
export const GQLM_MOVE_FILE_STORAGE = gql`
  mutation GqlMMoveFileStorage(
    $_id: ObjectId!
    $targetFileStorageId: ObjectId
    $targetOrgId: Uuid
  ) {
    moveFileStorage(
      _id: $_id
      targetFileStorageId: $targetFileStorageId
      targetOrgId: $targetOrgId
    ) {
      _id
      createdAt
      name
      orgId
      parentFileStorageId
      public
      readonly
      totalSize
      updatedAt
      userId
    }
  }
`
export const GQLM_MOVE_FILE_STORAGE_FILE = gql`
  mutation GqlMMoveFileStorageFile(
    $_id: ObjectId!
    $targetFileStorageId: ObjectId
    $targetOrgId: Uuid
  ) {
    moveFileStorageFile(
      _id: $_id
      targetFileStorageId: $targetFileStorageId
      targetOrgId: $targetOrgId
    ) {
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
  }
`
export const GQLM_UPDATE_FILE_STORAGE = gql`
  mutation GqlMUpdateFileStorage(
    $_id: ObjectId!
    $name: String
    $parentFileStorageId: ObjectId
    $public: Boolean
  ) {
    updateFileStorage(
      _id: $_id
      name: $name
      parentFileStorageId: $parentFileStorageId
      public: $public
    ) {
      _id
      createdAt
      name
      orgId
      parentFileStorageId
      public
      readonly
      totalSize
      updatedAt
      userId
    }
  }
`
export const GQLM_UPDATE_FILE_STORAGE_FILE = gql`
  mutation GqlMUpdateFileStorageFile(
    $_id: ObjectId!
    $name: String
    $public: Boolean
  ) {
    updateFileStorageFile(_id: $_id, name: $name, public: $public) {
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
  }
`
