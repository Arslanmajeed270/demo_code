import { FC, useState, useEffect } from 'react'
interface Props {
  title: string
  closeAction?: () => void
  borderColor: string
  color: string
}
export const BandeauLineAlert: FC<Props> = (props: Props) => {
  const [showAlert, setShowAlert] = useState(false)
  useEffect(() => {
    if (props.title) {
      setShowAlert(true)
    }
  }, [props.title])
  return (
    showAlert && (
      <div
        className={`rounded-md flex items-center jusitfy-between px-5 py-4 mt-3 mb-2 border ${
          props.borderColor ? props.borderColor : `border-blue-600`
        }  ${props.color ? props.color : `text-blue-500`} `}
      >
        <div className="w-full flex items-center ">
          <i className="fas fa-exclamation-triangle mr-3" />
          {props.title}
        </div>
        <button
          type="button"
          onClick={() => {
            setShowAlert(!showAlert)
          }}
          className={`-mr-1 flex-shrink-0 flex p-2 rounded-md focus:outline-none focus:ring-2 ${
            props.color ? `focus:ring-red-500` : `focus:ring-blue-500`
          }  sm:-mr-2`}
        >
          <span className="sr-only">Dismiss</span>
          <i className="fad fa-sm fa-times"></i>
        </button>
      </div>
    )
  )
}
