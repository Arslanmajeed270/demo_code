/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MagicEmImageSources } from "./globalTypes";

// ====================================================
// GraphQL query operation: GqlMagicEMImages
// ====================================================

export interface GqlMagicEMImages_magicEMImages_urls {
  __typename: "getMagicEMImagesUrlResDto";
  thumbnail: string;
  primary: string;
  secondary: string;
}

export interface GqlMagicEMImages_magicEMImages {
  __typename: "MagicEMImagesResDto";
  title: string | null;
  description: string | null;
  height: number;
  urls: GqlMagicEMImages_magicEMImages_urls;
  width: number;
  source: MagicEmImageSources;
}

export interface GqlMagicEMImages {
  magicEMImages: GqlMagicEMImages_magicEMImages[];
}

export interface GqlMagicEMImagesVariables {
  page: number;
  limit?: number | null;
  searchQuery?: string | null;
}
