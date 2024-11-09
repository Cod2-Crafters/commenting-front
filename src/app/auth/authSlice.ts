import { RootState } from '@/store'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { stat } from 'fs'
import { nullable } from 'zod'

interface AuthState {
  user: {userid: string, email:string, avatarPath:string } | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{user : {userid: string, email:string, avatarPath:string }; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token; 
    },
    clearCredentials: (state) => {
      state.user = null
      state.token = null
    },
  },
})

export const selectUserId = (state: RootState) => state.auth.user.userid

export const { setCredentials, clearCredentials } = authSlice.actions

export default authSlice.reducer
