import {
  EmzAppRoutes,
  EmzAuthRoutes,
  EmzUneffectedRoutes,
  RedirectAfterLoginExpirationDuration,
} from '@lib/constants'
import { useAuth } from 'oidc-react'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import {
  IAppState,
  setRedirectAfterLogin,
  setRedirectUsedAfterLogin,
} from '@redux/actions'
import moment from 'moment'
import { Loader } from '@lib/components'

interface IRouterProps {
  children: React.ReactNode
}

export const Router: FC<IRouterProps> = (props: IRouterProps) => {
  const { children } = props
  const auth = useAuth()
  const router = useRouter()
  const dispatch = useDispatch()

  const { redirectAfterLogin } = useSelector(
    (state: RootState) => state.appReducer,
  )

  if (auth.isLoading)
    return (
      <div className="h-screen">
        <Loader isLoading={true}>{children}</Loader>
      </div>
    )

  const isLoggedIn = auth && auth.userData
  const isAuthRoute = EmzAuthRoutes.reduce((isAuthRoute, authRoute) => {
    if (authRoute === router.pathname.substr(0, authRoute.length)) return true
    return isAuthRoute
  }, false)
  const isUneffectedRoute = EmzUneffectedRoutes.reduce(
    (result, uneffectedRoute) => {
      if (uneffectedRoute === router.pathname.substr(0, uneffectedRoute.length))
        return true
      return result
    },
    false,
  )

  const shouldRedirect = shouldRedirectAfterLogin(redirectAfterLogin)
  if (isLoggedIn && shouldRedirect) {
    router.push(redirectAfterLogin.pathname)
    dispatch(setRedirectUsedAfterLogin())
    return null
  }

  if (process.browser && !isUneffectedRoute) {
    if (!isLoggedIn && isAuthRoute) {
      if (router.asPath !== redirectAfterLogin.pathname && !shouldRedirect)
        dispatch(setRedirectAfterLogin(router.asPath))
      router.push({ pathname: EmzAppRoutes.homePage, query: router.query })
      return null
    }
    if (isLoggedIn && !isAuthRoute) {
      router.push({ pathname: EmzAppRoutes.dashboard, query: router.query })
      return null
    }
  }

  return <>{children}</>
}

const shouldRedirectAfterLogin = ({
  used,
  createdAt,
}: IAppState[`redirectAfterLogin`]) => {
  if (used) return false
  if (
    moment(createdAt).isBefore(
      moment().subtract(RedirectAfterLoginExpirationDuration, `seconds`),
    )
  )
    return false
  return true
}
