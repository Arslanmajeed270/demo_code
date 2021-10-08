import {
  FabricObjectScalar,
  JsonSchemaScalar,
  UiSchemaScalar,
  UuidScalar,
  JsonScalar,
} from '@lib/graphql'

import { buildClientSchema, IntrospectionQuery } from 'graphql'
import aspSchema from '@lib/gqlTypes/asp/schema.json'
import emzSchema from '@lib/gqlTypes/emz/schema.json'
import { ObjectIdScalar } from '@lib/graphql/scalars/objectId'

const aspExecutableSchema = buildClientSchema(
  aspSchema as unknown as IntrospectionQuery,
)
const emzExecutableSchema = buildClientSchema(
  emzSchema as unknown as IntrospectionQuery,
)

// These are the custom scalars parse or serialize using apollo Link scalars
export const GraphqlCustomScaler = {
  // scalars of Asp
  ASP: {
    schema: aspExecutableSchema,
    validateEnums: true,
    typesMap: {
      Uuid: UuidScalar,
      FabricObject: FabricObjectScalar,
      JSON: JsonScalar,
      UiSchema: UiSchemaScalar,
      JSONSchema: JsonSchemaScalar,
    },
  },
  // scalars of Emz
  EMZ: {
    schema: emzExecutableSchema,
    validateEnums: true,
    typesMap: {
      Uuid: UuidScalar,
      FabricObject: FabricObjectScalar,
      UiSchema: UiSchemaScalar,
      JSONSchema: JsonSchemaScalar,
      JSON: JsonScalar,
      ObjectId: ObjectIdScalar,
    },
  },
}
