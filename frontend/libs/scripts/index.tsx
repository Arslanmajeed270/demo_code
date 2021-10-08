import { ObjectId, Uuid } from '@lib/graphql'
import * as ASP_GQL_TYPES from '@lib/gqlTypes/asp'
import * as ASP_GQL_ENTITIES from '@lib/entities/asp'
import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { toastify } from '@lib/utils'
import { useEffect } from 'react'
import {
  BoxGridList,
  Button,
  DropDownMenuFancy,
  InputText,
  ISimpleWithDescriptionPropsListItem,
  LayoutHeader,
  Modal,
  ScrollBarDiv,
  Toggle,
} from '@lib/components'
import { ScriptCard } from './ScriptCard'
import _ from 'lodash'
import {
  DefaultCodeText,
  ScriptLoadLimit,
  APOLLO_CLIENTS_INFO,
} from '@lib/constants'
import { ScriptEditor } from './scriptEditor'
import { GqlScript_script, ScriptLanguage } from '@lib/gqlTypes/asp'
import { useTranslation } from 'react-i18next'
import { GqlTemplate_template_templateVersion_magicTemplate_scripts_object } from '@lib/gqlTypes/emz'

interface IScriptsProps {
  modifiedScripts?: GqlTemplate_template_templateVersion_magicTemplate_scripts_object
  isMagicTemplateScript?: boolean
  scriptId: ObjectId
  orgId: Uuid
  user: ASP_GQL_TYPES.GqlInitialUserData_user
  onScriptChange?: (scriptId: ObjectId) => boolean
  onAttach?: (
    script:
      | GqlTemplate_template_templateVersion_magicTemplate_scripts_object
      | GqlScript_script,
  ) => void
  onScriptUpdate?: (code: string, title: string, _id: ObjectId) => void
}

export interface IScriptsGridItemProps {
  scripts:
    | ASP_GQL_TYPES.GqlScripts_scripts
    | GqlTemplate_template_templateVersion_magicTemplate_scripts_object
  copyScript?: () => void
  editScript?: () => void
  onScriptChange?: () => void
  hideOption?: boolean
  removeScript?: () => void
}

export const Scripts: React.FC<IScriptsProps> = (props) => {
  const { t } = useTranslation(`magic`)
  const [showScriptModal, setShowScriptModal] = useState<boolean>(false)
  const [script, setScript] = useState<ASP_GQL_TYPES.GqlScripts_scripts>()
  const [scriptId, setScriptId] = useState<ObjectId>(props.scriptId)
  const [scriptTitle, setScriptTitle] = useState<string>(``)
  const [userScripts, setUserScripts] = useState<
    ASP_GQL_TYPES.GqlScripts_scripts[]
  >([])

  const [scriptType, setScriptType] = useState<boolean>(false)
  const [scriptLanguage, setScriptLanguage] = useState<ScriptLanguage>(
    ScriptLanguage.html,
  )

  const [communityScripts, setCommunityScripts] = useState<
    ASP_GQL_TYPES.GqlScripts_scripts[]
  >([])
  const [userScriptsPage, setUserScriptsPage] = useState<number>(0)
  const [communityScriptsPage, setCommunityScriptsPage] = useState<number>(0)

  const [hideUserLoadMore, setHideUserLoadMore] = useState<boolean>(false)
  const [hideCommunityLoadMore, setHideCommunityLoadMore] =
    useState<boolean>(false)

  const scriptLanguages: ISimpleWithDescriptionPropsListItem[] = [
    {
      label: ScriptLanguage.html.toUpperCase(),
      value: ScriptLanguage.html,
    },
  ]

  const [loadScriptsUser] = useLazyQuery<
    ASP_GQL_TYPES.GqlScripts,
    ASP_GQL_TYPES.GqlScriptsVariables
  >(ASP_GQL_ENTITIES.GQL_SCRIPTS, {
    fetchPolicy: `cache-and-network`,
    context: { client: APOLLO_CLIENTS_INFO.ASP },
    onCompleted(data) {
      if (data.scripts.length < ScriptLoadLimit) {
        setHideUserLoadMore(true)
      }
      const newUserScripts = [...userScripts, ...data.scripts]
      setUserScripts(newUserScripts)
      setUserScriptsPage(userScriptsPage + 1)
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const [loadScriptsCommunity] = useLazyQuery<
    ASP_GQL_TYPES.GqlScripts,
    ASP_GQL_TYPES.GqlScriptsVariables
  >(ASP_GQL_ENTITIES.GQL_SCRIPTS, {
    context: { client: APOLLO_CLIENTS_INFO.ASP },
    onCompleted(data) {
      if (data.scripts.length < ScriptLoadLimit) {
        setHideCommunityLoadMore(true)
      }
      const newCommunityScripts = [...communityScripts, ...data.scripts]
      setCommunityScripts(newCommunityScripts)
      setCommunityScriptsPage(communityScriptsPage + 1)
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const [cloneScript] = useMutation<
    ASP_GQL_TYPES.GqlMCloneScript,
    ASP_GQL_TYPES.GqlMCloneScriptVariables
  >(ASP_GQL_ENTITIES.GQLM_CLONE_SCRIPT, {
    context: { client: APOLLO_CLIENTS_INFO.ASP },
    onCompleted(data) {
      const oldScripts = _.cloneDeep(userScripts)
      const updatedUserScripts = [data.cloneScript, ...oldScripts]
      setUserScripts(updatedUserScripts)
      onScriptChange(data.cloneScript._id)
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const [createScript, { loading }] = useMutation<
    ASP_GQL_TYPES.GqlMScript,
    ASP_GQL_TYPES.GqlMScriptVariables
  >(ASP_GQL_ENTITIES.GQLM_SCRIPT, {
    context: { client: APOLLO_CLIENTS_INFO.ASP },
    onCompleted(data) {
      setShowScriptModal(false)
      onScriptChange(data.script._id)

      const oldUserScript = _.cloneDeep(userScripts)
      const updatedUserScripts = [data.script, ...oldUserScript]
      setUserScripts(updatedUserScripts)

      if (data.script.public) {
        const oldCommunityScript = _.cloneDeep(communityScripts)
        const updatedCommunityScripts = [data.script, ...oldCommunityScript]
        setCommunityScripts(updatedCommunityScripts)
      }
    },
    onError(error) {
      onScriptChange(undefined)

      setShowScriptModal(false)
      toastify.Error(error.message)
    },
  })

  const [loadScript] = useLazyQuery<
    ASP_GQL_TYPES.GqlScript,
    ASP_GQL_TYPES.GqlScriptVariables
  >(ASP_GQL_ENTITIES.GQL_SCRIPT, {
    fetchPolicy: `cache-and-network`,
    context: { client: APOLLO_CLIENTS_INFO.ASP },
    onCompleted(data) {
      setScript(data.script)
    },
    onError(error) {
      onScriptChange(undefined)
      toastify.Error(error.message)
    },
  })

  const [updateScript] = useMutation<
    ASP_GQL_TYPES.GqlMUpdateScript,
    ASP_GQL_TYPES.GqlMUpdateScriptVariables
  >(ASP_GQL_ENTITIES.GQLM_UPDATE_SCRIPT, {
    context: { client: APOLLO_CLIENTS_INFO.ASP },
    onCompleted(data) {
      toastify.Success(`Script Updated`)
      const oldUserScript = _.cloneDeep(userScripts)
      const updatedUserScripts = oldUserScript.map(
        (item: ASP_GQL_TYPES.GqlScripts_scripts) =>
          item._id === data.updateScript._id
            ? (item.title = data.updateScript.title) && item
            : item,
      )
      setUserScripts(updatedUserScripts)
      if (data.updateScript.public) {
        const oldCommunityScript = _.cloneDeep(communityScripts)
        const updatedCommunityScripts = oldCommunityScript.map(
          (item: ASP_GQL_TYPES.GqlScripts_scripts) =>
            item._id === data.updateScript._id
              ? (item.title = data.updateScript.title) && item
              : item,
        )
        setCommunityScripts(updatedCommunityScripts)
      }
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const _updateScript = (code: string, title: string, _id: ObjectId) => {
    props.onScriptUpdate(code, title, _id)
    updateScript({
      variables: {
        _id,
        code,
        title,
      },
    })
  }

  const _createScript = () => {
    createScript({
      variables: {
        language: scriptLanguage,
        orgId: props.orgId,
        code: DefaultCodeText,
        public: scriptType,
        title: scriptTitle,
      },
    })
  }

  const _loadScriptsUser = (page: number) => {
    loadScriptsUser({
      variables: {
        filter: {
          userId: props.user.id,
          orgId: props.orgId,
        },
        pagination: {
          limit: ScriptLoadLimit,
          page,
        },
      },
    })
  }

  const _loadScriptsCommunity = (page: number) => {
    loadScriptsCommunity({
      variables: {
        filter: {
          public: true,
        },
        pagination: {
          limit: ScriptLoadLimit,
          page,
        },
      },
    })
  }

  useEffect(() => {
    if (scriptId) {
      loadScript({
        variables: {
          _id: scriptId,
        },
      })
    }
    if (userScriptsPage === 0 && communityScriptsPage === 0) {
      _loadScriptsUser(userScriptsPage)
      _loadScriptsCommunity(communityScriptsPage)
    }
  }, [scriptId])

  const onScriptChange = (_scriptId: ObjectId) => {
    const shouldRoute =
      (props.onScriptChange && props.onScriptChange(_scriptId)) || true
    if (!shouldRoute) return
    setScriptId(_scriptId)
  }

  const scriptBoxGridItemRenderer = (
    scripts: ASP_GQL_TYPES.GqlScripts_scripts[],
  ): IScriptsGridItemProps[] => {
    return scripts.map((item: ASP_GQL_TYPES.GqlScripts_scripts) => {
      return {
        scripts: item,
        copyScript: () => {
          cloneScript({
            variables: {
              _id: item._id,
              orgId: props.orgId,
            },
          })
        },
        editScript: () => onScriptChange(item._id),
        onScriptChange: () => onScriptChange(item._id),
      }
    })
  }

  return (
    <>
      {scriptId && (
        <ScriptEditor
          isMagicTemplateScript={props.isMagicTemplateScript}
          onAttach={props.onAttach}
          cloneScript={() => {
            cloneScript({
              variables: {
                _id: scriptId,
                orgId: props.orgId,
              },
            })
          }}
          orgId={props.orgId}
          script={props.isMagicTemplateScript ? props.modifiedScripts : script}
          updateScript={_updateScript}
          onGoBack={() => onScriptChange(undefined)}
        />
      )}
      {showScriptModal && (
        <Modal
          title={t(`create-script`)}
          hideModal={() => setShowScriptModal(false)}
        >
          <div className="text-gray-700">{t(`script-title`)}</div>
          <InputText
            placeholder={t(`script-title`)}
            onChange={(e) => setScriptTitle(e.target.value)}
          />

          <div className="w-full mb-2 flex items-center gap-4">
            <div className="mt-2 flex items-center flex-grow">
              <span className="mr-2 text-gray-700">{t(`language`)}:</span>
              <DropDownMenuFancy<ScriptLanguage>
                list={scriptLanguages}
                activeItemHandler={(item) => setScriptLanguage(item.value)}
              />
            </div>
            <div className="mt-2 text-center">
              <Toggle
                label={t(`public`)}
                check={scriptType}
                onChange={(item) => setScriptType(item)}
              />
            </div>
          </div>
          <Button
            isLoading={loading}
            label={t(`create-script`)}
            color={`primary`}
            className="w-20 mt-3"
            disabled={loading}
            onClick={_createScript}
          />
        </Modal>
      )}
      <ScrollBarDiv className="h-full">
        <LayoutHeader
          title={t(`script`)}
          icon={<i className="fal fa-scroll-old fa-2x text-gray-700" />}
        >
          <div className="w-48">
            <Button
              label={t(`create-script`)}
              color={`primary`}
              icon={<i className={`fa fa-plus pr-2`} />}
              className="py-2 px-8"
              onClick={() => setShowScriptModal(true)}
            />
          </div>
        </LayoutHeader>
        <div className="mb-2">
          <div className="text-xl font-bold mx-5">{t(`my-scripts`)}:</div>
          {userScripts.length === 0 ? (
            <h1 className="text-center font-bold text-red-500 text-xl">
              {t(`no-scripts-available`)}
            </h1>
          ) : (
            <BoxGridList<IScriptsGridItemProps>
              Card={ScriptCard}
              list={scriptBoxGridItemRenderer(userScripts)}
            />
          )}
          {!hideUserLoadMore && (
            <div className="flex items-center justify-center">
              <div className="w-48 ">
                <p
                  className="text-center my-3 text-blue-500 cursor-pointer"
                  onClick={() => _loadScriptsUser(userScriptsPage)}
                >
                  {t(`load-more`)}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="my-2 border-t-2 py-10">
          <div className="text-xl font-bold mx-5">
            {t(`community-scripts`)}:
          </div>
          {communityScripts.length === 0 ? (
            <h1 className="text-center font-bold text-red-500 text-xl">
              {t(`no-scripts-available`)}
            </h1>
          ) : (
            <BoxGridList<IScriptsGridItemProps>
              Card={ScriptCard}
              list={scriptBoxGridItemRenderer(communityScripts)}
            />
          )}
          {!hideCommunityLoadMore && (
            <div className="flex items-center justify-center">
              <div className="w-48 ">
                <p
                  className="text-center my-3 text-blue-500 cursor-pointer"
                  onClick={() => _loadScriptsCommunity(communityScriptsPage)}
                >
                  {t(`load-more`)}
                </p>
              </div>
            </div>
          )}
        </div>
      </ScrollBarDiv>
    </>
  )
}
