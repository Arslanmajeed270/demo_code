import { DropDownMenu, IDDMItem } from '@lib/components'
import { FC } from 'react'
import moment from 'moment'
import { IScriptsGridItemProps } from './index'
import { useTranslation } from 'react-i18next'
interface IScriptCardProps {
  item: IScriptsGridItemProps
}

export const ScriptCard: FC<IScriptCardProps> = (props) => {
  const { t } = useTranslation(`magic`)
  const dropdownMenuItems: IDDMItem[] = [
    {
      icon: <i className={`fal fa-pen mr-3`} />,
      label: t(`edit`),
      clickHandler: props.item.editScript,
    },
    {
      icon: <i className={`fal fa-copy mr-3`} />,
      label: t(`clone`),
      clickHandler: props.item.copyScript,
    },
  ]

  return (
    <div className="overflow-visible shadow-xl rounded-lg h-full w-full cursor-pointer m-auto bg-white">
      <div onClick={props.item.onScriptChange}>
        <div className="relative w-full block h-full">
          <div className="bg-white dark:bg-gray-800 w-full p-4 rounded-lg">
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-4 flex items-center">
                <i className="fal fa-scroll-old mr-3 text-3xl text-primary" />
                <p className="text-gray-800 dark:text-white text-xl truncate tracking-tighter">
                  {props.item.scripts.title}
                </p>
              </div>
              <div className="text-center" onClick={(e) => e.stopPropagation()}>
                {props.item.hideOption ? (
                  <i
                    className="fa fa-trash cursor-pointer"
                    onClick={props.item.removeScript}
                  />
                ) : (
                  <DropDownMenu
                    icon={<i className={`fal fa-ellipsis-v fa-2x`} />}
                    items={dropdownMenuItems}
                  ></DropDownMenu>
                )}
              </div>
            </div>
            <div className="flex justify-end ">
              <div className="flex">
                <p className="text-gray-600 italic dark:text-white text-sm mx-2">
                  {moment(props.item.scripts.updatedAt).format(`MMMM Do, YY`)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
