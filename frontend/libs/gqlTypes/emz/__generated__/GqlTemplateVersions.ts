/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { EmeezoTemplateCategory, MagicTemplateClipType, ScriptLanguage, UserStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GqlTemplateVersions
// ====================================================

export interface GqlTemplateVersions_templateVersions_templateVersions_magicTemplate_audio_file_MagicTemplateSourceFileUri {
  __typename: "MagicTemplateSourceFileUri";
  type: string;
  url: string;
}

export interface GqlTemplateVersions_templateVersions_templateVersions_magicTemplate_audio_file_MagicTemplateSourceMedia {
  __typename: "MagicTemplateSourceMedia";
  mediaId: GraphqlScalarType.ObjectId;
  type: string;
}

export type GqlTemplateVersions_templateVersions_templateVersions_magicTemplate_audio_file = GqlTemplateVersions_templateVersions_templateVersions_magicTemplate_audio_file_MagicTemplateSourceFileUri | GqlTemplateVersions_templateVersions_templateVersions_magicTemplate_audio_file_MagicTemplateSourceMedia;

export interface GqlTemplateVersions_templateVersions_templateVersions_magicTemplate_audio {
  __typename: "MagicTemplateAudio";
  file: GqlTemplateVersions_templateVersions_templateVersions_magicTemplate_audio_file | null;
  loopAudio: boolean | null;
  outputVolume: number | null;
}

export interface GqlTemplateVersions_templateVersions_templateVersions_magicTemplate_clips_MagicTemplateClipCanvas {
  __typename: "MagicTemplateClipCanvas";
  _id: GraphqlScalarType.ObjectId | null;
  background: string;
  duration: number;
  objects: GraphqlScalarType.FabricObject[];
  type: MagicTemplateClipType;
}

export interface GqlTemplateVersions_templateVersions_templateVersions_magicTemplate_clips_MagicTemplateClipSimple {
  __typename: "MagicTemplateClipSimple";
  _id: GraphqlScalarType.ObjectId | null;
  background: string;
  duration: number;
  type: MagicTemplateClipType;
}

export type GqlTemplateVersions_templateVersions_templateVersions_magicTemplate_clips = GqlTemplateVersions_templateVersions_templateVersions_magicTemplate_clips_MagicTemplateClipCanvas | GqlTemplateVersions_templateVersions_templateVersions_magicTemplate_clips_MagicTemplateClipSimple;

export interface GqlTemplateVersions_templateVersions_templateVersions_magicTemplate_scripts_object {
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

export interface GqlTemplateVersions_templateVersions_templateVersions_magicTemplate_scripts {
  __typename: "MagicTemplateScript";
  _id: GraphqlScalarType.ObjectId;
  inputData: GraphqlScalarType.JSONSchema | null;
  object: GqlTemplateVersions_templateVersions_templateVersions_magicTemplate_scripts_object | null;
}

export interface GqlTemplateVersions_templateVersions_templateVersions_magicTemplate {
  __typename: "MagicTemplate";
  _id: GraphqlScalarType.ObjectId | null;
  audio: GqlTemplateVersions_templateVersions_templateVersions_magicTemplate_audio | null;
  clips: GqlTemplateVersions_templateVersions_templateVersions_magicTemplate_clips[];
  createdAt: GraphqlScalarType.DateTime | null;
  fps: number;
  height: number;
  scripts: GqlTemplateVersions_templateVersions_templateVersions_magicTemplate_scripts[] | null;
  updatedAt: GraphqlScalarType.DateTime | null;
  width: number;
}

export interface GqlTemplateVersions_templateVersions_templateVersions_templateVariablesSchema {
  __typename: "FormSchema";
  jsonSchema: GraphqlScalarType.JSONSchema;
  uiSchema: GraphqlScalarType.UiSchema | null;
}

export interface GqlTemplateVersions_templateVersions_templateVersions {
  __typename: "TemplateVersion";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  magicTemplate: GqlTemplateVersions_templateVersions_templateVersions_magicTemplate;
  previewUrl: string | null;
  published: boolean;
  templateId: GraphqlScalarType.ObjectId;
  templateVariablesSchema: GqlTemplateVersions_templateVersions_templateVersions_templateVariablesSchema | null;
  updatedAt: GraphqlScalarType.DateTime;
  userId: GraphqlScalarType.Uuid;
  version: number;
}

export interface GqlTemplateVersions_templateVersions_user {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: GraphqlScalarType.Uuid;
  lastName: string;
  status: UserStatus;
}

export interface GqlTemplateVersions_templateVersions {
  __typename: "TemplateVersionsResDto";
  _id: GraphqlScalarType.ObjectId;
  activeVersion: number | null;
  category: EmeezoTemplateCategory;
  createdAt: GraphqlScalarType.DateTime;
  orgId: GraphqlScalarType.Uuid;
  public: boolean;
  templateVersions: GqlTemplateVersions_templateVersions_templateVersions[];
  title: string;
  updatedAt: GraphqlScalarType.DateTime;
  user: GqlTemplateVersions_templateVersions_user;
  userId: GraphqlScalarType.Uuid;
}

export interface GqlTemplateVersions {
  templateVersions: GqlTemplateVersions_templateVersions;
}

export interface GqlTemplateVersionsVariables {
  _id: GraphqlScalarType.ObjectId;
}
