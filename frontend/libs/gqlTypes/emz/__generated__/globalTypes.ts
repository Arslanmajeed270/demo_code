/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum EmeezoTemplateCategory {
  ACCOUNTING_AND_TAX_SERVICES = "ACCOUNTING_AND_TAX_SERVICES",
  ARTS_CULTURE_AND_ENTERTAINMENT = "ARTS_CULTURE_AND_ENTERTAINMENT",
  AUTO_SALES_AND_SERVICE = "AUTO_SALES_AND_SERVICE",
  BANKING_AND_FINANCE = "BANKING_AND_FINANCE",
  BUSINESS_SERVICES = "BUSINESS_SERVICES",
  COMMUNITY_ORGANIZATIONS = "COMMUNITY_ORGANIZATIONS",
  DENTISTS_AND_ORTHODONTISTS = "DENTISTS_AND_ORTHODONTISTS",
  EDUCATION = "EDUCATION",
  HEALTH_AND_WELLNESS = "HEALTH_AND_WELLNESS",
  HEALTH_CARE = "HEALTH_CARE",
  HOME_IMPROVEMENT = "HOME_IMPROVEMENT",
  INSURANCE = "INSURANCE",
  INTERNET_AND_WEB_SERVICES = "INTERNET_AND_WEB_SERVICES",
  LEGAL_SERVICES = "LEGAL_SERVICES",
  LODGING_AND_TRAVEL = "LODGING_AND_TRAVEL",
  MARKETING_AND_ADVERTISING = "MARKETING_AND_ADVERTISING",
  NEWS_AND_MEDIA = "NEWS_AND_MEDIA",
  OTHERS = "OTHERS",
  PET_SERVICES = "PET_SERVICES",
  REAL_ESTATE = "REAL_ESTATE",
  RESTAURANTS_AND_NIGHTLIFE = "RESTAURANTS_AND_NIGHTLIFE",
  SALES_AND_LEAD_GENERATION = "SALES_AND_LEAD_GENERATION",
  SHOPPING_AND_RETAIL = "SHOPPING_AND_RETAIL",
  SPORTS_AND_RECREATION = "SPORTS_AND_RECREATION",
  TRANSPORTATION = "TRANSPORTATION",
  UTILITIES = "UTILITIES",
  WEDDING_EVENTS_AND_MEETINGS = "WEDDING_EVENTS_AND_MEETINGS",
}

export enum EmeezoVideoPurpose {
  B2B_LEAD = "B2B_LEAD",
  NORMAL = "NORMAL",
}

export enum EmeezoVideoStatus {
  COMPLETED = "COMPLETED",
  ERROR = "ERROR",
  PROCESSING = "PROCESSING",
  QUEUED = "QUEUED",
}

export enum MagicEmImageSources {
  PEXELS = "PEXELS",
  PIXABAY = "PIXABAY",
  UNSPLASH = "UNSPLASH",
}

export enum MagicEmVideoSources {
  PEXELS = "PEXELS",
  PIXABAY = "PIXABAY",
}

export enum MagicTemplateClipType {
  CANVAS = "CANVAS",
  SIMPLE = "SIMPLE",
}

export enum MediaState {
  COMPLETED = "COMPLETED",
  ERROR = "ERROR",
  PROCESSING = "PROCESSING",
}

export enum MediaType {
  AUDIO = "AUDIO",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}

export enum ScriptLanguage {
  html = "html",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  TERMINATED = "TERMINATED",
  UNVERIFIED = "UNVERIFIED",
}

export interface EmzVideoTemplateInputDto {
  _id: GraphqlScalarType.ObjectId;
  variables?: GraphqlScalarType.JSON | null;
  version?: number | null;
}

export interface FormSchemaInput {
  jsonSchema: GraphqlScalarType.JSONSchema;
  uiSchema?: GraphqlScalarType.UiSchema | null;
}

export interface GetTemplatesSearchReqDto {
  category?: EmeezoTemplateCategory | null;
  orgId?: GraphqlScalarType.Uuid | null;
  query?: string | null;
}

export interface GetVideosFilterReqDto {
  purpose?: EmeezoVideoPurpose | null;
  query?: string | null;
}

export interface MagicTemplateAudioFileInputDto {
  mediaId?: GraphqlScalarType.ObjectId | null;
  type: string;
  url?: string | null;
}

export interface MagicTemplateAudioInputDto {
  file?: MagicTemplateAudioFileInputDto | null;
  loopAudio?: boolean | null;
  outputVolume?: number | null;
}

export interface MagicTemplateClipInputDto {
  background: string;
  duration: number;
  objects?: GraphqlScalarType.FabricObject[] | null;
  type: MagicTemplateClipType;
}

export interface MagicTemplateInputDto {
  audio?: MagicTemplateAudioInputDto | null;
  clips: MagicTemplateClipInputDto[];
  fps: number;
  height: number;
  scripts?: MagicTemplateScriptInputDto[] | null;
  width: number;
}

export interface MagicTemplateScriptInputDto {
  _id: GraphqlScalarType.ObjectId;
  variables?: GraphqlScalarType.JSONSchema | null;
}

export interface QueryTemplateCloneReqDto {
  orgId: GraphqlScalarType.Uuid;
  version?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
