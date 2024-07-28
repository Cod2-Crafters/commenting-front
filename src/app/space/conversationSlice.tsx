import axiosClient from '@/axios.config'
import { APIResponseMsg, ConversationSchemaState } from '@/schemas'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface ConversationsItemState {
  entities: ConversationSchemaState[]
  loading: string
}

const initialState: ConversationsItemState = {
  entities: [],
  loading: 'idle',
}

///////////////////

export const fetchConversations = createAsyncThunk<ConversationSchemaState[], number>('items/fetchConversations', async (ownerId) => {
  const response = await axiosClient.get<APIResponseMsg<ConversationSchemaState[]>>(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/conversations/timeline/${ownerId} `)
  // api response -> data -> common response -> data
  return response.data.data
})

const conversationSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<ConversationSchemaState[]>) => {
      state.entities = action.payload
      state.loading = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversations.pending, (state, action) => {
      //state.entities.push(action.payload);
      state.entities = action.payload
      state.loading = 'loading'
    }),
      builder.addCase(fetchConversations.fulfilled, (state, action: PayloadAction<ConversationSchemaState[]>) => {
        //state.entities.push(action.payload);
        state.entities = action.payload
        state.loading = 'successed'
      })
  },
})

export const { setConversations } = conversationSlice.actions

export default conversationSlice.reducer
