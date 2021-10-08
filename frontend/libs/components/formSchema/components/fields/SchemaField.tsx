import { FieldTemplateProps, utils } from '@rjsf/core'
import React, { FC } from 'react'
import { REQUIRED_FIELD_SYMBOL } from '../../constants'
import { IconButton } from '../IconButton'

interface ILabelProps extends FieldTemplateProps {
  label: string
  required: boolean
  id: string
}
export type ILabelIconProps = ILabelProps

export const Label: React.FC<ILabelProps> = (props) => {
  const { label, uiSchema, required, id, formContext = {} } = props
  const labelIcons: FC[] = formContext.labelIcons
  const onLabelClick: (keyPath: string) => void = formContext.onLabelClick
  if (!label) {
    return null
  }

  const _onLabelClick = () => {
    if (!onLabelClick) return
    const keyPath = getPropertyPathFromRxjsId(id)
    onLabelClick(keyPath)
  }

  return (
    <label
      className={`control-label w-full ${
        _onLabelClick && `cursor-pointer hover:text-secondary-400`
      }`}
      htmlFor={id}
      onClick={_onLabelClick}
    >
      {label}
      {required && <span className="required">{REQUIRED_FIELD_SYMBOL}</span>}
      {!uiSchema[`ui:readonly`] && (
        <span className="float-right">
          {labelIcons?.map((LabelIcon, index) => (
            <div className="mr-2 inline-block" key={index}>
              <LabelIcon {...props} />
            </div>
          ))}
        </span>
      )}
    </label>
  )
}

export const LabelInput: React.FC<{
  label: string
  id: string
  onChange: (value: string) => void
}> = (props) => {
  const { id, label, onChange } = props
  return (
    <input
      className="form-control"
      type="text"
      id={id}
      onBlur={(event) => onChange(event.target.value)}
      defaultValue={label}
    />
  )
}

export const WrapIfAdditional: React.FC<FieldTemplateProps> = (props) => {
  const {
    id,
    classNames,
    disabled,
    label,
    onKeyChange,
    onDropPropertyClick,
    readonly,
    required,
    schema,
  } = props
  const keyLabel = `${label} Key` // i18n ?
  // eslint-disable-next-line no-prototype-builtins
  const additional = schema.hasOwnProperty(utils.ADDITIONAL_PROPERTY_FLAG)

  if (!additional) {
    return <div className={classNames}>{props.children}</div>
  }

  return (
    <div className={classNames}>
      <div className="row">
        <div className="col-xs-5 form-additional">
          <div className="form-group">
            <Label
              label={keyLabel}
              required={required}
              id={`${id}-key`}
              {...props}
            />
            <LabelInput label={label} id={`${id}-key`} onChange={onKeyChange} />
          </div>
        </div>
        <div className="form-additional form-group col-xs-5">
          {props.children}
        </div>
        <div className="col-xs-2">
          <IconButton
            _type="danger"
            icon="remove"
            className="array-item-remove btn-block"
            tabIndex={-1}
            style={{ border: `0` }}
            disabled={disabled || readonly}
            onClick={onDropPropertyClick(label)}
          />
        </div>
      </div>
    </div>
  )
}

export const getPropertyPathFromRxjsId = (id: string): string => {
  const idWithoutRoot = id.replace(`root_`, ``)
  const keys = idWithoutRoot.split(`_`)

  const keysFiltered = keys.reduce((result, key, index) => {
    // Due to underscore present between adjacent key
    if (key === ``) return result
    if (index > 0 && keys[index - 1] === ``) return [...result, `_${key}`]
    return [...result, key]
  }, [])

  if (keysFiltered[0] === `keyframes`) return
  return keysFiltered.join(`.`)
}
