/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

// ====================================================
// GraphQL mutation operation: GqlMMoveFileStorage
// ====================================================

export interface GqlMMoveFileStorage_moveFileStorage {
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

export interface GqlMMoveFileStorage {
  moveFileStorage: GqlMMoveFileStorage_moveFileStorage;
}

export interface GqlMMoveFileStorageVariables {
  _id: GraphqlScalarType.ObjectId;
  targetFileStorageId?: GraphqlScalarType.ObjectId | null;
  targetOrgId?: GraphqlScalarType.Uuid | null;
}
