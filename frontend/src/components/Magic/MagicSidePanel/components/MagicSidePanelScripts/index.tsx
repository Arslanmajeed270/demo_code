import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { IMagicSidePanelListComponentProps } from '../..'
import {
  setMagicSidePanelItem,
  setOverlaySidePanelWrapperClass,
} from '@redux/actions'
import { ScriptCard } from '@lib/scripts/ScriptCard'
import { useState } from 'react'
import { ObjectId, Uuid } from '@lib/graphql'
import {
  GqlTemplate_template_templateVersion_magicTemplate_scripts,
  GqlTemplate_template_templateVersion_magicTemplate_scripts_object,
} from '@lib/gqlTypes/emz'
import { IScriptsGridItemProps, Scripts } from '@lib/scripts'
import _ from 'lodash'
import { removeTypename } from '@utils/object'
import { GqlScript_script } from '@lib/gqlTypes/asp'
import { RootState } from '@redux/reducers'

export const MagicSidePanelScripts: React.FC<IMagicSidePanelListComponentProps> =
  ({ template, updateTemplate }) => {
    const { t } = useTranslation(`magic`)
    const scripts = template?.scripts
    const dispatch = useDispatch()
    const [showScriptPage, setShowScriptPage] = useState<boolean>(false)
    const [isMagicTemplateScript, setIsMagicTemplateScript] =
      useState<boolean>(false)
    const [scriptId, setScriptId] = useState<ObjectId>()
    const { user, currentOrganization } = useSelector(
      (state: RootState) => state.userReducer,
    )

    const orgId: Uuid = currentOrganization ? currentOrganization.id : undefined

    const _removeScript = (_id: ObjectId) => {
      const _template = _.cloneDeep(template)
      _template.scripts.splice(
        _template.scripts.findIndex((item) => item._id === _id),
        1,
      )
      updateTemplate(_template)
    }

    const scriptBoxGridItemRenderer = (
      scripts: GqlTemplate_template_templateVersion_magicTemplate_scripts[],
    ): IScriptsGridItemProps[] => {
      return scripts?.map(
        (item: GqlTemplate_template_templateVersion_magicTemplate_scripts) => {
          return {
            scripts: item.object,
            onScriptChange: () => {
              setShowScriptPage(true)
              setScriptId(item._id)
              setIsMagicTemplateScript(true)
              dispatch(
                setOverlaySidePanelWrapperClass(
                  `fixed inset-0 lg:w-4/5 xs:w-full overflow-hidden`,
                ),
              )
            },
            hideOption: true,
            removeScript: () => _removeScript(item._id),
          }
        },
      )
    }

    const modifiedScripts = scriptBoxGridItemRenderer(scripts)

    const onScriptUpdate = (code: string, title: string, _id: ObjectId) => {
      const _template = _.cloneDeep(template)
      _template.scripts = _template.scripts.map((item) =>
        item._id === _id
          ? ((item.object.code = code), (item.object.title = title)) && item
          : item,
      )
      updateTemplate(_template)
      dispatch(setMagicSidePanelItem(undefined))
      dispatch(setOverlaySidePanelWrapperClass(``))
    }

    const onAttach = (
      script:
        | GqlTemplate_template_templateVersion_magicTemplate_scripts_object
        | GqlScript_script,
    ) => {
      const object = removeTypename(
        script,
      ) as GqlTemplate_template_templateVersion_magicTemplate_scripts_object
      const _template = _.cloneDeep(template)

      _template.scripts.push({
        __typename: `MagicTemplateScript`,
        _id: script._id,
        object,
        inputData: null,
      })

      updateTemplate(_template)
      dispatch(setMagicSidePanelItem(undefined))
      dispatch(setOverlaySidePanelWrapperClass(``))
    }

    const script = scripts?.find((item) => item._id === scriptId)

    return (
      <>
        {showScriptPage ? (
          <Scripts
            modifiedScripts={script?.object}
            onScriptUpdate={onScriptUpdate}
            isMagicTemplateScript={isMagicTemplateScript}
            onAttach={onAttach}
            orgId={orgId}
            user={user}
            scriptId={scriptId}
          />
        ) : (
          <div className="mt-4">
            <div
              className="h-24 rounded-md cursor-pointer bg-gray-200 flex text-gray-700 p-8"
              onClick={() => {
                dispatch(
                  setOverlaySidePanelWrapperClass(
                    `fixed inset-0 lg:w-4/5 xs:w-full overflow-hidden`,
                  ),
                )
                setShowScriptPage(true)
              }}
            >
              <div>
                <h1 className="text-lg">{t(`attach-script`)}</h1>
              </div>
              <div className=" w-24">
                <i className="float-right fal fa-cloud-upload-alt fa-2x"></i>
              </div>
            </div>
            {!modifiedScripts?.length && (
              <div className="text-center mt-10 text-gray-300">
                <i className="fa-3x far fa-jack-o-lantern"></i>
                <p>{t(`no-script`)}</p>
              </div>
            )}
            {modifiedScripts?.map((data, index) => {
              return (
                <div key={index} className="my-3">
                  <ScriptCard item={data} />
                </div>
              )
            })}
          </div>
        )}
      </>
    )
  }
