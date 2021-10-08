import { fabric } from 'fabric'
import { JSONSchema7 } from 'json-schema'
import { UiSchema as uiSchema } from '@rjsf/core'

export type ObjectId = string
export type DateTime = Date
export type FabricObject = fabric.IObjectOptions
export type JSONSchema = JSONSchema7
export type UiSchema = uiSchema

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JSON = Record<string, any>

export * from './uuid'
export * from './objectId'
