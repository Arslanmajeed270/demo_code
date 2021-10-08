import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from './presistStorage'

import { rootReducer } from '@redux/reducers'

const initialState = {}

// presist the state of user after refreshing the app.
const persistConfig = {
  key: `PresistStorage`, // variable name in storage
  storage,
  whitelist: [`appReducer`], // which reducer want to store
}
// inialize the reducer
const persistReducerState = persistReducer(persistConfig, rootReducer)

const middleware = [thunk]

const store = createStore(
  persistReducerState,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

const persistor = persistStore(store)

export { store, persistor }
