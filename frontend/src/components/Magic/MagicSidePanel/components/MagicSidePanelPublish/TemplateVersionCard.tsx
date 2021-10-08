import React, { FC } from 'react'

import { Avatar, DropDownMenu, IDDMItem } from '@lib/components'
import { GqlTemplateVersion_templateVersion } from '@lib/gqlTypes/emz'

export interface ITemplateVersionCardProps {
  templateVersion: GqlTemplateVersion_templateVersion
  userImageSrc?: string
  isActive: boolean
  isSelected: boolean
  setActive: () => void
  downBorder?: boolean
}
const TemplateVersionCard: FC<ITemplateVersionCardProps> = (props) => {
  const { templateVersion } = props
  const dropdownMenuItems: IDDMItem[] = [
    {
      icon: <i className="fas fa-check mr-3" />,
      label: `Active`,
      clickHandler: props.setActive,
    },
  ]
  const dropdownIcon = <i className="fal fa-ellipsis-h text-xl"></i>
  return (
    <div
      className={`overflow-visible rounded w-full cursor-pointer m-auto ${
        props.downBorder && `border-b`
      } border-opacity-50`}
    >
      <div className="w-full block h-full">
        <div
          className={`${
            props.isActive
              ? `bg-green-100`
              : props.isSelected
              ? `bg-gray-200`
              : `bg-white`
          } dark:bg-gray-800 w-full pt-4 hover:bg-blue-100  rounded-b relative`}
        >
          <div
            className="absolute -top-1.5 -right-8 h-16 w-16"
            onClick={(e) => e.stopPropagation()}
          >
            <DropDownMenu
              icon={dropdownIcon}
              items={dropdownMenuItems}
            ></DropDownMenu>
          </div>

          <div className="flex justify-between text-gray-700 group px-3 pb-2 ">
            <div className="order-first">
              <div className="flex flex-col">
                <div className="flex leading-7">
                  <span className="">Version:</span>
                  <span className="font-semibold text-lg ml-1">
                    {templateVersion.version}
                  </span>
                  {props.isActive && (
                    <span>
                      <i className="fas fa-check-circle text-green-700 ml-1 text-sm"></i>
                    </span>
                  )}
                </div>
                <div className="flex mt-1">
                  {props.userImageSrc ? (
                    <Avatar size="2x-small" img={props.userImageSrc} />
                  ) : (
                    <svg
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 350 350"
                      xmlSpace="preserve"
                      className="flex-initial mx-1 object-cover h-5 w-5"
                    >
                      <g>
                        <path
                          d="M175,171.173c38.914,0,70.463-38.318,70.463-85.586C245.463,38.318,235.105,0,175,0s-70.465,38.318-70.465,85.587
		C104.535,132.855,136.084,171.173,175,171.173z"
                        />
                        <path d="M41.909,301.853C41.897,298.971,41.885,301.041,41.909,301.853L41.909,301.853z" />
                        <path d="M308.085,304.104C308.123,303.315,308.098,298.63,308.085,304.104L308.085,304.104z" />
                        <path
                          d="M307.935,298.397c-1.305-82.342-12.059-105.805-94.352-120.657c0,0-11.584,14.761-38.584,14.761
		s-38.586-14.761-38.586-14.761c-81.395,14.69-92.803,37.805-94.303,117.982c-0.123,6.547-0.18,6.891-0.202,6.131
		c0.005,1.424,0.011,4.058,0.011,8.651c0,0,19.592,39.496,133.08,39.496c113.486,0,133.08-39.496,133.08-39.496
		c0-2.951,0.002-5.003,0.005-6.399C308.062,304.575,308.018,303.664,307.935,298.397z"
                        />
                      </g>
                    </svg>
                  )}

                  <p className="text-gray-600 ml-1 overflow-ellipsis overflow-hidden">
                    {templateVersion.user.firstName}
                  </p>
                  <p className="text-gray-400"></p>
                </div>
              </div>
            </div>
            <div className="order-last">
              <div className="flex flex-col">
                <span className="text-right mt-1">
                  <span
                    className={`${
                      templateVersion.published
                        ? `text-green-500`
                        : `text-red-500`
                    } font-semibold`}
                  >
                    {templateVersion.published ? `Published` : `Draft`}
                  </span>
                </span>
                <p className="text-gray-400 text-right mt-2">
                  {templateVersion.updatedAt.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TemplateVersionCard
