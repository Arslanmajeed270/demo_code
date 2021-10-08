/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { MediaUploadRequestPurpose, MediaType, MediaUploadRequestState } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GqlMMediaUploadRequest
// ====================================================

export interface GqlMMediaUploadRequest_mediaUploadRequest_presignedPost {
  __typename: "PresignedPostDto";
  fields: GraphqlScalarType.JSON;
  url: string;
}

export interface GqlMMediaUploadRequest_mediaUploadRequest {
  __typename: "MediaUploadRequestDto";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  errorMessage: string | null;
  name: string;
  orgId: GraphqlScalarType.Uuid | null;
  parentFileStorageId: GraphqlScalarType.ObjectId | null;
  presignedPost: GqlMMediaUploadRequest_mediaUploadRequest_presignedPost;
  public: boolean;
  purpose: MediaUploadRequestPurpose;
  state: MediaUploadRequestState;
  type: MediaType;
  updatedAt: GraphqlScalarType.DateTime;
  userId: GraphqlScalarType.Uuid;
}

export interface GqlMMediaUploadRequest {
  mediaUploadRequest: GqlMMediaUploadRequest_mediaUploadRequest;
}

export interface GqlMMediaUploadRequestVariables {
  name?: string | null;
  orgId?: GraphqlScalarType.Uuid | null;
  parentFileStorageId?: GraphqlScalarType.ObjectId | null;
  public?: boolean | null;
  purpose?: MediaUploadRequestPurpose | null;
  type: MediaType;
}
