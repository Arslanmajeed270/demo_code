import { FC } from 'react'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { EmzAppRoutes } from '@lib/constants'

const Page404: FC = () => {
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    // Your condition that can validate the URL
    const pathname = window.location.pathname

    const pathNameArray = pathname.split(`/`)
    const isEmeezoVideoPath =
      EmzAppRoutes.video === pathname.substr(0, EmzAppRoutes.video.length) &&
      (pathNameArray.length === 3 || pathNameArray.length === 4)
    if (isEmeezoVideoPath) {
      Router.replace(pathname) // Redirect to the right page...
    } else {
      setIsNotFound(true)
    }
  }, [])

  if (isNotFound) return <h1>404 - Page Not Found</h1>
  return null
}

export default Page404
