import { FC, useState } from 'react'
import { IDDMItem, DropDownMenu, InputText, Modal } from '@lib/components'

import { IFileStorageBoxGridItemProps } from '../types'
import { GqlFileStorage_fileStorage_fileStorageChildren } from '@lib/gqlTypes/asp'
import { useTranslation } from 'react-i18next'

export interface IFileStorageFolderProps {
  item: IFileStorageBoxGridItemProps
}

export const FileStorageFolder: FC<IFileStorageFolderProps> = (props) => {
  const { t } = useTranslation(`magic`)

  const [showModal, setShowModal] = useState<boolean>(false)
  const [fileStorageName, setFileStorageName] = useState<string>(``)
  const fileStorageItem = props.item
    .fileStorageItem as GqlFileStorage_fileStorage_fileStorageChildren
  const dropdownMenuItems: IDDMItem[] = [
    {
      icon: <i className={`fal fa-pen mr-3`} />,
      label: t(`rename`),
      clickHandler: () => setShowModal(!showModal),
    },
    {
      icon: <i className={`fal fa-copy mr-3`} />,
      label: t(`copy`),
      clickHandler: () => props.item.copyFileStorageItem(),
    },
    {
      icon: <i className={`fal fa-arrows-alt mr-3`} />,
      label: t(`move`),
      clickHandler: () => props.item.moveFileStorageItem(),
    },
    {
      icon: <i className={`fal fa-trash mr-3`} />,
      label: t(`delete`),
      clickHandler: () => props.item.delete(),
    },
  ]

  const editButtonHandler = () => {
    props.item.update(fileStorageName)
    setShowModal(false)
  }

  return (
    <div className="overflow-visible shadow-lg rounded-lg h-full w-full cursor-pointer m-auto bg-white">
      {showModal && (
        <Modal title={`Rename`} hideModal={() => setShowModal(false)}>
          <div className="flex gap-2 items-center">
            <div className="flex-4">
              <InputText
                placeholder={`Rename`}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFileStorageName(e.target.value)
                }
              />
            </div>
            <div className="flex-1 w-10">
              <span
                onClick={editButtonHandler}
                className="bg-primary text-white p-3 rounded-md"
              >
                <i className={`fal fa-edit `} />
              </span>
            </div>
          </div>
        </Modal>
      )}
      <div onClick={() => props.item.onFileStorageChange()}>
        <div className="relative w-full block h-full">
          <div className="bg-white dark:bg-gray-800 w-full p-4 rounded-lg">
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-4 flex items-center">
                <i className="fal fa-folder mr-3 text-3xl text-primary" />
                <p className="text-gray-800 dark:text-white text-xl font-medium truncate">
                  {fileStorageItem.name}
                </p>
              </div>
              <div className="text-center" onClick={(e) => e.stopPropagation()}>
                <DropDownMenu
                  icon={<i className={`fal fa-ellipsis-v fa-2x`} />}
                  items={dropdownMenuItems}
                ></DropDownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
