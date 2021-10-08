import React from 'react'
import { RootState } from '@redux/reducers'
import { useSelector } from 'react-redux'
import { FileStorage } from '@lib/fileStorage'
import { MediaType } from '@lib/gqlTypes/asp'
import {
  getNewTCCOBase,
  getNewTCCOObjectBase,
} from '@components/Magic/MagicCanvas/template'
import { addNewClipObjectToTemplate } from '@components/Magic/MagicCanvas/canvas'
import { IMagicSidePanelListComponentProps } from '..'
import { FabricObject } from '@lib/graphql'

export const MagicUploadMedia: React.FC<IMagicSidePanelListComponentProps> = ({
  template,
  updateTemplateFromClip,
}) => {
  const {
    magicTimeline: { currentFrame },
    magicTemplate: { activeTemplateClipId },
    magicSidePanel: { mediaType },
  } = useSelector((state: RootState) => state)

  const { user, myOrganizationList, currentOrganization } = useSelector(
    (state: RootState) => state.userReducer,
  )

  const orgId = (currentOrganization && currentOrganization.id) || undefined

  const onFileStorageSelect = (mediaType: MediaType, uri: string) => {
    if (mediaType === MediaType.IMAGE) {
      const baseTCCO = getNewTCCOObjectBase()
      const tcooObject: fabric.IImageOptions = {
        ...baseTCCO,
        name: `Image (${baseTCCO._id.substring(baseTCCO._id.length - 3)})`,
        type: `image`,
        src: uri,
        crossOrigin: `anonymous`,
      }
      addTCCObjectToTemplate(tcooObject)
      return
    }
    if (mediaType === MediaType.AUDIO) {
      const baseTCCO = getNewTCCOBase()
      const tcooObject: fabric.IAudioOptions = {
        ...baseTCCO,
        name: `Audio (${baseTCCO._id.substring(baseTCCO._id.length - 3)})`,
        type: `audio`,
        src: uri,
        crossOrigin: `anonymous`,
        mediaStartAt: 0,
        muteMedia: false,
        mediaVolume: 1,
      }
      addTCCObjectToTemplate(tcooObject)
      return
    }
    if (mediaType === MediaType.VIDEO) {
      const baseTCCO = getNewTCCOObjectBase()
      const tcooObject: fabric.IVideoOptions = {
        ...baseTCCO,
        name: `Video (${baseTCCO._id.substring(baseTCCO._id.length - 3)})`,
        type: `video`,
        src: uri,
        crossOrigin: `anonymous`,
        mediaStartAt: 0,
        muteMedia: false,
        mediaVolume: 1,
      }
      addTCCObjectToTemplate(tcooObject)
      return
    }
  }

  const addTCCObjectToTemplate = (tcooObject: FabricObject) => {
    const { width, height } = template
    if (tcooObject.type !== `audio` && tcooObject.top !== undefined) {
      tcooObject.top = width / 2
      tcooObject.left = height / 2
      tcooObject.originX = `left`
      tcooObject.originY = `bottom`
    }

    addNewClipObjectToTemplate(
      tcooObject,
      currentFrame,
      template,
      activeTemplateClipId,
      updateTemplateFromClip,
    )
  }

  if (!user) return <></>

  return (
    <div className="w-full h-full relative overflow-hidden ">
      <FileStorage
        isSideBar={true}
        orgId={orgId}
        user={user}
        mediaType={mediaType}
        organizationList={myOrganizationList}
        onFileStorageSelect={onFileStorageSelect}
      />
    </div>
  )
}
