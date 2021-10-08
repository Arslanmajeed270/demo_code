import { GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
import { JSONSchema7 } from 'json-schema'
import { BaseJSONScalar } from './baseJSON'

export const JsonSchemaConfig: GraphQLScalarTypeConfig<JSONSchema7, string> = {
  name: `JSONSchema`,
  description: `It will receive fabric object and convert it to Json.`,
  ...BaseJSONScalar<JSONSchema7>(),
}

export const JsonSchemaScalar = new GraphQLScalarType(JsonSchemaConfig)
