// IFSBV = Interface form schema builder variable
import { IFSBVFormData, IFSBVJsonSchema } from '@lib/types'
import { stringToBoolean, generateUniqueKeyWithPostFix } from '@lib/utils'

export const parseFSBV = (
  formData: IFSBVFormData,
  schema: IFSBVJsonSchema,
): IFSBVJsonSchema => {
  const id = formData.id.replaceAll(` `, `_`).toLowerCase()
  const _id = schema.properties
    ? generateUniqueKeyWithPostFix(id, 0, Object.keys(schema.properties))
    : id
  const required: string[] = schema.required?.length ? [...schema.required] : []
  if (formData.isRequired === `true`) required.push(_id)

  const properties = { ...schema.properties }

  const name =
    id !== _id
      ? formData.name + ` ` + _id.split(`_`)[_id.split(`_`).length - 1]
      : formData.name

  properties[_id] = {
    title: name,
    type: formData.type,
    default:
      formData.type === `boolean`
        ? stringToBoolean(formData.defaultValue as string)
        : formData.defaultValue,
    description: formData.description,
    metadata: formData.metadata,
  }

  return {
    ...schema,
    required,
    properties,
  }
}

export const parseFSBVFormData = (
  formSchema: IFSBVJsonSchema,
  _required: string[],
): IFSBVFormData => {
  const id = Object.keys(formSchema)[0]

  const index = _required.findIndex((requiredId) => requiredId === id)

  const isRequired = index > -1
  const data = formSchema[id]

  return {
    id,
    name: data.title,
    type: data.type,
    isRequired: isRequired.toString(),
    defaultValue:
      data.type === `number` ? data.default : data.default?.toString(),
    description: data.description ?? ``,
    metadata: data.metadata,
  }
}

export const FSBVAddMetadataSchema = (
  formSchema: IFSBVJsonSchema,
  metadataSchema: Record<string, any>,
): IFSBVJsonSchema => {
  formSchema.properties[`metadata`] = {
    ...metadataSchema,
  }
  return formSchema
}
