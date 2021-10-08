import { MagicSidePanelVariables } from '@components/Magic/MagicSidePanel/components/MagicSidePanelTemplateVariables'
import { MagicSidePanelFonts } from '@components/Magic/MagicSidePanel/components/MagicSidePanelFonts'
import { MagicSidePanelImages } from '@components/Magic/MagicSidePanel/components/MagicSidePanelImages'
import MagicSidePanelPublish from '@components/Magic/MagicSidePanel/components/MagicSidePanelPublish'
import { MagicSidePanelVideos } from '@components/Magic/MagicSidePanel/components/MagicSidePanelVideos'
import { MagicUploadMedia } from '@components/Magic/MagicSidePanel/components/MagicUploadMedia'
import { IMagicSidePanelListItem } from '@components/Magic/MagicSidePanel'
import MagicSidePanelExport from '@components/Magic/MagicSidePanel/components/MagicSidePanelExport'
import { MagicSidePanelClip } from '@components/Magic/MagicSidePanel/components/MagicSidePanelClip'
import { MagicSidePanelSettings } from '@components/Magic/MagicSidePanel/components/MagicSidePanelSettings/MagicSidePanelSettings'
import { MagicSidePanelObjectProperties } from '@components/Magic/MagicSidePanel/components/MagicSidePanelObjectProperties'
import { MagicSidePanelAudios } from '@components/Magic/MagicSidePanel/components/MagicSidePanelAudio'
import { MagicSidePanelScripts } from '@components/Magic/MagicSidePanel/components/MagicSidePanelScripts'

export const MagicObjectPropertyUpdateDelay = 5

export enum MagicSidePanelName {
  EXPORT = `Export`,
  PUBLISH = `Publish`,
  CLIPS = `Clips`,
  FONTS = `Fonts`,
  CHARACTERS = `Characters`,
  MAGIC_SCRIPTS = `Magic Script`,
  SCRIPTS = `script`,
  PROPS = `Props`,
  SHAPES = `Shapes`,
  IMAGES = `Images`,
  VIDEOS = `Videos`,
  AUDIO = `Audio`,
  BROWSE_MEDIA = `Browse Media`,
  FORM = `Form`,
  SETTINGS = `Settings`,
  OBJECT_PROPERTIES = `Object`,
}

export const MagicSidePanelExportItem: IMagicSidePanelListItem = {
  name: MagicSidePanelName.EXPORT,
  component: MagicSidePanelExport,
  isRight: true,
  hideOnMiniPanel: true,
}
export const MagicUploadMediaItem: IMagicSidePanelListItem = {
  name: MagicSidePanelName.BROWSE_MEDIA,
  component: MagicUploadMedia,
  wrapperClassName: `fixed inset-0 lg:w-2/4 xs:w-full overflow-hidden`,
  hideOnMiniPanel: true,
}
export const MagicSidePanelPublishItem: IMagicSidePanelListItem = {
  name: MagicSidePanelName.PUBLISH,
  component: MagicSidePanelPublish,
  wrapperClassName: `overflow-hidden`,
  isRight: true,
  hideOnMiniPanel: true,
}
export const MagicStickyPanelClipsItem: IMagicSidePanelListItem = {
  name: MagicSidePanelName.CLIPS,
  icon: `fas fa-photo-video`,
  component: MagicSidePanelClip,
  isSticky: true,
}

export const MagicStickyPanelObjectPropertiesItem: IMagicSidePanelListItem = {
  name: MagicSidePanelName.OBJECT_PROPERTIES,
  component: MagicSidePanelObjectProperties,
  hideOnMiniPanel: true,
  isSticky: true,
}

export const MagicStickyPanelVideosItem: IMagicSidePanelListItem = {
  name: MagicSidePanelName.VIDEOS,
  icon: `fab fa-youtube`,
  component: MagicSidePanelVideos,
}

export const MagicSidePanelList: IMagicSidePanelListItem[] = [
  MagicStickyPanelClipsItem,

  MagicSidePanelExportItem,
  MagicUploadMediaItem,
  MagicSidePanelPublishItem,
  {
    name: MagicSidePanelName.FONTS,
    icon: `fal fa-text`,
    component: MagicSidePanelFonts,
  },
  // {
  //   name: MagicSidePanelName.CHARACTERS,
  //   icon: `fas fa-users`,
  //   component: MagicSidePanelImages,
  // },
  // {
  //   name: MagicSidePanelName.SHAPES,
  //   icon: `fas fa-shapes`,
  //   component: MagicSidePanelImages,
  // },
  {
    name: MagicSidePanelName.IMAGES,
    icon: `fas fa-images`,
    component: MagicSidePanelImages,
  },
  MagicStickyPanelVideosItem,
  {
    name: MagicSidePanelName.AUDIO,
    icon: `fas fa-music`,
    component: MagicSidePanelAudios,
  },

  {
    name: MagicSidePanelName.SCRIPTS,
    icon: `fas fa-scroll-old`,
    component: MagicSidePanelScripts,
  },
  {
    name: MagicSidePanelName.FORM,
    icon: `fas fa-plus`,
    component: MagicSidePanelVariables,
  },
  {
    name: MagicSidePanelName.SETTINGS,
    icon: `fas fa-cog`,
    component: MagicSidePanelSettings,
  },
]
