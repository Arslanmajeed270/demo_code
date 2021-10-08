import React, { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import {
  TemplateOnSelectPurpose,
  Templates,
} from '@components/dashboard/template'
import { Button, Loader } from '@lib/components'
import { GqlMVideo_video } from '@lib/gqlTypes/emz'
import { useRouter } from 'next/router'
import { DEFAULT_IFRAME_MAGIC_OPTIONS } from '@constants'
import {
  GqlDevProjectPublic,
  GqlDevProjectPublicVariables,
} from '@lib/gqlTypes/asp/__generated__/GqlDevProjectPublic'
import { useLazyQuery } from '@apollo/client'
import { GQL_DEV_PROJECT_PUBLIC } from '@lib/entities'
import { APOLLO_CLIENTS_INFO } from '@config'
import {
  setIframeDevProjectPublic,
  setIframeEnabled,
  setIframeOptions,
} from '@redux/actions'
import { useAuth } from 'oidc-react'
import { oidcSignIn } from '@utils/auth'
import { useFirstMountState } from 'react-use'

export interface IMagicIframeOptions {
  webhook: boolean
  appId: string
}

const CreateVideoIFramePage = (): ReactNode => {
  const auth = useAuth()
  const router = useRouter()
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState()
  const { user } = useSelector((state: RootState) => state.userReducer)
  const iframeOptions = getIframeMagicOptionsFromQueryParams(router.query)
  const isFirstMount = useFirstMountState()

  const isLoggedIn = auth && auth.userData

  const login = () => {
    setErrorMessage(undefined)
    oidcSignIn(true, true)
      .catch((error) => setErrorMessage(error.message))
      .then(() => {
        setMessageToParent(`userLoggedIn`)
      })
  }

  const setMessageToParent = (type: string, data: unknown = undefined) => {
    window.parent.postMessage(
      {
        from: `EmeezoMagicIframe`,
        data: {
          type,
          data,
        },
      },
      `*`,
    )
  }

  useEffect(() => {
    if (!isLoggedIn) return login()
    setMessageToParent(`userLoggedIn`)
  }, [])

  const [fetchDevProject, { data: devProjectResponse, error, loading }] =
    useLazyQuery<GqlDevProjectPublic, GqlDevProjectPublicVariables>(
      GQL_DEV_PROJECT_PUBLIC,
      {
        context: { client: APOLLO_CLIENTS_INFO.ASP },
        variables: {
          _id: iframeOptions.appId,
        },
        onCompleted(data) {
          dispatch(setIframeDevProjectPublic(data.devProjectPublic))
          dispatch(setIframeOptions(iframeOptions))
          dispatch(setIframeEnabled(true))
        },
        fetchPolicy: `cache-and-network`,
      },
    )

  useEffect(() => {
    if (!iframeOptions.appId || !user) return
    fetchDevProject({
      variables: {
        _id: iframeOptions.appId,
      },
    })
  }, [iframeOptions.appId, user])

  if (!isFirstMount && !iframeOptions.appId) return <>Please send client Id</>

  if (error) return <>Client ID sent is invalid.</>

  const devProjectPublic =
    devProjectResponse && devProjectResponse.devProjectPublic

  const onVideoCreated = (video: GqlMVideo_video) => {
    setMessageToParent(`emeezoVideoInCreation`, video)
  }

  const isLoading = (!user || loading || !devProjectPublic) && !errorMessage

  if (!isLoading && devProjectPublic) {
    if (!devProjectPublic.isWebhookDefined && iframeOptions.webhook)
      return <>Webhook url not set in project settings</>
  }

  return (
    <div className="h-screen bg-primary-100">
      <Loader isLoading={isLoading}>
        {errorMessage && (
          <div className="flex h-screen">
            <div className="m-auto">
              <div className="text-red-600 font-bold">{errorMessage}</div>
              <Button
                onClick={login}
                label="Log in!"
                isFat={true}
                color="primary"
                className="max-w-xs self-center mt-5 m-auto block"
              />
            </div>
          </div>
        )}
        {!errorMessage && (
          <Templates
            hideOptions={true}
            onSelectPurpose={TemplateOnSelectPurpose.CREATE_VIDEO}
            onVideoCreated={onVideoCreated}
          />
        )}
      </Loader>
    </div>
  )
}

const getIframeMagicOptionsFromQueryParams = (queryParams: {
  [x in keyof Partial<IMagicIframeOptions>]: string
}): IMagicIframeOptions => {
  const webhook =
    queryParams?.webhook === `true` || queryParams?.webhook === `1`
  const appId = queryParams?.appId

  return {
    ...DEFAULT_IFRAME_MAGIC_OPTIONS,
    webhook,
    appId,
  }
}

export default CreateVideoIFramePage
