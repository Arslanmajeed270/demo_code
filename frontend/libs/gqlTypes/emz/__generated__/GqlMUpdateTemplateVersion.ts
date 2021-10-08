/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { MagicTemplateInputDto, FormSchemaInput, MagicTemplateClipType, ScriptLanguage } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GqlMUpdateTemplateVersion
// ====================================================

export interface GqlMUpdateTemplateVersion_updateTemplateVersion_magicTemplate_audio_file_MagicTemplateSourceFileUri {
  __typename: "MagicTemplateSourceFileUri";
  type: string;
  url: string;
}

export interface GqlMUpdateTemplateVersion_updateTemplateVersion_magicTemplate_audio_file_MagicTemplateSourceMedia {
  __typename: "MagicTemplateSourceMedia";
  mediaId: GraphqlScalarType.ObjectId;
  type: string;
}

export type GqlMUpdateTemplateVersion_updateTemplateVersion_magicTemplate_audio_file = GqlMUpdateTemplateVersion_updateTemplateVersion_magicTemplate_audio_file_MagicTemplateSourceFileUri | GqlMUpdateTemplateVersion_updateTemplateVersion_magicTemplate_audio_file_MagicTemplateSourceMedia;

export interface GqlMUpdateTemplateVersion_updateTemplateVersion_magicTemplate_audio {
  __typename: "MagicTemplateAudio";
  file: GqlMUpdateTemplateVersion_updateTemplateVersion_magicTemplate_audio_file | null;
  loopAudio: boolean | null;
  outputVolume: number | null;
}

export interface GqlMUpdateTemplateVersion_updateTemplateVersion_magicTemplate_clips_MagicTemplateClipCanvas {
  __typename: "MagicTemplateClipCanvas";
  _id: GraphqlScalarType.ObjectId | null;
  background: string;
  duration: number;
  objects: GraphqlScalarType.FabricObject[];
  type: MagicTemplateClipType;
}

export interface GqlMUpdateTemplateVersion_updateTemplateVersion_magicTemplate_clips_MagicTemplateClipSimple {
  __typename: "MagicTemplateClipSimple";
  _id: GraphqlScalarType.ObjectId | null;
  background: string;
  duration: number;
  type: MagicTemplateClipType;
}

export type GqlMUpdateTemplateVersion_updateTemplateVersion_magicTemplate_clips = GqlMUpdateTemplateVersion_updateTemplateVersion_magicTemplate_clips_MagicTemplateClipCanvas | GqlMUpdateTemplateVersion_updateTemplateVersion_magicTemplate_clips_MagicTemplateClipSimple;

export interface GqlMUpdateTemplateVersion_updateTemplateVersion_magicTemplate_scripts_object {
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

export interface GqlMUpdateTemplateVersion_updateTemplateVersion_magicTemplate_scripts {
  __typename: "MagicTemplateScript";
  _id: GraphqlScalarType.ObjectId;
  inputData: GraphqlScalarType.JSONSchema | null;
  object: GqlMUpdateTemplateVersion_updateTemplateVersion_magicTemplate_scripts_object | null;
}

export interface GqlMUpdateTemplateVersion_updateTemplateVersion_magicTemplate {
  __typename: "MagicTemplate";
  _id: GraphqlScalarType.ObjectId | null;
  audio: GqlMUpdateTemplateVersion_updateTemplateVersion_magicTemplate_audio | null;
  clips: GqlMUpdateTemplateVersion_updateTemplateVersion_magicTemplate_clips[];
  createdAt: GraphqlScalarType.DateTime | null;
  fps: number;
  height: number;
  scripts: GqlMUpdateTemplateVersion_updateTemplateVersion_magicTemplate_scripts[] | null;
  updatedAt: GraphqlScalarType.DateTime | null;
  width: number;
}

export interface GqlMUpdateTemplateVersion_updateTemplateVersion_templateVariablesSchema {
  __typename: "FormSchema";
  jsonSchema: GraphqlScalarType.JSONSchema;
  uiSchema: GraphqlScalarType.UiSchema | null;
}

export interface GqlMUpdateTemplateVersion_updateTemplateVersion {
  __typename: "TemplateVersion";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  magicTemplate: GqlMUpdateTemplateVersion_updateTemplateVersion_magicTemplate;
  previewUrl: string | null;
  published: boolean;
  templateId: GraphqlScalarType.ObjectId;
  templateVariablesSchema: GqlMUpdateTemplateVersion_updateTemplateVersion_templateVariablesSchema | null;
  updatedAt: GraphqlScalarType.DateTime;
  userId: GraphqlScalarType.Uuid;
  version: number;
}

export interface GqlMUpdateTemplateVersion {
  updateTemplateVersion: GqlMUpdateTemplateVersion_updateTemplateVersion;
}

export interface GqlMUpdateTemplateVersionVariables {
  magicTemplate: MagicTemplateInputDto;
  templateId: GraphqlScalarType.ObjectId;
  templateVariablesSchema?: FormSchemaInput | null;
  version: number;
}
