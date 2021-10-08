import Head from 'next/head'
import { EmzDocument } from '@lib/constants'
import { Router } from '@components/router'
import { StyledThemeProvider } from '@definitions/styled-components'
import { FC } from 'react'

interface IMainProps {
  children: React.ReactNode
}
import '../../../locales/i18n'
export const Main: FC<IMainProps> = (props: IMainProps) => {
  const { children } = props
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{EmzDocument.title}</title>
        <link rel="shortcut icon" href={EmzDocument.logo} />
      </Head>
      <StyledThemeProvider>
        <Router>{children}</Router>
      </StyledThemeProvider>
    </>
  )
}
