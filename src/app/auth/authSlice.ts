import { RootState } from '@/store'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { stat } from 'fs'
import { nullable } from 'zod'

interface AuthState {
  user: { email: string } | null
  token: string | null
  userId: number | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  userId: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: { email: string }; token: string; userId: number }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.userId = action.payload.userId
    },
    clearCredentials: (state) => {
      state.user = null
      state.token = null
      state.userId = null
    },
  },
})

export const selectUserId = (state: RootState) => state.auth.userId

export const { setCredentials, clearCredentials } = authSlice.actions

export default authSlice.reducer
