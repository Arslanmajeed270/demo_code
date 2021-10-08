import React from 'react'
import { IMagicSidePanelListComponentProps } from '../..'
import { ClipLayout } from './ClipLayout'
import * as _ from 'lodash'
import { DefaultMagicTemplateBlankClip } from '@constants/magic'
import { ObjectId } from '@lib/graphql/types'
import { setActiveTemplateClipId } from '@redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import ObjectID from 'bson-objectid'
import { GqlVideo_video_magicTemplate_clips } from '@lib/gqlTypes/emz'

export const MagicSidePanelClip: React.FC<IMagicSidePanelListComponentProps> = (
  props,
) => {
  const { template, updateTemplate } = props

  const dispatch = useDispatch()
  const _setActiveTemplateClipId = (id: ObjectId) => {
    dispatch(setActiveTemplateClipId(id))
  }
  const activeTemplateClipId: ObjectId = useSelector(
    ({ magicTemplate }: RootState) => magicTemplate.activeTemplateClipId,
  )

  const getNewTemplateClip = (
    templateToClone = DefaultMagicTemplateBlankClip,
  ) => {
    return {
      ...templateToClone,
      _id: new ObjectID().toString(),
    }
  }

  const cloneTemplateClip = (index: number) => {
    template.clips.splice(
      index + 1,
      0,
      getNewTemplateClip(template.clips[index]),
    )
    updateTemplate(template)
  }

  const createNewBlankClip = (index: number) => {
    template.clips.splice(index + 1, 0, getNewTemplateClip())
    updateTemplate(template)
  }

  const removeClip = (index: number) => {
    if (template.clips.length <= 1) {
      const newClip = getNewTemplateClip()
      template.clips = [newClip]
      _setActiveTemplateClipId(newClip._id)
      return updateTemplate(template)
    }

    const currentClipTobeRemoved = template.clips[index]
    const isRemovingCurrentActiveClip =
      currentClipTobeRemoved._id === activeTemplateClipId

    if (isRemovingCurrentActiveClip) {
      const newActiveClip =
        index > 0 ? template.clips[index - 1] : template.clips[1]
      _setActiveTemplateClipId(newActiveClip._id) // Setting last clip as active
    }

    // Removing clips
    const clonedTemplate = _.cloneDeep(template)
    clonedTemplate.clips.splice(index, 1)

    updateTemplate(clonedTemplate)
  }

  return (
    <div>
      <div className="px-1 py-2 text-right">
        <span className="order-last">
          {template?.clips.length} of {template?.clips.length}
        </span>
      </div>
      <div>
        {template.clips?.map(
          (clip: GqlVideo_video_magicTemplate_clips, index: number) => {
            return (
              <ClipLayout
                key={index}
                clipNumber={index + 1}
                clip={clip}
                removeClip={() => removeClip(index)}
                cloneTemplateClip={() => cloneTemplateClip(index)}
                createNewBlankClip={() => createNewBlankClip(index)}
                setActiveTemplateClip={() => _setActiveTemplateClipId(clip._id)}
                isActive={activeTemplateClipId === clip._id}
              />
            )
          },
        )}
      </div>
    </div>
  )
}
