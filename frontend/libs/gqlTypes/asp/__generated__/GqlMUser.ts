/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { UserStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GqlMUser
// ====================================================

export interface GqlMUser_user_organizations_users_organizations {
  __typename: "OrganizationDto";
  createdAt: GraphqlScalarType.DateTime;
  id: GraphqlScalarType.Uuid;
  name: string;
  updatedAt: GraphqlScalarType.DateTime;
}

export interface GqlMUser_user_organizations_users {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: GraphqlScalarType.Uuid;
  lastName: string;
  organizations: (GqlMUser_user_organizations_users_organizations | null)[] | null;
  status: UserStatus;
}

export interface GqlMUser_user_organizations {
  __typename: "OrganizationDto";
  createdAt: GraphqlScalarType.DateTime;
  id: GraphqlScalarType.Uuid;
  name: string;
  updatedAt: GraphqlScalarType.DateTime;
  users: (GqlMUser_user_organizations_users | null)[] | null;
}

export interface GqlMUser_user {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: GraphqlScalarType.Uuid;
  lastName: string;
  organizations: (GqlMUser_user_organizations | null)[] | null;
  status: UserStatus;
}

export interface GqlMUser {
  user: GqlMUser_user;
}

export interface GqlMUserVariables {
  firstName?: string | null;
  lastName?: string | null;
  newPassword?: string | null;
  oldPassword?: string | null;
}
