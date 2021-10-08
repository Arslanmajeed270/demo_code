import { FC } from 'react'
import {
  ILeftSideBarLink,
  SidebarLink,
  SidebarWithGradient,
} from '@lib/components'
import { LEFT_SIDEBAR_LINKS } from '@constants/sidebar'
import { useAuth } from 'oidc-react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { EmzAppRoutes, EMZ_FRONTEND_URL } from '@lib/constants'
import { setCurrentOrganization } from '@redux/actions'
import { GqlInitialUserData_myOrganizationList } from '@lib/gqlTypes/asp'

interface LeftSideBarProps {
  isVisible?: boolean | true
}

export const LeftSideBar: FC<LeftSideBarProps> = (props) => {
  const dispatch = useDispatch()
  const auth = useAuth()

  const { user, currentOrganization } = useSelector(
    (state: RootState) => state.userReducer,
  )
  const userName = user?.firstName + ` ` + user?.lastName

  const { myOrganizationList } = useSelector(
    (state: RootState) => state.userReducer,
  )

  const LinkElement = (link: ILeftSideBarLink) => {
    if (link.route === EmzAppRoutes.magic && currentOrganization)
      link = {
        ...link,
        asPath: link.route,
      }

    return <SidebarLink key={link.name} link={link} />
  }

  const setOrganization = (org: GqlInitialUserData_myOrganizationList) => {
    dispatch(setCurrentOrganization(org))
  }

  return (
    <SidebarWithGradient
      myOrganizationList={myOrganizationList}
      setOrganization={setOrganization}
      hidden={props.isVisible}
      signout={() => auth.signOutRedirect(EMZ_FRONTEND_URL)}
      userInfo={userName}
    >
      {LEFT_SIDEBAR_LINKS.map((link: ILeftSideBarLink) => LinkElement(link))}
    </SidebarWithGradient>
  )
}
