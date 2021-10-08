import { FC, useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import { GqlScript_script } from '@lib/gqlTypes/asp'
import { Button, InputText, ScrollBarDiv } from '@lib/components'
import { useTranslation } from 'react-i18next'
import { ObjectId, Uuid } from '@lib/graphql'
import { GqlTemplate_template_templateVersion_magicTemplate_scripts_object } from '@lib/gqlTypes/emz'

interface IScriptEditorProps {
  isMagicTemplateScript?: boolean
  onAttach?: (
    script:
      | GqlTemplate_template_templateVersion_magicTemplate_scripts_object
      | GqlScript_script,
  ) => void
  cloneScript: () => void
  orgId: Uuid
  script:
    | GqlScript_script
    | GqlTemplate_template_templateVersion_magicTemplate_scripts_object
  updateScript: (code: string, title: string, _id: ObjectId) => void
  onGoBack: () => void
}

export const ScriptEditor: FC<IScriptEditorProps> = (props) => {
  const { t } = useTranslation(`magic`)
  const [scriptCode, setScripCode] = useState<string>()
  const [scriptTitle, setScriptTitle] = useState<string>()

  useEffect(() => {
    if (!props.script) return

    setScripCode(props.script.code)
    setScriptTitle(props.script.title)
  }, [props.script])

  return (
    <ScrollBarDiv className="h-full w-full flex items-center">
      <div className={`w-4/5 m-auto`}>
        <div className="flex flex-wrap justify-between my-2">
          <div>
            {!props.isMagicTemplateScript && (
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={props.onGoBack}
              >
                <i className="fal fa-arrow-circle-left fa-2x text-gray-700" />
                <div className="text-gray-700 font-bold">Go back</div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 my-2 md:m-0">
            {props.onAttach &&
              props.orgId.uuid ===
                (props.script && props.script.orgId?.uuid) && (
                <div className="w-24">
                  <Button
                    icon={<i className="fal fa-file-download mr-2" />}
                    label={t(`attach`)}
                    color="yellow"
                    onClick={() => props.onAttach(props.script)}
                  />
                </div>
              )}
            {props.orgId.uuid ===
              (props.script && props.script.orgId?.uuid) && (
              <div className="w-24">
                <Button
                  icon={<i className="fal fa-file-download mr-2" />}
                  label={t(`save`)}
                  color="blue"
                  onClick={() =>
                    props.updateScript(
                      scriptCode,
                      scriptTitle,
                      props.script._id,
                    )
                  }
                />
              </div>
            )}
            {!props.isMagicTemplateScript && (
              <div className="w-24">
                <Button
                  icon={<i className="fal fa-copy mr-2" />}
                  label={t(`clone`)}
                  onClick={props.cloneScript}
                  color="green"
                />
              </div>
            )}
          </div>
        </div>
        <div className="my-3 flex gap-4 items-center">
          <div className="flex-shrink ">{t(`script-title`)}:</div>
          <div className="flex-grow">
            <InputText
              onChange={(e) => setScriptTitle(e.target.value)}
              placeholder={t(`script-title`)}
              value={scriptTitle}
            />
          </div>
        </div>
        <div className="shadow-2xl">
          <Editor
            theme={`vs-dark`}
            height="70vh"
            language={props.script && props.script.language}
            value={scriptCode}
            onChange={(e) => setScripCode(e)}
          />
        </div>
      </div>
    </ScrollBarDiv>
  )
}
