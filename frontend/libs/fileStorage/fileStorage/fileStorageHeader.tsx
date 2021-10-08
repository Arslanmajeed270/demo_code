import { FC, useEffect, useState } from 'react'
import _ from 'lodash'
import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
} from '@apollo/client'
import {
  GqlFileStorage_fileStorage_fileStorage,
  GqlFileStorage_fileStorage_fileStorageAncestors,
  GqlMFileStorage,
  GqlMFileStorageVariables,
} from '@lib/gqlTypes/asp'
import { ObjectId, Uuid } from '@lib/graphql'
import { Modal, Button, InputText, VerticalScrollBarDiv } from '@lib/components'
import { useTranslation } from 'react-i18next'

interface IFileStorageHeaderProps {
  isSideBar?: boolean
  onFileStorageChange: (
    fileStorageId?: ObjectId,
    orgId?: Uuid,
    isRoot?: boolean,
  ) => void
  title: string
  currentFileStorage: GqlFileStorage_fileStorage_fileStorage
  ancestors: GqlFileStorage_fileStorage_fileStorageAncestors[]
  icon: string
  orgId: Uuid
  fileStorageId: string
  onUploadButtonClick: () => void
  createFileStorage: (
    options: MutationFunctionOptions<
      GqlMFileStorage,
      GqlMFileStorageVariables,
      DefaultContext,
      ApolloCache<unknown>
    >,
  ) => Promise<FetchResult>
}

export const FileStorageHeader: FC<IFileStorageHeaderProps> = (props) => {
  const { t } = useTranslation(`magic`)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [fileStorageName, setFileStorageName] = useState<string>(``)

  const createStorage = () => {
    props.createFileStorage({
      variables: {
        name: fileStorageName,
        parentFileStorageId: props.fileStorageId,
        orgId: props.orgId,
      },
    })
    setShowModal(false)
  }

  const [ancestorArray, setAncestorArray] =
    useState<GqlFileStorage_fileStorage_fileStorageAncestors[]>(null)

  useEffect(() => {
    if (!props.ancestors) return
    setAncestorArray(_.cloneDeep(props.ancestors).reverse())
  }, [props.ancestors])

  return (
    <div className="max-h-full overflow-auto w-full">
      <div className="grid grid-cols-6 gap-1">
        <VerticalScrollBarDiv
          className={`flex items-center whitespace-nowrap ml-5 my-3 col-span-6 lg:col-span-3`}
        >
          {props.icon && <i className={props.icon} />}
          <span
            className="cursor-pointer text-primary font-bold mx-1.5"
            onClick={() =>
              props.onFileStorageChange(undefined, undefined, true)
            }
          >
            {t(`root`)}
          </span>
          <i className="fa fa-chevron-right" />
          <span
            className="cursor-pointer text-primary font-bold mx-1.5"
            onClick={() => props.onFileStorageChange(undefined, props.orgId)}
          >
            {t(props.title)}
          </span>
          {ancestorArray?.map(
            (
              ancestor: GqlFileStorage_fileStorage_fileStorageAncestors,
              index: number,
            ) => (
              <div key={index}>
                <i className="fa fa-chevron-right" />
                <span
                  className="cursor-pointer text-primary font-bold mx-1.5"
                  onClick={() =>
                    props.onFileStorageChange(ancestor._id, props.orgId)
                  }
                >
                  {ancestor.name}
                </span>
              </div>
            ),
          )}
          {props.currentFileStorage && (
            <>
              <i className="fa fa-chevron-right mr-1.5" />
              <span className="text-black font-bold">
                {props.currentFileStorage.name}
              </span>
            </>
          )}
        </VerticalScrollBarDiv>

        <div
          className={`items-center whitespace-nowrap mx-5 my-3 col-span-6 lg:col-span-3 flex flex-row gap-4`}
        >
          <Button
            label={props.isSideBar ? `` : t(`create-file-storage`)}
            onClick={() => setShowModal(true)}
            isFat={false}
            color="primary"
            icon={
              <i
                className={`fal fa-folder-plus mr-2 ${
                  props.isSideBar ? `fa-2x` : ``
                }`}
              />
            }
            className={`${props.isSideBar ? `` : `truncate`} px-8 self-center`}
          />
          <Button
            onClick={props.onUploadButtonClick}
            label={props.isSideBar ? `` : t(`upload`)}
            isFat={false}
            color="primary"
            icon={
              <i
                className={`fal fa-cloud-upload-alt mr-2 ${
                  props.isSideBar ? `fa-2x` : ``
                }`}
              />
            }
            className={`${props.isSideBar ? `` : `truncate`} px-8 self-center`}
          />
          {showModal && (
            <Modal
              title="Create File Storage"
              hideModal={() => setShowModal(false)}
            >
              <div className="flex gap-3">
                <div className="flex-4">
                  <InputText
                    placeholder={`Add Folder`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFileStorageName(e.target.value)
                    }
                  />
                </div>
                <div className="flex-none">
                  <Button
                    isFat={false}
                    color="primary"
                    label={t(`create`)}
                    onClick={createStorage}
                  />
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  )
}
