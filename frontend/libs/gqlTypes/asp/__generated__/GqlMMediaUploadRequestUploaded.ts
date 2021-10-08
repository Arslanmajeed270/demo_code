/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { MediaType, MediaState } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GqlMMediaUploadRequestUploaded
// ====================================================

export interface GqlMMediaUploadRequestUploaded_mediaUploadRequestUploaded_media_files_data_MediaFileAudioMimeDataDto {
  __typename: "MediaFileAudioMimeDataDto";
  duration: number;
  type: MediaType;
}

export interface GqlMMediaUploadRequestUploaded_mediaUploadRequestUploaded_media_files_data_MediaFileImageMimeDataDto {
  __typename: "MediaFileImageMimeDataDto";
  aspectRatio: number;
  height: number;
  type: MediaType;
  width: number;
}

export interface GqlMMediaUploadRequestUploaded_mediaUploadRequestUploaded_media_files_data_MediaFileVideoMimeDataDto {
  __typename: "MediaFileVideoMimeDataDto";
  aspectRatio: number;
  bitRate: number | null;
  codecName: string | null;
  duration: number;
  height: number;
  type: MediaType;
  width: number;
}

export type GqlMMediaUploadRequestUploaded_mediaUploadRequestUploaded_media_files_data = GqlMMediaUploadRequestUploaded_mediaUploadRequestUploaded_media_files_data_MediaFileAudioMimeDataDto | GqlMMediaUploadRequestUploaded_mediaUploadRequestUploaded_media_files_data_MediaFileImageMimeDataDto | GqlMMediaUploadRequestUploaded_mediaUploadRequestUploaded_media_files_data_MediaFileVideoMimeDataDto;

export interface GqlMMediaUploadRequestUploaded_mediaUploadRequestUploaded_media_files {
  __typename: "MediaFileDto";
  data: GqlMMediaUploadRequestUploaded_mediaUploadRequestUploaded_media_files_data;
  fileName: string;
  mimeType: string;
  original: boolean;
  s3SignedUrl: string;
  size: number;
}

export interface GqlMMediaUploadRequestUploaded_mediaUploadRequestUploaded_media {
  __typename: "MediaDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  files: (GqlMMediaUploadRequestUploaded_mediaUploadRequestUploaded_media_files | null)[];
  name: string | null;
  orgId: GraphqlScalarType.Uuid | null;
  public: boolean;
  state: MediaState;
  totalSize: number;
  type: MediaType;
  updatedAt: GraphqlScalarType.DateTime;
  userId: GraphqlScalarType.Uuid;
}

export interface GqlMMediaUploadRequestUploaded_mediaUploadRequestUploaded {
  __typename: "FileStorageFileDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  fileMediaId: GraphqlScalarType.ObjectId;
  media: GqlMMediaUploadRequestUploaded_mediaUploadRequestUploaded_media;
  mediaType: string;
  name: string;
  orgId: GraphqlScalarType.Uuid | null;
  parentFileStorageId: GraphqlScalarType.ObjectId | null;
  public: boolean;
  readonly: boolean;
  totalSize: number;
  updatedAt: GraphqlScalarType.DateTime;
  userId: GraphqlScalarType.Uuid;
}

export interface GqlMMediaUploadRequestUploaded {
  mediaUploadRequestUploaded: GqlMMediaUploadRequestUploaded_mediaUploadRequestUploaded;
}

export interface GqlMMediaUploadRequestUploadedVariables {
  _id: GraphqlScalarType.ObjectId;
}
