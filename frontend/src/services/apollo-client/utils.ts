import { HttpLink, ApolloLink } from '@apollo/client'
import {
  APOLLO_CLIENTS_INFO,
  APOLLO_CLIENT_DEFAULT,
  IApolloClientInfo,
} from '@config'
import { withScalars } from 'apollo-link-scalars'
import { GraphqlCustomScaler } from '@constants/apollo/customScalars'

const getMultipleClientLinks = (): ApolloLink[] => {
  return Object.keys(APOLLO_CLIENTS_INFO).map((clientName) => {
    const clientInfo = APOLLO_CLIENTS_INFO[clientName]
    const isDefaultLink = clientInfo.URI == APOLLO_CLIENT_DEFAULT.URI
    const httpLink = new HttpLink({
      uri: clientInfo.URI,
      credentials: `same-origin`,
    })
    return ApolloLink.split((operation) => {
      const client: IApolloClientInfo = operation.getContext().client
      return client ? client.URI === clientInfo.URI : isDefaultLink
    }, httpLink)
  })
}

const getCustomGraphqlScalarLinks = (): ApolloLink[] => {
  return Object.keys(APOLLO_CLIENTS_INFO).reduce<ApolloLink[]>(
    (clients, clientName) => {
      const clientInfo = APOLLO_CLIENTS_INFO[clientName]
      const isDefaultLink = clientInfo.URI == APOLLO_CLIENT_DEFAULT.URI
      const customScalarProps = GraphqlCustomScaler[clientName]
      if (!customScalarProps) return clients

      const scalarLink = withScalars(GraphqlCustomScaler[clientName])
      const link = ApolloLink.split((operation) => {
        const client: IApolloClientInfo = operation.getContext().client
        return client ? client.URI === clientInfo.URI : isDefaultLink
      }, scalarLink)
      return [...clients, link]
    },
    [],
  )
}
export const getCustomApolloLinks = (): ApolloLink[] => {
  const clientLinks = getMultipleClientLinks()
  const customScalarsLinks = getCustomGraphqlScalarLinks()
  return [...customScalarsLinks, ...clientLinks]
}
