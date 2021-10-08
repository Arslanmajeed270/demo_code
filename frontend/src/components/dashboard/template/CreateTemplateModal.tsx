import React, { FC, useState } from 'react'
import { Button, InputText, Modal } from '@lib/components'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { GQLM_TEMPLATE, GQLM_TEMPLATE_VERSION } from '@lib/entities'
import {
  GqlMTemplate,
  GqlMTemplateVariables,
  GqlMTemplateVersion,
  GqlMTemplateVersionVariables,
  MagicTemplateInputDto,
} from '@lib/gqlTypes/emz'
import _ from 'lodash'
import router from 'next/router'
import { toastify } from '@lib/utils'
import { EmzAppRoutes } from '@lib/constants'
import { GqlInitialUserData_myOrganizationList } from '@lib/gqlTypes/asp'
import { ObjectId } from '@lib/graphql'
import { DefaultMagicTemplate } from '@constants/magic'
import { removeTemplateGarbage } from '@utils/object'
import { cleanTemplate } from '@components/Magic/MagicCanvas/template/validation'

interface ICreateTemplateModalProps {
  show: boolean
  onClose: () => void
  org: GqlInitialUserData_myOrganizationList
}

export const CreateTemplateModal: FC<ICreateTemplateModalProps> = (props) => {
  const { t } = useTranslation([`template`, `common`])
  const [title, setTitle] = useState(``)

  const [createTemplate, { loading }] = useMutation<
    GqlMTemplate,
    GqlMTemplateVariables
  >(GQLM_TEMPLATE, {
    onCompleted(data) {
      _saveTemplateVersion(data.template._id) // TODO: do this in backend
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const [createTemplateVersion] = useMutation<
    GqlMTemplateVersion,
    GqlMTemplateVersionVariables
  >(GQLM_TEMPLATE_VERSION, {
    onCompleted(data) {
      router.push(EmzAppRoutes.magic + `?id=${data.templateVersion.templateId}`)
      props.onClose()
    },
    onError(error) {
      props.onClose()
      toastify.Error(error.message)
    },
  })

  const _saveTemplateVersion = (templateId: ObjectId) => {
    const magicTemplate = removeTemplateGarbage(
      cleanTemplate(DefaultMagicTemplate),
    ) as MagicTemplateInputDto
    const variables: GqlMTemplateVersionVariables = {
      templateId,
      magicTemplate,
    }
    createTemplateVersion({
      variables,
    })
  }

  const _createTemplate = () => {
    const variables: GqlMTemplateVariables = {
      public: false,
      orgId: props.org.id,
      title,
    }
    createTemplate({
      variables,
    })
  }

  if (!props.show) return null

  return (
    <Modal title={t(`template:create-template`)} hideModal={props.onClose}>
      <div className="flex gap-3">
        <div className="flex-4">
          <InputText
            placeholder={t(`template:create-template`)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </div>
        <div className="flex-none">
          <Button
            disabled={loading}
            isFat={false}
            color="primary"
            label={t(`common:create`)}
            isLoading={loading}
            onClick={_createTemplate}
          />
        </div>
      </div>
    </Modal>
  )
}
