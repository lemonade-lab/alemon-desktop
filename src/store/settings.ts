/**
 * App Settings Slice
 * this file is used to manage the app settings
 */

import { Settings } from '@/type/settings'
import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

export const initState: Settings = {
  app: {
    autoLaunch: false,
    autoCheckUpdate: true,
    closeToTray: 1,
    theme: 'auto',
    database: {
      redis: {
        enable: false
      },
      mysql: {
        enable: false
      }
    }
  },
  plugins: {
    directory: ''
  }
}
const settingsSlice = createSlice({
  name: 'settings',
  initialState: initState,
  reducers: {
    setSettings(state, action: { payload: Settings }) {
      let config = _.merge(_.cloneDeep(initState), _.cloneDeep(state))
      config = _.merge(_.cloneDeep(config), _.cloneDeep(action.payload))
      return config
    },
    resetAll(state) {
      return initState
    }
  }
})

export const { setSettings, resetAll } = settingsSlice.actions
export default settingsSlice.reducer
