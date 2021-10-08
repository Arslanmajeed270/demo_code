/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { EmeezoTemplateCategory, MagicTemplateClipType, ScriptLanguage, UserStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GqlMCloneTemplate
// ====================================================

export interface GqlMCloneTemplate_cloneTemplate_templateVersion_magicTemplate_audio_file_MagicTemplateSourceFileUri {
  __typename: "MagicTemplateSourceFileUri";
  type: string;
  url: string;
}

export interface GqlMCloneTemplate_cloneTemplate_templateVersion_magicTemplate_audio_file_MagicTemplateSourceMedia {
  __typename: "MagicTemplateSourceMedia";
  mediaId: GraphqlScalarType.ObjectId;
  type: string;
}

export type GqlMCloneTemplate_cloneTemplate_templateVersion_magicTemplate_audio_file = GqlMCloneTemplate_cloneTemplate_templateVersion_magicTemplate_audio_file_MagicTemplateSourceFileUri | GqlMCloneTemplate_cloneTemplate_templateVersion_magicTemplate_audio_file_MagicTemplateSourceMedia;

export interface GqlMCloneTemplate_cloneTemplate_templateVersion_magicTemplate_audio {
  __typename: "MagicTemplateAudio";
  file: GqlMCloneTemplate_cloneTemplate_templateVersion_magicTemplate_audio_file | null;
  loopAudio: boolean | null;
  outputVolume: number | null;
}

export interface GqlMCloneTemplate_cloneTemplate_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas {
  __typename: "MagicTemplateClipCanvas";
  _id: GraphqlScalarType.ObjectId | null;
  background: string;
  duration: number;
  objects: GraphqlScalarType.FabricObject[];
  type: MagicTemplateClipType;
}

export interface GqlMCloneTemplate_cloneTemplate_templateVersion_magicTemplate_clips_MagicTemplateClipSimple {
  __typename: "MagicTemplateClipSimple";
  _id: GraphqlScalarType.ObjectId | null;
  background: string;
  duration: number;
  type: MagicTemplateClipType;
}

export type GqlMCloneTemplate_cloneTemplate_templateVersion_magicTemplate_clips = GqlMCloneTemplate_cloneTemplate_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas | GqlMCloneTemplate_cloneTemplate_templateVersion_magicTemplate_clips_MagicTemplateClipSimple;

export interface GqlMCloneTemplate_cloneTemplate_templateVersion_magicTemplate_scripts_object {
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

export interface GqlMCloneTemplate_cloneTemplate_templateVersion_magicTemplate_scripts {
  __typename: "MagicTemplateScript";
  _id: GraphqlScalarType.ObjectId;
  inputData: GraphqlScalarType.JSONSchema | null;
  object: GqlMCloneTemplate_cloneTemplate_templateVersion_magicTemplate_scripts_object | null;
}

export interface GqlMCloneTemplate_cloneTemplate_templateVersion_magicTemplate {
  __typename: "MagicTemplate";
  _id: GraphqlScalarType.ObjectId | null;
  audio: GqlMCloneTemplate_cloneTemplate_templateVersion_magicTemplate_audio | null;
  clips: GqlMCloneTemplate_cloneTemplate_templateVersion_magicTemplate_clips[];
  createdAt: GraphqlScalarType.DateTime | null;
  fps: number;
  height: number;
  scripts: GqlMCloneTemplate_cloneTemplate_templateVersion_magicTemplate_scripts[] | null;
  updatedAt: GraphqlScalarType.DateTime | null;
  width: number;
}

export interface GqlMCloneTemplate_cloneTemplate_templateVersion_templateVariablesSchema {
  __typename: "FormSchema";
  jsonSchema: GraphqlScalarType.JSONSchema;
  uiSchema: GraphqlScalarType.UiSchema | null;
}

export interface GqlMCloneTemplate_cloneTemplate_templateVersion {
  __typename: "TemplateVersion";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  magicTemplate: GqlMCloneTemplate_cloneTemplate_templateVersion_magicTemplate;
  previewUrl: string | null;
  published: boolean;
  templateId: GraphqlScalarType.ObjectId;
  templateVariablesSchema: GqlMCloneTemplate_cloneTemplate_templateVersion_templateVariablesSchema | null;
  updatedAt: GraphqlScalarType.DateTime;
  userId: GraphqlScalarType.Uuid;
  version: number;
}

export interface GqlMCloneTemplate_cloneTemplate_user {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: GraphqlScalarType.Uuid;
  lastName: string;
  status: UserStatus;
}

export interface GqlMCloneTemplate_cloneTemplate {
  __typename: "TemplateResDto";
  _id: GraphqlScalarType.ObjectId;
  activeVersion: number | null;
  category: EmeezoTemplateCategory;
  createdAt: GraphqlScalarType.DateTime;
  orgId: GraphqlScalarType.Uuid;
  public: boolean;
  templateVersion: GqlMCloneTemplate_cloneTemplate_templateVersion | null;
  title: string;
  updatedAt: GraphqlScalarType.DateTime;
  user: GqlMCloneTemplate_cloneTemplate_user;
  userId: GraphqlScalarType.Uuid;
}

export interface GqlMCloneTemplate {
  cloneTemplate: GqlMCloneTemplate_cloneTemplate;
}

export interface GqlMCloneTemplateVariables {
  _id: GraphqlScalarType.ObjectId;
  orgId: GraphqlScalarType.Uuid;
  version?: number | null;
}
