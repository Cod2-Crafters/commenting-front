import * as z from 'zod'

export const LoginSchema = z.object({
  id: z.string().min(1, {
    message: '아이디를 입력하세요',
  }),
  email: z.string().email({
    message: 'Email is required',
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
  emailAuth: z.string().min(1, {
    message: '인증번호를 입력하세요',
  }),
  password: z
    .string()
    .min(10, '비밀번호는 최소 10자 이상이어야 합니다')
    .max(16, '비밀번호는 최대 16자까지 입력할 수 있습니다'),
  passwordConfirm: z
    .string()
    .min(10, '비밀번호는 최소 10자 이상이어야 합니다')
    .max(16, '비밀번호는 최대 16자까지 입력할 수 있습니다'),
  name: z.string().min(1, {
    message: '이름을 입력하세요',
  }),
})
