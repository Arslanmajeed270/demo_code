import { gql } from 'graphql-tag'

export const GQL_DEV_PROJECT_PUBLIC = gql`
  query GqlDevProjectPublic($_id: ObjectId!) {
    devProjectPublic(_id: $_id) {
      _id
      isWebhookDefined
      orgId
      projectName
    }
  }
`
