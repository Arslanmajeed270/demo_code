/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { MagicTemplateInputDto, EmeezoVideoPurpose, EmzVideoTemplateInputDto, MediaType, MediaState, MagicTemplateClipType, ScriptLanguage, EmeezoVideoStatus, UserStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GqlMVideo
// ====================================================

export interface GqlMVideo_video_fileStorageFile_media_files_data_MediaFileAudioMimeDataDto {
  __typename: "MediaFileAudioMimeDataDto";
  duration: number;
  type: MediaType;
}

export interface GqlMVideo_video_fileStorageFile_media_files_data_MediaFileImageMimeDataDto {
  __typename: "MediaFileImageMimeDataDto";
  aspectRatio: number;
  height: number;
  type: MediaType;
  width: number;
}

export interface GqlMVideo_video_fileStorageFile_media_files_data_MediaFileVideoMimeDataDto {
  __typename: "MediaFileVideoMimeDataDto";
  aspectRatio: number;
  bitRate: number | null;
  codecName: string | null;
  duration: number;
  height: number;
  type: MediaType;
  width: number;
}

export type GqlMVideo_video_fileStorageFile_media_files_data = GqlMVideo_video_fileStorageFile_media_files_data_MediaFileAudioMimeDataDto | GqlMVideo_video_fileStorageFile_media_files_data_MediaFileImageMimeDataDto | GqlMVideo_video_fileStorageFile_media_files_data_MediaFileVideoMimeDataDto;

export interface GqlMVideo_video_fileStorageFile_media_files {
  __typename: "MediaFileDto";
  data: GqlMVideo_video_fileStorageFile_media_files_data;
  fileName: string;
  mimeType: string;
  original: boolean;
  s3SignedUrl: string;
  size: number;
}

export interface GqlMVideo_video_fileStorageFile_media {
  __typename: "MediaDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  files: (GqlMVideo_video_fileStorageFile_media_files | null)[];
  name: string | null;
  orgId: GraphqlScalarType.Uuid | null;
  public: boolean;
  state: MediaState;
  totalSize: number;
  type: MediaType;
  updatedAt: GraphqlScalarType.DateTime;
  userId: GraphqlScalarType.Uuid;
}

export interface GqlMVideo_video_fileStorageFile {
  __typename: "FileStorageFileDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  fileMediaId: GraphqlScalarType.ObjectId;
  media: GqlMVideo_video_fileStorageFile_media;
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

export interface GqlMVideo_video_magicTemplate_audio_file_MagicTemplateSourceFileUri {
  __typename: "MagicTemplateSourceFileUri";
  type: string;
  url: string;
}

export interface GqlMVideo_video_magicTemplate_audio_file_MagicTemplateSourceMedia {
  __typename: "MagicTemplateSourceMedia";
  mediaId: GraphqlScalarType.ObjectId;
  type: string;
}

export type GqlMVideo_video_magicTemplate_audio_file = GqlMVideo_video_magicTemplate_audio_file_MagicTemplateSourceFileUri | GqlMVideo_video_magicTemplate_audio_file_MagicTemplateSourceMedia;

export interface GqlMVideo_video_magicTemplate_audio {
  __typename: "MagicTemplateAudio";
  file: GqlMVideo_video_magicTemplate_audio_file | null;
  loopAudio: boolean | null;
  outputVolume: number | null;
}

export interface GqlMVideo_video_magicTemplate_clips_MagicTemplateClipCanvas {
  __typename: "MagicTemplateClipCanvas";
  _id: GraphqlScalarType.ObjectId | null;
  background: string;
  duration: number;
  objects: GraphqlScalarType.FabricObject[];
  type: MagicTemplateClipType;
}

export interface GqlMVideo_video_magicTemplate_clips_MagicTemplateClipSimple {
  __typename: "MagicTemplateClipSimple";
  _id: GraphqlScalarType.ObjectId | null;
  background: string;
  duration: number;
  type: MagicTemplateClipType;
}

export type GqlMVideo_video_magicTemplate_clips = GqlMVideo_video_magicTemplate_clips_MagicTemplateClipCanvas | GqlMVideo_video_magicTemplate_clips_MagicTemplateClipSimple;

export interface GqlMVideo_video_magicTemplate_scripts_object {
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

export interface GqlMVideo_video_magicTemplate_scripts {
  __typename: "MagicTemplateScript";
  _id: GraphqlScalarType.ObjectId;
  inputData: GraphqlScalarType.JSONSchema | null;
  object: GqlMVideo_video_magicTemplate_scripts_object | null;
}

export interface GqlMVideo_video_magicTemplate {
  __typename: "MagicTemplate";
  _id: GraphqlScalarType.ObjectId | null;
  audio: GqlMVideo_video_magicTemplate_audio | null;
  clips: GqlMVideo_video_magicTemplate_clips[];
  createdAt: GraphqlScalarType.DateTime | null;
  fps: number;
  height: number;
  scripts: GqlMVideo_video_magicTemplate_scripts[] | null;
  updatedAt: GraphqlScalarType.DateTime | null;
  width: number;
}

export interface GqlMVideo_video_template {
  __typename: "EmeezoVideoTemplate";
  _id: GraphqlScalarType.ObjectId;
  title: string | null;
  variables: GraphqlScalarType.JSON | null;
  version: number;
}

export interface GqlMVideo_video_user {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: GraphqlScalarType.Uuid;
  lastName: string;
  status: UserStatus;
}

export interface GqlMVideo_video {
  __typename: "EmeezoVideoResDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  errorMessage: string | null;
  fileStorageFile: GqlMVideo_video_fileStorageFile | null;
  fileStorageFileId: GraphqlScalarType.ObjectId | null;
  magicTemplate: GqlMVideo_video_magicTemplate | null;
  orgId: GraphqlScalarType.Uuid;
  public: boolean;
  purpose: EmeezoVideoPurpose;
  slug: string;
  status: EmeezoVideoStatus;
  template: GqlMVideo_video_template | null;
  title: string | null;
  updatedAt: GraphqlScalarType.DateTime;
  user: GqlMVideo_video_user;
  userId: GraphqlScalarType.Uuid;
}

export interface GqlMVideo {
  video: GqlMVideo_video;
}

export interface GqlMVideoVariables {
  magicTemplate?: MagicTemplateInputDto | null;
  orgId: GraphqlScalarType.Uuid;
  public?: boolean | null;
  purpose: EmeezoVideoPurpose;
  slug?: string | null;
  template?: EmzVideoTemplateInputDto | null;
  title?: string | null;
}
