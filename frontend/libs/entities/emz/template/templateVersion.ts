import { gql } from '@apollo/client'

export const GQLM_DELETE_TEMPLATE_VERSION = gql`
  mutation GqlMDeleteTemplateVersion($_id: ObjectId!, $version: Float!) {
    deleteTemplateVersion(_id: $_id, version: $version) {
      message
      success
    }
  }
`
export const GQLM_TEMPLATE_VERSION = gql`
  mutation GqlMTemplateVersion(
    $magicTemplate: MagicTemplateInputDto!
    $templateId: ObjectId!
    $templateVariablesSchema: FormSchemaInput
  ) {
    templateVersion(
      magicTemplate: $magicTemplate
      templateId: $templateId
      templateVariablesSchema: $templateVariablesSchema
    ) {
      _id
      createdAt
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
      previewUrl
      published
      templateId
      templateVariablesSchema {
        jsonSchema
        uiSchema
      }
      updatedAt
      userId
      version
    }
  }
`
export const GQLM_UPDATE_TEMPLATE_VERSION = gql`
  mutation GqlMUpdateTemplateVersion(
    $magicTemplate: MagicTemplateInputDto!
    $templateId: ObjectId!
    $templateVariablesSchema: FormSchemaInput
    $version: Float!
  ) {
    updateTemplateVersion(
      magicTemplate: $magicTemplate
      templateId: $templateId
      templateVariablesSchema: $templateVariablesSchema
      version: $version
    ) {
      _id
      createdAt
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
      previewUrl
      published
      templateId
      templateVariablesSchema {
        jsonSchema
        uiSchema
      }
      updatedAt
      userId
      version
    }
  }
`

export const GQL_TEMPLATE_VERSION = gql`
  query GqlTemplateVersion($_id: ObjectId!, $version: Float!) {
    templateVersion(_id: $_id, version: $version) {
      _id
      createdAt
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
      previewUrl
      published
      templateId
      templateVariablesSchema {
        jsonSchema
        uiSchema
      }
      updatedAt
      user {
        email
        firstName
        id
        lastName
        status
      }
      userId
      version
    }
  }
`
export const GQL_TEMPLATE_VERSIONS = gql`
  query GqlTemplateVersions($_id: ObjectId!) {
    templateVersions(_id: $_id) {
      _id
      activeVersion
      category
      createdAt
      orgId
      public
      templateVersions {
        _id
        createdAt
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
        previewUrl
        published
        templateId
        templateVariablesSchema {
          jsonSchema
          uiSchema
        }
        updatedAt
        userId
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
