import {
  DropDownMenuFancy,
  ISimpleWithDescriptionPropsListItem,
} from '@lib/components'
import React, { useState } from 'react'
interface ISimpleExportOptions {
  setFileSize: React.Dispatch<React.SetStateAction<number>>
  currentFileSize: number
}
const activeResolutionList: ISimpleWithDescriptionPropsListItem[] = [
  {
    label: `480p`,
  },
  {
    label: `Youtube`,
    highlightedLabel: `720p`,
  },
  {
    label: `Instagram`,
  },
  {
    label: `Twitter`,
  },
]

const activeQualityList: ISimpleWithDescriptionPropsListItem[] = [
  {
    label: `Low`,
  },
  {
    label: `Standard`,
  },
  {
    label: `High`,
  },
]
const activeCompressionList: ISimpleWithDescriptionPropsListItem[] = [
  {
    label: `Higher Quality`,
  },
  {
    label: `Fast Render`,
  },
]
const AdvancedExportOptions: React.FC<ISimpleExportOptions> = (props) => {
  const [activeResolution, SetActiveResolution] = useState(0)
  const [activeQuality, SetActiveQuality] = useState(0)
  const [activeCompression, SetActiveCompression] = useState(0)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex mt-3 justify-between group">
        <span className="order-first w-2/6 mt-3 text-gray-600 ">
          Resolution
        </span>
        <div className="order-last w-4/6">
          <DropDownMenuFancy
            initialActiveIndex={activeResolution}
            list={activeResolutionList}
            activeIndexHandler={SetActiveResolution}
          />
        </div>
      </div>
      <div className="flex mt-1 justify-between group">
        <span className="order-first w-2/6 mt-3 text-gray-600 ">Quality</span>
        <div className="order-last w-4/6">
          <DropDownMenuFancy
            initialActiveIndex={activeQuality}
            list={activeQualityList}
            activeIndexHandler={SetActiveQuality}
          />
        </div>
      </div>

      <div className="flex mt-1 mb-4 justify-between group">
        <span className="order-first w-2/6 mt-3 text-gray-600 ">
          Compression
        </span>
        <div className="order-last w-4/6">
          <DropDownMenuFancy
            initialActiveIndex={activeCompression}
            list={activeCompressionList}
            activeIndexHandler={SetActiveCompression}
          />
        </div>
      </div>
    </div>
  )
}
export default AdvancedExportOptions
