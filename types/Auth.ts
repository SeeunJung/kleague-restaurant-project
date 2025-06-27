export interface SignupForm {
  name: string
  nickname: string
  email: string
  password: string
  confirmPw: string
  phoneNumber: string
  favoriteTeam: string
}

export interface LoginForm {
  email: string
  password: string
}

export interface User {
  id: number
  username: string
  nickname: string
  email: string
  phoneNumber: string
  favoriteTeam: string
  createdAt: string
  updatedAt: string
}
