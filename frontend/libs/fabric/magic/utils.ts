import { JSONSchema7 } from 'json-schema'
import _ from 'lodash'

export const getJsonSchemaNestedPropertyPaths = (
  jsonSchema: JSONSchema7,
  parentObjectPropertyPath?: string,
): string[] =>
  _.flatMap(Object.keys(jsonSchema.properties), (propertyKey) => {
    const key = parentObjectPropertyPath
      ? `${parentObjectPropertyPath}.${propertyKey}`
      : propertyKey

    const property = jsonSchema.properties[propertyKey] as JSONSchema7
    if (property.type === `object`)
      return getJsonSchemaNestedPropertyPaths(property, key)

    return [key]
  })
