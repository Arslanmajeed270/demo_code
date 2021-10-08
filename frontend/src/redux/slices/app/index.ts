import { createSlice } from '@reduxjs/toolkit'

export interface IAppState {
  redirectAfterLogin: {
    pathname: string
    createdAt: Date
    used: boolean
  }
}

const initialState: IAppState = {
  redirectAfterLogin: {
    pathname: null,
    createdAt: null,
    used: true,
  },
}

const appSlice = createSlice({
  name: `app`,
  initialState,
  reducers: {
    setRedirectAfterLogin: (state, { payload }: { payload: string }) => {
      state.redirectAfterLogin = {
        pathname: payload,
        createdAt: new Date(),
        used: false,
      }
    },
    setRedirectUsedAfterLogin: (state) => {
      state.redirectAfterLogin = {
        ...state.redirectAfterLogin,
        used: true,
      }
    },
  },
})

export const { setRedirectAfterLogin, setRedirectUsedAfterLogin } =
  appSlice.actions
export const appReducer = appSlice.reducer
