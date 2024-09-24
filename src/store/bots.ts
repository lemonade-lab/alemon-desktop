/**
 * Bots Slice
 * this file is used to manage the bot state(data)
 */
import { BotData, NewBotData } from '@/type/bot'
import { PluginData } from '@/type/plugin'
import { createSlice } from '@reduxjs/toolkit'

const initState: BotData[] = []
const botsSlice = createSlice({
  name: 'bots',
  initialState: initState,
  reducers: {
    addBot(state, action: { payload: NewBotData }) {
      const botData = action.payload
      const id = state.length ? state[state.length - 1].id + 1 : 0
      const bot = {
        id,
        name: botData.name,
        login: botData.login
      }
      state.push(bot)
    },
    setBotRunning(state, action: { payload: number }) {
      const id = action.payload
      const index = state.findIndex(item => item.id === id)
      if (index === -1) {
        throw new Error('bot not found')
      }
      state[index].running = true
    },
    setBotRunningAll(state, action: { payload: number[] }) {
      const ids = action.payload
      state.forEach(item => {
        if (ids.includes(item.id)) {
          item.running = true
        } else {
          item.running = false
        }
      })
    },
    setBotStop(state, action: { payload: number }) {
      const id = action.payload
      const index = state.findIndex(item => item.id === id)
      if (index === -1) {
        throw new Error('bot not found')
      }
      state[index].running = false
    },
    setAllBotStop(state) {
      state.forEach(item => {
        item.running = false
      })
    },
    removeBot(state, action: { payload: number }) {
      const id = action.payload
      const index = state.findIndex(item => item.id === id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    updateBot(state, action: { payload: BotData }) {
      const bot = action.payload
      const index = state.findIndex(item => item.id === bot.id)
      if (index !== -1) {
        const plugins = state[index].plugins
        state[index] = bot
        state[index].plugins = plugins
      }
    },

    setPlugins(state, action: { payload: { id: number; plugins: PluginData[] } }) {
      const { id, plugins } = action.payload
      const index = state.findIndex(item => item.id === id)
      if (index !== -1) {
        state[index].plugins = plugins
      }
    },

    removeInvalidPlugins(state, action: { payload: { id: number; plugins: PluginData[] } }) {
      const { id, plugins } = action.payload
      const index = state.findIndex(item => item.id === id)
      if (index !== -1) {
        state[index].plugins = state[index]?.plugins?.filter((plugin: PluginData) => {
          return plugins.find((p: PluginData) => p.name === plugin.name && p.entry === plugin.entry)
        })
      }
    }
  }
})

export const {
  addBot,
  removeBot,
  updateBot,
  setBotRunning,
  setBotRunningAll,
  setBotStop,
  setAllBotStop,
  setPlugins,
  removeInvalidPlugins
} = botsSlice.actions
export default botsSlice.reducer
