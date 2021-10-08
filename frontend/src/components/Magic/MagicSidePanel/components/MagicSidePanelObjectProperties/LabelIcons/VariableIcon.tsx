import { ILabelIconProps } from '@lib/components/formSchema/components/fields/SchemaField'
import { IFSBVFormData } from '@lib/types'
import _ from 'lodash'
import React from 'react'
import { getVariablePath } from '../../MagicSidePanelTemplateVariables/utils'

export const VariableIcon: React.FC<ILabelIconProps> = (props) => {
  const { id, formContext, formData: currentValue, label } = props
  const setLinkVariableFormData: (param: IFSBVFormData) => void =
    formContext.setLinkVariableFormData
  const onClick = () => {
    const variablePath = getVariablePath(
      id,
      formContext.activeClip._id,
      formContext.object._id,
      formContext.template,
    )
    const type = typeof currentValue
    const formData: IFSBVFormData = {
      id: label,
      defaultValue: currentValue,
      isRequired: `true`,
      name: label,
      description: ``,
      metadata: {
        linkVariables: [variablePath],
      },
      type:
        type === `number`
          ? `number`
          : type === `boolean`
          ? `boolean`
          : `string`,
    }
    setLinkVariableFormData(formData)
  }

  return <i onClick={onClick} className="fas fa-plus fa-sm" />
}
