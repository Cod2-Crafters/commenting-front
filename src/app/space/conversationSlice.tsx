import axiosClient from '@/axios.config'
import { APIResponseMsg, ConversationQuestionLikeItSchemaState, ConversationSchemaState } from '@/schemas'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authSlice from '../auth/authSlice'
import { RootState } from '@/store'

export interface ConversationsItemState {
  entities: ConversationSchemaState[]
  loading: string
}

const initialState: ConversationsItemState = {
  entities: [],
  loading: 'idle',
}

///////////////////

export const fetchConversations = createAsyncThunk<ConversationSchemaState[], number>('items/fetchConversations', async (ownerId, { getState, rejectWithValue}) => {
  try {
    const state = getState() as RootState;
    const response = await axiosClient.get<APIResponseMsg<ConversationSchemaState[]>>(`/api/conversations/timeline/${ownerId} `, {
      headers: {
        'Authorization': `Bearer ${state.auth.token}`
      }
    })
    // api response -> data -> common response -> data
    return response.data.data
    
  } catch (error) {
    return rejectWithValue(error.response?.data || 'An error occurred');
  }
})


export const deleteQuestion = createAsyncThunk<APIResponseMsg<number>, number>('items/deleteQuestion',
  async (conId: number) => {
    const response = await axiosClient.delete(`/api/conversations/question/${conId}`);
    return response.data // extra payload
  }
);






const conversationSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<ConversationSchemaState[]>) => {
      state.entities = action.payload
      state.loading = 'idle'
    },

    toggleConversationLikeIt: (state, action: PayloadAction<ConversationQuestionLikeItSchemaState>) => {
      state.entities = state.entities.map((conversation) => {
        return action.payload.conId === conversation.conId ? {...conversation, isGood:!conversation.isGood} : conversation
      })
      state.loading = 'successed'
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteQuestion.fulfilled, (state: ConversationsItemState, action: PayloadAction<APIResponseMsg<number>>) => {
      const paramMstId = action.payload.data
      console.log('ddddddddddddddddelete:', paramMstId);
      state.entities = state.entities.filter((conversation) => conversation.mstId !== paramMstId);
      state.loading = 'successed'
    }),
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
  }
})

export const { setConversations, toggleConversationLikeIt } = conversationSlice.actions

export default conversationSlice.reducer
