import { ButtonHTMLAttributes } from 'react'

export const IconButton: React.FC<
  {
    _type: `danger` | `success` | `info` | `warning`
    icon: string
  } & ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  const { _type = `default`, icon, className, ...otherProps } = props
  return (
    <button
      {...otherProps}
      type="button"
      className={`btn btn-${_type} ${className}`}
    >
      <i className={`glyphicon glyphicon-${icon}`} />
    </button>
  )
}
