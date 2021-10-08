import { OIDC_BASE_USER_MANAGER_SETTINGS } from '@config'
import Oidc from 'oidc-client'
import { UserManager as _UserManager } from 'oidc-react'

export const UserManager: _UserManager =
  process.browser &&
  new _UserManager({
    ...OIDC_BASE_USER_MANAGER_SETTINGS,
    userStore: new Oidc.WebStorageStateStore({
      store: window.localStorage,
    }),
  })
