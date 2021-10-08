import { FC } from 'react'
import { Avatar } from '@lib/components'

interface FormLayoutProps {
  children: React.ReactNode
  imgSrc?: string
  title: string
}
export const FormLayout: FC<FormLayoutProps> = (props) => {
  return (
    <div>
      <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
        <div className="max-w-sm mx-auto md:w-full md:mx-0">
          <div className="inline-flex items-center space-x-4">
            <Avatar
              size="x-small"
              img={`${props.imgSrc ? props.imgSrc : ``}`}
            />
            <h1 className="text-gray-600">{props.title}</h1>
          </div>
        </div>
      </div>
      <div className="space-y-6 bg-white">{props.children}</div>
    </div>
  )
}
