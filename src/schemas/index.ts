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
  emailAuth: z.string(),
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
  avatarPath: z.string().optional(),
})

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
  guestId: z.number(),
  conId: z.number(),
  isQuestion: z.boolean(),
  mstId: z.number(),
  modifiedAt: z.date(),
})

export type ConversationSchemaState = z.infer<typeof ConversationSchema>

//======================================== timeline, conversations end ========================================//

//======================================== conversations question write (create) ========================================//
export const ConversationQuestionWriteSchema = z.object({
  content: z.string().min(2, { message: '2글자 이상 입력하세요' }),
  ownerId: z.number(),
  guestId: z.number(),
  mstId: z.number().optional().default(0),
})

export type ConversationQuestionWriteSchemaState = z.infer<typeof ConversationQuestionWriteSchema>

//======================================== conversations question write (create) end ========================================//


export interface ConversationQuestionLikeItResponse {
  success: boolean
  action: string
}

//======================================== question heart (like question) ========================================//

export const ConversationQuestionLikeItSchema = z.object({
conId: z.number(),
userId: z.number(),
})


export type ConversationQuestionLikeItSchemaState = z.infer<typeof ConversationQuestionLikeItSchema>

//======================================== question heart (like question) end ========================================//
