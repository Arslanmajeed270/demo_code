import { FieldTemplateProps } from '@rjsf/core'
import { Label } from './fields/SchemaField'

export const FieldTemplate: React.FC<FieldTemplateProps> = (props) => {
  const {
    id,
    label,
    children,
    errors,
    help,
    description,
    hidden = false,
    required = false,
    displayLabel = true,
    schema,
  } = props
  if (hidden) {
    return <div className="hidden">{children}</div>
  }

  if (schema.type === `boolean`) props.schema.title = `enable`

  return (
    <div className="mb-5">
      {(displayLabel || schema.type === `boolean`) && (
        <Label label={label} required={required} id={id} {...props} />
      )}
      {displayLabel && description ? description : null}
      {children}
      {errors}
      {help}
    </div>
  )
}
