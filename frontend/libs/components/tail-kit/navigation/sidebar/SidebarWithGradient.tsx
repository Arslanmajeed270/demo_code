import { FC } from 'react'
import { Avatar, OrgSelectionDropdown } from '@lib/components'
import { GqlInitialUserData_myOrganizationList } from '@lib/gqlTypes/asp'
import { SmallScrollBar } from './SidebarWithGradientStyle'
import { ASP_FRONTEND_URL, USER_AVATAR } from '@lib/constants'
import { AspAppRoutes } from '@lib/constants/asp'
import { useTranslation } from 'react-i18next'

interface SidebarWithGradientProps {
  myOrganizationList: GqlInitialUserData_myOrganizationList[]
  setOrganization: (org: GqlInitialUserData_myOrganizationList) => void
  hidden?: boolean | true
  children?: React.ReactNode
  userInfo: string
  signout?: () => void
}
export const SidebarWithGradient: FC<SidebarWithGradientProps> = (props) => {
  const { t } = useTranslation(`common`)
  const onOrgChange = (org: GqlInitialUserData_myOrganizationList) => {
    props.setOrganization(org)
  }

  return (
    <div
      className={`h-screen ${
        props.hidden ? `hidden` : ``
      } md:block py-4 shadow-lg relative inset-y-0 left-0 w-64`}
    >
      <div className="flex flex-col bg-white h-full rounded-2xl dark:bg-gray-700">
        <div
          className="flex py-6 items-center border-b-2 pb-5 pt-3 ml-3 cursor-pointer"
          onClick={() =>
            window.open(ASP_FRONTEND_URL + AspAppRoutes.dashboard, `_blank`)
          }
        >
          <Avatar img={USER_AVATAR} size="small" withBorder={true} />
          <span className="capitalize pl-3 flex-initial text-gray-600 text-sm md:text-base font-medium ">
            {props.userInfo}
          </span>
          <br />
        </div>
        <SmallScrollBar className="flex-1 py-1 mb-14">
          {props.children}
        </SmallScrollBar>
        <OrgSelectionDropdown
          onOrgChange={onOrgChange}
          organizationList={props.myOrganizationList}
        />
        {props.signout && (
          <div
            className="bottom-8 inset-x-0 text-center m-5 cursor-pointer"
            onClick={props.signout}
          >
            <span className="transition duration-400 ease-in-out hover:text-red-500 text-gray-700 font-bold">
              <i className="fas fa-power-off fill-current px-1"></i>
              {t(`signout`)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
