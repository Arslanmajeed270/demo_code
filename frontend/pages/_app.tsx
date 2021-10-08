import 'tailwindcss/tailwind.css'

import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@services'
import { Provider as ReduxProvider } from 'react-redux'
import { store, persistor } from '@redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { AuthProvider } from '@providers'

import { Main } from '@components/Main'
import { ReactNode } from 'react'
import GlobalStyle from '@styles/globalStyles'
import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { PageProgressBar } from '@lib/components'

export default ({ Component, pageProps }): ReactNode => {
  const apolloClient = useApollo(pageProps)
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={apolloClient}>
          <AuthProvider>
            <GlobalStyle />
            <I18nextProvider i18n={i18next}>
              <Main>
                <PageProgressBar />
                <Component {...pageProps} />
              </Main>
            </I18nextProvider>
          </AuthProvider>
        </ApolloProvider>
      </PersistGate>
    </ReduxProvider>
  )
}
