import React, { useRef, useState } from 'react'

export const useReferredState = <T>(
  initialValue: T = undefined,
): [T, React.Dispatch<T>, React.MutableRefObject<T>] => {
  const [state, setState] = useState<T>(initialValue)
  const reference = useRef<T>(state)

  const setReferredState = (value) => {
    reference.current = value
    setState(value)
  }

  return [state, setReferredState, reference]
}
