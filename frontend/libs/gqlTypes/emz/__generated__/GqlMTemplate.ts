/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { EmeezoTemplateCategory } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GqlMTemplate
// ====================================================

export interface GqlMTemplate_template {
  __typename: "Template";
  _id: GraphqlScalarType.ObjectId;
  activeVersion: number | null;
  category: EmeezoTemplateCategory;
  createdAt: GraphqlScalarType.DateTime;
  orgId: GraphqlScalarType.Uuid;
  public: boolean;
  title: string;
  updatedAt: GraphqlScalarType.DateTime;
  userId: GraphqlScalarType.Uuid;
}

export interface GqlMTemplate {
  template: GqlMTemplate_template;
}

export interface GqlMTemplateVariables {
  category?: EmeezoTemplateCategory | null;
  orgId: GraphqlScalarType.Uuid;
  public: boolean;
  title: string;
}
