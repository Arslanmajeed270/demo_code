/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

// ====================================================
// GraphQL query operation: GqlDevProjectPublic
// ====================================================

export interface GqlDevProjectPublic_devProjectPublic {
  __typename: "DevProjectPublicDto";
  _id: GraphqlScalarType.ObjectId;
  isWebhookDefined: boolean;
  orgId: GraphqlScalarType.Uuid;
  projectName: string;
}

export interface GqlDevProjectPublic {
  devProjectPublic: GqlDevProjectPublic_devProjectPublic;
}

export interface GqlDevProjectPublicVariables {
  _id: GraphqlScalarType.ObjectId;
}
