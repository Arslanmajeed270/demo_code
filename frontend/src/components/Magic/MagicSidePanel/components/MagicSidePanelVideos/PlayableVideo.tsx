import { useEffect, useRef } from 'react'

interface IClipProps {
  url: string
}

export const PlayableVideo: React.FC<IClipProps> = ({ url }) => {
  const videoRef: React.MutableRefObject<HTMLVideoElement> = useRef()
  const previousUrl = useRef(url)

  useEffect(() => {
    if (previousUrl.current === url) {
      return
    }

    if (videoRef && videoRef.current) {
      videoRef.current.load()
    }

    previousUrl.current = url
  }, [url])

  return (
    <video controls ref={videoRef} className="rounded-md w-96">
      <source src={url} />
    </video>
  )
}
