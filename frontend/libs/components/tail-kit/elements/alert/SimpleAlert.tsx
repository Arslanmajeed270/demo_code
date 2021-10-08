import { ReactNode, FC } from 'react'

interface Props {
  type: `alert` | `success` | `danger`
  title?: string
  children: ReactNode
}

export const SimpleAlert: FC<Props> = (props: Props) => {
  let cssClasses = `bg-yellow-200 border-yellow-600 text-yellow-600`
  if (props.type !== `alert`) {
    cssClasses =
      props.type === `success`
        ? `bg-green-200 border-green-600 text-green-600`
        : `bg-red-200 border-red-600 text-red-600`
  }

  return (
    <div className={`${cssClasses} border-l-4 p-4`} role="alert">
      {props.title && <p className="font-bold">{props.title}</p>}
      <p>{props.children}</p>
    </div>
  )
}
