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
