import {
  GqlFileStorage_fileStorage_files,
  GqlFileStorage_fileStorage_fileStorageChildren,
  MediaType,
} from '@lib/gqlTypes/asp'
import { ObjectId, Uuid } from '@lib/graphql'

export enum FileStorageUpdateType {
  COPY = `copy`,
  MOVE = `move`,
}

export interface IFileStorageChangeHandlerArg {
  newFileStorageId?: ObjectId
  newUuid?: Uuid
  isRoot?: boolean
}

export enum FileStorageItemType {
  FILE_STORAGE = `fileStorage`,
  FILE_STORAGE_FILE = `fileStorageFile`,
}

export interface IFileStorageAction {
  fileStorageItemType: FileStorageItemType
  fileStorageUpdateType: FileStorageUpdateType
  id: ObjectId
}

export interface IMediaResolution {
  icon: string
  thumbnail: string
  medium: string
  large: string
  original: string
  originalSize: number
}

export interface IFileStorageBoxGridItemProps {
  fileStorageItem:
    | GqlFileStorage_fileStorage_fileStorageChildren
    | GqlFileStorage_fileStorage_files
  orgId?: ObjectId
  copyFileStorageItem: () => void
  moveFileStorageItem: () => void
  update?: (fileStorageName: string) => void
  delete?: () => void
  onFileStorageChange: () => void
  onFileStorageSelect?: (type: MediaType, uri: string) => void
}
