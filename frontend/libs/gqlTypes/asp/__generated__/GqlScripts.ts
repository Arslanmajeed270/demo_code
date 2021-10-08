/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { FilterScriptArgsDto, PaginationDto, ScriptLanguage } from "./globalTypes";

// ====================================================
// GraphQL query operation: GqlScripts
// ====================================================

export interface GqlScripts_scripts {
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

export interface GqlScripts {
  scripts: GqlScripts_scripts[];
}

export interface GqlScriptsVariables {
  filter?: FilterScriptArgsDto | null;
  pagination?: PaginationDto | null;
}
