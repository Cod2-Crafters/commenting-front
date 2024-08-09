import axiosClient from '@/axios.config'
import { APIResponseMsg, ConversationAnswerWriteSchemaState, ConversationQuestionLikeItSchemaState, ConversationQuestionWriteSchemaState, ConversationSchemaState } from '@/schemas'
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

export const fetchConversations = createAsyncThunk<ConversationSchemaState[], number>('items/fetchConversations',
  async (ownerId, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState
    const response = await axiosClient.get<APIResponseMsg<ConversationSchemaState[]>>(`/api/conversations/timeline/${ownerId} `, {
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

export const createQuestion = createAsyncThunk<APIResponseMsg<ConversationSchemaState[]>, ConversationQuestionWriteSchemaState>('items/createQuestion',
  async (formData, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState
    const response = await axiosClient.post<APIResponseMsg<ConversationSchemaState[]>>(`/api/conversations/question`, {formData}, {
      headers: {
        Authorization: `Bearer ${state.auth.token || ''}`,
      },
    })
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data || 'An error occurred')
  }
})


export const createAnswer = createAsyncThunk<APIResponseMsg<ConversationSchemaState>, ConversationAnswerWriteSchemaState>('items/createAnswer',
  async (formData, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState
    const response = await axiosClient.post<APIResponseMsg<ConversationSchemaState>>(`/api/conversations/answer`, formData, {
      headers: {
        Authorization: `Bearer ${state.auth.token || ''}`,
      },
    })
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data || 'An error occurred')
  }
  /*
{
  "mstId": 200,
  "ownerId": 5,
  "guestId": 5,
  "content": "퇴사하고싶어요",
  "maxMstId": 200
}
  */
})

export const deleteQuestion = createAsyncThunk<APIResponseMsg<number>, number>('items/deleteQuestion',
  async (masterId, { getState, rejectWithValue }) => {
  try {
    const response = await axiosClient.delete(`/api/conversations/question/${masterId}`)
    console.log(response.data)
    return response.data // extra payload
  } catch (error) {
    return rejectWithValue(error.response?.data || 'An error occurred')
  }
})

const conversationSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<ConversationSchemaState[]>) => {
      state.entities = action.payload
      state.loading = 'idle'
    },
    // 좋아요 등록 및 제거
    toggleConversationLikeIt: (state, action: PayloadAction<ConversationQuestionLikeItSchemaState>) => {
      state.entities = state.entities.map((conversation) => {
        return action.payload.conId === conversation.conId ? { ...conversation, isGood: !conversation.isGood } : conversation
      })
      state.loading = 'successed'
    },
  },
  extraReducers: (builder) => {
    // 질문 작성
    builder.addCase(createQuestion.fulfilled, (state, action) => {
      const maxMasterId = state.entities.at(0).mstId || 0
      state.entities = action.payload.data.filter((conversation) => maxMasterId < conversation.mstId).concat(state.entities)
      state.loading = 'successed'
    }),
    // 답변 작성
    builder.addCase(createAnswer.fulfilled, (state, action) => {
      const addIndex = state.entities.findLastIndex((item) => item.mstId === action.payload.data.mstId) + 1

      console.log('check1', addIndex);
      console.log('check2', state.entities);

      state.entities.splice(addIndex, 0, action.payload.data);
      state.loading = 'successed'
    }),

    // 질문 삭제
    builder.addCase(deleteQuestion.fulfilled, (state: ConversationsItemState, action: PayloadAction<APIResponseMsg<number>>) => {
      const paramDeleteMstId = action.payload.data
      state.entities = state.entities.filter((conversation) => conversation.mstId !== paramDeleteMstId)
      state.loading = 'successed'
    }),
    // 받은 질문 가져오기
      builder.addCase(fetchConversations.pending, (state, action) => {
        state.entities = action.payload
        state.loading = 'loading'
      }),
      // 받은 질문 가져오기
      builder.addCase(fetchConversations.fulfilled, (state, action: PayloadAction<ConversationSchemaState[]>) => {
        state.entities = action.payload
        state.loading = 'successed'
      })
  },
})

export const { setConversations, toggleConversationLikeIt } = conversationSlice.actions

export default conversationSlice.reducer
