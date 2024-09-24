/**
 * Bot Plugins Slice
 * this file is used to manage the bot plugins
 */

import { PluginData } from '@/type/plugin'
import { createSlice } from '@reduxjs/toolkit'

const initState: PluginData[] = []
const pluginsSlice = createSlice({
  name: 'plugins',
  initialState: initState,
  reducers: {
    setPlugins(state, action: { payload: PluginData[] }) {
      return action.payload
    },
    addPlugin(state, action: { payload: PluginData }) {
      state.push(action.payload)
    },
    clearPlugins(state) {
      return []
    },
    updatePluginData(state, action: { payload: PluginData }) {
      const index = state.findIndex(
        plugin =>
          plugin.name === action.payload.name &&
          plugin.version === action.payload.version &&
          plugin.author === action.payload.author &&
          plugin.directory === action.payload.directory
      )
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    removePlugin(state, action: { payload: PluginData }) {
      const index = state.findIndex(plugin => plugin.name === action.payload.name)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }
  }
})

export const { setPlugins, addPlugin, removePlugin, clearPlugins, updatePluginData } =
  pluginsSlice.actions
export default pluginsSlice.reducer
