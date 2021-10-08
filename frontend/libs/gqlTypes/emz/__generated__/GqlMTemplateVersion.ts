/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { MagicTemplateInputDto, FormSchemaInput, MagicTemplateClipType, ScriptLanguage } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GqlMTemplateVersion
// ====================================================

export interface GqlMTemplateVersion_templateVersion_magicTemplate_audio_file_MagicTemplateSourceFileUri {
  __typename: "MagicTemplateSourceFileUri";
  type: string;
  url: string;
}

export interface GqlMTemplateVersion_templateVersion_magicTemplate_audio_file_MagicTemplateSourceMedia {
  __typename: "MagicTemplateSourceMedia";
  mediaId: GraphqlScalarType.ObjectId;
  type: string;
}

export type GqlMTemplateVersion_templateVersion_magicTemplate_audio_file = GqlMTemplateVersion_templateVersion_magicTemplate_audio_file_MagicTemplateSourceFileUri | GqlMTemplateVersion_templateVersion_magicTemplate_audio_file_MagicTemplateSourceMedia;

export interface GqlMTemplateVersion_templateVersion_magicTemplate_audio {
  __typename: "MagicTemplateAudio";
  file: GqlMTemplateVersion_templateVersion_magicTemplate_audio_file | null;
  loopAudio: boolean | null;
  outputVolume: number | null;
}

export interface GqlMTemplateVersion_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas {
  __typename: "MagicTemplateClipCanvas";
  _id: GraphqlScalarType.ObjectId | null;
  background: string;
  duration: number;
  objects: GraphqlScalarType.FabricObject[];
  type: MagicTemplateClipType;
}

export interface GqlMTemplateVersion_templateVersion_magicTemplate_clips_MagicTemplateClipSimple {
  __typename: "MagicTemplateClipSimple";
  _id: GraphqlScalarType.ObjectId | null;
  background: string;
  duration: number;
  type: MagicTemplateClipType;
}

export type GqlMTemplateVersion_templateVersion_magicTemplate_clips = GqlMTemplateVersion_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas | GqlMTemplateVersion_templateVersion_magicTemplate_clips_MagicTemplateClipSimple;

export interface GqlMTemplateVersion_templateVersion_magicTemplate_scripts_object {
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

export interface GqlMTemplateVersion_templateVersion_magicTemplate_scripts {
  __typename: "MagicTemplateScript";
  _id: GraphqlScalarType.ObjectId;
  inputData: GraphqlScalarType.JSONSchema | null;
  object: GqlMTemplateVersion_templateVersion_magicTemplate_scripts_object | null;
}

export interface GqlMTemplateVersion_templateVersion_magicTemplate {
  __typename: "MagicTemplate";
  _id: GraphqlScalarType.ObjectId | null;
  audio: GqlMTemplateVersion_templateVersion_magicTemplate_audio | null;
  clips: GqlMTemplateVersion_templateVersion_magicTemplate_clips[];
  createdAt: GraphqlScalarType.DateTime | null;
  fps: number;
  height: number;
  scripts: GqlMTemplateVersion_templateVersion_magicTemplate_scripts[] | null;
  updatedAt: GraphqlScalarType.DateTime | null;
  width: number;
}

export interface GqlMTemplateVersion_templateVersion_templateVariablesSchema {
  __typename: "FormSchema";
  jsonSchema: GraphqlScalarType.JSONSchema;
  uiSchema: GraphqlScalarType.UiSchema | null;
}

export interface GqlMTemplateVersion_templateVersion {
  __typename: "TemplateVersion";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  magicTemplate: GqlMTemplateVersion_templateVersion_magicTemplate;
  previewUrl: string | null;
  published: boolean;
  templateId: GraphqlScalarType.ObjectId;
  templateVariablesSchema: GqlMTemplateVersion_templateVersion_templateVariablesSchema | null;
  updatedAt: GraphqlScalarType.DateTime;
  userId: GraphqlScalarType.Uuid;
  version: number;
}

export interface GqlMTemplateVersion {
  templateVersion: GqlMTemplateVersion_templateVersion;
}

export interface GqlMTemplateVersionVariables {
  magicTemplate: MagicTemplateInputDto;
  templateId: GraphqlScalarType.ObjectId;
  templateVariablesSchema?: FormSchemaInput | null;
}
