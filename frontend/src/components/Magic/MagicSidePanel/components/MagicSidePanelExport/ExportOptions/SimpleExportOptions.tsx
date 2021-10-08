import {
  DropDownMenuFancy,
  ISimpleWithDescriptionPropsListItem,
} from '@lib/components'
import React, { useState } from 'react'
interface ISimpleExportOptions {
  setFileSize: React.Dispatch<React.SetStateAction<number>>
}

const SimpleExportOptions: React.FC<ISimpleExportOptions> = (props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const filesTypes = [
    // this data comes from dataBase
    {
      label: `Draft`,
      size: 123.5,
    },
    {
      label: `Standard`,
      size: 350.22,
    },
    {
      label: `Youtube`,
      size: 480.2,
    },
    {
      label: `Instagram`,
      size: 900,
    },
  ]
  //TODO this should be handled because currently we didnt send any props to export Side Panel
  // useEffect(() => {
  //   props?.setFileSize(filesTypes[activeIndex].size)
  // }, [activeIndex])
  const optionsList: ISimpleWithDescriptionPropsListItem[] = [
    {
      label: `Draft`,
      description: `Low quality for quick render times and small files`,
    },
    {
      label: `Standard`,
      description: `Tradeoff between quality and render times`,
    },
    {
      label: `Youtube`,
      highlightedLabel: `720p`,
      description: `Uses Youtube recommended settings for 720p 60fps videos`,
    },
    {
      label: `Instagram`,
      description: `Uses Instagram recommended settings`,
    },
  ]
  return (
    <div className="my-6">
      <DropDownMenuFancy
        initialActiveIndex={activeIndex}
        list={optionsList}
        activeIndexHandler={setActiveIndex}
      />
    </div>
  )
}
export default SimpleExportOptions
