import { JSONSchema7 } from 'json-schema'
import { UiSchema } from '@rjsf/core'

export type DataStoreSchema = JSONSchema7
export type DataStoreUISchema = UiSchema
export interface IFormSchema {
  jsonSchema: DataStoreSchema
  uiSchema?: DataStoreUISchema
}
