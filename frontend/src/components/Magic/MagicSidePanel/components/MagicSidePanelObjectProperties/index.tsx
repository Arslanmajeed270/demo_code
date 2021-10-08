import {
  getActiveClipFromId,
  getActiveClipObjectFromId,
} from '@components/Magic/MagicCanvas/template/clip'
import { RootState } from '@redux/reducers'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  IMagicSidePanelListComponentProps,
  IMagicSidePanelListItem,
} from '../..'
import { AjvError } from '@rjsf/core'
import {
  getTccObjectFormSchema,
  isValidFabricObjectKeyframePath,
} from '@constants/magic'
import { useLatest } from 'react-use'
import _ from 'lodash'
import {
  setMagicSidePanelItem,
  setObjectKeyframesVisible,
} from '@redux/actions'
import {
  MagicObjectPropertyUpdateDelay,
  MagicStickyPanelClipsItem,
} from '@constants/magic'
import { SimpleAlert } from '@lib/components'
import { FormSchema } from '@lib/components/formSchema'
import {
  GqlVideo_video_magicTemplate,
  GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
  MagicTemplateClipType,
} from '@lib/gqlTypes/emz'
import { magicObjectFormSchemaLabelIcons } from './LabelIcons'
import { IFSBVFormData } from '@lib/types'
import { MagicSidePanelVariables } from '../MagicSidePanelTemplateVariables'

export const MagicSidePanelObjectProperties: React.FC<IMagicSidePanelListComponentProps> =
  ({ template, updateTemplate }) => {
    let timeoutId: NodeJS.Timeout

    const dispatch = useDispatch()

    const [linkVariableFormData, setLinkVariableFormData] =
      useState<IFSBVFormData>()

    const {
      magicTimeline: { currentFrame, objectKeyframesVisible },
      magicTemplate: { activeTemplateClipId, activeTemplateClipObjectId },
    } = useSelector((state: RootState) => state)

    const objectKeyframesVisibleRef = useLatest(objectKeyframesVisible)
    const templateRef = useLatest<GqlVideo_video_magicTemplate>(template)
    const currentFrameRef = useLatest(currentFrame)
    const _setMagicSidePanelItem = (
      magicSidePanel: IMagicSidePanelListItem,
    ) => {
      dispatch(setMagicSidePanelItem(magicSidePanel))
    }
    const activeClipIndex = getActiveClipFromId(
      activeTemplateClipId,
      template,
      true,
    ) as number
    const activeClip =
      activeClipIndex >= 0
        ? (template.clips[
            activeClipIndex
          ] as GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas)
        : undefined

    const objectIndex = activeClip
      ? (getActiveClipObjectFromId(
          activeTemplateClipObjectId,
          activeClip,
          true,
        ) as number)
      : -1
    const object =
      objectIndex >= 0 ? activeClip.objects[objectIndex] : undefined

    if (!object) {
      _setMagicSidePanelItem(MagicStickyPanelClipsItem)
      return <SimpleAlert type="alert">Object not selected</SimpleAlert>
    }

    const updateObject = (_object: any) => {
      const _template = _.cloneDeep(templateRef.current)
      const _clip = _template.clips[
        activeClipIndex
      ] as GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas
      if (_clip.type !== MagicTemplateClipType.CANVAS) return
      const _objectIndex = getActiveClipObjectFromId(
        _object._id,
        _clip,
        true,
      ) as number

      _clip.objects[_objectIndex] = _object

      updateTemplate(_template) // TODO: Optimize this to update only object property rather than whole template
    }

    const safeUpdateObject = (_object: unknown) => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        updateObject(_object) // TODO: Optimize this to update only object property rather than whole object
      }, MagicObjectPropertyUpdateDelay)
    }

    const formSchema = getTccObjectFormSchema(object.type)

    const onLabelClick = (keyPath: string) => {
      if (!isValidFabricObjectKeyframePath(keyPath, formSchema.jsonSchema))
        return
      const newObjectKeyframesVisible = {
        ...objectKeyframesVisibleRef.current,
        [object._id]: {
          propertyPath: keyPath,
        },
      }
      dispatch(setObjectKeyframesVisible(newObjectKeyframesVisible))
    }
    return (
      <>
        {linkVariableFormData && (
          <MagicSidePanelVariables
            linkVariableFormData={linkVariableFormData}
            setLinkVariableFormData={setLinkVariableFormData}
            template={template}
            updateTemplate={updateTemplate}
          />
        )}
        <FormSchema
          schema={formSchema.jsonSchema}
          uiSchema={formSchema.uiSchema}
          formData={object}
          onChange={(e) => safeUpdateObject(e.formData)}
          transformErrors={(errors) => errors.map(transformJsonFormError)}
          formContext={{
            labelIcons: magicObjectFormSchemaLabelIcons,
            onLabelClick,
            object,
            activeClip,
            currentFrameRef,
            template,
            setLinkVariableFormData,
          }}
        ></FormSchema>
      </>
    )
  }

const transformJsonFormError = (error: AjvError): AjvError => {
  const schemaPath: string = (error as unknown as { schemaPath: string })
    .schemaPath
  const keyframeErrorSchemaPath = `#/properties/keyframes/items/dependencies/property/oneOf`
  const isKeyframeError = schemaPath.includes(keyframeErrorSchemaPath)

  if (isKeyframeError && schemaPath !== keyframeErrorSchemaPath)
    return {
      ...error,
      message: ``,
    }

  if (isKeyframeError && schemaPath === keyframeErrorSchemaPath)
    return {
      ...error,
      message: `Please enter/select correct value`,
    }

  return error
}
