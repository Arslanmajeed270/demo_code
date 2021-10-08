import React, { ReactNode } from 'react'
import { DashBoardLayout } from '@components/dashboard/layout'
import { Templates } from '@components/dashboard/template'

const Template = (): ReactNode => {
  return (
    <DashBoardLayout>
      <div className="h-screen">
        <Templates />
      </div>
    </DashBoardLayout>
  )
}
export default Template
