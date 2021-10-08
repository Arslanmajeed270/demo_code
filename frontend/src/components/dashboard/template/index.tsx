import { CreateVideo } from '@components/videos/CreateVideo'
import { Modal } from '@lib/components'
import { ObjectId } from '@lib/graphql'
import { FC, useState } from 'react'
import { LoadTemplates } from './LoadTemplates'
import { TemplateApiCallCode } from './TemplateApiCallCode'
import { CreateTemplateModal } from './CreateTemplateModal'
import { RootState } from '@redux/reducers'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { GqlMVideo_video, GqlTemplates_templates } from '@lib/gqlTypes/emz'
import { EmzAppRoutes } from '@lib/constants'
import { useRouter } from 'next/router'

export enum TemplateOnSelectPurpose {
  CREATE_VIDEO = `CreateVideo`,
  EDIT_VIDEO = `EditVideo`,
}
interface ITemplatesProps {
  onSelect?: (template: GqlTemplates_templates) => void
  hideOptions?: boolean
  onVideoCreated?: (video: GqlMVideo_video) => void
  onSelectPurpose?: TemplateOnSelectPurpose
}

export const Templates: FC<ITemplatesProps> = (props) => {
  const { t } = useTranslation(`template`)
  const router = useRouter()
  const onSelectPurpose =
    props.onSelectPurpose || TemplateOnSelectPurpose.EDIT_VIDEO

  const [showCreateVideoModal, setShowCreateVideoModal] =
    useState<boolean>(false)
  const [showCreateTemplateModal, setShowCreateTemplateModal] =
    useState<boolean>(false)
  const [showTemplateApiModal, setShowTemplateApiModal] =
    useState<boolean>(false)
  const [templateId, setTemplateId] = useState<ObjectId>()
  const { currentOrganization } = useSelector(
    (state: RootState) => state.userReducer,
  )
  const onSelect = (template: GqlTemplates_templates) => {
    setTemplateId(template._id)
    if (props.onSelect !== undefined) return props.onSelect(template)
    if (onSelectPurpose === TemplateOnSelectPurpose.CREATE_VIDEO)
      return onCreateVideoSelect(template)
    if (onSelectPurpose === TemplateOnSelectPurpose.EDIT_VIDEO)
      return router.push(EmzAppRoutes.magic + `?id=${template._id}`)
  }
  const onApiSelect = (template: GqlTemplates_templates) => {
    setTemplateId(template._id)
    setShowTemplateApiModal(true)
  }
  const onCreateVideoSelect = (template: GqlTemplates_templates) => {
    setTemplateId(template._id)
    setShowCreateVideoModal(true)
  }

  return (
    <>
      <CreateTemplateModal
        org={currentOrganization}
        show={showCreateTemplateModal}
        onClose={() => setShowCreateTemplateModal(false)}
      />
      {showCreateVideoModal && (
        <Modal
          minWidthClass="min-w-3/4"
          title={t(`create-video`)}
          hideModal={() => setShowCreateVideoModal(false)}
        >
          <CreateVideo
            onCreate={props?.onVideoCreated}
            templateId={templateId}
          />
        </Modal>
      )}
      {showTemplateApiModal && (
        <Modal
          maxWidthClass={`max-w-3xl`}
          title={t(`select-language`)}
          hideModal={() => setShowTemplateApiModal(false)}
        >
          <TemplateApiCallCode templateId={templateId} />
        </Modal>
      )}
      <LoadTemplates
        hideOptions={props.hideOptions}
        onApiSelect={onApiSelect}
        onCreateVideoSelect={onCreateVideoSelect}
        onSelect={onSelect}
        setShowCreateModal={setShowCreateTemplateModal}
      />
    </>
  )
}
