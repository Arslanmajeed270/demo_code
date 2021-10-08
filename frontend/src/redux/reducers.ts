import { combineReducers } from 'redux'
import { userReducer } from '@redux/slices/user'
import { magicSidePanel } from '@redux/slices/magic/sidePanel'
import { magicTemplate } from '@redux/slices/magic/template'
import { magicTimeline } from '@redux/slices/magic/timeline'
import { magicIframe } from '@redux/slices/magic/iframe'
import { appReducer } from './slices/app'

const rootReducer = combineReducers({
  appReducer,
  userReducer,
  magicSidePanel,
  magicTemplate,
  magicTimeline,
  magicIframe,
})

export type RootState = ReturnType<typeof rootReducer>

export { rootReducer }
