/**
 * Login Slice
 * this file is used to manage the login state
 */

import { createSlice } from '@reduxjs/toolkit'
export interface LoginState {
  login: boolean
  token: string
}
const initState: LoginState = {
  login: false,
  token: ''
}
const loginSlice = createSlice({
  name: 'login',
  initialState: initState,
  reducers: {
    setToken(state, action: { payload: string }) {
      state = {
        login: true,
        token: action.payload
      }
      return state
    },
    removeToken(state) {
      state = {
        login: false,
        token: ''
      }
      return state
    }
  }
})

export const { setToken, removeToken } = loginSlice.actions
export default loginSlice.reducer
