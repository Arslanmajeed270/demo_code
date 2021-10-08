import { EMZ_BACKEND_APP_URI } from '@lib/constants'
import { toastify } from '@lib/utils'
import { UserManager } from '@services'
import { User } from 'oidc-client'

export const oidcSignIn = (
  usePopup = false,
  throwError = false,
): Promise<void | User> => {
  const loginFunction = usePopup
    ? (UserManager.signinPopup.bind(
        UserManager,
      ) as typeof UserManager.signinPopup)
    : (UserManager.signinRedirect.bind(
        UserManager,
      ) as typeof UserManager.signinRedirect)

  return loginFunction({
    resource: EMZ_BACKEND_APP_URI,
    skipUserInfo: true,
    prompt: `consent`,
    extraTokenParams: {
      resource: EMZ_BACKEND_APP_URI,
    },
  }).catch((error) => handleOidcLoginError(error, throwError))
}

const handleOidcLoginError = (
  error: { message: string },
  throwError = false,
) => {
  console.error(error)
  let errorMessage = error.message

  if (error.message.substr(0, 20) === `PopupWindow.navigate`)
    errorMessage = `Please allow popup window, and try again`

  if (error.message === `Popup window closed`)
    errorMessage = `Login dialog box closed without successful login`

  if (throwError) throw new Error(errorMessage)

  toastify.Error(errorMessage)
}
