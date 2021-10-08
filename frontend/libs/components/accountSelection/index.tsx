import { FC } from 'react'
import { ScrollBarDiv } from '@lib/components'
import {
  GqlInitialUserData_myOrganizationList,
  GqlInitialUserData_user,
} from '@lib/gqlTypes/asp'
import { AccountSelectionItem } from './Item'
import { AspAccountType } from './types'
import { Uuid } from '@lib/graphql'
import { useTranslation } from 'react-i18next'

interface IAccountSelectionProps {
  isSideBar?: boolean
  onChange: (orgId?: Uuid) => void
  user: GqlInitialUserData_user
  organizationList: GqlInitialUserData_myOrganizationList[]
  ignoreUser?: boolean
}
export const AccountSelection: FC<IAccountSelectionProps> = (props) => {
  const { t } = useTranslation(`magic`)
  return (
    <div className="w-full h-full">
      <ScrollBarDiv className="h-full">
        <div className="text-center pt-10 lg:text-3xl md:text-2xl sm:text-lg xs:text-lg">
          {t(`please-select-an-account`)}
        </div>
        <div
          className={`flex flex-wrap m-auto my-10 items-center ${
            props.isSideBar ? `w-full` : `w-3/4`
          }`}
        >
          {!props.ignoreUser && (
            <AccountSelectionItem
              isSideBar={props.isSideBar}
              onChange={props.onChange}
              key={props.user.id.uuid}
              name={props.user.firstName}
              icon={`fal fa-user`}
              accountType={AspAccountType.USER}
            />
          )}
          {props.organizationList?.map(
            (item: GqlInitialUserData_myOrganizationList, index: number) => (
              <AccountSelectionItem
                isSideBar={props.isSideBar}
                onChange={props.onChange}
                key={index}
                id={item.id}
                name={item.name}
                icon={`fal fa-users`}
                accountType={AspAccountType.ORGANIZATION}
              />
            ),
          )}
        </div>
      </ScrollBarDiv>
    </div>
  )
}

export * from './types'
