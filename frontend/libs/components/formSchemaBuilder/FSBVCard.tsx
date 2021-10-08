import { FC } from 'react'
import _ from 'lodash'
import { IFSBVJsonSchema } from '@lib/types'

export interface IFSBVCardVariable {
  id: string
  object: IFSBVJsonSchema
}

export interface IFSBVCardProps {
  variable: IFSBVCardVariable
  showDelete?: boolean
  onClick: (id: string) => void
  onDelete?: (id: string) => void
}

export const FSBVCard: FC<IFSBVCardProps> = ({
  variable,
  showDelete,
  onClick,
  onDelete,
}) => {
  return (
    <div className="w-auto mt-4 mx-1">
      <div className="overflow-visible shadow-xl rounded-lg h-full w-full cursor-pointer m-auto bg-white">
        <div onClick={() => onClick(variable.id)}>
          <div className="relative w-full block h-full">
            <div className="bg-white dark:bg-gray-800 w-full p-4 rounded-lg">
              <div className="grid grid-cols-5 gap-4">
                <div className="col-span-4 flex items-center">
                  <p className="text-gray-800 dark:text-white text-xl truncate tracking-tighter">
                    {variable.object.title}
                  </p>
                </div>
                {showDelete && (
                  <div
                    className="text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <i
                      className="fa fa-trash hover:text-red-500"
                      onClick={() => onDelete(variable.id)}
                    />
                  </div>
                )}
              </div>
              <p className="text-gray-500 dark:text-white text-md">
                type: {variable.object.type}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
