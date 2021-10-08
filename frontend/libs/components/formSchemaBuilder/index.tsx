import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AddFSBVModal } from './AddFSBVModal'
import _ from 'lodash'
import { IFSBVCardVariable, FSBVCard } from './FSBVCard'
import { IFSBVJsonSchema, IFSBVFormData } from '@lib/types'
import { FormValidation } from '@rjsf/core'
import { JSONSchema7TypeName } from 'json-schema'

interface IFormSchemaBuilderWrapperProps {
  jsonSchema: IFSBVJsonSchema
  metadataJsonSchema?: IFSBVJsonSchema
  showDelete?: boolean
  hideAddVariable?: boolean
  validate?: (
    _formData: IFSBVFormData,
    errors: FormValidation,
  ) => FormValidation
  onSubmit: (_Schema: IFSBVJsonSchema) => void
  onClick?: (id: string) => void
  showType?: JSONSchema7TypeName | JSONSchema7TypeName[]
}

export const FormSchemaBuilderWrapper: FC<IFormSchemaBuilderWrapperProps> = ({
  validate,
  jsonSchema,
  onSubmit,
  metadataJsonSchema,
  onClick,
  showDelete,
  hideAddVariable,
  showType,
}) => {
  const { t } = useTranslation(`magic`)
  const [showModal, setShowModal] = useState(false)
  const [variableId, setVariableId] = useState<string>()

  const onEdit = (id: string) => {
    setVariableId(id)
    setShowModal(true)
  }

  const closeModel = () => {
    if (variableId) setVariableId(null)
    setShowModal(false)
  }

  const _onDelete = (id: string) => {
    const _schema: IFSBVJsonSchema = _.cloneDeep(jsonSchema)
    _schema.required = _schema.required.filter((elem) => elem !== id)
    delete _schema.properties[id]
    onSubmit(_schema)
  }

  const _onSubmit = (_Schema: IFSBVJsonSchema) => {
    onSubmit(_Schema)
    closeModel()
  }

  return (
    <>
      {showModal && (
        <AddFSBVModal
          onSubmit={_onSubmit}
          variableId={variableId}
          closeModel={closeModel}
          validate={validate}
          jsonSchema={jsonSchema}
          metadataJsonSchema={metadataJsonSchema}
        />
      )}
      <div className="mt-4">
        {!hideAddVariable && (
          <div
            className="h-24 mt-5 rounded-md cursor-pointer bg-gray-200 flex text-gray-700 p-8"
            onClick={() => setShowModal(true)}
          >
            <div>
              <h1 className="text-lg">{t(`add-variable`)}</h1>
            </div>
            <div className=" w-24">
              <i className="float-right fal fa-plus-square fa-2x"></i>
            </div>
          </div>
        )}
        {jsonSchema.properties &&
          Object.entries(jsonSchema.properties)
            .map(
              (e): IFSBVCardVariable => ({
                id: e[0],
                object: e[1] as IFSBVJsonSchema,
              }),
            )
            .map((variable, index) =>
              showType ? (
                variable.object.type === showType && (
                  <FSBVCard
                    key={index}
                    variable={variable}
                    onClick={onClick ?? onEdit}
                    showDelete={showDelete}
                    onDelete={_onDelete}
                  />
                )
              ) : (
                <FSBVCard
                  key={index}
                  variable={variable}
                  onClick={onClick ?? onEdit}
                  showDelete={showDelete}
                  onDelete={_onDelete}
                />
              ),
            )}
      </div>
    </>
  )
}
