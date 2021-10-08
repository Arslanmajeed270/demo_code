import { ReactNode } from 'react'
import { DashBoardLayout } from '@components/dashboard/layout'
import { VideosLayout } from '@components/videos'

const Index = (): ReactNode => {
  return (
    <DashBoardLayout>
      <VideosLayout />
    </DashBoardLayout>
  )
}
export default Index
