import React, { FC } from 'react'
import { GqlInitialUserData_myOrganizationList } from '@lib/gqlTypes/asp'
import { DropDownMenuFancy, ISimpleWithDescriptionPropsListItem } from '.'

interface IOrgSelectionDropdownProps {
  onOrgChange: (org: GqlInitialUserData_myOrganizationList) => void
  organizationList: GqlInitialUserData_myOrganizationList[]
  directionUp?: boolean
}

export const OrgSelectionDropdown: FC<IOrgSelectionDropdownProps> = (props) => {
  const directionUp = props.directionUp !== undefined ? props.directionUp : true

  const list: ISimpleWithDescriptionPropsListItem<GqlInitialUserData_myOrganizationList>[] =
    props.organizationList.map((org) => {
      return {
        label: org.name,
        value: org,
      }
    })

  const onOrgSelected = (org: GqlInitialUserData_myOrganizationList) => {
    props?.onOrgChange(org)
  }
  return (
    <DropDownMenuFancy<GqlInitialUserData_myOrganizationList>
      list={list}
      directionUp={directionUp}
      activeItemHandler={(item) => onOrgSelected(item.value)}
    />
  )
}
