import { FC } from 'react'
interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string
  error?: string
  icon?: JSX.Element | FC
  helper?: string
  square?: boolean
  withForceIndications?: boolean
  onEnter?: (inputText: string) => void
}

const getSaveInputProps = (props: Props) => {
  return {
    ...props,
    onEnter: undefined,
  }
}

export const InputText: FC<Props> = (props: Props) => {
  const handleKeyDown = (e) => {
    if (!props.onEnter) return
    if (e.key === `Enter`) props.onEnter(e.target.value)
  }
  return (
    <div
      className={`${props.helper || props.icon ? `flex` : ``} relative w-full ${
        props.disabled ? `opacity-50 pointer-events-none` : ``
      }`}
    >
      {props.label && (
        <label htmlFor={props.id} className="text-gray-700">
          {props.label}
          {props.required && (
            <span className="text-red-500 required-dot">*</span>
          )}
        </label>
      )}
      {(props.helper || props.icon) && (
        <span
          className={`${
            props.square ? `` : `rounded-l-md`
          } inline-flex items-center px-3 border-t bg-white border-l border-b cursor-pointer border-gray-300 text-gray-500 shadow-sm text-sm`}
        >
          {props.helper || props.icon}
        </span>
      )}
      <input
        {...getSaveInputProps(props)}
        className={`${props.error ? `ring-red-500 ring-2` : ``}${
          props.helper || props.icon
            ? !props.square
              ? ` rounded-r-lg`
              : ``
            : !props.square
            ? ` rounded-lg border-transparent`
            : ``
        } flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
        type={props.type || `text`}
        onKeyDown={handleKeyDown}
      />
      {props.withForceIndications && (
        <>
          <div className="grid w-full h-1 grid-cols-12 gap-4 mt-3">
            <div className="h-full col-span-3 bg-green-500 rounded"></div>
            <div className="h-full col-span-3 bg-green-500 rounded"></div>
            <div className="h-full col-span-3 bg-green-500 rounded"></div>
            <div className="h-full col-span-3 bg-gray-200 rounded dark:bg-dark-1"></div>
          </div>
          <div className="mt-2 text-green-500">Valid password</div>
        </>
      )}
      {props.error && (
        <>
          <i className="fas fa-exclamation-triangle absolute text-red-500 right-2 inset-y-1/3 text-xs" />
          <p className="absolute text-xs text-red-500 top-full mt-1">
            {props.error}
          </p>
        </>
      )}
    </div>
  )
}
