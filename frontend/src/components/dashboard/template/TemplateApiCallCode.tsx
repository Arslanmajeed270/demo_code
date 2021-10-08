import { useQuery } from '@apollo/client'
import {
  CurlRequest,
  GoRequest,
  NodeJsRequest,
  PhpRequest,
  PythonRequest,
  RequestLanguage,
} from '@constants/templateRequests'
import {
  DropDownMenuFancy,
  ISimpleWithDescriptionPropsListItem,
} from '@lib/components'
import { GQL_TEMPLATE } from '@lib/entities'
import {
  EmeezoVideoPurpose,
  GqlMVideoVariables,
  GqlTemplate,
  GqlTemplateVariables,
} from '@lib/gqlTypes/emz'
import { ObjectId } from '@lib/graphql'
import { copyToClipboard } from '@lib/utils'
import { useAuth } from 'oidc-react'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

interface ITemplateApiCallCodeProps {
  templateId?: ObjectId
}

export const TemplateApiCallCode: FC<ITemplateApiCallCodeProps> = (props) => {
  const { t } = useTranslation([`template`, `common`])
  const requestLanguages: ISimpleWithDescriptionPropsListItem[] = [
    {
      label: `Nodejs`,
      value: RequestLanguage.NODEJS,
    },
    {
      label: `Python`,
      value: RequestLanguage.PYTHON,
    },
    {
      label: `Php`,
      value: RequestLanguage.PHP,
    },
    {
      label: `Go`,
      value: RequestLanguage.GO,
    },
    {
      label: `Curl`,
      value: RequestLanguage.CURL,
    },
  ]
  const [language, setLanguage] = useState<RequestLanguage>(
    RequestLanguage.NODEJS,
  )
  const auth = useAuth()

  const { data } = useQuery<GqlTemplate, GqlTemplateVariables>(GQL_TEMPLATE, {
    variables: {
      _id: props.templateId,
    },
  })
  // TODO: No error handling here
  const template = data && data.template

  const getRequestData = (language: RequestLanguage): string => {
    if (language === RequestLanguage.CURL) {
      return CurlRequest
    }
    if (language === RequestLanguage.NODEJS) {
      return NodeJsRequest
    }
    if (language === RequestLanguage.PHP) {
      return PhpRequest
    }
    if (language === RequestLanguage.PYTHON) {
      return PythonRequest
    }
    if (language === RequestLanguage.GO) {
      return GoRequest
    }
    return
  }

  const emeezoVideoVariablesForApi: GqlMVideoVariables = {
    orgId: template && (template.orgId.uuid as any),
    purpose: EmeezoVideoPurpose.NORMAL,
    public: false,
    title: `Video title`,
    template: {
      _id: template && template._id,
      version:
        (template &&
          template.templateVersion &&
          template.templateVersion.version) ||
        1,
      // variables: { // TODO Uncomment when variables solved
      // Add your variables here
      // },
    },
  }

  const variablesForApiStringified =
    language === RequestLanguage.CURL
      ? JSON.stringify(emeezoVideoVariablesForApi)
      : JSON.stringify(emeezoVideoVariablesForApi, null, 4)

  const requestCode = getRequestData(language)
    .replace(`{{accessToken}}`, auth.userData.access_token)
    .replace(`{{videoReqVariables}}`, variablesForApiStringified)

  return (
    <div className="relative">
      <div className="w-full flex items-center gap-4 mb-3">
        <div className="flex-shrink">{t(`template:select-language`)}</div>
        <div className="flex-grow">
          <DropDownMenuFancy<RequestLanguage>
            list={requestLanguages}
            activeItemHandler={(item) => setLanguage(item.value)}
          />
        </div>
      </div>
      <div className="absolute right-2 pt-2.5">
        <span
          className="text-sm bg-blue-500 p-2 text-white rounded-lg cursor-pointer"
          onClick={() => copyToClipboard(requestCode)}
        >
          {t(`common:copy`)}
        </span>
      </div>
      <SyntaxHighlighter language="javascript">{requestCode}</SyntaxHighlighter>
    </div>
  )
}
