import { FC } from 'react'
import { GqlTemplates_templates } from '@lib/gqlTypes/emz'
import { Avatar, DropDownMenu, IDDMItem } from '@lib/components'
import moment from 'moment'
import { NO_IMAGE_AVAILABLE, USER_AVATAR } from '@lib/constants'
import { useTranslation } from 'react-i18next'

export interface IEmeezoTemplateBoxGridItemProps {
  emeezoTemplateItem: GqlTemplates_templates
  hideOptions?: boolean
  onSelect?: (template: GqlTemplates_templates) => void
  createVideo: () => void
  editTemplate: () => void
  cloneTemplate: () => void
  onApiSelect: () => void
}
export interface ITemplateUser {
  img: string
  name: string
  lastUpdatedTime: string
}
export interface ITemplateCardProps {
  item: IEmeezoTemplateBoxGridItemProps
}

export const TemplateCard: FC<ITemplateCardProps> = (props) => {
  const { t } = useTranslation(`template`)
  const dropdownMenuItems: IDDMItem[] = [
    {
      icon: <i className="fa fa-plus mr-3" />,
      label: t(`create-video`),
      clickHandler: props.item.createVideo,
    },
    {
      icon: <i className="fa fa-edit mr-3" />,
      label: t(`edit`),
      clickHandler: props.item.editTemplate,
    },
    {
      icon: <i className="fa fa-clone mr-3" />,
      label: t(`clone`),
      clickHandler: props.item.cloneTemplate,
    },
    {
      icon: <i className="fa fa-brackets-curly mr-3" />,
      label: t(`code-api`),
      clickHandler: props.item.onApiSelect,
    },
  ]
  return (
    <div
      className="overflow-visible shadow-lg rounded-lg h-full w-full cursor-pointer m-auto bg-white"
      onClick={() =>
        props.item?.onSelect !== undefined
          ? props.item?.onSelect(props.item.emeezoTemplateItem)
          : props.item.editTemplate()
      }
    >
      <div className="w-full block h-full">
        <div className="rounded-t-lg h-40 max-h-40 w-full flex items-center">
          <img
            alt="blog photo"
            src={NO_IMAGE_AVAILABLE}
            className="rounded-t-lg object-cover h-40 max-h-40 w-full m-auto "
          />
        </div>
        <div className="bg-white dark:bg-gray-800 w-full p-4 rounded-b-lg">
          <div className="flex justify-between gap-4 items-center">
            <p className="text-gray-800 dark:text-white text-xl truncate font-medium">
              {props.item.emeezoTemplateItem.title}
            </p>
            {!props.item.hideOptions && (
              <div onClick={(e) => e.stopPropagation()}>
                <DropDownMenu
                  icon={<i className="fal fa-ellipsis-h fa-2x"></i>}
                  items={dropdownMenuItems}
                />
              </div>
            )}
          </div>
          <div className="flex gap-1 items-center mt-2">
            <Avatar size="x-small" img={USER_AVATAR} />
            <div className="text-base">
              <p className="text-gray-800 dark:text-white">
                {props.item.emeezoTemplateItem.user.firstName}
              </p>
            </div>
            <div className="text-sm flex-1 text-right mr-2">
              <p className="text-gray-800 dark:text-white italic">
                {moment(props.item.emeezoTemplateItem.createdAt).format(
                  `MMMM Do, YYYY`,
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
