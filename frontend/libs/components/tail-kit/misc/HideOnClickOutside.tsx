import { MutableRefObject, FC, useEffect, useRef, useState } from 'react'
interface Props {
  children: React.ReactNode
  show: boolean
  force?: boolean
  refsIgnored?: MutableRefObject<HTMLElement>[]
  handleView: (isViewed: boolean) => void
}
export const HideOnClickOutside: FC<Props> = ({
  show,
  handleView,
  force = false,
  refsIgnored = [],
  children,
}) => {
  const ref = useRef(null)
  const [isViewed, setIsViewed] = useState(show)
  const handleClickOutside = (event) => {
    if (force) return
    if (
      refsIgnored.find(
        (ref) => ref.current && ref.current.contains(event.target),
      )
    )
      return
    if (ref.current && !ref.current.contains(event.target)) {
      handleView(false)
    }
  }
  useEffect(() => {
    document.addEventListener(`mousedown`, handleClickOutside)
    return () => {
      document.removeEventListener(`mousedown`, handleClickOutside)
    }
  }, [ref])
  useEffect(() => {
    if (isViewed && !show) {
      setIsViewed(false)
    }
    if (!isViewed && show) {
      setIsViewed(true)
    }
  }, [show])
  return <div ref={ref}>{isViewed && children}</div>
}
