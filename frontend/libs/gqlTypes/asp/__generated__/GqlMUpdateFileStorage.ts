/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

// ====================================================
// GraphQL mutation operation: GqlMUpdateFileStorage
// ====================================================

export interface GqlMUpdateFileStorage_updateFileStorage {
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

export interface GqlMUpdateFileStorage {
  updateFileStorage: GqlMUpdateFileStorage_updateFileStorage;
}

export interface GqlMUpdateFileStorageVariables {
  _id: GraphqlScalarType.ObjectId;
  name?: string | null;
  parentFileStorageId?: GraphqlScalarType.ObjectId | null;
  public?: boolean | null;
}
