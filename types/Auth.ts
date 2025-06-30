export type SignupForm = {
  name: string
  nickname: string
  email: string
  password: string
  confirmPw: string
  phoneNumber: string
  favoriteTeam: string
}

export type LoginForm = {
  email: string
  password: string
}

export type User = {
  id: number
  username: string
  nickname: string
  email: string
  phoneNumber: string
  favoriteTeam: string
  createdAt: string
  updatedAt: string
}
