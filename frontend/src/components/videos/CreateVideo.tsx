import { useMutation, useQuery } from '@apollo/client'
import {
  Button,
  DropDownMenuFancy,
  InputText,
  ISimpleWithDescriptionPropsListItem,
  Toggle,
} from '@lib/components'
import { FormSchema } from '@lib/components/formSchema'
import { EmzAppRoutes } from '@lib/constants'
import { GQLM_VIDEO, GQL_TEMPLATE } from '@lib/entities'
import {
  EmeezoVideoPurpose,
  GqlMVideo,
  GqlMVideoVariables,
  GqlMVideo_video,
  GqlTemplate,
  GqlTemplateVariables,
  GqlTemplateVersion_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
  GqlTemplate_template,
} from '@lib/gqlTypes/emz'
import { JSON } from '@lib/graphql'
import { toastify } from '@lib/utils'
import { RootState } from '@redux/reducers'
import _ from 'lodash'
import router from 'next/router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { MagicPlayer } from './MagicPlayer'

interface ICreateVideoProps {
  templateId: string
  onCreate?: (video: GqlMVideo_video) => void
}

export const CreateVideo: React.FC<ICreateVideoProps> = (props) => {
  const { t } = useTranslation(`video`)
  const [videoTitle, setVideoTitle] = useState<string>()
  const [videoSlug, setVideoSlug] = useState<string>()
  const [templateVariables, setTemplateVariables] = useState<JSON>()
  const [emeezoVideoType, setEmeezoVideoType] = useState<boolean>(false)
  const [emeezoVideoPurpose, setEmeezoVideoPurpose] =
    useState<EmeezoVideoPurpose>(EmeezoVideoPurpose.NORMAL)
  const [templateLoading, seTemplateLoading] = useState<boolean>(true)
  const [template, setTemplate] = useState<GqlTemplate_template>()

  const {
    userReducer: { currentOrganization },
    magicIframe: { enabled: iframeEnabled },
  } = useSelector((state: RootState) => state)

  useQuery<GqlTemplate, GqlTemplateVariables>(GQL_TEMPLATE, {
    variables: {
      _id: props.templateId,
    },
    fetchPolicy: `cache-and-network`,
    onCompleted(data) {
      seTemplateLoading(false)
      setTemplate(data.template)
    },
  })

  const [createVideo, { loading }] = useMutation<GqlMVideo, GqlMVideoVariables>(
    GQLM_VIDEO,
    {
      onCompleted(data) {
        props?.onCreate(data.video)
        toastify.Success(`Creating video...`)
      },
    },
  )

  const _createVideo = () => {
    createVideo({
      variables: {
        orgId: currentOrganization.id,
        slug: videoSlug,
        purpose: emeezoVideoPurpose,
        public: emeezoVideoType,
        title: videoTitle,
        template: {
          _id: template._id,
          variables: templateVariables,
        },
      },
    })
  }

  const videoPurpose: ISimpleWithDescriptionPropsListItem[] = [
    {
      label: EmeezoVideoPurpose.NORMAL,
      value: EmeezoVideoPurpose.NORMAL,
    },
    {
      label: EmeezoVideoPurpose.B2B_LEAD,
      value: EmeezoVideoPurpose.B2B_LEAD,
    },
  ]

  const _setEmeezoVideoPurpose = (item: EmeezoVideoPurpose) => {
    setEmeezoVideoPurpose(item)
  }

  const _setEmeezoVideoType = (item: boolean) => {
    setEmeezoVideoType(item)
  }

  return (
    <div className="w-full grid grid-cols-7 gap-4">
      <div className="col-span-2">
        <div className="text-gray-700">{t(`video-title`)}</div>
        <InputText
          placeholder={t(`video-title`)}
          onChange={(e) => setVideoTitle(e.target.value)}
        />
        {!iframeEnabled && (
          <>
            <div className="text-gray-700 mt-2">{t(`video-slug`)}:</div>
            <InputText
              placeholder={t(`video-slug`)}
              onChange={(e) => setVideoSlug(e.target.value)}
            />
            <div className="w-full mb-2 flex items-center gap-4">
              <div className="mt-2 flex items-center flex-grow">
                <span className="mr-2 text-gray-700">{t(`purpose`)}:</span>
                <DropDownMenuFancy<EmeezoVideoPurpose>
                  list={videoPurpose}
                  activeItemHandler={(item) =>
                    _setEmeezoVideoPurpose(item.value)
                  }
                />
              </div>
              <div className="mt-2 text-center">
                <Toggle
                  label={t(`public`)}
                  check={emeezoVideoType}
                  onChange={(item) => _setEmeezoVideoType(item)}
                />
              </div>
            </div>
          </>
        )}

        {template &&
          template.templateVersion &&
          template.templateVersion.templateVariablesSchema && (
            <>
              <FormSchema
                schema={
                  template.templateVersion.templateVariablesSchema.jsonSchema
                }
                uiSchema={
                  template.templateVersion.templateVariablesSchema.uiSchema ??
                  {}
                }
                formData={templateVariables}
                formContext={{
                  templateVariables,
                }}
                onChange={(e) => setTemplateVariables(e.formData)}
                hideSubmitBtn={true}
              />
            </>
          )}
        <Button
          isLoading={loading || templateLoading}
          label={t(`create-video`)}
          color={`primary`}
          className="w-20 mt-3"
          disabled={loading}
          onClick={_createVideo}
        />
        <button
          onClick={() =>
            router.push(EmzAppRoutes.magic + `?id=${template._id}`)
          }
          className="text-secondary block background-transparent mt-3 ml-auto mr-auto justify-center font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
          type="button"
        >
          <i className="fas fa-rocket"></i> Open in Editor
        </button>
      </div>
      <div className="col-span-5 bg-black relative">
        {template &&
          template.templateVersion &&
          template.templateVersion.magicTemplate && (
            <MagicPlayer
              template={template.templateVersion.magicTemplate}
              clip={
                template.templateVersion.magicTemplate
                  .clips[0] as GqlTemplateVersion_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas
              }
            />
          )}
      </div>
    </div>
  )
}
