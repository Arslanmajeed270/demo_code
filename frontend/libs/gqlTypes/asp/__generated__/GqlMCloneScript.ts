/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { ScriptLanguage } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GqlMCloneScript
// ====================================================

export interface GqlMCloneScript_cloneScript {
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

export interface GqlMCloneScript {
  cloneScript: GqlMCloneScript_cloneScript;
}

export interface GqlMCloneScriptVariables {
  _id: GraphqlScalarType.ObjectId;
  orgId: GraphqlScalarType.Uuid;
}
