import { ValidScriptPathRegex, ValidClipPathRegex } from '@constants'
import {
  GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
  GqlTemplate_template_templateVersion_magicTemplate,
} from '@lib/gqlTypes/emz'
import { ObjectId } from '@lib/graphql'
import { IFSBVFormData } from '@lib/types'
import { FormValidation } from '@rjsf/core'
import _ from 'lodash'

export const getVariablePath = (
  _id: string,
  clipId: ObjectId,
  objectId: ObjectId,
  template: GqlTemplate_template_templateVersion_magicTemplate,
) => {
  const clipIndex = template.clips.findIndex((clip) => clip._id === clipId)
  if (clipIndex === -1) return
  const currentClip = template.clips[
    clipIndex
  ] as GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas
  const objectIndex = currentClip.objects.findIndex(
    (object) => objectId === object._id,
  )
  if (objectIndex === -1) return
  return `clips[${clipIndex}].objects[${objectIndex}].${_id.split(`root_`)[1]}`
}

export const validateMTV = (
  _formData: IFSBVFormData,
  errors: FormValidation,
  magicTemplate: GqlTemplate_template_templateVersion_magicTemplate,
): FormValidation => {
  if (
    _formData &&
    _formData.metadata &&
    _formData.metadata.linkVariables?.length
  ) {
    _formData.metadata.linkVariables.forEach(
      (variablePath: string, index: number) => {
        const isValidClipPath = ValidClipPathRegex.test(variablePath)
        const isValidScriptPath = ValidScriptPathRegex.test(variablePath)
        if (!isValidClipPath && !isValidScriptPath)
          (errors.metadata as FormValidation).linkVariables[index].addError(
            `Variable must be from scripts or clips!`,
          )

        const isVariableExit = _.get(magicTemplate, variablePath)
        if (isVariableExit === undefined)
          (errors.metadata as FormValidation).linkVariables[index].addError(
            `Variable doesn't exit!`,
          )

        if (typeof isVariableExit !== _formData.type)
          (errors.metadata as FormValidation).linkVariables[index].addError(
            `Can't assign type ${typeof isVariableExit} to type ${
              _formData.type
            }`,
          )
      },
    )
  }
  return errors
}
