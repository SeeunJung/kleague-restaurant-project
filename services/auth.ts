import axiosInstance from '@/utils/axiosInstance'

export const signup = async (
  email: string,
  password: string,
  name: string,
  nickname: string,
  phoneNumber: string,
  favoriteTeam: string,
) => {
  await axiosInstance.post('/auth/signup', {
    username: name,
    email,
    password,
    nickname,
    phoneNumber,
    favoriteTeam,
  })
}

export const login = async (email: string, password: string) => {
  const res = await axiosInstance.post('/auth/login', {
    email,
    password,
  })

  return res.data
}
