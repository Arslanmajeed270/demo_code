import { useTranslation } from 'react-i18next'
import { ReactNode } from 'react'

export interface IBoxGridListProps<T> {
  onClickNewItem?: () => void
  newItemText?: string
  isSideBar?: boolean
  Card: React.ElementType
  list: T[]
  children?: ReactNode
}

export const BoxGridList = <T extends unknown>(
  props: IBoxGridListProps<T>,
): React.ReactElement<IBoxGridListProps<T>> => {
  const { t } = useTranslation(`common`)
  return (
    <div className="w-full">
      {props.children}
      <div
        className={`grid gap-4 mx-5 py-5 grid-cols-1 ${
          props.isSideBar
            ? `md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3`
            : ` sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6`
        }`}
      >
        {props.newItemText && (
          <div
            className="shadow rounded-lg md:h-full w-full h-48 cursor-pointer m-auto flex justify-center items-center text-blue-400 bg-white hover:bg-blue-300 hover:text-white"
            onClick={props.onClickNewItem}
          >
            <span className="text-center flex items-center w-full h-48 transform transition duration-300 hover:scale-125">
              <div className="m-auto">
                <i className="fas fa-plus text-2xl" />
                <p className="text-sm font-bold">{t(`${props.newItemText}`)}</p>
              </div>
            </span>
          </div>
        )}
        {props.list &&
          props.list.map((item: T, index: number) => (
            <props.Card showOptionData={true} item={item} key={index} />
          ))}
      </div>
    </div>
  )
}
