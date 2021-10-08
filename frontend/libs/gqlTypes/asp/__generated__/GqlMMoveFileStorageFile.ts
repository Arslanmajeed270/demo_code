/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { MediaType, MediaState } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GqlMMoveFileStorageFile
// ====================================================

export interface GqlMMoveFileStorageFile_moveFileStorageFile_media_files_data_MediaFileAudioMimeDataDto {
  __typename: "MediaFileAudioMimeDataDto";
  duration: number;
  type: MediaType;
}

export interface GqlMMoveFileStorageFile_moveFileStorageFile_media_files_data_MediaFileImageMimeDataDto {
  __typename: "MediaFileImageMimeDataDto";
  aspectRatio: number;
  height: number;
  type: MediaType;
  width: number;
}

export interface GqlMMoveFileStorageFile_moveFileStorageFile_media_files_data_MediaFileVideoMimeDataDto {
  __typename: "MediaFileVideoMimeDataDto";
  aspectRatio: number;
  bitRate: number | null;
  codecName: string | null;
  duration: number;
  height: number;
  type: MediaType;
  width: number;
}

export type GqlMMoveFileStorageFile_moveFileStorageFile_media_files_data = GqlMMoveFileStorageFile_moveFileStorageFile_media_files_data_MediaFileAudioMimeDataDto | GqlMMoveFileStorageFile_moveFileStorageFile_media_files_data_MediaFileImageMimeDataDto | GqlMMoveFileStorageFile_moveFileStorageFile_media_files_data_MediaFileVideoMimeDataDto;

export interface GqlMMoveFileStorageFile_moveFileStorageFile_media_files {
  __typename: "MediaFileDto";
  data: GqlMMoveFileStorageFile_moveFileStorageFile_media_files_data;
  fileName: string;
  mimeType: string;
  original: boolean;
  s3SignedUrl: string;
  size: number;
}

export interface GqlMMoveFileStorageFile_moveFileStorageFile_media {
  __typename: "MediaDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  files: (GqlMMoveFileStorageFile_moveFileStorageFile_media_files | null)[];
  name: string | null;
  orgId: GraphqlScalarType.Uuid | null;
  public: boolean;
  state: MediaState;
  totalSize: number;
  type: MediaType;
  updatedAt: GraphqlScalarType.DateTime;
  userId: GraphqlScalarType.Uuid;
}

export interface GqlMMoveFileStorageFile_moveFileStorageFile {
  __typename: "FileStorageFileDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  fileMediaId: GraphqlScalarType.ObjectId;
  media: GqlMMoveFileStorageFile_moveFileStorageFile_media;
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

export interface GqlMMoveFileStorageFile {
  moveFileStorageFile: GqlMMoveFileStorageFile_moveFileStorageFile;
}

export interface GqlMMoveFileStorageFileVariables {
  _id: GraphqlScalarType.ObjectId;
  targetFileStorageId?: GraphqlScalarType.ObjectId | null;
  targetOrgId?: GraphqlScalarType.Uuid | null;
}
