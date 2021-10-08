/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { MediaType, MediaState, MagicTemplateClipType, ScriptLanguage, EmeezoVideoPurpose, EmeezoVideoStatus, UserStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GqlVideo
// ====================================================

export interface GqlVideo_video_fileStorageFile_media_files_data_MediaFileAudioMimeDataDto {
  __typename: "MediaFileAudioMimeDataDto";
  duration: number;
  type: MediaType;
}

export interface GqlVideo_video_fileStorageFile_media_files_data_MediaFileImageMimeDataDto {
  __typename: "MediaFileImageMimeDataDto";
  aspectRatio: number;
  height: number;
  type: MediaType;
  width: number;
}

export interface GqlVideo_video_fileStorageFile_media_files_data_MediaFileVideoMimeDataDto {
  __typename: "MediaFileVideoMimeDataDto";
  aspectRatio: number;
  bitRate: number | null;
  codecName: string | null;
  duration: number;
  height: number;
  type: MediaType;
  width: number;
}

export type GqlVideo_video_fileStorageFile_media_files_data = GqlVideo_video_fileStorageFile_media_files_data_MediaFileAudioMimeDataDto | GqlVideo_video_fileStorageFile_media_files_data_MediaFileImageMimeDataDto | GqlVideo_video_fileStorageFile_media_files_data_MediaFileVideoMimeDataDto;

export interface GqlVideo_video_fileStorageFile_media_files {
  __typename: "MediaFileDto";
  data: GqlVideo_video_fileStorageFile_media_files_data;
  fileName: string;
  mimeType: string;
  original: boolean;
  s3SignedUrl: string;
  size: number;
}

export interface GqlVideo_video_fileStorageFile_media {
  __typename: "MediaDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  files: (GqlVideo_video_fileStorageFile_media_files | null)[];
  name: string | null;
  orgId: GraphqlScalarType.Uuid | null;
  public: boolean;
  state: MediaState;
  totalSize: number;
  type: MediaType;
  updatedAt: GraphqlScalarType.DateTime;
  userId: GraphqlScalarType.Uuid;
}

export interface GqlVideo_video_fileStorageFile {
  __typename: "FileStorageFileDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  fileMediaId: GraphqlScalarType.ObjectId;
  media: GqlVideo_video_fileStorageFile_media;
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

export interface GqlVideo_video_magicTemplate_audio_file_MagicTemplateSourceFileUri {
  __typename: "MagicTemplateSourceFileUri";
  type: string;
  url: string;
}

export interface GqlVideo_video_magicTemplate_audio_file_MagicTemplateSourceMedia {
  __typename: "MagicTemplateSourceMedia";
  mediaId: GraphqlScalarType.ObjectId;
  type: string;
}

export type GqlVideo_video_magicTemplate_audio_file = GqlVideo_video_magicTemplate_audio_file_MagicTemplateSourceFileUri | GqlVideo_video_magicTemplate_audio_file_MagicTemplateSourceMedia;

export interface GqlVideo_video_magicTemplate_audio {
  __typename: "MagicTemplateAudio";
  file: GqlVideo_video_magicTemplate_audio_file | null;
  loopAudio: boolean | null;
  outputVolume: number | null;
}

export interface GqlVideo_video_magicTemplate_clips_MagicTemplateClipCanvas {
  __typename: "MagicTemplateClipCanvas";
  _id: GraphqlScalarType.ObjectId | null;
  background: string;
  duration: number;
  objects: GraphqlScalarType.FabricObject[];
  type: MagicTemplateClipType;
}

export interface GqlVideo_video_magicTemplate_clips_MagicTemplateClipSimple {
  __typename: "MagicTemplateClipSimple";
  _id: GraphqlScalarType.ObjectId | null;
  background: string;
  duration: number;
  type: MagicTemplateClipType;
}

export type GqlVideo_video_magicTemplate_clips = GqlVideo_video_magicTemplate_clips_MagicTemplateClipCanvas | GqlVideo_video_magicTemplate_clips_MagicTemplateClipSimple;

export interface GqlVideo_video_magicTemplate_scripts_object {
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

export interface GqlVideo_video_magicTemplate_scripts {
  __typename: "MagicTemplateScript";
  _id: GraphqlScalarType.ObjectId;
  inputData: GraphqlScalarType.JSONSchema | null;
  object: GqlVideo_video_magicTemplate_scripts_object | null;
}

export interface GqlVideo_video_magicTemplate {
  __typename: "MagicTemplate";
  _id: GraphqlScalarType.ObjectId | null;
  audio: GqlVideo_video_magicTemplate_audio | null;
  clips: GqlVideo_video_magicTemplate_clips[];
  createdAt: GraphqlScalarType.DateTime | null;
  fps: number;
  height: number;
  scripts: GqlVideo_video_magicTemplate_scripts[] | null;
  updatedAt: GraphqlScalarType.DateTime | null;
  width: number;
}

export interface GqlVideo_video_template {
  __typename: "EmeezoVideoTemplate";
  _id: GraphqlScalarType.ObjectId;
  title: string | null;
  variables: GraphqlScalarType.JSON | null;
  version: number;
}

export interface GqlVideo_video_user {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: GraphqlScalarType.Uuid;
  lastName: string;
  status: UserStatus;
}

export interface GqlVideo_video {
  __typename: "EmeezoVideoResDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  errorMessage: string | null;
  fileStorageFile: GqlVideo_video_fileStorageFile | null;
  fileStorageFileId: GraphqlScalarType.ObjectId | null;
  magicTemplate: GqlVideo_video_magicTemplate | null;
  orgId: GraphqlScalarType.Uuid;
  public: boolean;
  purpose: EmeezoVideoPurpose;
  slug: string;
  status: EmeezoVideoStatus;
  template: GqlVideo_video_template | null;
  title: string | null;
  updatedAt: GraphqlScalarType.DateTime;
  user: GqlVideo_video_user;
  userId: GraphqlScalarType.Uuid;
}

export interface GqlVideo {
  video: GqlVideo_video;
}

export interface GqlVideoVariables {
  _id: GraphqlScalarType.ObjectId;
}
