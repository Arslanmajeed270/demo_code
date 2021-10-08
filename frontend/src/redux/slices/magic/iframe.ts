import { DEFAULT_IFRAME_MAGIC_OPTIONS } from '@constants/magic'
import { GqlDevProjectPublic_devProjectPublic } from '@lib/gqlTypes/asp/__generated__/GqlDevProjectPublic'
import { createSlice } from '@reduxjs/toolkit'
import { IMagicIframeOptions } from 'pages/iframe/magic'

export interface IMagicIframeState {
  enabled: boolean
  iframeOptions: IMagicIframeOptions
  devProjectPublic?: GqlDevProjectPublic_devProjectPublic
}

const initialState: IMagicIframeState = {
  enabled: false,
  iframeOptions: DEFAULT_IFRAME_MAGIC_OPTIONS,
  devProjectPublic: null,
}

const magicIframeSlice = createSlice({
  name: `magicIframe`,
  initialState,
  reducers: {
    setIframeEnabled: (state, { payload }: { payload: boolean }) => {
      state.enabled = payload
    },
    setIframeOptions: (
      state,
      { payload }: { payload: IMagicIframeOptions },
    ) => {
      state.iframeOptions = payload
    },
    setIframeDevProjectPublic: (
      state,
      { payload }: { payload: GqlDevProjectPublic_devProjectPublic },
    ) => {
      state.devProjectPublic = payload
    },
  },
})

export const { setIframeEnabled, setIframeOptions, setIframeDevProjectPublic } =
  magicIframeSlice.actions

export const magicIframe = magicIframeSlice.reducer
