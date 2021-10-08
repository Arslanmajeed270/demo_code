/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GqlMagicEMAudios
// ====================================================

export interface GqlMagicEMAudios_magicEMAudios {
  __typename: "MagicEMAudioResDto";
  uri: string;
  title: string;
}

export interface GqlMagicEMAudios {
  magicEMAudios: GqlMagicEMAudios_magicEMAudios[];
}

export interface GqlMagicEMAudiosVariables {
  offset?: string | null;
  limit?: string | null;
  query?: string | null;
}
