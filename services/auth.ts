import { SignupForm } from '@/types/Auth'
import axiosInstance from '@/utils/axiosInstance'

export const signup = async (payload: SignupForm) => {
  await axiosInstance.post('/auth/signup', {
    ...payload,
    username: payload.name,
  })
}

export const login = async (email: string, password: string) => {
  const res = await axiosInstance.post('/auth/login', {
    email,
    password,
  })

  return res.data
}
