import React, { FC, useEffect, useState } from 'react'
import { Button, InputText } from '@lib/components'
import { useTranslation } from 'react-i18next'
import { IFSBVFormData, IFSBVJsonSchema } from '@lib/types'
import _ from 'lodash'
import { parseFSBV } from '@lib/components/formSchemaBuilder/utils'

interface IAttachMTVModalProps {
  jsonSchema: IFSBVJsonSchema
  linkVariableFormData: IFSBVFormData
  showVariables: boolean
  setShowVariables: (_showVariables: boolean) => void
  onSubmit: (_schema: IFSBVJsonSchema) => void
}

export const AttachMTV: FC<IAttachMTVModalProps> = ({
  linkVariableFormData,
  onSubmit,
  jsonSchema,
  setShowVariables,
}) => {
  const { t } = useTranslation(`magic`)
  const [title, setTitle] = useState<string>(``)
  const [showExisting, setShowExisting] = useState<boolean>(false)

  const _onSubmit = () => {
    const _formData = {
      ...linkVariableFormData,
      name: title,
      id: title,
    }
    const _schema: IFSBVJsonSchema = _.cloneDeep(jsonSchema)
    const updatedSchema = parseFSBV(_formData, _schema)
    onSubmit(updatedSchema)
  }

  useEffect(() => {
    if (!linkVariableFormData) return
  }, [])

  useEffect(() => {
    if (!linkVariableFormData) return
    setTitle(linkVariableFormData.name)
    if (!jsonSchema.properties) return
    Object.entries(jsonSchema.properties)
      .map((e) => ({
        id: e[0],
        object: e[1] as IFSBVJsonSchema,
      }))
      .map((variable) => {
        if (variable.object.type === linkVariableFormData.type) {
          setShowExisting(true)
        }
      })
  }, [])

  return (
    <div className={`w-96`}>
      <div>
        <label htmlFor="title">{t(`variable-name`)}</label>
        <div className="w-full inline-flex gap-3">
          <div className="w-full">
            <InputText
              placeholder={t(`new-variable-title`)}
              value={title}
              id="title"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
          </div>
          <div>
            <Button
              isFat={false}
              color="primary"
              label={t(`common:create`)}
              onClick={_onSubmit}
            />
          </div>
        </div>
        {showExisting && (
          <div className="flex items-center mt-4">
            <div className="flex ml-auto">
              <p
                className="inline-flex text-xs font-thin text-gray-500 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white cursor-pointer"
                onClick={() => setShowVariables(true)}
              >
                {t(`use-existing-variable`)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
