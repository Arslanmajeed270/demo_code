import { GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
import { UiSchema } from '@rjsf/core'
import { BaseJSONScalar } from './baseJSON'

export const UiSchemaConfig: GraphQLScalarTypeConfig<UiSchema, string> = {
  name: `UiSchema`,
  description: `It will receive fabric object and convert it to Json.`,
  ...BaseJSONScalar<UiSchema>(),
}

export const UiSchemaScalar = new GraphQLScalarType(UiSchemaConfig)
