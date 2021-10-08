/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

// ====================================================
// GraphQL mutation operation: GqlMPublishTemplate
// ====================================================

export interface GqlMPublishTemplate_publishTemplate {
  __typename: "MutationResponseDto";
  message: string | null;
  success: boolean;
}

export interface GqlMPublishTemplate {
  publishTemplate: GqlMPublishTemplate_publishTemplate;
}

export interface GqlMPublishTemplateVariables {
  _id: GraphqlScalarType.ObjectId;
  version: number;
}
