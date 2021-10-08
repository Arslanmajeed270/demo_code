import React, { FC } from 'react'
import { Modal } from '@lib/components'
import { useTranslation } from 'react-i18next'
import { FormSchemaBuilder } from './formSchemaBuilder'
import { IFSBVJsonSchema, IFSBVFormData } from '@lib/types'
import _ from 'lodash'
import { FormValidation } from '@rjsf/core'

// FSBV = form schema builder variable

interface IAddFSBVModalProps {
  maxWidthClass?: string
  variableId?: string
  jsonSchema: IFSBVJsonSchema
  metadataJsonSchema?: IFSBVJsonSchema
  validate?: (
    _formData: IFSBVFormData,
    errors: FormValidation,
  ) => FormValidation
  closeModel: () => void
  onSubmit: (_Schema: IFSBVJsonSchema) => void
}

export const AddFSBVModal: FC<IAddFSBVModalProps> = (props) => {
  const { t } = useTranslation(`magic`)

  return (
    <Modal title={t(`add-variable`)} hideModal={props.closeModel}>
      <div className={props.maxWidthClass ?? `w-72`}>
        <div className={`overflow-x-auto`}>
          <FormSchemaBuilder
            jsonSchema={props.jsonSchema}
            variableId={props.variableId}
            onSubmit={props.onSubmit}
            validate={props.validate}
            metadataJsonSchema={props.metadataJsonSchema}
          />
        </div>
      </div>
    </Modal>
  )
}
