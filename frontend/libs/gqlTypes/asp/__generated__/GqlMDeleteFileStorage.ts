/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

// ====================================================
// GraphQL mutation operation: GqlMDeleteFileStorage
// ====================================================

export interface GqlMDeleteFileStorage_deleteFileStorage {
  __typename: "MutationResponseDto";
  message: string | null;
  success: boolean;
}

export interface GqlMDeleteFileStorage {
  deleteFileStorage: GqlMDeleteFileStorage_deleteFileStorage;
}

export interface GqlMDeleteFileStorageVariables {
  _id: GraphqlScalarType.ObjectId;
}
