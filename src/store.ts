import { configureStore } from '@reduxjs/toolkit'
import authSlice from './app/auth/authSlice'
import conversationSlice from './app/space/conversationSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    conversations: conversationSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
