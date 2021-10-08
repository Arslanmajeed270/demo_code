import { EMZ_BACKEND_APP_URI, ASP_BACKEND_APP_URI } from '@lib/constants'

export interface IApolloClientInfo {
  URI: string
}

type IApolloClientsInfo = Record<string, IApolloClientInfo>

export const APOLLO_CLIENTS_INFO: IApolloClientsInfo = {
  EMZ: {
    URI: `${EMZ_BACKEND_APP_URI}/graphql`,
  },
  ASP: {
    URI: `${ASP_BACKEND_APP_URI}/graphql`,
  },
}

export const APOLLO_CLIENT_DEFAULT = APOLLO_CLIENTS_INFO.EMZ
