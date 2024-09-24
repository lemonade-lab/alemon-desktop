/**
 * Store
 * store the state(data) of the application
 * docs: https://cn.redux.js.org/
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
// Reducers
import botsReducer from './bots'
import consoleReducer from './console'
import pluginsReducer from './plugins'
import settingsReducer from './settings'
import updateReducer from './update'
import loginReducer from './login'
const reducers = combineReducers({
  bots: botsReducer,
  console: consoleReducer,
  plugins: pluginsReducer,
  settings: settingsReducer,
  update: updateReducer,
  login: loginReducer
})
const persistConfig = {
  key: 'alemon',
  storage,
  blacklist: ['update']
}
const persistedReducer = persistReducer(persistConfig, reducers)
// Store
export const store = configureStore({
  reducer: persistedReducer
})
