import React, { ReactElement } from 'react'
import Form, { FormProps } from '@rjsf/core'
import { replaceObjectKeysRecursively } from '@utils/object'
import { BaseDocument } from '@lib/constants'
import { DataStoreSchema } from '@lib/gqlTypes/asp/formSchema'
import { formSchemaFields } from './components/fields'
import { FieldTemplate } from './components/FieldTemplate'

interface IFormSchemaProps<T> extends FormProps<T> {
  formContext?: {
    labelIcons: React.FC[]
    onLabelClick: (keyPath: string) => void
  } & any
  hideSubmitBtn?: boolean
}

export const FormSchema = <T extends unknown>({
  schema,
  fields,
  formContext,
  ...props
}: IFormSchemaProps<T>): ReactElement => {
  const safeSchema = getSafeJsonSchema(schema)
  const _fields = {
    ...formSchemaFields,
    ...fields,
  }
  if (props.onChange)
    formContext.onChange = (formData) => {
      const onChange = props.onChange as any
      onChange({ formData })
    }
  return (
    <>
      <link rel="stylesheet" href={BaseDocument.css.bootstrap}></link>
      <Form
        liveValidate={true}
        showErrorList={false}
        omitExtraData={true}
        liveOmit={true}
        {...props}
        formContext={formContext}
        className={`use-bootstrap ${props.className}`}
        schema={safeSchema}
        fields={_fields}
        FieldTemplate={FieldTemplate}
      >
        {props.hideSubmitBtn}
      </Form>
    </>
  )
}

const getSafeJsonSchema = (jsonSchema: DataStoreSchema) => {
  // because of https://github.com/rjsf-team/react-jsonschema-form/issues/2022
  return replaceObjectKeysRecursively(
    `multipleOfPrecision`,
    `multipleOf`,
  )(jsonSchema)
}
