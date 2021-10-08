import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { setTemplate } from '@redux/actions'
import _ from 'lodash'
import { IMagicSidePanelListComponentProps } from '../..'
import { FormSchemaBuilderWrapper } from '@lib/components/formSchemaBuilder'
import { IFSBVFormData, IFSBVJsonSchema } from '@lib/types'
import { FormValidation } from '@rjsf/core'
import { validateMTV } from './utils'
import { FSBVMetadataJsonSchema } from './constants'
import { AttachMTV } from './components/attachMTV'
import { Modal } from '@lib/components'
import { useTranslation } from 'react-i18next'

interface IMagicSidePanelVariablesProps
  extends IMagicSidePanelListComponentProps {
  linkVariableFormData?: IFSBVFormData
  setLinkVariableFormData?: (param: IFSBVFormData) => void
}

export const MagicSidePanelVariables: FC<IMagicSidePanelVariablesProps> = ({
  template: magicTemplate,
  linkVariableFormData,
  setLinkVariableFormData,
}) => {
  const { t } = useTranslation(`magic`)
  const dispatch = useDispatch()
  const { template } = useSelector((state: RootState) => state.magicTemplate)
  const [showVariables, setShowVariables] = useState<boolean>(false)

  const hideModal = () => {
    if (setLinkVariableFormData) setLinkVariableFormData(null)
  }

  const getSchema = () => {
    let schema: IFSBVJsonSchema = {
      title: `Variables`,
      type: `object`,
      required: [],
      properties: {},
    }
    if (template.templateVersion?.templateVariablesSchema?.jsonSchema) {
      const jsonObject = _.cloneDeep(
        template.templateVersion.templateVariablesSchema.jsonSchema,
      )

      schema = {
        ...jsonObject,
      }
    }
    return schema
  }

  const validate = (
    _formData: IFSBVFormData,
    errors: FormValidation,
  ): FormValidation => {
    return validateMTV(_formData, errors, magicTemplate)
  }

  const onSubmit = (_Schema: IFSBVJsonSchema) => {
    const _updateTemplate = _.cloneDeep(template)
    _updateTemplate.templateVersion.templateVariablesSchema = {
      __typename: `FormSchema`,
      jsonSchema: { ..._Schema },
      uiSchema: {},
    }
    dispatch(setTemplate(_updateTemplate))
    hideModal()
  }

  const onAttachLinkMTV = (id: string) => {
    const updateTemplate = _.cloneDeep(template)
    const updatedMTVObject = updateTemplate.templateVersion
      .templateVariablesSchema.jsonSchema.properties[id] as IFSBVJsonSchema
    if (!updatedMTVObject.metadata) updatedMTVObject.metadata = {}
    if (!updatedMTVObject.metadata.linkVariables)
      updatedMTVObject.metadata.linkVariables = []
    updatedMTVObject.metadata.linkVariables = [
      ...updatedMTVObject.metadata.linkVariables,
      linkVariableFormData.metadata.linkVariables[0],
    ]
    updateTemplate.templateVersion.templateVariablesSchema.jsonSchema.properties =
      {
        ...updateTemplate.templateVersion.templateVariablesSchema.jsonSchema
          .properties,
        [id]: {
          ...updatedMTVObject,
        },
      }
    dispatch(setTemplate(updateTemplate))
    hideModal()
  }

  return (
    <>
      {linkVariableFormData ? (
        <Modal title={t(`add-variable`)} hideModal={hideModal}>
          {showVariables ? (
            <div className={`w-96`}>
              <FormSchemaBuilderWrapper
                jsonSchema={getSchema()}
                onSubmit={onSubmit}
                showDelete={false}
                hideAddVariable={true}
                onClick={onAttachLinkMTV}
                showType={linkVariableFormData.type}
              />
            </div>
          ) : (
            <AttachMTV
              jsonSchema={getSchema()}
              linkVariableFormData={linkVariableFormData}
              onSubmit={onSubmit}
              setShowVariables={setShowVariables}
              showVariables={showVariables}
            />
          )}
        </Modal>
      ) : (
        <FormSchemaBuilderWrapper
          jsonSchema={getSchema()}
          onSubmit={onSubmit}
          validate={validate}
          showDelete={true}
          metadataJsonSchema={FSBVMetadataJsonSchema}
        />
      )}
    </>
  )
}
