import axiosClient from '@/axios.config'
import {
  APIResponseMsg,
  ConversationAnswerModifySchemaState,
  ConversationAnswerWriteSchemaState,
  ConversationQuestionLikeItResponse,
  ConversationQuestionLikeItSchemaState,
  ConversationQuestionModifySchemaState,
  ConversationQuestionThankedSchemaResponse,
  ConversationQuestionThankedSchemaState,
  ConversationQuestionWriteSchemaState,
  ConversationSchemaState,
} from '@/schemas'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/store'

export interface ConversationsItemState {
  entities: ConversationSchemaState[]
  loading: string
}

const initialState: ConversationsItemState = {
  entities: [],
  loading: 'idle',
}


export const fetchConversationsByMstId = createAsyncThunk<ConversationSchemaState[], number>('items/fetchConversationsByMstId', async (mstId, { getState, rejectWithValue }) => {
  const state = getState() as RootState
  try {
    const response = await axiosClient.get<APIResponseMsg<ConversationSchemaState[]>>(`/api/conversations/details/${mstId} `, {
      headers: {
        Authorization: `Bearer ${state.auth.token}`,
      },
    })
    return response.data.data
  } catch (error) {
    return rejectWithValue(error.response?.data || 'An error occurred')
  }
})



export const fetchQuestionConversation = createAsyncThunk<ConversationSchemaState, number>('items/fetchQuestionConversation', async (conId, { getState, rejectWithValue }) => {
  try {
    const response = await axiosClient.get<APIResponseMsg<ConversationSchemaState>>(`/api/conversations/question/${conId} `, {
    })
    return response.data.data
  } catch (error) {
    return rejectWithValue(error.response?.data || 'An error occurred')
  }
})


export const fetchConversations = createAsyncThunk<ConversationSchemaState[], number>('items/fetchConversations', async (ownerId, { getState, rejectWithValue }) => {
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

export const createQuestion = createAsyncThunk<APIResponseMsg<ConversationSchemaState[]>, ConversationQuestionWriteSchemaState>('items/createQuestion', async (formData, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState
    const response = await axiosClient.post<APIResponseMsg<ConversationSchemaState[]>>(
      `/api/conversations/question`,
      { ...formData },
      {
        headers: {
          Authorization: `Bearer ${state.auth.token || ''}`,
        },
      },
    )
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data || 'An error occurred')
  }
})

export const modifyQuestion = createAsyncThunk<APIResponseMsg<ConversationSchemaState>, ConversationQuestionModifySchemaState>('items/modifyQuestion', async (formData, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState
    const response = await axiosClient.put<APIResponseMsg<ConversationSchemaState>>(
      `/api/conversations/question/update`,
      { ...formData, conversationId: formData.conId },
      {
        headers: {
          Authorization: `Bearer ${state.auth.token || ''}`,
        },
      },
    )
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data || 'An error occurred')
  }
})

export const createAnswer = createAsyncThunk<APIResponseMsg<ConversationSchemaState>, ConversationAnswerWriteSchemaState>('items/createAnswer', async (formData, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState
    const response = await axiosClient.post<APIResponseMsg<ConversationSchemaState>>(
      `/api/conversations/answer`,
      { ...formData },
      {
        headers: {
          Authorization: `Bearer ${state.auth.token || ''}`,
        },
      },
    )
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data || 'An error occurred')
  }
})

export const modifyAnswer = createAsyncThunk<APIResponseMsg<ConversationSchemaState>, ConversationAnswerModifySchemaState>('items/modifyAnswer', async (formData, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState
    const response = await axiosClient.put<APIResponseMsg<ConversationSchemaState>>(
      `/api/conversations/answer/update`,
      { ...formData },
      {
        headers: {
          Authorization: `Bearer ${state.auth.token || ''}`,
        },
      },
    )
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data || 'An error occurred')
  }
})

export const toggleQuestionLikeIt = createAsyncThunk<APIResponseMsg<ConversationQuestionLikeItResponse>, ConversationQuestionLikeItSchemaState>('items/toggleQuestionLikeIt', async (formData, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState
    const response = await axiosClient.post<APIResponseMsg<ConversationQuestionLikeItResponse>>(
      `/api/recommends/likes`,
      { ...formData },
      {
        headers: {
          Authorization: `Bearer ${state.auth.token || ''}`,
        },
      },
    )
    return { ...response.data, data: { ...response.data.data, conId: formData.conId } }
  } catch (error) {
    return rejectWithValue(error.response?.data || 'An error occurred')
  }
})

export const toggleQuestionThanked = createAsyncThunk<APIResponseMsg<ConversationQuestionThankedSchemaResponse>, ConversationQuestionThankedSchemaState>('items/toggleQuestionThanked', async (formData, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState
    const response = await axiosClient.post<APIResponseMsg<ConversationQuestionThankedSchemaResponse>>(
      `/api/recommends/thanked`,
      { ...formData },
      {
        headers: {
          Authorization: `Bearer ${state.auth.token || ''}`,
        },
      },
    )
    return { ...response.data, data: { ...response.data.data, conId: formData.conId } }
  } catch (error) {
    return rejectWithValue(error.response?.data || 'An error occurred')
  }
})

export const deleteQuestion = createAsyncThunk<APIResponseMsg<number>, number>('items/deleteQuestion', async (masterId, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState
    const response = await axiosClient.delete(`/api/conversations/question/${masterId}`, {
      headers: {
        Authorization: `Bearer ${state.auth.token || ''}`,
      }
    })
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
      state.entities = action.payload;
      state.loading = 'successed';
    },
    appendConversation: (state, action: PayloadAction<ConversationSchemaState[]>) => {
      state.entities = [...state.entities, ...action.payload];
      state.loading = 'successed';
    },

    clearConversation: (state, action: PayloadAction<ConversationSchemaState[]>) => {
      state.entities = [];
      state.loading = 'idle';
    },
  },
  extraReducers: (builder) => {
    // 좋아요 추가 및 제거
    builder.addCase(toggleQuestionLikeIt.fulfilled, (state, action) => {
      state.entities = state.entities.map((conversation) => {
        return action.payload.data.conId === conversation.conId ? { ...conversation, isGood: !conversation.isGood } : conversation
      })
      state.loading = 'successed'
    }),
      // 고마와요 추가 및 제거
      builder.addCase(toggleQuestionThanked.fulfilled, (state, action) => {
        state.entities = state.entities.map((conversation) => {
          return action.payload.data.conId === conversation.conId ? { ...conversation, isThanked: !conversation.isThanked } : conversation
        })
        state.loading = 'successed'
      }),
      // 질문 작성
      builder.addCase(createQuestion.fulfilled, (state, action) => {
        const maxMasterId = state.entities?.at(0)?.mstId || 0
        state.entities = action.payload.data.filter((conversation) => maxMasterId < conversation.mstId).concat(state.entities)
        state.loading = 'successed'
      }),
      // 질문 수정
      builder.addCase(modifyQuestion.fulfilled, (state, action) => {
        state.entities = state.entities.map((entity) => {
          if (entity.conId === action.payload.data.conId) {
            // console.log('!!modifyQuestion-fullfilled:', JSON.stringify({...entity, ...action.payload.data}))
            return {...entity, ...action.payload.data} // 기본값 + 새로 반영된 값 덮어쓰기 (이미지 데이터 수정 보완)
          }
          return entity
        })
        state.loading = 'successed'
      }),
      // 답변 작성
      builder.addCase(createAnswer.fulfilled, (state, action) => {
        const addIndex = state.entities.findLastIndex((item) => item.mstId === action.payload.data.mstId) + 1

        state.entities.splice(addIndex, 0, action.payload.data)
        state.loading = 'successed'
      }),
      // 질문 수정
      builder.addCase(modifyAnswer.fulfilled, (state, action) => {
        state.entities = state.entities.map((entity) => {
          if (entity.conId === action.payload.data.conId) {
            return action.payload.data
          }
          return entity
          state.loading = 'successed'
        })
      }),
      // 질문 삭제
      builder.addCase(deleteQuestion.fulfilled, (state: ConversationsItemState, action: PayloadAction<APIResponseMsg<number>>) => {
        const paramDeleteMstId = action.payload.data
        state.entities = state.entities.filter((conversation) => conversation.mstId !== paramDeleteMstId)
        state.loading = 'successed'
      }),
      // 받은 질문 가져오기 (로딩)
      builder.addCase(fetchConversations.pending, (state, action) => {
        state.entities = action.payload
        state.loading = 'loading'
      }),
      // 받은 질문 가져오기 (완료)
      builder.addCase(fetchConversations.fulfilled, (state, action: PayloadAction<ConversationSchemaState[]>) => {
        state.entities = action.payload
        state.loading = 'successed'
      })
  },
})

export const { setConversations, appendConversation, clearConversation } = conversationSlice.actions

export default conversationSlice.reducer
