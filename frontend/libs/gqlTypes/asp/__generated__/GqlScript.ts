/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { ScriptLanguage } from "./globalTypes";

// ====================================================
// GraphQL query operation: GqlScript
// ====================================================

export interface GqlScript_script {
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

export interface GqlScript {
  script: GqlScript_script;
}

export interface GqlScriptVariables {
  _id: GraphqlScalarType.ObjectId;
}
