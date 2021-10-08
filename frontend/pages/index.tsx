import { useAuth } from 'oidc-react'
import { oidcSignIn } from '@utils'
import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'

const Index = (): ReactNode => {
  const auth = useAuth()
  const router = useRouter()
  const isLoggedIn = auth && auth.userData

  useEffect(() => {
    if (!isLoggedIn) {
      const usePopupLogin = router?.query?.usePopupLogin === `true`
      oidcSignIn(usePopupLogin)
    }
  }, [])

  if (isLoggedIn) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <strong>Redirecting you to dashboard...</strong>
        </div>
      </div>
    )
  }
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <strong>Logging in...</strong>
      </div>
    </div>
  )
}

export default Index
