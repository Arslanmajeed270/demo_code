import { createSlice } from '@reduxjs/toolkit'

export interface IMagicTimelineState {
  currentFrame: number
  isPlaying: boolean
  objectKeyframesVisible: {
    [x: string]: {
      propertyPath: string
    }
  }
}

const initialState: IMagicTimelineState = {
  currentFrame: 0,
  isPlaying: false,
  objectKeyframesVisible: {},
}

const magicTimelineSlice = createSlice({
  name: `magicTimeline`,
  initialState,
  reducers: {
    setCurrentFrame: (state, { payload }: { payload: number }) => {
      state.currentFrame = payload
    },
    setIsPlaying: (state, { payload }: { payload: boolean }) => {
      state.isPlaying = payload
    },
    setObjectKeyframesVisible: (
      state,
      { payload }: { payload: IMagicTimelineState[`objectKeyframesVisible`] },
    ) => {
      state.objectKeyframesVisible = payload
    },
  },
})

export const { setCurrentFrame, setIsPlaying, setObjectKeyframesVisible } =
  magicTimelineSlice.actions

export const magicTimeline = magicTimelineSlice.reducer
