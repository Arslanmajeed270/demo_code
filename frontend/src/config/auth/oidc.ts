import { UserManagerSettings } from 'oidc-client'
import { ASP_BACKEND_APP_URI, EMZ_FRONTEND_URL } from '@lib/constants'

const OIDC_CLIENT_ID = process.env.NEXT_PUBLIC_OIDC_CLIENT_ID
export const OIDC_SUBPATH = process.env.OIDC_SUBPATH || `oidc`
export const OIDC_URI = `${ASP_BACKEND_APP_URI}/${OIDC_SUBPATH}`

export const OIDC_REDIRECT_URI_PATH = `auth/oidc-redirect`
export const OIDC_REDIRECT_URI = `${EMZ_FRONTEND_URL}/${OIDC_REDIRECT_URI_PATH}/` // This must have trailing slash at the end

export const OIDC_BASE_USER_MANAGER_SETTINGS: UserManagerSettings = {
  client_id: OIDC_CLIENT_ID,
  authority: OIDC_URI,
  redirect_uri: OIDC_REDIRECT_URI,
  post_logout_redirect_uri: EMZ_FRONTEND_URL,
  response_type: `code`,
  silentRequestTimeout: 60,
  scope: `openid offline_access asp:profile asp:email`,
  loadUserInfo: false,
}
