'use server'

import bcrypt from 'bcryptjs'
import * as z from 'zod'

import { RegisterSchema } from '@/schemas'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password, name } = validateFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  return {
    success: 'User created!',
  }
}
