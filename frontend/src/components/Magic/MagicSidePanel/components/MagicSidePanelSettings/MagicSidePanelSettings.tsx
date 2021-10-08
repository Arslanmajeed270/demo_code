import {
  Button,
  // DropDownMenuFancy,
  InputText,
  ISimpleWithDescriptionPropsListItem,
} from '@lib/components'
import { IMagicSidePanelListComponentProps } from '../..'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { setTemplate } from '@redux/actions'
import {
  GqlMUpdateTemplate,
  GqlMUpdateTemplateVariables,
  GqlTemplate_template,
  GqlTemplate_template_templateVersion_templateVariablesSchema,
  MagicTemplateInputDto,
} from '@lib/gqlTypes/emz'
import _ from 'lodash'
import { useMutation } from '@apollo/client'
import {
  GQLM_UPDATE_TEMPLATE,
  GQLM_UPDATE_TEMPLATE_VERSION,
} from '@lib/entities'
import { toastify } from '@lib/utils'
import { removeTemplateGarbage, removeTypename } from '@utils/object'
import { cleanTemplate } from '@components/Magic/MagicCanvas/template/validation'
import {
  GqlMUpdateTemplateVersion,
  GqlMUpdateTemplateVersionVariables,
} from '@lib/gqlTypes/emz/__generated__/GqlMUpdateTemplateVersion'
import { useTranslation } from 'react-i18next'

export const MagicSidePanelSettings: React.FC<IMagicSidePanelListComponentProps> =
  ({ template: magicTemplate, updateTemplate }) => {
    const { t } = useTranslation([`video`, `magic`])
    const dispatch = useDispatch()
    const { template } = useSelector((state: RootState) => state.magicTemplate)
    const { currentOrganization } = useSelector(
      (state: RootState) => state.userReducer,
    )
    // const [resolution, setResolution] = useState<number>()

    const resolutionList: ISimpleWithDescriptionPropsListItem[] = [
      {
        label: `Original`,
        value: 480,
      },
      {
        label: `1080p`,
        value: 1080,
      },
      {
        label: `720p`,
        value: 720,
      },
      {
        label: `480p`,
        value: 480,
      },
      {
        label: `320p`,
        value: 320,
      },
      {
        label: `240p`,
        value: 240,
      },
      {
        label: `144p`,
        value: 144,
      },
    ]

    const _setTemplate = (template: GqlTemplate_template) => {
      const _template = _.cloneDeep(template)
      dispatch(setTemplate(_template))
    }

    const [saveTemplateVersion] = useMutation<
      GqlMUpdateTemplateVersion,
      GqlMUpdateTemplateVersionVariables
    >(GQLM_UPDATE_TEMPLATE_VERSION, {
      onCompleted() {
        toastify.Success(`Successfully Saved!`)
      },
      onError(error) {
        toastify.Error(error.message)
      },
    })

    const [_updateTemplate] = useMutation<
      GqlMUpdateTemplate,
      GqlMUpdateTemplateVariables
    >(GQLM_UPDATE_TEMPLATE, {
      onError(error) {
        toastify.Error(error.message)
      },
    })

    const _saveTemplateVersion = () => {
      if (!template || _.isEmpty(template)) return

      const templateVariables: GqlMUpdateTemplateVariables = {
        _id: template._id,
        title: template?.title,
        orgId: currentOrganization.id,
      }

      _updateTemplate({
        variables: templateVariables,
      })

      const magicTemplateVariable = removeTemplateGarbage(
        cleanTemplate(magicTemplate),
      ) as MagicTemplateInputDto
      const templateVariablesSchema = removeTypename(
        template.templateVersion.templateVariablesSchema,
      ) as GqlTemplate_template_templateVersion_templateVariablesSchema
      const variables: GqlMUpdateTemplateVersionVariables = {
        templateId: template._id,
        version: template.templateVersion.version,
        magicTemplate: magicTemplateVariable,
        templateVariablesSchema,
      }
      saveTemplateVersion({
        variables,
      })
    }

    return (
      <div className="mt-4">
        <div className="flex mb-2">
          <div className="w-full">
            <span>{t(`video:template-name`)}</span>
            <InputText
              name="name"
              type="text"
              placeholder={`Template Name`}
              value={template?.title || ``}
              onChange={(e) =>
                _setTemplate({
                  ...template,
                  title: e.target.value,
                })
              }
            />
          </div>
        </div>
        {/* <div className="w-full py-2">
          <span>Size</span>
          <DropDownMenuFancy<number>
            list={resolutionList}
            activeItemHandler={(item) => setResolution(item.value)}
          />
        </div> */}

        {/* <div className="w-full py-2">
          <span>Background Color</span>
          <div className="text-gray-700 border hover:border-gray-400 rounded-md border-gray-300 p-3 font-normal flex items-center justify-between flex-row cursor-pointer ">
            <span>Color</span>
            <div>
              <span className="pr-3">{backgroundColor}</span>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) =>
                  updateTemplate({
                    ...magicTemplate,
                    back
                  })
                }
              />
            </div>
          </div>
        </div> */}
        <Button
          className="mt-3"
          label={t(`magic:save`)}
          color="blue"
          onClick={_saveTemplateVersion}
        />
      </div>
    )
  }
