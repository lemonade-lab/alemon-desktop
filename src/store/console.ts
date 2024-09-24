/**
 * Bot Console Slice
 * this file is used to manage the bot console
 */

import { createSlice } from '@reduxjs/toolkit'
export interface ConsoleState {
  id: number
  console: string[]
}
export interface AConsoleState {
  id: number
  console: string
}
const initState: ConsoleState[] = []
const consoleSlice = createSlice({
  name: 'console',
  initialState: initState,
  reducers: {
    addLine(state, action: { payload: AConsoleState }) {
      const { id, console } = action.payload
      const index = state.findIndex(item => item.id === id)
      if (index === -1) {
        state.push({
          id,
          console: [console]
        })
      } else {
        state[index].console.push(console)
        // 如果超过了200行，保留最后150行
        if (state[index].console.length > 200) {
          state[index].console.splice(0, state[index].console.length - 150)
        }
      }
    },
    removeConsole(state, action: { payload: { id: number } }) {
      const { id } = action.payload
      const index = state.findIndex(item => item.id === id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    clearConsole(state) {
      state.splice(0, state.length)
    },
    clearConsoleID(state, action: { payload: { id: number } }) {
      const { id } = action.payload
      const index = state.findIndex(item => item.id === id)
      if (index !== -1) {
        state[index].console.splice(0, state[index].console.length)
      }
    }
  }
})

export const { addLine, removeConsole, clearConsole, clearConsoleID } = consoleSlice.actions
export default consoleSlice.reducer
