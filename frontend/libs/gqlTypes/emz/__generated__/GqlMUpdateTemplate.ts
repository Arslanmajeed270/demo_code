/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { EmeezoTemplateCategory } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GqlMUpdateTemplate
// ====================================================

export interface GqlMUpdateTemplate_updateTemplate {
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

export interface GqlMUpdateTemplate {
  updateTemplate: GqlMUpdateTemplate_updateTemplate;
}

export interface GqlMUpdateTemplateVariables {
  _id: GraphqlScalarType.ObjectId;
  activeVersion?: number | null;
  category?: EmeezoTemplateCategory | null;
  orgId: GraphqlScalarType.Uuid;
  public?: boolean | null;
  title?: string | null;
}
