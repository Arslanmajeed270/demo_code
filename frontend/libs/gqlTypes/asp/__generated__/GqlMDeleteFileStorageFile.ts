/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

// ====================================================
// GraphQL mutation operation: GqlMDeleteFileStorageFile
// ====================================================

export interface GqlMDeleteFileStorageFile_deleteFileStorageFile {
  __typename: "MutationResponseDto";
  message: string | null;
  success: boolean;
}

export interface GqlMDeleteFileStorageFile {
  deleteFileStorageFile: GqlMDeleteFileStorageFile_deleteFileStorageFile;
}

export interface GqlMDeleteFileStorageFileVariables {
  _id: GraphqlScalarType.ObjectId;
}
