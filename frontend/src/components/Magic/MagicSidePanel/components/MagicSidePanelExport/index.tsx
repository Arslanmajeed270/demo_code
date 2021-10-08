import { Button } from '@lib/components'
import { bytesIntoHumanReadableSize } from '@utils/readableText'
import React from 'react'
import { IMagicSidePanelListComponentProps } from '../..'
import ExportOptions from './ExportOptions'
export interface IMagicSidePanelExportProps
  extends IMagicSidePanelListComponentProps {
  fileSize: number
  setFileSize: React.Dispatch<React.SetStateAction<number>>
  totalTime: string
}
const MagicSidePanelExport: React.FC<IMagicSidePanelExportProps> = (props) => {
  const imageSrc = `https://images.unsplash.com/photo-1490077476659-095159692ab5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2NlbmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80`
  const publishButtonIcon = <i className="far fa-crown mr-3 hover:border-6" />
  const exportButtonIcon = <i className="fas fa-upload mr-3 hover:border-6" />
  return (
    <div className="relative flex flex-col h-full">
      <div className="flex flex-col  mt-10 ">
        <img className="object-fit rounded-xl" src={imageSrc} />
        <div className="flex my-2 justify-between text-gray-400 group">
          <span className="order-first ">
            <i className="ml-4 fal fa-stopwatch mr-2"></i>
            <span className="text-sm"> {props.totalTime}</span>
          </span>
          <span className="order-last">
            <span className="text-xs">
              {bytesIntoHumanReadableSize(props?.fileSize)}
            </span>
            <i className="far fa-file-download mr-4 ml-2"></i>
          </span>
        </div>
        <div className="relative">
          <ExportOptions
            setFileSize={props?.setFileSize}
            currentFileSize={props?.fileSize}
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-4">
        <Button
          className="bg-yellow-400 text-yellow-50 hover:bg-yellow-500 group"
          color="blue"
          label="Export"
          isFat={true}
          icon={exportButtonIcon}
        />
        <Button
          className=""
          color="yellow"
          label="Remove WaterMark"
          isFat={true}
          icon={publishButtonIcon}
        />
      </div>
    </div>
  )
}
export default MagicSidePanelExport
