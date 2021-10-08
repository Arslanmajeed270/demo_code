import { FC } from 'react'
import { Uuid } from '@lib/graphql'
import { AspAccountType } from './types'

interface IAccountSelectionItemProps {
  isSideBar?: boolean
  onChange: (orgId?: Uuid) => void
  accountType: AspAccountType
  name: string
  id?: Uuid
  icon: string
}

export const AccountSelectionItem: FC<IAccountSelectionItemProps> = (props) => {
  const setAccount = () => {
    if (props.accountType === AspAccountType.USER) {
      props.onChange()
    }
    if (props.accountType === AspAccountType.ORGANIZATION) {
      props.onChange(props.id)
    }
  }
  return (
    <div
      className={`${
        props.isSideBar ? `w-1/2` : `w-1/3`
      } my-2 m-auto text-center cursor-pointer`}
      onClick={setAccount}
    >
      <div className="py-16 px-4 border-2 rounded-lg shadow-md bg-white mx-2">
        <i
          className={`${props.icon} text-5xl lg:text-9xl md:text-8xl sm:text-6xl xs:text-5xl`}
        />
        <h1 className="sm:text-lg md:text-xl lg:text-3xl mt-10 capitalize">
          {props.name}
        </h1>
      </div>
    </div>
  )
}
