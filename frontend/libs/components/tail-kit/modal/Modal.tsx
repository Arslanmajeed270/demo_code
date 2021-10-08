import { FC } from 'react'
import { Button } from '@lib/components'

export interface IModalProps {
  title?: string
  hideModal: () => void
  showFooter?: boolean
  maxWidthClass?: string
  minWidthClass?: string
  hideCross?: boolean
  children: React.ReactNode
}
export const Modal: FC<IModalProps> = (props) => {
  return (
    <>
      <div
        onClick={props.hideModal}
        className="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50"
      >
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            e.stopPropagation()
          }
          className={`relative w-auto my-6 mx-auto ${
            props.maxWidthClass ?? `max-w-max`
          } ${props.minWidthClass ?? `min-w-min`}`}
        >
          {/*content*/}
          <div className="bg-gray-100 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
              {props.title && (
                <h3 className="text-xl text-gray-700 font-semibold">
                  {props.title}
                </h3>
              )}
              {!props.hideCross && (
                <div className="mx-2 text-center cursor-pointer">
                  <span onClick={props.hideModal}>
                    <i className="fa fa-close text-gray-700 text-xlg" />
                  </span>
                </div>
              )}
            </div>
            {/*body*/}
            <div className="relative p-3 flex-auto">{props.children}</div>
            {props.showFooter && (
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <div className="w-20">
                  <Button
                    onClick={props.hideModal}
                    color={`red`}
                    label={`close`}
                  />
                </div>
                <div className="w-20">
                  <Button
                    onClick={props.hideModal}
                    color={`red`}
                    label={`Save`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}
