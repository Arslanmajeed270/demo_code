import { gql } from '@apollo/client'
export const GQLM_TEMPLATE = gql`
  mutation GqlMTemplate(
    $category: EmeezoTemplateCategory
    $orgId: Uuid!
    $public: Boolean!
    $title: String!
  ) {
    template(
      category: $category
      orgId: $orgId
      public: $public
      title: $title
    ) {
      _id
      activeVersion
      category
      createdAt
      orgId
      public
      title
      updatedAt
      userId
    }
  }
`

export const GQLM_CLONE_TEMPLATE = gql`
  mutation GqlMCloneTemplate($_id: ObjectId!, $orgId: Uuid!, $version: Float) {
    cloneTemplate(_id: $_id, orgId: $orgId, version: $version) {
      _id
      activeVersion
      category
      createdAt
      orgId
      public
      templateVersion {
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
export const GQLM_PUBLISH_TEMPLATE = gql`
  mutation GqlMPublishTemplate($_id: ObjectId!, $version: Float!) {
    publishTemplate(_id: $_id, version: $version) {
      message
      success
    }
  }
`
export const GQLM_UPDATE_TEMPLATE = gql`
  mutation GqlMUpdateTemplate(
    $_id: ObjectId!
    $activeVersion: Float
    $category: EmeezoTemplateCategory
    $orgId: Uuid!
    $public: Boolean
    $title: String
  ) {
    updateTemplate(
      _id: $_id
      activeVersion: $activeVersion
      category: $category
      orgId: $orgId
      public: $public
      title: $title
    ) {
      _id
      activeVersion
      category
      createdAt
      orgId
      public
      title
      updatedAt
      userId
    }
  }
`
export const GQL_TEMPLATES = gql`
  query GqlTemplates($filter: GetTemplatesSearchReqDto) {
    templates(filter: $filter) {
      _id
      activeVersion
      category
      createdAt
      orgId
      public
      templateVersion {
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
export const GQL_TEMPLATE = gql`
  query GqlTemplate(
    $_id: ObjectId!
    $clone: QueryTemplateCloneReqDto
    $templateVersionNo: Float
  ) {
    template(_id: $_id, clone: $clone, templateVersionNo: $templateVersionNo) {
      _id
      activeVersion
      category
      createdAt
      orgId
      public
      templateVersion {
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
