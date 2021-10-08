import { GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
import { BaseJSONScalar } from './baseJSON'

export const JsonScalarConfig: GraphQLScalarTypeConfig<any, string> = {
  name: `JSON`,
  description: `It will receive json object`,
  ...BaseJSONScalar<any>(),
}

export const JsonScalar = new GraphQLScalarType(JsonScalarConfig)
