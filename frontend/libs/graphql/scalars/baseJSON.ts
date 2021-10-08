import { Kind, ValueNode } from 'graphql'

export const BaseJSONScalar = <T>() => {
  return {
    serialize(value: T): string {
      return JSON.stringify(value)
    },
    parseValue(value: string): T {
      return JSON.parse(value)
    },
    parseLiteral(ast: ValueNode): T {
      if (ast.kind === Kind.STRING) {
        return JSON.parse(ast.value)
      }
      return null
    },
  }
}
