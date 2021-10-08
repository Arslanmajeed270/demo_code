/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { ScriptLanguage } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GqlMUpdateScript
// ====================================================

export interface GqlMUpdateScript_updateScript {
  __typename: "Script";
  _id: GraphqlScalarType.ObjectId;
  code: string;
  createdAt: GraphqlScalarType.DateTime;
  language: ScriptLanguage;
  orgId: GraphqlScalarType.Uuid;
  public: boolean;
  title: string;
  updatedAt: GraphqlScalarType.DateTime;
  userId: GraphqlScalarType.Uuid;
}

export interface GqlMUpdateScript {
  updateScript: GqlMUpdateScript_updateScript;
}

export interface GqlMUpdateScriptVariables {
  _id: GraphqlScalarType.ObjectId;
  code?: string | null;
  title?: string | null;
}
