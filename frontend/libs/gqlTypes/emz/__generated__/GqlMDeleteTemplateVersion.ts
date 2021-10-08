/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

// ====================================================
// GraphQL mutation operation: GqlMDeleteTemplateVersion
// ====================================================

export interface GqlMDeleteTemplateVersion_deleteTemplateVersion {
  __typename: "MutationResponseDto";
  message: string | null;
  success: boolean;
}

export interface GqlMDeleteTemplateVersion {
  deleteTemplateVersion: GqlMDeleteTemplateVersion_deleteTemplateVersion;
}

export interface GqlMDeleteTemplateVersionVariables {
  _id: GraphqlScalarType.ObjectId;
  version: number;
}
