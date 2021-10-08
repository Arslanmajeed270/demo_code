import { createSlice } from '@reduxjs/toolkit'
import { IMagicSidePanelListItem } from '@components/Magic/MagicSidePanel'
import { MagicStickyPanelClipsItem } from '@constants/magic/magicSidePanel'
import { MediaType } from '@lib/gqlTypes/asp'

export interface IMagicSidePanelState {
  mediaType: MediaType
  overlaySidePanelWrapperClass: string //TODO: Remove this for optimizing code readability
  overlaySidePanelItem: IMagicSidePanelListItem
  stickySidePanelItem: IMagicSidePanelListItem
}

const initialState: IMagicSidePanelState = {
  mediaType: undefined,
  overlaySidePanelWrapperClass: ``,
  overlaySidePanelItem: null,
  stickySidePanelItem: MagicStickyPanelClipsItem,
}

const magicSidePanelSlice = createSlice({
  name: `magicSidePanel`,
  initialState,
  reducers: {
    setMediaType: (state, { payload }: { payload: MediaType }) => {
      state.mediaType = payload
    },
    setOverlaySidePanelWrapperClass: (
      state,
      { payload }: { payload: string },
    ) => {
      state.overlaySidePanelWrapperClass = payload
    },
    setMagicSidePanelItem: (
      state,
      { payload }: { payload: IMagicSidePanelListItem },
    ) => {
      if (!payload) state.overlaySidePanelItem = null
      if (payload && !payload.isSticky) state.overlaySidePanelItem = payload
      if (payload?.isSticky === true) state.stickySidePanelItem = payload
    },
    unsetMediaType: (state) => {
      state.mediaType = undefined
    },
  },
})

export const {
  setMagicSidePanelItem,
  setMediaType,
  unsetMediaType,
  setOverlaySidePanelWrapperClass,
} = magicSidePanelSlice.actions

export const magicSidePanel = magicSidePanelSlice.reducer
