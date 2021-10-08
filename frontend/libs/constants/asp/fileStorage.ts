export const UploadProgressBarsDisplayDuration = 3000

export interface IApolloClientInfo {
  URI: string
}

type IApolloClientsInfo = Record<string, IApolloClientInfo>

export const APOLLO_CLIENTS_INFO: IApolloClientsInfo = {
  EMZ: {
    URI: `${process.env.NEXT_PUBLIC_EMZ_BACKEND_APP_URI}/graphql`,
  },
  ASP: {
    URI: `${process.env.NEXT_PUBLIC_ASP_BACKEND_APP_URI}/graphql`,
  },
}

export const APOLLO_CLIENT_DEFAULT = APOLLO_CLIENTS_INFO.EMZ
