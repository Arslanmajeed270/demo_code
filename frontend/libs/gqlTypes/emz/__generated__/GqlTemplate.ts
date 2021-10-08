/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { QueryTemplateCloneReqDto, EmeezoTemplateCategory, MagicTemplateClipType, ScriptLanguage, UserStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GqlTemplate
// ====================================================

export interface GqlTemplate_template_templateVersion_magicTemplate_audio_file_MagicTemplateSourceFileUri {
  __typename: "MagicTemplateSourceFileUri";
  type: string;
  url: string;
}

export interface GqlTemplate_template_templateVersion_magicTemplate_audio_file_MagicTemplateSourceMedia {
  __typename: "MagicTemplateSourceMedia";
  mediaId: GraphqlScalarType.ObjectId;
  type: string;
}

export type GqlTemplate_template_templateVersion_magicTemplate_audio_file = GqlTemplate_template_templateVersion_magicTemplate_audio_file_MagicTemplateSourceFileUri | GqlTemplate_template_templateVersion_magicTemplate_audio_file_MagicTemplateSourceMedia;

export interface GqlTemplate_template_templateVersion_magicTemplate_audio {
  __typename: "MagicTemplateAudio";
  file: GqlTemplate_template_templateVersion_magicTemplate_audio_file | null;
  loopAudio: boolean | null;
  outputVolume: number | null;
}

export interface GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas {
  __typename: "MagicTemplateClipCanvas";
  _id: GraphqlScalarType.ObjectId | null;
  background: string;
  duration: number;
  objects: GraphqlScalarType.FabricObject[];
  type: MagicTemplateClipType;
}

export interface GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipSimple {
  __typename: "MagicTemplateClipSimple";
  _id: GraphqlScalarType.ObjectId | null;
  background: string;
  duration: number;
  type: MagicTemplateClipType;
}

export type GqlTemplate_template_templateVersion_magicTemplate_clips = GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas | GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipSimple;

export interface GqlTemplate_template_templateVersion_magicTemplate_scripts_object {
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

export interface GqlTemplate_template_templateVersion_magicTemplate_scripts {
  __typename: "MagicTemplateScript";
  _id: GraphqlScalarType.ObjectId;
  inputData: GraphqlScalarType.JSONSchema | null;
  object: GqlTemplate_template_templateVersion_magicTemplate_scripts_object | null;
}

export interface GqlTemplate_template_templateVersion_magicTemplate {
  __typename: "MagicTemplate";
  _id: GraphqlScalarType.ObjectId | null;
  audio: GqlTemplate_template_templateVersion_magicTemplate_audio | null;
  clips: GqlTemplate_template_templateVersion_magicTemplate_clips[];
  createdAt: GraphqlScalarType.DateTime | null;
  fps: number;
  height: number;
  scripts: GqlTemplate_template_templateVersion_magicTemplate_scripts[] | null;
  updatedAt: GraphqlScalarType.DateTime | null;
  width: number;
}

export interface GqlTemplate_template_templateVersion_templateVariablesSchema {
  __typename: "FormSchema";
  jsonSchema: GraphqlScalarType.JSONSchema;
  uiSchema: GraphqlScalarType.UiSchema | null;
}

export interface GqlTemplate_template_templateVersion {
  __typename: "TemplateVersion";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  magicTemplate: GqlTemplate_template_templateVersion_magicTemplate;
  previewUrl: string | null;
  published: boolean;
  templateId: GraphqlScalarType.ObjectId;
  templateVariablesSchema: GqlTemplate_template_templateVersion_templateVariablesSchema | null;
  updatedAt: GraphqlScalarType.DateTime;
  userId: GraphqlScalarType.Uuid;
  version: number;
}

export interface GqlTemplate_template_user {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: GraphqlScalarType.Uuid;
  lastName: string;
  status: UserStatus;
}

export interface GqlTemplate_template {
  __typename: "TemplateResDto";
  _id: GraphqlScalarType.ObjectId;
  activeVersion: number | null;
  category: EmeezoTemplateCategory;
  createdAt: GraphqlScalarType.DateTime;
  orgId: GraphqlScalarType.Uuid;
  public: boolean;
  templateVersion: GqlTemplate_template_templateVersion | null;
  title: string;
  updatedAt: GraphqlScalarType.DateTime;
  user: GqlTemplate_template_user;
  userId: GraphqlScalarType.Uuid;
}

export interface GqlTemplate {
  template: GqlTemplate_template;
}

export interface GqlTemplateVariables {
  _id: GraphqlScalarType.ObjectId;
  clone?: QueryTemplateCloneReqDto | null;
  templateVersionNo?: number | null;
}
