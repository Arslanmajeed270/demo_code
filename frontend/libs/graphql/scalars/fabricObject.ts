import { GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
import { FabricObject } from '..'
import { BaseJSONScalar } from './baseJSON'

export const FabricObjectConfig: GraphQLScalarTypeConfig<FabricObject, string> =
  {
    name: `FabricObject`,
    description: `It will receive fabric object and convert it to Json.`,
    ...BaseJSONScalar<FabricObject>(),
  }

export const FabricObjectScalar = new GraphQLScalarType(FabricObjectConfig)
