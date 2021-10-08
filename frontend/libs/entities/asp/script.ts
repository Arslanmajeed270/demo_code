import { gql } from '@apollo/client'

export const GQLM_SCRIPT = gql`
  mutation GqlMScript(
    $code: String!
    $language: ScriptLanguage!
    $orgId: Uuid!
    $public: Boolean!
    $title: String!
  ) {
    script(
      code: $code
      language: $language
      orgId: $orgId
      public: $public
      title: $title
    ) {
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
`
export const GQLM_UPDATE_SCRIPT = gql`
  mutation GqlMUpdateScript($_id: ObjectId!, $code: String, $title: String) {
    updateScript(_id: $_id, code: $code, title: $title) {
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
`

export const GQLM_CLONE_SCRIPT = gql`
  mutation GqlMCloneScript($_id: ObjectId!, $orgId: Uuid!) {
    cloneScript(_id: $_id, orgId: $orgId) {
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
`

export const GQL_SCRIPTS = gql`
  query GqlScripts($filter: FilterScriptArgsDto, $pagination: PaginationDto) {
    scripts(filter: $filter, pagination: $pagination) {
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
`
export const GQL_SCRIPT = gql`
  query GqlScript($_id: ObjectId!) {
    script(_id: $_id) {
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
`
