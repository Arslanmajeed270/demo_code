import { FC, useState } from 'react'
import { GqlFileStorage_fileStorage_files, MediaType } from '@lib/gqlTypes/asp'
import { IMediaResolution, IFileStorageBoxGridItemProps } from '../types'
import { getMediaResolution } from '../utils'
import {
  IDDMItem,
  DropDownMenu,
  Modal,
  Button,
  InputText,
} from '@lib/components'
import { useTranslation } from 'react-i18next'

export interface IFileStorageFileProps {
  item: IFileStorageBoxGridItemProps
  showOptionData?: boolean | false
}

export const FileStorageFile: FC<IFileStorageFileProps> = (props) => {
  const { t } = useTranslation(`magic`)
  const [showModal, setShowModal] = useState<boolean>(false)

  const fileStorageMediaItem = props.item
    .fileStorageItem as GqlFileStorage_fileStorage_files
  const [fileStorageFileName, setFileStorageFileName] = useState<string>(``)

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
    props.item.update(fileStorageFileName)
    setShowModal(false)
  }

  const mediaResolution: IMediaResolution = getMediaResolution(
    fileStorageMediaItem.media.files,
  )

  return (
    <div className="overflow-visible shadow-lg rounded-lg h-full w-full cursor-pointer m-auto bg-white">
      <div
        onClick={() =>
          props.item.onFileStorageSelect(
            fileStorageMediaItem.media.type,
            mediaResolution.original,
          )
        }
        className="relative max-w-full block max-h-full"
      >
        {showModal && (
          <Modal title={`Rename`} hideModal={() => setShowModal(false)}>
            <div className="flex gap-2">
              <div className="flex-4">
                <InputText
                  placeholder={`Rename`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFileStorageFileName(e.target.value)
                  }
                />
              </div>
              <div className="flex-1">
                <Button
                  onClick={editButtonHandler}
                  icon={<i className={`fa fa-edit`} />}
                  color={`primary`}
                />
              </div>
            </div>
          </Modal>
        )}
        <div className="relative group">
          {fileStorageMediaItem.media.type === MediaType.IMAGE ? (
            <img
              alt={fileStorageMediaItem.name}
              src={mediaResolution.thumbnail}
              className={`${
                props.showOptionData ? `rounded-t-lg` : `rounded-lg`
              } h-52 w-full object-cover bg-gray-300 m-auto`}
            />
          ) : fileStorageMediaItem.media.type === MediaType.VIDEO ? (
            <div className="h-52 max-h-full rounded-t-lg bg-gray-200 w-full text-center flex items-center">
              <i className="fal fa-video fa-6x m-auto" />
            </div>
          ) : fileStorageMediaItem.media.type === MediaType.AUDIO ? (
            <div className="h-52 max-h-full rounded-t-lg bg-gray-200 w-full text-center flex items-center">
              <i className="fal fa-file-music fa-6x m-auto" />
            </div>
          ) : null}
          {props.showOptionData && (
            <div
              className={`rounded-t-lg h-auto absolute inset-0 w-full bg-opacity-40 bg-black opacity-0 group-hover:opacity-100`}
            >
              <div className="grid grid-cols-3">
                <div className="m-3 col-span-2 pt-1"></div>
                <div className="flex flex-row-reverse m-3 col">
                  <div
                    className="ml-1 text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropDownMenu
                      icon={<i className={`fal fa-ellipsis-v text-white`} />}
                      items={dropdownMenuItems}
                    ></DropDownMenu>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {props.showOptionData && (
          <div className="bg-white dark:bg-gray-800 w-full p-4 rounded-b-lg grid grid-cols-4">
            <div className="col-span-3">
              <div className="mb-2 items-center">
                <p className="text-gray-800 text-base truncate">
                  {fileStorageMediaItem.name}
                </p>
              </div>
            </div>
            <div className="col-span-1">
              <div className="mb-2 items-center">
                <p className="text-gray-800 text-center text-base truncate font-bold">
                  {Math.round(mediaResolution.originalSize / 1000)} KB
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
