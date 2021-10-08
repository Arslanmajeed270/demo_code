/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { MagicTemplateClipType, ScriptLanguage, UserStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GqlTemplateVersion
// ====================================================

export interface GqlTemplateVersion_templateVersion_magicTemplate_audio_file_MagicTemplateSourceFileUri {
  __typename: "MagicTemplateSourceFileUri";
  type: string;
  url: string;
}

export interface GqlTemplateVersion_templateVersion_magicTemplate_audio_file_MagicTemplateSourceMedia {
  __typename: "MagicTemplateSourceMedia";
  mediaId: GraphqlScalarType.ObjectId;
  type: string;
}

export type GqlTemplateVersion_templateVersion_magicTemplate_audio_file = GqlTemplateVersion_templateVersion_magicTemplate_audio_file_MagicTemplateSourceFileUri | GqlTemplateVersion_templateVersion_magicTemplate_audio_file_MagicTemplateSourceMedia;

export interface GqlTemplateVersion_templateVersion_magicTemplate_audio {
  __typename: "MagicTemplateAudio";
  file: GqlTemplateVersion_templateVersion_magicTemplate_audio_file | null;
  loopAudio: boolean | null;
  outputVolume: number | null;
}

export interface GqlTemplateVersion_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas {
  __typename: "MagicTemplateClipCanvas";
  _id: GraphqlScalarType.ObjectId | null;
  background: string;
  duration: number;
  objects: GraphqlScalarType.FabricObject[];
  type: MagicTemplateClipType;
}

export interface GqlTemplateVersion_templateVersion_magicTemplate_clips_MagicTemplateClipSimple {
  __typename: "MagicTemplateClipSimple";
  _id: GraphqlScalarType.ObjectId | null;
  background: string;
  duration: number;
  type: MagicTemplateClipType;
}

export type GqlTemplateVersion_templateVersion_magicTemplate_clips = GqlTemplateVersion_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas | GqlTemplateVersion_templateVersion_magicTemplate_clips_MagicTemplateClipSimple;

export interface GqlTemplateVersion_templateVersion_magicTemplate_scripts_object {
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

export interface GqlTemplateVersion_templateVersion_magicTemplate_scripts {
  __typename: "MagicTemplateScript";
  _id: GraphqlScalarType.ObjectId;
  inputData: GraphqlScalarType.JSONSchema | null;
  object: GqlTemplateVersion_templateVersion_magicTemplate_scripts_object | null;
}

export interface GqlTemplateVersion_templateVersion_magicTemplate {
  __typename: "MagicTemplate";
  _id: GraphqlScalarType.ObjectId | null;
  audio: GqlTemplateVersion_templateVersion_magicTemplate_audio | null;
  clips: GqlTemplateVersion_templateVersion_magicTemplate_clips[];
  createdAt: GraphqlScalarType.DateTime | null;
  fps: number;
  height: number;
  scripts: GqlTemplateVersion_templateVersion_magicTemplate_scripts[] | null;
  updatedAt: GraphqlScalarType.DateTime | null;
  width: number;
}

export interface GqlTemplateVersion_templateVersion_templateVariablesSchema {
  __typename: "FormSchema";
  jsonSchema: GraphqlScalarType.JSONSchema;
  uiSchema: GraphqlScalarType.UiSchema | null;
}

export interface GqlTemplateVersion_templateVersion_user {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: GraphqlScalarType.Uuid;
  lastName: string;
  status: UserStatus;
}

export interface GqlTemplateVersion_templateVersion {
  __typename: "TemplateVersionResDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  magicTemplate: GqlTemplateVersion_templateVersion_magicTemplate;
  previewUrl: string | null;
  published: boolean;
  templateId: GraphqlScalarType.ObjectId;
  templateVariablesSchema: GqlTemplateVersion_templateVersion_templateVariablesSchema | null;
  updatedAt: GraphqlScalarType.DateTime;
  user: GqlTemplateVersion_templateVersion_user;
  userId: GraphqlScalarType.Uuid;
  version: number;
}

export interface GqlTemplateVersion {
  templateVersion: GqlTemplateVersion_templateVersion;
}

export interface GqlTemplateVersionVariables {
  _id: GraphqlScalarType.ObjectId;
  version: number;
}
