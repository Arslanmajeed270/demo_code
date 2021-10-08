import React, { FC, useEffect, useState } from 'react'
import {
  IEmeezoTemplateBoxGridItemProps,
  TemplateCard,
} from '@components/dashboard/template/TemplateCard'
import {
  InputText,
  BoxGridList,
  LayoutHeader,
  ScrollBarDiv,
  Loader,
  Spinner,
} from '@lib/components'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { useLazyQuery, useMutation } from '@apollo/client'
import { GQLM_CLONE_TEMPLATE, GQL_TEMPLATES } from '@lib/entities'
import {
  GqlTemplates,
  GqlTemplatesVariables,
  GqlTemplates_templates,
  GqlMCloneTemplate,
  GqlMCloneTemplateVariables,
} from '@lib/gqlTypes/emz'
import _ from 'lodash'
import router from 'next/router'
import { toastify } from '@lib/utils'
import { EmzAppRoutes } from '@lib/constants'
import { ObjectId } from '@lib/graphql'
import { TemplateIcon } from '@public/icons/customIcons/TemplateIcon'
import { GRAY_COLOR } from '@lib/constants'

interface ILoadTemplatesProps {
  hideOptions?: boolean
  templateId?: ObjectId
  onSelect?: (template: GqlTemplates_templates) => void
  onApiSelect: (template: GqlTemplates_templates) => void
  onCreateVideoSelect: (template: GqlTemplates_templates) => void
  setShowCreateModal: (param: boolean) => void
}

export const LoadTemplates: FC<ILoadTemplatesProps> = (props) => {
  const { t } = useTranslation(`template`)
  const [isLoading, setIsLoading] = useState(true)
  const [templates, setTemplates] = useState<GqlTemplates_templates[]>([])
  const [searchQuery, setSearchQuery] = useState<string>(``)
  const { currentOrganization } = useSelector(
    (state: RootState) => state.userReducer,
  )

  const templateBoxGridItemRenderer = (
    emeezoTemplate: GqlTemplates_templates[],
  ): IEmeezoTemplateBoxGridItemProps[] => {
    return emeezoTemplate?.map((item: GqlTemplates_templates) => {
      return {
        emeezoTemplateItem: item,
        hideOptions: props.hideOptions,
        onSelect: props.onSelect,
        createVideo: () => {
          props.onCreateVideoSelect(item)
        },
        cloneTemplate: () =>
          cloneTemplate({
            variables: {
              _id: item._id,
              orgId: item.orgId,
            },
          }),
        editTemplate: () => {
          router.push(EmzAppRoutes.magic + `?id=${item._id}`)
        },
        onApiSelect: () => {
          props.onApiSelect(item)
        },
      }
    })
  }

  const [loadTemplates, { loading }] = useLazyQuery<
    GqlTemplates,
    GqlTemplatesVariables
  >(GQL_TEMPLATES, {
    fetchPolicy: `cache-and-network`,
    onCompleted(data) {
      setTemplates(data.templates)
      setIsLoading(false)
    },
    onError(error) {
      toastify.Error(error.message)
      setIsLoading(false)
    },
  })

  const [cloneTemplate] = useMutation<
    GqlMCloneTemplate,
    GqlMCloneTemplateVariables
  >(GQLM_CLONE_TEMPLATE, {
    onCompleted(data) {
      const oldEmeezoTemplate = _.cloneDeep(templates)
      const updatedEmeezoTemplate = [...oldEmeezoTemplate, data.cloneTemplate]
      setTemplates(updatedEmeezoTemplate)
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const _loadTemplates = () =>
    loadTemplates({
      variables: {
        filter: {
          orgId: currentOrganization.id,
          query: searchQuery.length === 0 ? undefined : searchQuery,
        },
      },
    })

  useEffect(() => {
    currentOrganization && searchQuery.length === 0 ? _loadTemplates() : null
  }, [searchQuery, currentOrganization])

  return (
    <Loader isLoading={isLoading}>
      <ScrollBarDiv className="h-full">
        <LayoutHeader
          title={t(`templates`)}
          icon={<TemplateIcon color={GRAY_COLOR} />}
        >
          <div className="flex gap-2 w-full">
            <InputText
              className="rounded-none"
              name="search"
              type="text"
              value={searchQuery}
              placeholder={t(`search`)}
              onChange={(e) => setSearchQuery(e.target.value)}
              onEnter={_loadTemplates}
              icon={
                loading ? (
                  <Spinner />
                ) : (
                  <i className="fas fa-search" onClick={_loadTemplates} />
                )
              }
            />
            {searchQuery && (
              <div
                className="border-2 bg-white rounded-md text-red-400 cursor-pointer flex items-center"
                onClick={() => {
                  setSearchQuery(``)
                }}
              >
                <i className="far fa-times px-3"></i>
              </div>
            )}
          </div>
        </LayoutHeader>
        <BoxGridList<IEmeezoTemplateBoxGridItemProps>
          onClickNewItem={() => props.setShowCreateModal(true)}
          newItemText={t(`new-template`)}
          Card={TemplateCard}
          list={templateBoxGridItemRenderer(templates)}
        />
      </ScrollBarDiv>
    </Loader>
  )
}
