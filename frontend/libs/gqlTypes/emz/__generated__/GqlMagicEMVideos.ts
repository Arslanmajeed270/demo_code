/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MagicEmVideoSources } from "./globalTypes";

// ====================================================
// GraphQL query operation: GqlMagicEMVideos
// ====================================================

export interface GqlMagicEMVideos_magicEMVideos_image {
  __typename: "MagicEMVideosImagesUriResDto";
  primary: string;
  secondary: string;
  thumbnail: string;
}

export interface GqlMagicEMVideos_magicEMVideos_videos {
  __typename: "MagicEMVideosReqDto";
  fileSize: string | null;
  mimeType: string | null;
  quality: string | null;
  height: number;
  width: number;
  uri: string;
}

export interface GqlMagicEMVideos_magicEMVideos_user {
  __typename: "getMagicEMUserDto";
  name: string;
  uri: string | null;
}

export interface GqlMagicEMVideos_magicEMVideos {
  __typename: "MagicEMVideosResDto";
  duration: number;
  image: GqlMagicEMVideos_magicEMVideos_image;
  videos: GqlMagicEMVideos_magicEMVideos_videos[];
  sourceUri: string;
  user: GqlMagicEMVideos_magicEMVideos_user;
  source: MagicEmVideoSources;
}

export interface GqlMagicEMVideos {
  magicEMVideos: GqlMagicEMVideos_magicEMVideos[];
}

export interface GqlMagicEMVideosVariables {
  page: number;
  limit?: number | null;
  searchQuery?: string | null;
}
