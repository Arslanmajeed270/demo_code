export * from './builder'
import { JSONSchema7, JSONSchema7Definition } from 'json-schema'

// IFSBV = Interface form schema builder variable

// eslint-disable-next-line quotes
export interface IFSBVJsonSchemaPure extends JSONSchema7 {
  metadata?: Record<string, any>
}

export interface IFSBVJsonSchema
  // eslint-disable-next-line quotes
  extends Omit<IFSBVJsonSchemaPure, 'properties'> {
  properties?:
    | {
        [key: string]: JSONSchema7Definition | IFSBVJsonSchemaPure
      }
    | undefined
}
