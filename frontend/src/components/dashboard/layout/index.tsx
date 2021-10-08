import React, { FC, ReactNode, useState } from 'react'
import { SideBarTop, Button, Loader } from '@lib/components'
import { EmzDocument } from '@lib/constants'
import { LeftSideBar } from '../left-sidebar'
import { RootState } from '@redux/reducers'
import { useSelector } from 'react-redux'

interface IDashBoardLayoutProps {
  children?: ReactNode
}
export const DashBoardLayout: FC<IDashBoardLayoutProps> = (props) => {
  const [openMenu, setOpenMenu] = useState(false)
  const { user } = useSelector((state: RootState) => state.userReducer)

  const buttonIcon = (openMenu: boolean) => {
    return openMenu ? (
      <i className={`fal fa-bars fa-lg`} />
    ) : (
      <i className={`fad fa-arrow-from-right fa-lg`} />
    )
  }

  return (
    <>
      <SideBarTop imgSrc={EmzDocument.logo}>
        <Button
          color="gray"
          icon={buttonIcon(openMenu)}
          onClick={() => setOpenMenu(!openMenu)}
        />
      </SideBarTop>
      <div className="flex h-screen">
        <LeftSideBar isVisible={openMenu} />
        <div className="w-full h-full relative overflow-hidden bg-gray-100">
          <div className="h-screen">
            <Loader isLoading={!user}>{props.children}</Loader>
          </div>
        </div>
      </div>
    </>
  )
}
