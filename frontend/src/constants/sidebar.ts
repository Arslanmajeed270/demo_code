import { ASP_FRONTEND_URL, EmzAppRoutes } from '@lib/constants'
import { ILeftSideBarLink } from '@lib/components'
import { TemplateIcon } from '@public/icons/customIcons/TemplateIcon'
import { VideoIcon } from '@public/icons/customIcons/VideoIcon'
import { VideoEditorIcon } from '@public/icons/customIcons/VideoEditorIcon'
import { AspAppRoutes } from '@lib/constants/asp'

export const LEFT_SIDEBAR_LINKS: ILeftSideBarLink[] = [
  {
    name: `videos`,
    icon: VideoIcon,
    route: EmzAppRoutes.dashboard,
  },
  {
    name: `templates`,
    icon: TemplateIcon,
    route: EmzAppRoutes.templates,
  },
  {
    name: `video-editor`,
    icon: VideoEditorIcon,
    route: EmzAppRoutes.magic,
  },
  {
    name: `File Storage`,
    icon: `fal fa-folder-open`,
    route: ASP_FRONTEND_URL + AspAppRoutes.fileStorage,
    newWindow: true,
  },
]
