/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

// ====================================================
// GraphQL mutation operation: GqlMDeleteVideo
// ====================================================

export interface GqlMDeleteVideo_deleteVideo {
  __typename: "MutationResponseDto";
  message: string | null;
  success: boolean;
}

export interface GqlMDeleteVideo {
  deleteVideo: GqlMDeleteVideo_deleteVideo;
}

export interface GqlMDeleteVideoVariables {
  _id: GraphqlScalarType.ObjectId;
}
