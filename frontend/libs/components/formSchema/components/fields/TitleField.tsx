import { FieldProps } from '@rjsf/core'
import React from 'react'
import { REQUIRED_FIELD_SYMBOL } from '../../constants'

export const TitleField: React.FC<FieldProps> = (props) => {
  const { id, title, required } = props
  return (
    <legend id={id} style={{ borderBottom: `2px solid #00000022` }}>
      {title}
      {required && <span className="required">{REQUIRED_FIELD_SYMBOL}</span>}
    </legend>
  )
}
