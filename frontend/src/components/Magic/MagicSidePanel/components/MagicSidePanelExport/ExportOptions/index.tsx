import React, { useState } from 'react'
import AdvancedExportOptions from './AdvancedExportOptions'
import SimpleExportOptions from './SimpleExportOptions'
interface IExportOptionsProps {
  setFileSize: React.Dispatch<React.SetStateAction<number>>
  currentFileSize: number
}
const ExportOptions: React.FC<IExportOptionsProps> = (props) => {
  const [isAdvanced, setIsAdvanced] = useState(false)
  return (
    <>
      <div className="flex mt-6 justify-between group ">
        <span className="order-first text-2xl text-gray-600">
          {isAdvanced ? `Advanced` : `Preset`}
        </span>
        <span
          className="order-last text-gray-400 mt-1 cursor-pointer hover:text-blue-500"
          onClick={() => setIsAdvanced(!isAdvanced)}
        >
          + {isAdvanced ? `Switch to Simple` : `Switch to Advanced`}
        </span>
      </div>
      <div className="relative">
        {isAdvanced ? (
          <AdvancedExportOptions
            currentFileSize={props?.currentFileSize}
            setFileSize={props?.setFileSize}
          />
        ) : (
          <SimpleExportOptions setFileSize={props?.setFileSize} />
        )}
      </div>
    </>
  )
}
export default ExportOptions
