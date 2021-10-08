/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

// ====================================================
// GraphQL mutation operation: GqlMCopyFileStorage
// ====================================================

export interface GqlMCopyFileStorage_copyFileStorage {
  __typename: "FileStorageDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  name: string;
  orgId: GraphqlScalarType.Uuid | null;
  parentFileStorageId: GraphqlScalarType.ObjectId | null;
  public: boolean;
  readonly: boolean;
  totalSize: number;
  updatedAt: GraphqlScalarType.DateTime;
  userId: GraphqlScalarType.Uuid;
}

export interface GqlMCopyFileStorage {
  copyFileStorage: GqlMCopyFileStorage_copyFileStorage;
}

export interface GqlMCopyFileStorageVariables {
  _id: GraphqlScalarType.ObjectId;
  targetFileStorageId?: GraphqlScalarType.ObjectId | null;
  targetOrgId?: GraphqlScalarType.Uuid | null;
}
