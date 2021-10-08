import { FC } from 'react'
interface Props {
  withBorder?: boolean
  withInfo?: boolean
  img?: string
  size?: `small` | `x-small` | `normal` | `big` | `monster` | `2x-small`
  type?: `square` | `rounded` | `full`
}
export const Avatar: FC<Props> = ({
  withBorder,
  size,
  withInfo,
  type,
  img,
}: Props) => {
  let sizeClasses = `h-16 w-16`
  if (size && size !== `normal`) {
    sizeClasses = size === `small` ? `h-10 w-10` : `h-20 w-20`
    if (size === `monster`) sizeClasses = `h-40 w-40`

    if (size === `x-small`) sizeClasses = `h-7 w-7`
    if (size === `2x-small`) sizeClasses = `h-5 w-5`
  }
  let roundedClasses = `rounded-full`
  if (type && type !== `full`) {
    roundedClasses = type === `square` ? `` : `rounded-lg`
  }
  return (
    <a href="#">
      <img
        alt="profile"
        src={img || `/images/person/1.jpg`}
        className={`flex-initial mx-auto object-cover ${roundedClasses} ${sizeClasses} ${
          withBorder ? ` border-2 border-white dark:border-gray-800` : ``
        }`}
      />

      {withInfo && (
        <span className="absolute w-3 border-2 left-1/2 -bottom-2 transform -translate-x-1/2 border-white h-3 bg-green-500 rounded-full"></span>
      )}
    </a>
  )
}
