import React, { FC, ReactElement, useEffect, useState } from 'react'
import { FormSchema } from '@lib/components/formSchema'
import _ from 'lodash'
import { IFSBVFormData, IFSBVJsonSchema } from '@lib/types'
import { FSBVJsonSchema, FSBVUiSchema } from '@lib/constants'
import { AjvError, FormValidation } from '@rjsf/core'
import { parseFSBVFormData, parseFSBV, FSBVAddMetadataSchema } from './utils'

interface IFormSchemaBuilderProps {
  jsonSchema: IFSBVJsonSchema
  metadataJsonSchema?: IFSBVJsonSchema
  variableId?: string
  onSubmit: (_schema: IFSBVJsonSchema) => void
  validate?: (
    _formData: IFSBVFormData,
    errors: FormValidation,
  ) => FormValidation
}

export const FormSchemaBuilder: FC<IFormSchemaBuilderProps> = ({
  jsonSchema,
  variableId,
  onSubmit,
  metadataJsonSchema,
  validate,
}): ReactElement => {
  const [formData, setFormData] = useState<IFSBVFormData>()
  const [schema, setSchema] = useState<IFSBVJsonSchema>(FSBVJsonSchema)

  const _setFormData = (_formData: IFSBVFormData) => {
    if (_formData.name && _formData.name !== formData.name) {
      _formData[`id`] = _formData.name.replaceAll(` `, `_`).toLocaleLowerCase()
    }
    setFormData(_formData)
  }

  const _onSubmit = ({ formData: _formData }) => {
    const _schema: IFSBVJsonSchema = _.cloneDeep(jsonSchema)
    if (variableId) {
      _schema.required = _schema.required.filter((elem) => elem !== variableId)
      delete _schema.properties[variableId]
    }
    const updatedSchema = parseFSBV(_formData, _schema)
    onSubmit(updatedSchema)
  }

  const transformErrors = (errors: AjvError[]): AjvError[] => {
    return errors.map((error) => {
      if (error.name === `pattern`) {
        error.message = `Special characters are not allowed!`
      }
      return error
    })
  }

  useEffect(() => {
    if (!variableId) return
    const _formData = parseFSBVFormData(
      {
        [variableId]: jsonSchema.properties[variableId],
      },
      jsonSchema.required,
    )
    setFormData(_formData)
  }, [variableId])

  useEffect(() => {
    if (!metadataJsonSchema) return
    const _schema = FSBVAddMetadataSchema(FSBVJsonSchema, metadataJsonSchema)
    setSchema(_schema)
  }, [])

  return (
    <FormSchema
      schema={schema}
      uiSchema={FSBVUiSchema}
      formData={formData}
      formContext={{
        formData,
      }}
      transformErrors={transformErrors}
      validate={validate}
      onSubmit={_onSubmit}
      onChange={(e) => _setFormData(e.formData)}
    />
  )
}
