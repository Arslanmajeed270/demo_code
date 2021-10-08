import React, { useEffect, useRef, useState } from 'react'
import { HideOnClickOutside } from '@lib/components'
export interface ISimpleWithDescriptionPropsListItem<T = any> {
  label: string
  highlightedLabel?: string
  description?: string
  value?: T
}
interface ISimpleWithDescriptionProps<T = unknown> {
  initialActiveIndex?: number
  activeIndexHandler?: (index: number) => void
  activeItemHandler?: (item: ISimpleWithDescriptionPropsListItem<T>) => void
  list: ISimpleWithDescriptionPropsListItem<T>[]
  directionUp?: boolean
}
export const DropDownMenuFancy = <T extends unknown>(
  props: ISimpleWithDescriptionProps<T>,
): React.ReactElement<ISimpleWithDescriptionProps<T>> => {
  const [show, setShow] = useState(false)
  const [activeIndex, setActiveIndex] = useState(props.initialActiveIndex || 0)
  const dropDownRef = useRef(null)

  const dropDownMenuStyle: React.CSSProperties =
    dropDownRef.current && props.directionUp
      ? { bottom: dropDownRef.current.clientHeight + 4 }
      : {}

  return (
    <div className="w-full mx-auto h-auto relative bg-white">
      <div
        ref={dropDownRef}
        className={`${
          show
            ? `border-blue-300 border-2 hover:border-blue-400`
            : `border hover:border-gray-400`
        } rounded-md border-gray-300 py-3  px-3 font-normal flex items-center justify-between cursor-pointer`}
        onClick={() => setShow(!show)}
      >
        <div className="flex flex-col  ">
          <div>
            <span className="font-medium text-gray-600 leading-3 tracking-normal">
              {props.list[activeIndex]?.label}
            </span>
            <span className="font-semibold italic text-xs text-gray-600 leading-3 tracking-normal mx-1">
              {props.list[activeIndex]?.highlightedLabel}
            </span>
          </div>
          {props.list[activeIndex]?.description && (
            <span className="text-gray-400 text-sm leading-tight pt-3">
              {props.list[activeIndex]?.description}
            </span>
          )}
        </div>
        <div className="cursor-pointer text-gray-600 dark:text-gray-400 mr-3">
          {show ? (
            <i
              className={`fas ${
                props.list[activeIndex]?.description
                  ? `fa-arrow-up`
                  : `fa-chevron-up`
              }`}
            ></i>
          ) : (
            <i
              className={`fas ${
                props.list[activeIndex]?.description
                  ? `fa-arrow-down`
                  : `fa-chevron-down`
              }`}
            ></i>
          )}
        </div>
      </div>
      <HideOnClickOutside
        show={show}
        handleView={(isSet) => !isSet && setShow(false)}
        refsIgnored={[dropDownRef]}
      >
        {show && (
          <ul
            style={dropDownMenuStyle}
            className="w-full visible transition duration-300 opacity-100 bg-white dark:bg-gray-800 shadow rounded  absolute z-50"
          >
            {props.list.map((item, index) => (
              <li
                key={index}
                className="border-l border-r hover:border-t rounded-md border-gray-200 cursor-pointer py-4 hover:bg-blue-100 hover:border-gray-400 px-3 font-normal"
                onClick={() => {
                  setShow(!show)
                  setActiveIndex(index)
                  if (props.activeIndexHandler) props.activeIndexHandler(index)
                  if (props.activeItemHandler) props.activeItemHandler(item)
                }}
              >
                <div className="flex flex-col">
                  <div>
                    <span className="font-medium text-gray-600 leading-3 tracking-normal">
                      {item.label}
                    </span>
                    {item.highlightedLabel && (
                      <span className="font-semibold italic text-xs text-gray-600 leading-3 tracking-normal mx-1">
                        {item.highlightedLabel}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <span className="text-gray-400 text-sm leading-tight pt-3 overflow-ellipsis">
                      {item.description}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </HideOnClickOutside>
    </div>
  )
}
