import * as z from 'zod'

//======================================== login /register ========================================//
export const LoginSchema = z.object({
  // id: z.string().min(1, {
  //   message: '아이디를 입력하세요',
  // }),
  email: z.string().email({
    message: '이메일을 입력하세요',
  }),
  password: z.string().min(1, {
    message: '비밀번호를 입력하세요',
  }),
})

export const RegisterSchema = z.object({
  id: z.string().min(1, {
    message: '아이디를 입력하세요',
  }),
  email: z.string().email('유효한 이메일을 입력해주세요'),
  // emailAuth: z.string().min(1, {
  //   message: '인증번호를 입력하세요',
  // }),
  password: z
    .string()
    // .min(10, '비밀번호는 최소 10자 이상이어야 합니다')
    .max(16, '비밀번호는 최대 16자까지 입력할 수 있습니다'),
  passwordConfirm: z
    .string()
    // .min(10, '비밀번호는 최소 10자 이상이어야 합니다')
    .max(16, '비밀번호는 최대 16자까지 입력할 수 있습니다'),
  name: z.string(),
})

//======================================== login /register end ========================================//

export const ProfileSchema = z.object({
  email: z.string().email('이메일은 필수사항입니다'),
  nickname: z
    .string({
      message: '닉네임을 입력하세요!',
    })
    .min(1, { message: '닉네임을 입력하세요!' }),
  introduce: z.string().optional().nullish(),
  link1: z.string().optional().nullish(),
  link2: z.string().optional().nullish(),
  link3: z.string().optional().nullish(),
  avatarPath: z.string().optional().nullish(),
  answerCnt: z.number().optional().nullish(),
  likesCnt: z.number().optional().nullish(),
})


export interface LoginResponse {
  id: string;
  email: string;
  token: string;
  avatarPath: string | null 
}

//======================================== profile ========================================//
export type ProfileSchemaState = z.infer<typeof ProfileSchema>

//  index.ts export type ?
export interface ProfileResponseState {
  data: ProfileSchemaState
  status: string
}

//======================================== profile end ========================================//

//======================================== common ========================================//
export interface APIResponseMsg<T> {
  status: string
  message: string
  data: T
  errorlog?: string
}

//======================================== common end ========================================//

//======================================== timeline, conversations ========================================//
export const ConversationSchema = z.object({
  content: z.string(),
  ownerId: z.number(),
  avatarPath: z.string(),
  isGood: z.boolean(),
  isPrivate: z.boolean(),
  isThanked: z.boolean(),
  guestId: z.number(),
  conId: z.number(),
  isQuestion: z.boolean(),
  mstId: z.number(),
  modifiedAt: z.date(),
  nickname: z.string().nullish(),
  writerId: z.number()
})

export type ConversationSchemaState = z.infer<typeof ConversationSchema>
export interface PagerConversationsState {
  conversations: ConversationSchemaState[]
  lastPage: boolean
}

//======================================== timeline, conversations end ========================================//

//======================================== conversations question write/modify (create) ========================================//
export const ConversationQuestionWriteSchema = z.object({
  content: z.string().min(2, { message: '2글자 이상 입력하세요' }),
  ownerId: z.number(),
  guestId: z.number(),
  maxMstId: z.number().default(0),
  isPrivate: z.boolean().default(false),
  
})

export const ConversationQuestionModifySchema = z.object({
  conId: z.number(),
  content: z.string().min(2, { message: '2글자 이상 입력하세요' }),
  isQuestion: z.boolean(),
  isPrivate: z.boolean().default(false),
})

export type ConversationQuestionModifySchemaState = z.infer<typeof ConversationQuestionModifySchema>
export type ConversationQuestionWriteSchemaState = z.infer<typeof ConversationQuestionWriteSchema>

//======================================== conversations question write (create) end ========================================//

//======================================== conversations answer write (create) ========================================//
export const ConversationAnswerWriteSchema = z.object({
  content: z.string().min(2, { message: '2글자 이상 입력하세요' }),
  ownerId: z.number(),
  guestId: z.number(),
  mstId: z.number().default(0),
})

export type ConversationAnswerWriteSchemaState = z.infer<typeof ConversationAnswerWriteSchema>

//======================================== conversations answer write (create) end ========================================//

//======================================== conversations answer modify ========================================//
export const ConversationAnswerModifySchema = z.object({
  ownerId: z.number(),
  guestId: z.number(),
  content: z.string().min(2, { message: '2글자 이상 입력하세요' }),
  conId: z.number(),
  isQuestion: z.boolean(),
  isPrivate: z.boolean().default(false),
})

export type ConversationAnswerModifySchemaState = z.infer<typeof ConversationAnswerModifySchema>

//======================================== conversations answer modify end ========================================//

export interface ConversationQuestionLikeItResponse {
  success: boolean
  action: string
  conId?: number
}

export type ConversationQuestionThankedSchemaResponse = ConversationQuestionLikeItResponse

//======================================== answer heart (like question) ========================================//

export const ConversationQuestionLikeItSchema = z.object({
  conId: z.number(),
  userId: z.number()
})

export type ConversationQuestionLikeItSchemaState = z.infer<typeof ConversationQuestionLikeItSchema>

//======================================== answer heart (like question) end ========================================//

//======================================== question thanked ========================================//

export type ConversationQuestionThankedSchemaState = ConversationQuestionLikeItSchemaState

//======================================== question thanked end ========================================//

export function isConversationSchemaState(arg: any): arg is ConversationSchemaState {
  return arg !== undefined
}



//======================================== likeit questions start ========================================//

export interface LikesQuestionItem {
  createAt: Date;
  content: string;
  ownerNickName: string;
  guestNickname: string;
  mstId: number;
  guestId: number;
  ownerId: number;
}
//export type LikesQuestionItem = Omit<ConversationSchemaState, 'avatarPath' | 'isPrivate' | 'modifiedAt'> & {email: string}

//======================================== likeit questions end ========================================//

export interface StatisticInfo {
  goodQuestionCount: number, // 받은 좋은 질문
  receivedQuestionCount: number, // 받은 질문
  sentQuestionCount: number, // 보낸 질문
  answerCount: number, // 작성한 답변
  unansweredQuestionCount: number, // 미답변 질문
  answerRate: number,
  questionedUsers: Array<{
    avatarPath: string,
    memberId: number
  }>
}