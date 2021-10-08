/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { SearchFileStorageReqDto, MediaType, MediaState } from "./globalTypes";

// ====================================================
// GraphQL query operation: GqlFileStorage
// ====================================================

export interface GqlFileStorage_fileStorage_fileStorage {
  __typename: "FileStorageDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  name: string;
  orgId: GraphqlScalarType.Uuid | null;
  parentFileStorageId: GraphqlScalarType.ObjectId | null;
  public: boolean;
  readonly: boolean;
  totalSize: number;
  updatedAt: GraphqlScalarType.DateTime;
  userId: GraphqlScalarType.Uuid;
}

export interface GqlFileStorage_fileStorage_fileStorageAncestors {
  __typename: "FileStorageDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  name: string;
  orgId: GraphqlScalarType.Uuid | null;
  parentFileStorageId: GraphqlScalarType.ObjectId | null;
  public: boolean;
  readonly: boolean;
  totalSize: number;
  updatedAt: GraphqlScalarType.DateTime;
  userId: GraphqlScalarType.Uuid;
}

export interface GqlFileStorage_fileStorage_fileStorageChildren {
  __typename: "FileStorageDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  name: string;
  orgId: GraphqlScalarType.Uuid | null;
  parentFileStorageId: GraphqlScalarType.ObjectId | null;
  public: boolean;
  readonly: boolean;
  totalSize: number;
  updatedAt: GraphqlScalarType.DateTime;
  userId: GraphqlScalarType.Uuid;
}

export interface GqlFileStorage_fileStorage_files_media_files_data_MediaFileAudioMimeDataDto {
  __typename: "MediaFileAudioMimeDataDto";
  duration: number;
  type: MediaType;
}

export interface GqlFileStorage_fileStorage_files_media_files_data_MediaFileImageMimeDataDto {
  __typename: "MediaFileImageMimeDataDto";
  aspectRatio: number;
  height: number;
  type: MediaType;
  width: number;
}

export interface GqlFileStorage_fileStorage_files_media_files_data_MediaFileVideoMimeDataDto {
  __typename: "MediaFileVideoMimeDataDto";
  aspectRatio: number;
  bitRate: number | null;
  codecName: string | null;
  duration: number;
  height: number;
  type: MediaType;
  width: number;
}

export type GqlFileStorage_fileStorage_files_media_files_data = GqlFileStorage_fileStorage_files_media_files_data_MediaFileAudioMimeDataDto | GqlFileStorage_fileStorage_files_media_files_data_MediaFileImageMimeDataDto | GqlFileStorage_fileStorage_files_media_files_data_MediaFileVideoMimeDataDto;

export interface GqlFileStorage_fileStorage_files_media_files {
  __typename: "MediaFileDto";
  data: GqlFileStorage_fileStorage_files_media_files_data;
  fileName: string;
  mimeType: string;
  original: boolean;
  s3SignedUrl: string;
  size: number;
}

export interface GqlFileStorage_fileStorage_files_media {
  __typename: "MediaDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  files: (GqlFileStorage_fileStorage_files_media_files | null)[];
  name: string | null;
  orgId: GraphqlScalarType.Uuid | null;
  public: boolean;
  state: MediaState;
  totalSize: number;
  type: MediaType;
  updatedAt: GraphqlScalarType.DateTime;
  userId: GraphqlScalarType.Uuid;
}

export interface GqlFileStorage_fileStorage_files {
  __typename: "FileStorageFileDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  fileMediaId: GraphqlScalarType.ObjectId;
  media: GqlFileStorage_fileStorage_files_media;
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

export interface GqlFileStorage_fileStorage {
  __typename: "FileStorageResDto";
  fileStorage: GqlFileStorage_fileStorage_fileStorage | null;
  fileStorageAncestors: (GqlFileStorage_fileStorage_fileStorageAncestors | null)[];
  fileStorageChildren: (GqlFileStorage_fileStorage_fileStorageChildren | null)[];
  files: (GqlFileStorage_fileStorage_files | null)[];
}

export interface GqlFileStorage {
  fileStorage: GqlFileStorage_fileStorage;
}

export interface GqlFileStorageVariables {
  _id?: GraphqlScalarType.ObjectId | null;
  orgId?: GraphqlScalarType.Uuid | null;
  search?: SearchFileStorageReqDto | null;
}
