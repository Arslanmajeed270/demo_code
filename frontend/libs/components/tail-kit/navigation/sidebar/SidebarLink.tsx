import { FC, SVGProps } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GRAY_COLOR, PRIMARY_COLOR } from '@lib/constants'
import { useTranslation } from 'react-i18next'
export interface ILeftSideBarLink {
  name: string
  icon: FC<SVGProps<SVGSVGElement>> | string
  route: string
  useATag?: boolean
  newWindow?: boolean
  asPath?: string
}
interface SidebarLinkProps {
  link: ILeftSideBarLink
}
export const SidebarLink: FC<SidebarLinkProps> = (props) => {
  const { t } = useTranslation(`common`)
  const { link } = props
  const router = useRouter()
  const path = link.asPath || link.route
  const isCurrentPathLoaded = router.route === link.route

  const LinkWrapper: FC = ({ children }) =>
    link.useATag && isCurrentPathLoaded ? (
      <a href={path}>{children}</a>
    ) : link.newWindow ? (
      <a href={path} target="_blank">
        {children}
      </a>
    ) : (
      <Link href={path}>{children}</Link>
    )

  const activeClasses = isCurrentPathLoaded
    ? `text-primary-500 bg-gradient-to-r from-white to-primary-100 border-r-4 border-primary-500`
    : `text-gray-500`

  return (
    <LinkWrapper>
      <span
        className={`w-full font-thin uppercase flex cursor-pointer items-center py-4 px-6 my-2 transition-colors duration-200 justify-start overflow-hidden ${activeClasses}`}
      >
        <span className="text-left">
          {typeof link.icon === `string` ? (
            <i className={`${link.icon} text-3xl text-gray-500`} />
          ) : (
            <link.icon
              color={isCurrentPathLoaded ? PRIMARY_COLOR : GRAY_COLOR}
            />
          )}
        </span>
        <span className="mx-6 text-sm font-normal capitalize">
          {t(link.name)}
        </span>
      </span>
    </LinkWrapper>
  )
}
