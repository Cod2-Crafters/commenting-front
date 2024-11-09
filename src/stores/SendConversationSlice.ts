import axiosClient from "@/axios.config";
import { APIResponseMsg, ConversationSchemaState } from "@/schemas";
import { RootState } from "@/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SendConversationsItemState {
    entities: ConversationSchemaState[]
    loading: string
  }
  
  const initialState: SendConversationsItemState = {
    entities: [],
    loading: 'idle',
  }

  export const fetchSendConversations = createAsyncThunk<ConversationSchemaState[], number>('items/fetchSendConversations', async (ownerId, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const response = await axiosClient.get<APIResponseMsg<ConversationSchemaState[]>>(`/api/conversations/send-question/${ownerId} `, {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      })
      // api response -> data -> common response -> data
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred')
    }
  })

const SendConversationSlice= createSlice({
    name: "SendConversationSlice",
    initialState: initialState,
    reducers: {
        appendConversation: (state, action: PayloadAction<ConversationSchemaState[]>) => {
            state.entities = [...state.entities, ...action.payload]
            state.loading = 'idle'
          },
          

        // invalidate: (state, { payload }) => {
        //     payload.forEach(item => {
        //         state[item] = false
        //     })
        // }
    },
    // extraReducers: builder => builder
    //     .addCase(actionName.pending, (state, { payload }) => {
    //         state.loading = true
    //     })
    //     .addCase(actionName.fulfilled, (state, { payload }) => {
    //         state.loading = false
    //     })
    //     .addCase(actionName.rejected, (state, { payload }) => {
    //         state.loading = false
    //         state.error = payload
    //     })
       
})

export const { appendConversation } = SendConversationSlice.actions
export default SendConversationSlice.reducer