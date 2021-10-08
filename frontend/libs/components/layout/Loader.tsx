import { FC, ReactNode } from 'react'
import { Spinner } from '../tail-kit'

interface ILoaderProps {
  isLoading: boolean
  children: ReactNode
}

export const Loader: FC<ILoaderProps> = (props) => {
  return (
    <>
      {props.isLoading && (
        <div className="w-full h-full flex items-center">
          <Spinner className={`fa-4x m-auto text-primary`} />
        </div>
      )}
      {!props.isLoading && props.children}
    </>
  )
}
