/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { UserStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GqlInitialUserData
// ====================================================

export interface GqlInitialUserData_user_organizations_users_organizations {
  __typename: "OrganizationDto";
  createdAt: GraphqlScalarType.DateTime;
  id: GraphqlScalarType.Uuid;
  name: string;
  updatedAt: GraphqlScalarType.DateTime;
}

export interface GqlInitialUserData_user_organizations_users {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: GraphqlScalarType.Uuid;
  lastName: string;
  organizations: (GqlInitialUserData_user_organizations_users_organizations | null)[] | null;
  status: UserStatus;
}

export interface GqlInitialUserData_user_organizations {
  __typename: "OrganizationDto";
  createdAt: GraphqlScalarType.DateTime;
  id: GraphqlScalarType.Uuid;
  name: string;
  updatedAt: GraphqlScalarType.DateTime;
  users: (GqlInitialUserData_user_organizations_users | null)[] | null;
}

export interface GqlInitialUserData_user {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: GraphqlScalarType.Uuid;
  lastName: string;
  organizations: (GqlInitialUserData_user_organizations | null)[] | null;
  status: UserStatus;
}

export interface GqlInitialUserData_myOrganizationList_users_organizations_users {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: GraphqlScalarType.Uuid;
  lastName: string;
  status: UserStatus;
}

export interface GqlInitialUserData_myOrganizationList_users_organizations {
  __typename: "OrganizationDto";
  createdAt: GraphqlScalarType.DateTime;
  id: GraphqlScalarType.Uuid;
  name: string;
  updatedAt: GraphqlScalarType.DateTime;
  users: (GqlInitialUserData_myOrganizationList_users_organizations_users | null)[] | null;
}

export interface GqlInitialUserData_myOrganizationList_users {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: GraphqlScalarType.Uuid;
  lastName: string;
  organizations: (GqlInitialUserData_myOrganizationList_users_organizations | null)[] | null;
  status: UserStatus;
}

export interface GqlInitialUserData_myOrganizationList {
  __typename: "OrganizationDto";
  createdAt: GraphqlScalarType.DateTime;
  id: GraphqlScalarType.Uuid;
  name: string;
  updatedAt: GraphqlScalarType.DateTime;
  users: (GqlInitialUserData_myOrganizationList_users | null)[] | null;
}

export interface GqlInitialUserData {
  user: GqlInitialUserData_user;
  myOrganizationList: GqlInitialUserData_myOrganizationList[];
}
