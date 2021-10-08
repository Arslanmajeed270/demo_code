import {
  getPropertyPathFromRxjsId,
  ILabelIconProps,
} from '@lib/components/formSchema/components/fields/SchemaField'
import {
  GqlVideo_video_magicTemplate,
  GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas,
} from '@lib/gqlTypes/emz'
import { FabricObject } from '@lib/graphql'
import { DiamondFilledIcon } from '@public/icons/customIcons/DiamondFilledIcon'
import { DiamondIcon } from '@public/icons/customIcons/DiamondIcon'
import { roundToDecimalPlaces } from '@lib/fabric'
import _ from 'lodash'
import React from 'react'

export const KeyframeIcon: React.FC<ILabelIconProps> = (props) => {
  const { id, formContext, formData: currentValue, schema } = props
  const onChange: (formData: FabricObject) => void = formContext.onChange
  const { fps }: GqlVideo_video_magicTemplate = formContext.template
  const {
    duration,
  }: GqlTemplate_template_templateVersion_magicTemplate_clips_MagicTemplateClipCanvas =
    formContext.activeClip
  const totalFrame = fps * duration
  const object: FabricObject = formContext.object
  const propertyPath = getPropertyPathFromRxjsId(id)

  if (!propertyPath) return <></>

  const propertyKeyframes = object.keyframes
    ? object.keyframes.filter(
        (keyframe) => keyframe.propertyPath === propertyPath,
      )
    : []
  const isKeyframing = propertyKeyframes.length > 0

  const Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return isKeyframing ? (
      <DiamondFilledIcon {...props} color={`#2db52d`} />
    ) : (
      <DiamondIcon {...props} color={`orange`} />
    )
  }

  const onClick = () => {
    if (!onChange) return
    const currentFrame: number = formContext.currentFrameRef.current || 0
    const currentTime = roundToDecimalPlaces(
      (currentFrame / totalFrame) * duration,
      2,
    )
    const clonedObject = _.cloneDeep(object)
    const newKeyframe: fabric.IObjectKeyframe = {
      propertyPath: propertyPath as any,
      time: currentTime,
      value: currentValue,
      easingFunction: schema.type === `number` ? `easeLinear` : undefined,
    }

    // delete a keyframe already present at this position
    const keyframeTobeReplacedIndex =
      clonedObject.keyframes &&
      clonedObject.keyframes.findIndex(
        (keyframe) =>
          keyframe.time === currentTime &&
          keyframe.propertyPath === propertyPath,
      )
    if (keyframeTobeReplacedIndex >= 0)
      clonedObject.keyframes.splice(keyframeTobeReplacedIndex, 1)

    if (clonedObject.keyframes) {
      clonedObject.keyframes = [...clonedObject.keyframes, newKeyframe]
    } else {
      clonedObject.keyframes = [newKeyframe]
    }
    onChange(clonedObject)
  }

  return <Icon onClick={onClick} className="h-3 w-3 mt-1 cursor-pointer" />
}
