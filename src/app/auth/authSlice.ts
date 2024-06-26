import { PayloadAction, createSlice } from "@reduxjs/toolkit";



interface AuthState {
  user: {email:string} | null;
  token: string | null;
}

const initialState : AuthState = {
  user : null,
  token: null
}

const authSlice = createSlice({
  name : 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{user : {email:string}; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token; 
    },
    clearCredentials : (state) => {
      state.user = null;
      state.token = null;
    } 
  }
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;