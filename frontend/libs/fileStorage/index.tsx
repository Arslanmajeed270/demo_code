import React, { useEffect, useRef, useState } from 'react'
import {
  BoxGridList,
  Dropzone,
  Button,
  ScrollBarDiv,
  DropDownMenuFancy,
  ISimpleWithDescriptionPropsListItem,
} from '@lib/components'
import { useLazyQuery, useMutation } from '@apollo/client'
import * as ASP_GQL_TYPES from '@lib/gqlTypes/asp'
import { ObjectId, Uuid } from '@lib/graphql'
import _ from 'lodash'
import * as axios from 'axios'

import { FileStorageFolder } from './fileStorage/fileStorageFolder'
import { FileStorageHeader } from './fileStorage/fileStorageHeader'
import { FileStorageFile } from './fileStorage/fileStorageFile'
import * as ASP_GQL_ENTITIES from '@lib/entities'

import { getMediaTypeFromFileContentType, pasteFileStorageItem } from './utils'
import { toastify } from '@lib/utils'
import { AccountSelection } from '@lib/components'
import {
  IFileStorageBoxGridItemProps,
  IFileStorageAction,
  FileStorageItemType,
  FileStorageUpdateType,
} from './types'
import { useLatest } from 'react-use'
import {
  APOLLO_CLIENTS_INFO,
  UploadProgressBarsDisplayDuration,
} from '@lib/constants'
import { MediaType } from '@lib/gqlTypes/asp'
import { useTranslation } from 'react-i18next'

interface IFileStorageLibProps {
  isSideBar?: boolean
  mediaType?: MediaType
  showAccountSelection?: boolean
  orgId?: Uuid
  user: ASP_GQL_TYPES.GqlInitialUserData_user
  organizationList: ASP_GQL_TYPES.GqlInitialUserData_myOrganizationList[]
  fileStorageId?: ObjectId
  onFileStorageChange?: (
    fileStorageId?: ObjectId,
    orgId?: Uuid,
    isRoot?: boolean,
  ) => boolean
  onFileStorageSelect: (mediaType: MediaType, uri: string) => void
}

interface IUploadProgressBar {
  id: ObjectId
  name: string
  percentage: number
  icon?: string
}

export const FileStorage: React.FC<IFileStorageLibProps> = (props) => {
  const { t } = useTranslation(`magic`)
  const inputMediaRef = useRef()
  const [uploadProgressBars, setUploadProgressBars] = useState<
    IUploadProgressBar[]
  >([])
  const [showAccountSelection, setShowAccountSelection] = useState(
    props.showAccountSelection,
  )
  const [orgId, setOrgId] = useState(props.orgId)
  const [fileStorageId, setFileStorageId] = useState(props.fileStorageId)

  const uploadProgressBarsRef = useLatest(uploadProgressBars)

  const [inputMediaFile, setInputMediaFile] = useState<File>(null)
  const [deleteFileStorageId, setDeleteFileStorageId] = useState<ObjectId>(``)

  const [fileStorageChildren, setFileStorageChildren] = useState<
    ASP_GQL_TYPES.GqlFileStorage_fileStorage_fileStorageChildren[]
  >([])

  const [fileStorageFiles, setFileStorageFiles] = useState<
    ASP_GQL_TYPES.GqlFileStorage_fileStorage_files[]
  >([])
  const [fileStorageAncestors, setFileStorageAncestors] = useState<
    ASP_GQL_TYPES.GqlFileStorage_fileStorage_fileStorageAncestors[]
  >([])
  const [fileStorage, setFileStorage] =
    useState<ASP_GQL_TYPES.GqlFileStorage_fileStorage_fileStorage>()

  const fileStorageActionInitialState: IFileStorageAction = {
    fileStorageUpdateType: null,
    fileStorageItemType: null,
    id: null,
  }

  const [fileStorageAction, setFileStorageAction] =
    useState<IFileStorageAction>(fileStorageActionInitialState)

  const [mediaType, setMediaType] = useState<MediaType>(undefined)

  const fileStorageMediaType: ISimpleWithDescriptionPropsListItem[] = [
    {
      label: t(`all`),
      value: undefined,
    },
    {
      label: t(`images`),
      value: MediaType.IMAGE,
    },
    {
      label: t(`videos`),
      value: MediaType.VIDEO,
    },
    {
      label: t(`audios`),
      value: MediaType.AUDIO,
    },
  ]

  const mediaTypeActiveIndex =
    fileStorageMediaType.findIndex((item) => item.value === mediaType) ?? 0

  const [fetchFileStorage] = useLazyQuery<
    ASP_GQL_TYPES.GqlFileStorage,
    ASP_GQL_TYPES.GqlFileStorageVariables
  >(ASP_GQL_ENTITIES.GQL_FILE_STORAGE, {
    fetchPolicy: `cache-and-network`,
    context: { client: APOLLO_CLIENTS_INFO.ASP },
    onCompleted(data) {
      setFileStorageFiles(data.fileStorage.files)
      setFileStorageAncestors(data.fileStorage.fileStorageAncestors)
      setFileStorageChildren(data.fileStorage.fileStorageChildren)
      setFileStorage(data.fileStorage.fileStorage)
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const [deleteFileStorage] = useMutation<
    ASP_GQL_TYPES.GqlMDeleteFileStorage,
    ASP_GQL_TYPES.GqlMDeleteFileStorageVariables
  >(ASP_GQL_ENTITIES.GQLM_DELETE_FILE_STORAGE, {
    context: { client: APOLLO_CLIENTS_INFO.ASP },
    onCompleted() {
      const updatedFileStorageChildren = _.cloneDeep(fileStorageChildren)
      const fileStorageChildrenIndex = updatedFileStorageChildren.findIndex(
        (item) => item._id === deleteFileStorageId,
      )
      updatedFileStorageChildren.splice(fileStorageChildrenIndex, 1)
      setFileStorageChildren(updatedFileStorageChildren)
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const [deleteFileStorageFile] = useMutation<
    ASP_GQL_TYPES.GqlMDeleteFileStorageFile,
    ASP_GQL_TYPES.GqlMDeleteFileStorageFileVariables
  >(ASP_GQL_ENTITIES.GQLM_DELETE_FILE_STORAGE_FILE, {
    context: { client: APOLLO_CLIENTS_INFO.ASP },
    onCompleted() {
      const updateFileStorageFile = _.cloneDeep(fileStorageFiles)
      const fileStorageFileIndex = updateFileStorageFile.findIndex(
        (item) => item._id === deleteFileStorageId,
      )
      updateFileStorageFile.splice(fileStorageFileIndex, 1)
      setFileStorageFiles(updateFileStorageFile)
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const [createFileStorage] = useMutation<
    ASP_GQL_TYPES.GqlMFileStorage,
    ASP_GQL_TYPES.GqlMFileStorageVariables
  >(ASP_GQL_ENTITIES.GQLM_FILE_STORAGE, {
    context: { client: APOLLO_CLIENTS_INFO.ASP },
    onCompleted(data) {
      const oldFileStorageChildren = _.cloneDeep(fileStorageChildren)
      const updatedFileStorageChildren = [
        data.fileStorage.fileStorage,
        ...oldFileStorageChildren,
      ]
      setFileStorageChildren(updatedFileStorageChildren)
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const [updateFileStorage] = useMutation<
    ASP_GQL_TYPES.GqlMUpdateFileStorage,
    ASP_GQL_TYPES.GqlMUpdateFileStorageVariables
  >(ASP_GQL_ENTITIES.GQLM_UPDATE_FILE_STORAGE, {
    context: { client: APOLLO_CLIENTS_INFO.ASP },
    onCompleted(data) {
      const oldFileStorageChildren = _.cloneDeep(fileStorageChildren)
      const updatedFileStorageChildren = oldFileStorageChildren.map(
        (item: ASP_GQL_TYPES.GqlFileStorage_fileStorage_fileStorageChildren) =>
          item._id === data.updateFileStorage._id
            ? (item.name = data.updateFileStorage.name) && item
            : item,
      )
      setFileStorageChildren(
        updatedFileStorageChildren as ASP_GQL_TYPES.GqlFileStorage_fileStorage_fileStorageChildren[],
      )
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const [updateFileStorageFile] = useMutation<
    ASP_GQL_TYPES.GqlMUpdateFileStorageFile,
    ASP_GQL_TYPES.GqlMUpdateFileStorageFileVariables
  >(ASP_GQL_ENTITIES.GQLM_UPDATE_FILE_STORAGE_FILE, {
    context: { client: APOLLO_CLIENTS_INFO.ASP },
    onCompleted(data) {
      const oldFileStorageFile = _.cloneDeep(fileStorageFiles)

      const updatedFileStorageFile = oldFileStorageFile.map(
        (item: ASP_GQL_TYPES.GqlFileStorage_fileStorage_files) =>
          item._id === data.updateFileStorageFile._id
            ? (item.name = data.updateFileStorageFile.name) && item
            : item,
      )
      setFileStorageFiles(
        updatedFileStorageFile as ASP_GQL_TYPES.GqlFileStorage_fileStorage_files[],
      )
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const [copyFileStorage] = useMutation<
    ASP_GQL_TYPES.GqlMCopyFileStorage,
    ASP_GQL_TYPES.GqlMCopyFileStorageVariables
  >(ASP_GQL_ENTITIES.GQLM_COPY_FILE_STORAGE, {
    context: { client: APOLLO_CLIENTS_INFO.ASP },
    onCompleted(data) {
      const oldFileStorageChildren = _.cloneDeep(fileStorageChildren)
      const updatedFileStorageChildren = [
        data.copyFileStorage,
        ...oldFileStorageChildren,
      ]
      setFileStorageChildren(updatedFileStorageChildren)
      setFileStorageAction(fileStorageActionInitialState)
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const [copyFileStorageFile] = useMutation<
    ASP_GQL_TYPES.GqlMCopyFileStorageFile,
    ASP_GQL_TYPES.GqlMCopyFileStorageFileVariables
  >(ASP_GQL_ENTITIES.GQLM_COPY_FILE_STORAGE_FILE, {
    context: { client: APOLLO_CLIENTS_INFO.ASP },
    onCompleted(data) {
      const oldFileStorageFiles = _.cloneDeep(fileStorageFiles)
      const updatedFileStorageFiles = [
        data.copyFileStorageFile,
        ...oldFileStorageFiles,
      ]
      setFileStorageFiles(updatedFileStorageFiles)
      setFileStorageAction(fileStorageActionInitialState)
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const [moveFileStorage] = useMutation<
    ASP_GQL_TYPES.GqlMMoveFileStorage,
    ASP_GQL_TYPES.GqlMMoveFileStorageVariables
  >(ASP_GQL_ENTITIES.GQLM_MOVE_FILE_STORAGE, {
    context: { client: APOLLO_CLIENTS_INFO.ASP },
    onCompleted(data) {
      const oldFileStorageChildren = _.cloneDeep(fileStorageChildren)
      const updatedFileStorageChildren = [
        data.moveFileStorage,
        ...oldFileStorageChildren,
      ]
      setFileStorageChildren(updatedFileStorageChildren)
      setFileStorageAction(fileStorageActionInitialState)
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const [moveFileStorageFile] = useMutation<
    ASP_GQL_TYPES.GqlMMoveFileStorageFile,
    ASP_GQL_TYPES.GqlMMoveFileStorageFileVariables
  >(ASP_GQL_ENTITIES.GQLM_MOVE_FILE_STORAGE_FILE, {
    context: { client: APOLLO_CLIENTS_INFO.ASP },
    onCompleted(data) {
      const oldFileStorageFiles = _.cloneDeep(fileStorageFiles)
      const updatedFileStorageFiles = [
        data.moveFileStorageFile,
        ...oldFileStorageFiles,
      ]
      setFileStorageFiles(updatedFileStorageFiles)
      setFileStorageAction(fileStorageActionInitialState)
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const fileOnUploadProgress =
    (fileId: ObjectId, fileName: string) => (response) => {
      const percentage = Math.round((100 * response.loaded) / response.total)
      const uploadProgressBarsReference = uploadProgressBarsRef.current

      const mediaFileIndex = uploadProgressBarsReference?.findIndex(
        (item) => item.id === fileId,
      )

      if (!uploadProgressBarsReference?.length || mediaFileIndex < 0) {
        const newFileProgressBar: IUploadProgressBar = {
          id: fileId,
          name: fileName,
          percentage,
        }
        setUploadProgressBars([
          ...uploadProgressBarsReference,
          newFileProgressBar,
        ])
        return
      }

      const updatedProgressBar = [...uploadProgressBarsReference]
      const index = updatedProgressBar.findIndex((item) => item.id === fileId)
      updatedProgressBar[index].percentage = percentage
      setUploadProgressBars(updatedProgressBar)
    }

  const [mediaUploadRequest] = useMutation<
    ASP_GQL_TYPES.GqlMMediaUploadRequest,
    ASP_GQL_TYPES.GqlMMediaUploadRequestVariables
  >(ASP_GQL_ENTITIES.GQLM_MEDIA_UPLOAD_REQUEST, {
    context: { client: APOLLO_CLIENTS_INFO.ASP },
    onCompleted(data) {
      const formData = new FormData()
      const presignedPost = data.mediaUploadRequest.presignedPost.fields
      const url = data.mediaUploadRequest.presignedPost.url
      for (const key in presignedPost) {
        formData.append(key, presignedPost[key])
      }
      formData.append(`file`, inputMediaFile, inputMediaFile.name)
      const config = {
        onUploadProgress: fileOnUploadProgress(
          data.mediaUploadRequest._id,
          data.mediaUploadRequest.name,
        ),
      }
      axios.default
        .post(url, formData, config)
        .then((response) => {
          if (!response) return
          _mediaUploadRequestUploaded(data.mediaUploadRequest._id)
        })
        .catch((e) => {
          toastify.Error(e.message)
          const updatedProgressBar = [...uploadProgressBarsRef.current]
          if (updatedProgressBar.length > 0) {
            const mediaUploadProgressBarIndex = updatedProgressBar.findIndex(
              (item) => item.id === data.mediaUploadRequest._id,
            )

            const currentUploadProgressBarItem =
              updatedProgressBar[mediaUploadProgressBarIndex]

            currentUploadProgressBarItem.icon = `fa fa-exclamation-triangle text-yellow-500`

            setUploadProgressBars(updatedProgressBar)
            clearUploadProgressBars(data.mediaUploadRequest._id)
          }
        })
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const clearUploadProgressBars = (_id: string) => {
    setTimeout(() => {
      const updatedProgressBar = [...uploadProgressBarsRef.current]
      const mediaUploadProgressBarIndex = updatedProgressBar.findIndex(
        (item) => item.id === _id,
      )
      updatedProgressBar.splice(mediaUploadProgressBarIndex, 1)
      setUploadProgressBars(updatedProgressBar)
    }, UploadProgressBarsDisplayDuration)
  }

  const _mediaUploadRequestUploaded = (_id: ObjectId) => {
    const updatedProgressBar = [...uploadProgressBarsRef.current]
    const mediaUploadProgressBarIndex = updatedProgressBar.findIndex(
      (item) => item.id === _id,
    )
    const currentUploadProgressBarItem =
      updatedProgressBar[mediaUploadProgressBarIndex]
    currentUploadProgressBarItem.icon = `fal fa-spinner fa-spin`
    setUploadProgressBars(updatedProgressBar)

    mediaUploadRequestUploaded({
      variables: {
        _id,
      },
    })
  }

  const [mediaUploadRequestUploaded] = useMutation<
    ASP_GQL_TYPES.GqlMMediaUploadRequestUploaded,
    ASP_GQL_TYPES.GqlMMediaUploadRequestUploadedVariables
  >(ASP_GQL_ENTITIES.GQLM_MEDIA_UPLOAD_REQUEST_UPLOADED, {
    context: { client: APOLLO_CLIENTS_INFO.ASP },
    onCompleted(data) {
      const oldFileStorageFiles = _.cloneDeep(fileStorageFiles)
      const updatedFileStorageFiles = [
        data.mediaUploadRequestUploaded,
        ...oldFileStorageFiles,
      ]
      setFileStorageFiles(updatedFileStorageFiles)

      const updatedProgressBar = [...uploadProgressBarsRef.current]
      const mediaUploadProgressBarIndex = updatedProgressBar.findIndex(
        (item) => item.id === data.mediaUploadRequestUploaded.media._id,
      )
      updatedProgressBar[
        mediaUploadProgressBarIndex
      ].icon = `fa fa-check text-green-500`

      setUploadProgressBars(updatedProgressBar)

      clearUploadProgressBars(data.mediaUploadRequestUploaded.media._id)
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const uploadButtonClickHandler = () => {
    const inputElement: HTMLElement = inputMediaRef.current
    inputElement.click()
  }

  const onFileStorageChange = (
    fileStorageId?: ObjectId,
    orgId?: Uuid,
    isRoot = false,
  ) => {
    const shouldRoute =
      (props.onFileStorageChange &&
        props.onFileStorageChange(fileStorageId, orgId, isRoot)) ||
      true
    if (!shouldRoute) return
    setFileStorageId(fileStorageId)
    setOrgId(orgId)
    setShowAccountSelection(isRoot)
  }

  const fileStorageBoxGridItemRenderer = (
    fileStorageItem: ASP_GQL_TYPES.GqlFileStorage_fileStorage_fileStorageChildren[],
  ): IFileStorageBoxGridItemProps[] => {
    return fileStorageItem.map(
      (item: ASP_GQL_TYPES.GqlFileStorage_fileStorage_fileStorageChildren) => {
        return {
          fileStorageItem: item,
          delete: () => {
            deleteFileStorage({ variables: { _id: item._id } }),
              setDeleteFileStorageId(item._id)
          },
          fileStorageAccountId: orgId,
          copyFileStorageItem: () =>
            setFileStorageAction({
              id: item._id,
              fileStorageItemType: FileStorageItemType.FILE_STORAGE,
              fileStorageUpdateType: FileStorageUpdateType.COPY,
            }),
          moveFileStorageItem: () =>
            setFileStorageAction({
              id: item._id,
              fileStorageItemType: FileStorageItemType.FILE_STORAGE,
              fileStorageUpdateType: FileStorageUpdateType.MOVE,
            }),
          update: (fileStorageName: string) =>
            updateFileStorage({
              variables: { _id: item._id, name: fileStorageName },
            }),
          onFileStorageChange: () => onFileStorageChange(item._id, orgId),
        }
      },
    )
  }

  const fileStorageMediaBoxGridItemRenderer = (
    fileStorageItem: ASP_GQL_TYPES.GqlFileStorage_fileStorage_files[],
  ): IFileStorageBoxGridItemProps[] => {
    return fileStorageItem.map(
      (item: ASP_GQL_TYPES.GqlFileStorage_fileStorage_files) => {
        return {
          fileStorageItem: item,
          delete: () => {
            deleteFileStorageFile({ variables: { _id: item._id } }),
              setDeleteFileStorageId(item._id)
          },
          fileStorageAccountId: orgId,
          copyFileStorageItem: () =>
            setFileStorageAction({
              id: item._id,
              fileStorageItemType: FileStorageItemType.FILE_STORAGE_FILE,
              fileStorageUpdateType: FileStorageUpdateType.COPY,
            }),
          moveFileStorageItem: () =>
            setFileStorageAction({
              id: item._id,
              fileStorageItemType: FileStorageItemType.FILE_STORAGE_FILE,
              fileStorageUpdateType: FileStorageUpdateType.MOVE,
            }),
          update: (fileStorageName: string) =>
            updateFileStorageFile({
              variables: { _id: item._id, name: fileStorageName },
            }),
          onFileStorageChange: () => onFileStorageChange(item._id, orgId),
          onFileStorageSelect: props.onFileStorageSelect,
        }
      },
    )
  }
  const setActiveMediaTypeHandler = (item: ASP_GQL_TYPES.MediaType) => {
    setMediaType(item)
  }

  useEffect(() => {
    if (showAccountSelection) return
    const baseVariables: ASP_GQL_TYPES.GqlFileStorageVariables = {}
    if (mediaType) baseVariables.search = { mediaType }

    if (fileStorageId)
      return fetchFileStorage({
        variables: { ...baseVariables, _id: fileStorageId },
      })

    if (orgId)
      return fetchFileStorage({ variables: { ...baseVariables, orgId: orgId } })
    fetchFileStorage({ variables: { ...baseVariables } })
  }, [mediaType, orgId, fileStorageId, showAccountSelection])

  return (
    <>
      {showAccountSelection && (
        <AccountSelection
          isSideBar={props.isSideBar}
          onChange={(orgId) => onFileStorageChange(undefined, orgId)}
          user={props.user}
          organizationList={props.organizationList}
        />
      )}
      <ScrollBarDiv className="h-full">
        <FileStorageHeader
          isSideBar={props.isSideBar}
          title={`file-storage`}
          icon="fal fa-folder-open fa-2x"
          orgId={orgId}
          fileStorageId={fileStorageId}
          ancestors={fileStorageAncestors}
          currentFileStorage={fileStorage}
          onUploadButtonClick={uploadButtonClickHandler}
          createFileStorage={createFileStorage}
          onFileStorageChange={onFileStorageChange}
        />
        <div className="flex-1">
          <BoxGridList<IFileStorageBoxGridItemProps>
            Card={FileStorageFolder}
            isSideBar={props.isSideBar}
            list={fileStorageBoxGridItemRenderer(fileStorageChildren)}
          />
        </div>
        <div className="relative flex-grow h-full">
          <Dropzone
            mediaAcceptType={mediaType}
            inputRef={inputMediaRef}
            onFilesSelect={(files: HTMLInputElement[`files`]) => {
              if (files.length === 0) return
              const file = files[0]
              setInputMediaFile(file)
              mediaUploadRequest({
                variables: {
                  orgId: orgId,
                  parentFileStorageId: fileStorageId,
                  name: file.name,
                  type: getMediaTypeFromFileContentType(file),
                },
              })
            }}
          >
            <div className="flex items-center">
              <div className="flex-1 text-lg font-bold mx-5">
                {t(`file-storage-media`)}
              </div>
              <div className="flex-1 mx-5 ">
                <div className="w-40 float-right">
                  <DropDownMenuFancy<MediaType>
                    list={fileStorageMediaType}
                    initialActiveIndex={mediaTypeActiveIndex}
                    activeItemHandler={(item) =>
                      setActiveMediaTypeHandler(item.value)
                    }
                  />
                </div>
              </div>
            </div>
            {fileStorageFiles.length ? (
              <BoxGridList<IFileStorageBoxGridItemProps>
                Card={FileStorageFile}
                list={fileStorageMediaBoxGridItemRenderer(fileStorageFiles)}
              />
            ) : (
              <div className="h-full m-auto my-10">
                <h1 className="text-center font-bold text-red-500 text-xl">
                  {t(`no-media-available`)}
                </h1>
              </div>
            )}
          </Dropzone>
        </div>
        {fileStorageAction.fileStorageUpdateType && (
          <div className="absolute z-20 right-2 bottom-2 p-5 bg-gray-300 rounded-md border">
            <div className=" flex w-32 gap-3">
              <Button
                className="cursor-pointer"
                color={`green`}
                icon={<i className={`fal fa-paste`} />}
                onClick={() =>
                  pasteFileStorageItem(
                    fileStorageAction,
                    fileStorageId,
                    orgId,
                    copyFileStorage,
                    moveFileStorage,
                    copyFileStorageFile,
                    moveFileStorageFile,
                  )
                }
              />
              <Button
                className="cursor-pointer"
                color={`gray`}
                icon={<i className={`fa fa-close`} />}
                onClick={() =>
                  setFileStorageAction(fileStorageActionInitialState)
                }
              />
            </div>
          </div>
        )}
        {uploadProgressBars.length > 0 && (
          <div className="absolute w-72 z-20 h-auto right-2 bottom-2 bg-white shadow-md rounded-md border">
            {uploadProgressBars.map((data, index) => (
              <div className="h-14 relative" key={index}>
                <div className="px-3 pt-3 flex items-center">
                  <span className="flex-1 truncate">{data.name}</span>
                  <div className="flex items-center">
                    <span className="flex-1 text-right font-bold">
                      {data.percentage}%
                    </span>
                    {data.icon && <i className={`ml-1.5 ${data.icon}`} />}
                  </div>
                </div>
                <div className="w-full h-auto">
                  <div
                    className="bg-blue-500 absolute bottom-0 text-xs leading-none py-1 text-center text-white"
                    style={{ width: `${data.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollBarDiv>
    </>
  )
}
