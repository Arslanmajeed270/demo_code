import { MagicCanvas } from '@components/Magic/MagicCanvas'
import { MagicFooter } from '@components/Magic/MagicFooter'
import React, { useEffect, useState } from 'react'
import { MagicSidePanel } from '@components/Magic/MagicSidePanel'
import * as _ from 'lodash'
import { DefaultMagicTemplate } from '@constants/magic'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTemplateClipId, setTemplate } from '@redux/actions'
import { ObjectId } from '@lib/graphql/types'
import { RootState } from '@redux/reducers'
import { cleanTemplate } from '@components/Magic/MagicCanvas/template/validation'
import styled from 'styled-components'
import { useLatest } from 'react-use'
import {
  GqlTemplate,
  GqlTemplateVariables,
  GqlTemplate_template_templateVersion_magicTemplate,
  GqlTemplate_template_templateVersion_magicTemplate_clips,
} from '@lib/gqlTypes/emz'
import { useRouter } from 'next/router'
import { useLazyQuery } from '@apollo/client'
import { GQL_TEMPLATE } from '@lib/entities'
import { toastify } from '@lib/utils'
import { CreateTemplateModal } from '@components/dashboard/template/CreateTemplateModal'
import { EmzAppRoutes } from '@lib/constants'

const MagicPage = (): React.ReactNode => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const { currentOrganization } = useSelector(
    (state: RootState) => state.userReducer,
  )

  const router = useRouter()
  const args = router.query

  const dispatch = useDispatch()
  const [magicTemplate, setMagicTemplate] =
    useState<GqlTemplate_template_templateVersion_magicTemplate>(
      _.cloneDeep(DefaultMagicTemplate),
    )

  const activeTemplateClipId: ObjectId = useSelector(
    ({ magicTemplate }: RootState) => magicTemplate.activeTemplateClipId,
  )
  const templateRef = useLatest(magicTemplate)
  const activeTemplateClipIdRef = useLatest(activeTemplateClipId)

  const updateTemplate = (
    _template: GqlTemplate_template_templateVersion_magicTemplate,
    clone = true,
  ) => {
    const clonedTemplate = clone ? _.cloneDeep(_template) : _template
    const cleanedTemplate = cleanTemplate(clonedTemplate)
    setMagicTemplate(cleanedTemplate)
  }

  const updateTemplateFromClip = (
    clip: GqlTemplate_template_templateVersion_magicTemplate_clips,
  ) => {
    if (!activeTemplateClipIdRef.current) return
    const activeTemplateClipIndex = templateRef.current.clips.findIndex(
      (clip) => clip._id === activeTemplateClipIdRef.current,
    )
    if (activeTemplateClipIndex < 0) return
    const newTemplate = {
      ...templateRef.current,
      clips: Object.assign([], templateRef.current.clips, {
        [activeTemplateClipIndex]: clip,
      }),
    }
    updateTemplate(newTemplate)
  }

  const _setActiveTemplateClipId = (id: ObjectId) => {
    dispatch(setActiveTemplateClipId(id))
  }

  if (!activeTemplateClipId)
    _setActiveTemplateClipId(DefaultMagicTemplate.clips[0]._id)

  const [getTemplate] = useLazyQuery<GqlTemplate, GqlTemplateVariables>(
    GQL_TEMPLATE,
    {
      onCompleted(data) {
        if (!data.template) return
        dispatch(setTemplate(data.template))
        updateTemplate(data.template.templateVersion.magicTemplate)
        setTimeout(() => {
          _setActiveTemplateClipId(
            data.template.templateVersion.magicTemplate.clips[0]._id,
          )
        }, 100) // TODO: remove 100 from here
      },
      onError(error) {
        toastify.Error(error.message)
      },
    },
  )

  useEffect(() => {
    if (!currentOrganization) return
    if (!showModal && _.isEmpty(args) && !args.id) {
      setShowModal(true)
      return
    }
    if (args && args.id) {
      const variables: GqlTemplateVariables = {
        _id: `${args.id}`,
        clone: {
          orgId: currentOrganization.id,
          version: args.version ? Number(args.version) : null,
        },
      }
      getTemplate({
        variables,
      })
    }
  }, [args, currentOrganization])

  return (
    <>
      <CreateTemplateModal
        show={showModal}
        onClose={() => router.push(EmzAppRoutes.dashboard)}
        org={currentOrganization}
      />
      <MagicPageWrapper className="flex">
        <MagicSidePanel
          template={magicTemplate}
          updateTemplate={updateTemplate}
          updateTemplateFromClip={updateTemplateFromClip}
        />
        <div className="w-full h-screen">
          <MagicCanvas
            template={magicTemplate}
            updateTemplateFromClip={updateTemplateFromClip}
          />
          <MagicFooter
            template={magicTemplate}
            updateTemplateFromClip={updateTemplateFromClip}
          />
        </div>
      </MagicPageWrapper>
    </>
  )
}
export default MagicPage

const MagicPageWrapper = styled.div`
  min-width: 1028px;
`
