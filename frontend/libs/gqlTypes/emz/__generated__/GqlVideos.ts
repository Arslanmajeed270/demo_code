/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { GetVideosFilterReqDto, MediaType, MediaState, MagicTemplateClipType, ScriptLanguage, EmeezoVideoPurpose, EmeezoVideoStatus, UserStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GqlVideos
// ====================================================

export interface GqlVideos_videos_fileStorageFile_media_files_data_MediaFileAudioMimeDataDto {
  __typename: "MediaFileAudioMimeDataDto";
  duration: number;
  type: MediaType;
}

export interface GqlVideos_videos_fileStorageFile_media_files_data_MediaFileImageMimeDataDto {
  __typename: "MediaFileImageMimeDataDto";
  aspectRatio: number;
  height: number;
  type: MediaType;
  width: number;
}

export interface GqlVideos_videos_fileStorageFile_media_files_data_MediaFileVideoMimeDataDto {
  __typename: "MediaFileVideoMimeDataDto";
  aspectRatio: number;
  bitRate: number | null;
  codecName: string | null;
  duration: number;
  height: number;
  type: MediaType;
  width: number;
}

export type GqlVideos_videos_fileStorageFile_media_files_data = GqlVideos_videos_fileStorageFile_media_files_data_MediaFileAudioMimeDataDto | GqlVideos_videos_fileStorageFile_media_files_data_MediaFileImageMimeDataDto | GqlVideos_videos_fileStorageFile_media_files_data_MediaFileVideoMimeDataDto;

export interface GqlVideos_videos_fileStorageFile_media_files {
  __typename: "MediaFileDto";
  data: GqlVideos_videos_fileStorageFile_media_files_data;
  fileName: string;
  mimeType: string;
  original: boolean;
  s3SignedUrl: string;
  size: number;
}

export interface GqlVideos_videos_fileStorageFile_media {
  __typename: "MediaDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  files: (GqlVideos_videos_fileStorageFile_media_files | null)[];
  name: string | null;
  orgId: GraphqlScalarType.Uuid | null;
  public: boolean;
  state: MediaState;
  totalSize: number;
  type: MediaType;
  updatedAt: GraphqlScalarType.DateTime;
  userId: GraphqlScalarType.Uuid;
}

export interface GqlVideos_videos_fileStorageFile {
  __typename: "FileStorageFileDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  fileMediaId: GraphqlScalarType.ObjectId;
  media: GqlVideos_videos_fileStorageFile_media;
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

export interface GqlVideos_videos_magicTemplate_audio_file_MagicTemplateSourceFileUri {
  __typename: "MagicTemplateSourceFileUri";
  type: string;
  url: string;
}

export interface GqlVideos_videos_magicTemplate_audio_file_MagicTemplateSourceMedia {
  __typename: "MagicTemplateSourceMedia";
  mediaId: GraphqlScalarType.ObjectId;
  type: string;
}

export type GqlVideos_videos_magicTemplate_audio_file = GqlVideos_videos_magicTemplate_audio_file_MagicTemplateSourceFileUri | GqlVideos_videos_magicTemplate_audio_file_MagicTemplateSourceMedia;

export interface GqlVideos_videos_magicTemplate_audio {
  __typename: "MagicTemplateAudio";
  file: GqlVideos_videos_magicTemplate_audio_file | null;
  loopAudio: boolean | null;
  outputVolume: number | null;
}

export interface GqlVideos_videos_magicTemplate_clips_MagicTemplateClipCanvas {
  __typename: "MagicTemplateClipCanvas";
  _id: GraphqlScalarType.ObjectId | null;
  background: string;
  duration: number;
  objects: GraphqlScalarType.FabricObject[];
  type: MagicTemplateClipType;
}

export interface GqlVideos_videos_magicTemplate_clips_MagicTemplateClipSimple {
  __typename: "MagicTemplateClipSimple";
  _id: GraphqlScalarType.ObjectId | null;
  background: string;
  duration: number;
  type: MagicTemplateClipType;
}

export type GqlVideos_videos_magicTemplate_clips = GqlVideos_videos_magicTemplate_clips_MagicTemplateClipCanvas | GqlVideos_videos_magicTemplate_clips_MagicTemplateClipSimple;

export interface GqlVideos_videos_magicTemplate_scripts_object {
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

export interface GqlVideos_videos_magicTemplate_scripts {
  __typename: "MagicTemplateScript";
  _id: GraphqlScalarType.ObjectId;
  inputData: GraphqlScalarType.JSONSchema | null;
  object: GqlVideos_videos_magicTemplate_scripts_object | null;
}

export interface GqlVideos_videos_magicTemplate {
  __typename: "MagicTemplate";
  _id: GraphqlScalarType.ObjectId | null;
  audio: GqlVideos_videos_magicTemplate_audio | null;
  clips: GqlVideos_videos_magicTemplate_clips[];
  createdAt: GraphqlScalarType.DateTime | null;
  fps: number;
  height: number;
  scripts: GqlVideos_videos_magicTemplate_scripts[] | null;
  updatedAt: GraphqlScalarType.DateTime | null;
  width: number;
}

export interface GqlVideos_videos_template {
  __typename: "EmeezoVideoTemplate";
  _id: GraphqlScalarType.ObjectId;
  title: string | null;
  variables: GraphqlScalarType.JSON | null;
  version: number;
}

export interface GqlVideos_videos_user {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: GraphqlScalarType.Uuid;
  lastName: string;
  status: UserStatus;
}

export interface GqlVideos_videos {
  __typename: "EmeezoVideoResDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  errorMessage: string | null;
  fileStorageFile: GqlVideos_videos_fileStorageFile | null;
  fileStorageFileId: GraphqlScalarType.ObjectId | null;
  magicTemplate: GqlVideos_videos_magicTemplate | null;
  orgId: GraphqlScalarType.Uuid;
  public: boolean;
  purpose: EmeezoVideoPurpose;
  slug: string;
  status: EmeezoVideoStatus;
  template: GqlVideos_videos_template | null;
  title: string | null;
  updatedAt: GraphqlScalarType.DateTime;
  user: GqlVideos_videos_user;
  userId: GraphqlScalarType.Uuid;
}

export interface GqlVideos {
  videos: GqlVideos_videos[];
}

export interface GqlVideosVariables {
  filter?: GetVideosFilterReqDto | null;
}
