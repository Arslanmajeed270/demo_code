import { FC } from 'react'

export const Spinner: FC<{ className?: string }> = ({ className }) => (
  <i className={`far fa-spinner fa-spin ${className}`}></i>
)
