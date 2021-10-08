import React, { FC, useEffect } from 'react'
import { AuthProvider as OidcAuthProvider, useAuth } from 'oidc-react'
import { useDispatch } from 'react-redux'
import {
  setMyOrganizationList,
  setCurrentOrganization,
  setUser,
  unsetMyOrganizationList,
  unsetUser,
} from '@redux/actions'
import { APOLLO_CLIENTS_INFO } from '@config'
import { EMZ_BACKEND_APP_URI } from '@lib/constants'
import { useLazyQuery } from '@apollo/client'
import { UserManager } from '@services'
import { GQL_INITIAL_USER_DATA } from '@lib/entities/asp'
import {
  GqlInitialUserData,
  GqlInitialUserData_myOrganizationList,
} from '@lib/gqlTypes/asp'

import { useRouter } from 'next/router'
import { Uuid } from '@lib/graphql'
import _ from 'lodash'
import {
  EmzAppRoutes,
  EmzRoutesThatIgnoreOrgIdQueryParam,
} from '@lib/constants'
interface IAuthProviderProps {
  children: React.ReactNode
}

const AuthHandler = ({ children }) => {
  let isUserLoaded = false
  const dispatch = useDispatch()
  const auth = useAuth()

  const router = useRouter()
  const args = router.query
  const orgId: Uuid =
    args && args.orgId ? new Uuid(args.orgId as string) : undefined

  const _getCurrentOrganization = (
    myOrganizationList: GqlInitialUserData_myOrganizationList[],
  ): null | GqlInitialUserData_myOrganizationList => {
    if (myOrganizationList.length === 0) return null

    const org = orgId
      ? myOrganizationList.find((org) => org.id.uuid === orgId.uuid)
      : myOrganizationList[0]

    if (
      !EmzRoutesThatIgnoreOrgIdQueryParam.includes(router.route as EmzAppRoutes)
    ) {
      delete router.query.orgId
      router.replace(router)
    }
    return org
  }
  const [setUserQuery] = useLazyQuery<GqlInitialUserData>(
    GQL_INITIAL_USER_DATA,
    {
      context: { client: APOLLO_CLIENTS_INFO.ASP },
      onCompleted: (data) => {
        if (!data) return
        const { user, myOrganizationList } = data
        dispatch(setMyOrganizationList(myOrganizationList))
        dispatch(
          setCurrentOrganization(_getCurrentOrganization(myOrganizationList)),
        )
        dispatch(setUser(user))
      },
    },
  )
  const { events } = auth.userManager

  const loadInitialUserData = () => {
    if (auth.userData && isUserLoaded === false) {
      setUserQuery()
      isUserLoaded = true
    }
  }

  const renewAccessToken = async () => {
    try {
      await auth.userManager.signinSilent({
        resource: EMZ_BACKEND_APP_URI,
      })
    } catch (error) {
      console.error(`Error (Renewing Token):`, error)
      auth.signOut()
    }
  }

  const postLogoutHandler = () => {
    dispatch(unsetUser())
    dispatch(unsetMyOrganizationList())
  }

  const onSilentRenewError = (error) => {
    console.error(`onSilentRenewError`, error)
    auth.signOut()
  }
  const onUserLoaded = () => loadInitialUserData
  const onAccessTokenExpired = renewAccessToken
  const onAccessTokenExpiring = renewAccessToken
  const onUserUnloaded = postLogoutHandler
  const onUserSignedOut = postLogoutHandler
  const onUserSignedIn = loadInitialUserData

  events.addUserLoaded(onUserLoaded)
  events.addSilentRenewError(onSilentRenewError)
  events.addAccessTokenExpired(onAccessTokenExpired)
  events.addAccessTokenExpiring(onAccessTokenExpiring)
  events.addUserUnloaded(onUserUnloaded)
  events.addUserSignedOut(onUserSignedOut) // This dosent work (make them work and call store.dispatch(unsetUser()) in here)
  events.addUserSignedIn(onUserSignedIn) // TODO: [ASP-32]  This dosent work (make them work and call setUserQuery in here)

  useEffect(loadInitialUserData, [auth.userData])

  return <>{children}</>
}

const AuthProvider: FC<IAuthProviderProps> = ({
  children,
}: IAuthProviderProps) => {
  if (!process.browser) return <>{children}</>
  return (
    <OidcAuthProvider userManager={UserManager} autoSignIn={false}>
      <AuthHandler>{children}</AuthHandler>
    </OidcAuthProvider>
  )
}

export { AuthProvider }
