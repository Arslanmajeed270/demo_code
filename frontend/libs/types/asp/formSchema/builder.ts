import { JSONSchema7TypeName } from 'json-schema'
// IFSBV = Interface form schema builder variable
export interface IFSBVFormData {
  id: string
  type: JSONSchema7TypeName | JSONSchema7TypeName[] | undefined
  isRequired: string
  defaultValue?: string | number
  name: string
  metadata?: Record<string, any>
  description?: string
}
