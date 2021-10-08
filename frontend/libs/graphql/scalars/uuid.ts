import {
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
  Kind,
  ValueNode,
} from 'graphql'
import { Uuid } from '../types/uuid'

export const UuidConfig: GraphQLScalarTypeConfig<Uuid, string> = {
  name: `Uuid`,
  description: `Uuid custom scalar type from cassandra`,

  serialize(value: Uuid): string {
    return value.uuid // value sent to Client client
  },

  parseValue(value: string): Uuid {
    return new Uuid(value) // value get from client
  },

  parseLiteral(ast: ValueNode): Uuid {
    if (ast.kind === Kind.STRING) {
      return new Uuid(ast.value)
    }
    return null
  },
}

export const UuidScalar = new GraphQLScalarType(UuidConfig)
