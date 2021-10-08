import { ITCCOSchema } from '@interfaces/emeezoVideo'

// Improting object schemas
import baseJson from './base.json'
import objectJson from './object.json'
import imageJson from './image.json'
import videoJson from './video.json'
import audioJson from './audio.json'
import textJson from './text.json'
import iTextJson from './i-text.json'

// Importing keyframes base schema
import keyframesBaseJson from './properties/keyframesBase.json'
import keyframeEasingJson from './properties/keyframeEasing.json'

import _ from 'lodash'
import { JSONSchema7, JSONSchema7TypeName } from 'json-schema'
import { FabricObject } from '@lib/graphql'

const BlockedKeyframeProperties: string[] = [
  `startAt`,
  `endAt`,
  `_id`,
  `version`,
  `type`,
  `keyframes`,

  // temprory
  `styles././.fontSize`,
]

const BlockedKeyframePropertyTypes: JSONSchema7TypeName[] = [
  `object`,
  `array`,
  `null`,
]

const base = baseJson as ITCCOSchema
const baseProperties = base.jsonSchema.properties
const object = objectJson as ITCCOSchema

const baseTccoJsons: { [x: string]: ITCCOSchema } = {
  object,
  image: imageJson as ITCCOSchema,
  video: videoJson as ITCCOSchema,
  audio: audioJson as ITCCOSchema,
  text: textJson as ITCCOSchema,
  'i-text': iTextJson as ITCCOSchema,
}

const keyframesBase = keyframesBaseJson as ITCCOSchema
const keyframeEasing = keyframeEasingJson as ITCCOSchema

const schemaCache: { [x: string]: ITCCOSchema } = {}

export const getTccObjectFormSchema = (
  type: string,
  fromCacheIfPossible = true,
): ITCCOSchema => {
  // Returing if available in cache
  if (fromCacheIfPossible && schemaCache[type] !== undefined)
    return schemaCache[type]

  if (typeof baseProperties.type !== `object`)
    throw new Error(`Tempalte canvas base schema not valid ('base')`)
  if (type === baseProperties.type.const) return base

  const tcco = baseTccoJsons[type]

  if (!tcco)
    throw new Error(`Tempalte canvas object schema not found ('${type}')`)

  const parentObjectSchema = getTccObjectFormSchema(tcco.parent)

  const schemaWithoutKeyframes = {
    parent: tcco.parent,
    jsonSchema: {
      ...parentObjectSchema.jsonSchema,
      required: _.sortedUniq([
        ...(tcco.jsonSchema.required || []),
        ...(parentObjectSchema.jsonSchema.required || []),
      ]),
      properties: {
        ...(tcco.jsonSchema.properties || {}),
        ...(parentObjectSchema.jsonSchema.properties || {}),
        type: {
          ...baseProperties.type,
          default: type,
          const: type,
        },
      },
    },
    uiSchema: {
      ...(tcco.uiSchema || {}),
      ...(parentObjectSchema.uiSchema || {}),
    },
  }

  // storing in cache
  schemaCache[type] = getKeyFramesTCCOSchema(schemaWithoutKeyframes)

  return schemaCache[type]
}

const getKeyFramesTCCOSchema = (schema: ITCCOSchema): ITCCOSchema => {
  const keyframes: ITCCOSchema = {
    parent: null,
    jsonSchema: getKeyframesJsonSchema(schema),
    uiSchema: {},
  }
  return {
    ...schema,
    jsonSchema: {
      ...schema.jsonSchema,
      properties: {
        ...schema.jsonSchema.properties,
        keyframes: keyframes.jsonSchema,
      },
    },
    uiSchema: {
      ...schema.uiSchema,
      keyframes: keyframes.uiSchema,
    },
  }
}

export const isValidFabricObjectKeyframePath = (
  propertyPath: string,
  fabricObjectJsonSchema: JSONSchema7,
): boolean => {
  const propertySchema = getPropertySchemaFromPropertyPath(
    fabricObjectJsonSchema,
    propertyPath,
  ) as JSONSchema7
  if (!propertySchema) return false

  if (BlockedKeyframeProperties.includes(propertyPath)) return false
  const types = _.isArray(propertySchema.type)
    ? propertySchema.type
    : [propertySchema.type]
  for (const type of types) {
    if (BlockedKeyframePropertyTypes.includes(type)) return false
  }
  return true
}

const getNestedPropertyPaths = (
  jsonSchema: JSONSchema7,
  parentObjectPropertyPath?: string,
): string[] =>
  _.flatMap(Object.keys(jsonSchema.properties), (propertyKey) => {
    const key = parentObjectPropertyPath
      ? `${parentObjectPropertyPath}.${propertyKey}`
      : propertyKey

    const property = jsonSchema.properties[propertyKey] as JSONSchema7
    if (property.type === `object`) return getNestedPropertyPaths(property, key)

    return [key]
  })

const getPropertySchemaFromPropertyPath = (
  jsonSchema: JSONSchema7,
  propertyPath: string,
) => {
  const propertKeyArray = propertyPath.split(`.`)
  if (propertKeyArray.length === 1)
    return jsonSchema.properties[propertyPath] as JSONSchema7

  let jsonSchemaTraversed = jsonSchema

  for (const propertKey of propertKeyArray) {
    if (jsonSchemaTraversed.type === `object`) {
      jsonSchemaTraversed = jsonSchemaTraversed.properties[
        propertKey
      ] as JSONSchema7
    }
  }

  return jsonSchemaTraversed
}

const getKeyframesJsonSchema = (schema: ITCCOSchema): JSONSchema7 => {
  const keyframeItems = keyframesBase.jsonSchema.items as JSONSchema7
  const keyframeItemsProperties = keyframeItems.properties as any

  const jsonSchemaPropertyPaths = getNestedPropertyPaths(
    schema.jsonSchema,
  ) as (keyof FabricObject)[]

  const keyframePropertyPaths = jsonSchemaPropertyPaths.filter((propertyPath) =>
    isValidFabricObjectKeyframePath(propertyPath, schema.jsonSchema),
  )
  const dependencies = keyframePropertyPaths.map<JSONSchema7>((propertyPath) =>
    getKeyframeDependency(
      propertyPath,
      getPropertySchemaFromPropertyPath(
        schema.jsonSchema,
        propertyPath,
      ) as JSONSchema7,
    ),
  )
  const keyframesCloned: JSONSchema7 = _.cloneDeep({
    ...keyframesBase.jsonSchema,
    items: {
      ...keyframeItems,
      properties: {
        ...keyframeItemsProperties,
        propertyPath: {
          ...keyframeItemsProperties.propertyPath,
          enum: keyframePropertyPaths,
        },
      },
      dependencies: {
        propertyPath: {
          oneOf: dependencies,
        },
      },
    },
  })
  return keyframesCloned
}

const getKeyframeDependency = (
  propertyPath: string,
  property: JSONSchema7,
): JSONSchema7 => {
  const isPropertyNumeric =
    property.type === `integer` || property.type === `number`
  return {
    // additionalProperties: false,
    properties: {
      propertyPath: {
        enum: [propertyPath],
      },
      value: property,
      // Adding easing properties for integer and number
      ...(isPropertyNumeric ? keyframeEasing.jsonSchema.properties : {}),
    },
    required: [
      `value`,
      ...(isPropertyNumeric ? keyframeEasing.jsonSchema.required || [] : []),
    ],
  }
}
