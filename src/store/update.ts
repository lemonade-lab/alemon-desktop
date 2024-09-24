/**
 * App Update Slice
 * this file is used to manage the app update state
 */

import { createSlice } from '@reduxjs/toolkit'
export interface UpdateState {
  updating: boolean
  checking: boolean
}
const initState: UpdateState = {
  updating: false,
  checking: false
}
const updateSlice = createSlice({
  name: 'update',
  initialState: initState,
  reducers: {
    setState(_, action: { payload: UpdateState }) {
      return action.payload
    },
    setUpdateState(state, action: { payload: boolean }) {
      state.updating = action.payload
    },
    setCheckingState(state, action: { payload: boolean }) {
      state.checking = action.payload
    }
  }
})

export const { setState, setCheckingState, setUpdateState } = updateSlice.actions
export default updateSlice.reducer
