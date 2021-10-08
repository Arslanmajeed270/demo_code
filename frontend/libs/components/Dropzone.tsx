import { FC, useState, DragEvent } from 'react'
import { MediaType } from '@lib/gqlTypes/asp'

interface IDropzoneProps {
  mediaAcceptType?: MediaType
  inputRef: React.MutableRefObject<undefined>
  onFilesSelect?: (e: HTMLInputElement[`files`]) => void
  children?: React.ReactNode
}

export const Dropzone: FC<IDropzoneProps> = (props) => {
  const [overLay, setOverLay] = useState(false)

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    const currentMediaType =
      e.dataTransfer && e.dataTransfer.items[0].type.split(`/`)[0]

    if (
      !props.mediaAcceptType ||
      (props.mediaAcceptType &&
        currentMediaType === props.mediaAcceptType.toLowerCase())
    ) {
      setOverLay(true)
    }
  }
  const handleDragLeave = () => {
    setOverLay(false)
  }

  const handleDrop = () => {
    setOverLay(false)
  }

  return (
    <>
      <div
        className={`absolute w-full h-full ${
          overLay
            ? `z-20 opacity-50 bg-primary`
            : `z-0 opacity-0 bg-transparent`
        }`}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <div className="text-2xl text-center inset-1/3 text-white font-bold absolute">
          <div className="text-center">
            <i className="animate-bounce fal fa-cloud-upload-alt fa-2x"></i>
          </div>
          Drop to Upload
        </div>
        <input
          accept={
            props.mediaAcceptType
              ? `${props.mediaAcceptType.toLowerCase()}/*`
              : undefined
          }
          ref={props.inputRef}
          className="absolute w-full h-full opacity-0"
          type="file"
          onChange={(e) => props.onFilesSelect(e.target.files)}
        />
      </div>

      <div
        className={`relative h-full ${overLay ? `z-0` : `z-20`}`}
        onDragEnter={handleDragEnter}
      >
        <div className="h-auto">{props.children}</div>
      </div>
    </>
  )
}
