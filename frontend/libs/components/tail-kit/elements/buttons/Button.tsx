import { FC } from 'react'
import { Spinner } from '../Spinner'
interface Props {
  rounded?: boolean
  color?: string
  icon?: JSX.Element
  disabled?: boolean
  submit?: boolean
  isFat?: boolean
  fontWeight?: string
  label?: string
  className?: string
  isLoading?: boolean
  loadingText?: string
  onClick?: () => void
  children?: React.ReactNode
}
enum colors {
  white = `bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500`,
  gray = `bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200`,
  red = `bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200`,
  yellow = `bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 focus:ring-offset-yellow-200`,
  green = `bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200`,
  blue = `bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200`,
  indigo = `bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200`,
  purple = `bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200`,
  pink = `bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200`,
  primary = `bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 focus:ring-offset-primary-200`,
  secondary = `bg-secondary-600 hover:bg-secondary-700 focus:ring-secondary-500 focus:ring-offset-secondary-200`,
}
export const Button: FC<Props> = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      type={props.submit ? `submit` : `button`}
      disabled={props.disabled}
      className={`${props.isFat ? `py-4 px-6 ` : `py-2 px-4`}${
        props.icon ? `flex justify-center items-center` : ``
      } ${
        colors[props.color]
      } text-white w-full transition ease-in duration-200 text-center text-base ${
        props.fontWeight ? props.fontWeight : `font-semibold`
      } shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        props.disabled ? `opacity-70 cursor-not-allowed` : ``
      }${!props.label ? `w-12 h-12` : ``} ${
        props.rounded ? `rounded-full` : `rounded-lg`
      } ${props.className}`}
    >
      {props.isLoading ? <Spinner className="mr-2" /> : props.icon}
      {(props.isLoading && (props.loadingText || `Please wait ...`)) ||
        props.label}
    </button>
  )
}
