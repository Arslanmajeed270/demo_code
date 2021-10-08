import { GqlTemplate_template } from '@lib/gqlTypes/emz'
import { ObjectId } from '@lib/graphql/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IMagicTemplateState {
  activeTemplateClipId: ObjectId
  activeTemplateClipObjectId: ObjectId
  template: GqlTemplate_template | null
  // canvas states
  isEditingTextBox: boolean
}

const initialState: IMagicTemplateState = {
  activeTemplateClipId: null,
  activeTemplateClipObjectId: null,
  isEditingTextBox: false,
  template: null,
}

const sidePanelSlice = createSlice({
  name: `magicTemplate`,
  initialState,
  reducers: {
    setActiveTemplateClipId: (state, { payload }: { payload: ObjectId }) => {
      state.activeTemplateClipId = payload
    },
    setActiveTemplateClipObjectId: (
      state,
      { payload }: { payload: ObjectId },
    ) => {
      state.activeTemplateClipObjectId = payload
    },
    setIsEditingTextBox: (state, { payload }: { payload: boolean }) => {
      state.isEditingTextBox = payload
    },
    setTemplate: (
      state,
      { payload }: { payload: GqlTemplate_template | null },
    ) => {
      state.template = payload as any // TODO fix this by removed any
    },
  },
})

export const {
  setActiveTemplateClipId,
  setActiveTemplateClipObjectId,
  setIsEditingTextBox,
  setTemplate,
} = sidePanelSlice.actions

export const magicTemplate = sidePanelSlice.reducer
