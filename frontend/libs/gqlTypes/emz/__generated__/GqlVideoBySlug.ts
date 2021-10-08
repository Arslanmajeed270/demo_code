/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { MediaType, MediaState, MagicTemplateClipType, ScriptLanguage, EmeezoVideoPurpose, EmeezoVideoStatus, UserStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GqlVideoBySlug
// ====================================================

export interface GqlVideoBySlug_videoBySlug_fileStorageFile_media_files_data_MediaFileAudioMimeDataDto {
  __typename: "MediaFileAudioMimeDataDto";
  duration: number;
  type: MediaType;
}

export interface GqlVideoBySlug_videoBySlug_fileStorageFile_media_files_data_MediaFileImageMimeDataDto {
  __typename: "MediaFileImageMimeDataDto";
  aspectRatio: number;
  height: number;
  type: MediaType;
  width: number;
}

export interface GqlVideoBySlug_videoBySlug_fileStorageFile_media_files_data_MediaFileVideoMimeDataDto {
  __typename: "MediaFileVideoMimeDataDto";
  aspectRatio: number;
  bitRate: number | null;
  codecName: string | null;
  duration: number;
  height: number;
  type: MediaType;
  width: number;
}

export type GqlVideoBySlug_videoBySlug_fileStorageFile_media_files_data = GqlVideoBySlug_videoBySlug_fileStorageFile_media_files_data_MediaFileAudioMimeDataDto | GqlVideoBySlug_videoBySlug_fileStorageFile_media_files_data_MediaFileImageMimeDataDto | GqlVideoBySlug_videoBySlug_fileStorageFile_media_files_data_MediaFileVideoMimeDataDto;

export interface GqlVideoBySlug_videoBySlug_fileStorageFile_media_files {
  __typename: "MediaFileDto";
  data: GqlVideoBySlug_videoBySlug_fileStorageFile_media_files_data;
  fileName: string;
  mimeType: string;
  original: boolean;
  s3SignedUrl: string;
  size: number;
}

export interface GqlVideoBySlug_videoBySlug_fileStorageFile_media {
  __typename: "MediaDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  files: (GqlVideoBySlug_videoBySlug_fileStorageFile_media_files | null)[];
  name: string | null;
  orgId: GraphqlScalarType.Uuid | null;
  public: boolean;
  state: MediaState;
  totalSize: number;
  type: MediaType;
  updatedAt: GraphqlScalarType.DateTime;
  userId: GraphqlScalarType.Uuid;
}

export interface GqlVideoBySlug_videoBySlug_fileStorageFile {
  __typename: "FileStorageFileDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  fileMediaId: GraphqlScalarType.ObjectId;
  media: GqlVideoBySlug_videoBySlug_fileStorageFile_media;
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

export interface GqlVideoBySlug_videoBySlug_magicTemplate_audio_file_MagicTemplateSourceFileUri {
  __typename: "MagicTemplateSourceFileUri";
  type: string;
  url: string;
}

export interface GqlVideoBySlug_videoBySlug_magicTemplate_audio_file_MagicTemplateSourceMedia {
  __typename: "MagicTemplateSourceMedia";
  mediaId: GraphqlScalarType.ObjectId;
  type: string;
}

export type GqlVideoBySlug_videoBySlug_magicTemplate_audio_file = GqlVideoBySlug_videoBySlug_magicTemplate_audio_file_MagicTemplateSourceFileUri | GqlVideoBySlug_videoBySlug_magicTemplate_audio_file_MagicTemplateSourceMedia;

export interface GqlVideoBySlug_videoBySlug_magicTemplate_audio {
  __typename: "MagicTemplateAudio";
  file: GqlVideoBySlug_videoBySlug_magicTemplate_audio_file | null;
  loopAudio: boolean | null;
  outputVolume: number | null;
}

export interface GqlVideoBySlug_videoBySlug_magicTemplate_clips_MagicTemplateClipCanvas {
  __typename: "MagicTemplateClipCanvas";
  _id: GraphqlScalarType.ObjectId | null;
  background: string;
  duration: number;
  objects: GraphqlScalarType.FabricObject[];
  type: MagicTemplateClipType;
}

export interface GqlVideoBySlug_videoBySlug_magicTemplate_clips_MagicTemplateClipSimple {
  __typename: "MagicTemplateClipSimple";
  _id: GraphqlScalarType.ObjectId | null;
  background: string;
  duration: number;
  type: MagicTemplateClipType;
}

export type GqlVideoBySlug_videoBySlug_magicTemplate_clips = GqlVideoBySlug_videoBySlug_magicTemplate_clips_MagicTemplateClipCanvas | GqlVideoBySlug_videoBySlug_magicTemplate_clips_MagicTemplateClipSimple;

export interface GqlVideoBySlug_videoBySlug_magicTemplate_scripts_object {
  __typename: "ScriptDto";
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

export interface GqlVideoBySlug_videoBySlug_magicTemplate_scripts {
  __typename: "MagicTemplateScript";
  _id: GraphqlScalarType.ObjectId;
  inputData: GraphqlScalarType.JSONSchema | null;
  object: GqlVideoBySlug_videoBySlug_magicTemplate_scripts_object | null;
}

export interface GqlVideoBySlug_videoBySlug_magicTemplate {
  __typename: "MagicTemplate";
  _id: GraphqlScalarType.ObjectId | null;
  audio: GqlVideoBySlug_videoBySlug_magicTemplate_audio | null;
  clips: GqlVideoBySlug_videoBySlug_magicTemplate_clips[];
  createdAt: GraphqlScalarType.DateTime | null;
  fps: number;
  height: number;
  scripts: GqlVideoBySlug_videoBySlug_magicTemplate_scripts[] | null;
  updatedAt: GraphqlScalarType.DateTime | null;
  width: number;
}

export interface GqlVideoBySlug_videoBySlug_template {
  __typename: "EmeezoVideoTemplate";
  _id: GraphqlScalarType.ObjectId;
  title: string | null;
  variables: GraphqlScalarType.JSON | null;
  version: number;
}

export interface GqlVideoBySlug_videoBySlug_user {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: GraphqlScalarType.Uuid;
  lastName: string;
  status: UserStatus;
}

export interface GqlVideoBySlug_videoBySlug {
  __typename: "EmeezoVideoResDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  errorMessage: string | null;
  fileStorageFile: GqlVideoBySlug_videoBySlug_fileStorageFile | null;
  fileStorageFileId: GraphqlScalarType.ObjectId | null;
  magicTemplate: GqlVideoBySlug_videoBySlug_magicTemplate | null;
  orgId: GraphqlScalarType.Uuid;
  public: boolean;
  purpose: EmeezoVideoPurpose;
  slug: string;
  status: EmeezoVideoStatus;
  template: GqlVideoBySlug_videoBySlug_template | null;
  title: string | null;
  updatedAt: GraphqlScalarType.DateTime;
  user: GqlVideoBySlug_videoBySlug_user;
  userId: GraphqlScalarType.Uuid;
}

export interface GqlVideoBySlug {
  videoBySlug: GqlVideoBySlug_videoBySlug;
}

export interface GqlVideoBySlugVariables {
  slug: string;
}
