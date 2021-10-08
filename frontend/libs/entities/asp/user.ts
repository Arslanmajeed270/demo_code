import { gql } from '@apollo/client'

// Queries
export const GQLM_USER = gql`
  mutation GqlMUser(
    $firstName: String
    $lastName: String
    $newPassword: String
    $oldPassword: String
  ) {
    user(
      firstName: $firstName
      lastName: $lastName
      newPassword: $newPassword
      oldPassword: $oldPassword
    ) {
      email
      firstName
      id
      lastName
      organizations {
        createdAt
        id
        name
        updatedAt
        users {
          email
          firstName
          id
          lastName
          organizations {
            createdAt
            id
            name
            updatedAt
          }
          status
        }
      }
      status
    }
  }
`
export const GQL_INITIAL_USER_DATA = gql`
  query GqlInitialUserData {
    user {
      email
      firstName
      id
      lastName
      organizations {
        createdAt
        id
        name
        updatedAt
        users {
          email
          firstName
          id
          lastName
          organizations {
            createdAt
            id
            name
            updatedAt
          }
          status
        }
      }
      status
    }
    myOrganizationList {
      createdAt
      id
      name
      updatedAt
      users {
        email
        firstName
        id
        lastName
        organizations {
          createdAt
          id
          name
          updatedAt
          users {
            email
            firstName
            id
            lastName
            status
          }
        }
        status
      }
    }
  }
`
