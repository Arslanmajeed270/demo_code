import { FC } from 'react'

export interface ICustomHeaderProps {
  title: string
  icon: JSX.Element | FC
  children?: React.ReactNode
}
export const LayoutHeader: FC<ICustomHeaderProps> = (
  props: ICustomHeaderProps,
): React.ReactElement => {
  return (
    <div className="max-h-full overflow-auto w-full">
      <div className="inset-y-0 right-0 max-h-full overflow-auto w-full ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-1 ">
          <div className="flex items-center gap-4 m-5">
            {props.icon}
            <p className="text-lg font-bold text-gray-700">{props.title}</p>
          </div>
          <div className="hidden lg:block place-items-end col-span-2" />
          <div className="m-5 place-items-end lg:col-span-2 col-span-5">
            <div className="flex lg:justify-end md:justify-start gap-4">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
