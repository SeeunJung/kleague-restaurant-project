import { SignupForm } from './types/Auth'

export const KLEAGUE_TEAMS = [
  '강원',
  '광주',
  '김천',
  '대구',
  '대전',
  '제주',
  '서울',
  '수원FC',
  '안양',
  '울산',
  '전북',
  '포항',
  '경남',
  '김포',
  '부산',
  '부천',
  '서울E',
  '성남',
  '수원',
  '안산',
  '인천',
  '전남',
  '천안',
  '충남아산',
  '충북청주',
  '화성',
]

export const K1_TEAMS = [
  '강원',
  '광주',
  '김천',
  '대구',
  '대전',
  '제주',
  '서울',
  '수원FC',
  '안양',
  '울산',
  '전북',
  '포항',
]

export const K2_TEAMS = [
  '김포',
  '부산',
  '부천',
  '서울E',
  '성남',
  '수원',
  '안산',
  '인천',
  '전남',
  '천안',
  '충남아산',
  '충북청주',
  '화성',
]

export const KLEAGUE_TYPE = [
  { value: '', label: '전체' },
  { value: 'k1', label: 'K리그 1' },
  { value: 'k2', label: 'K리그 2' },
]

export const RESTAURANT_CATEGORIES = [
  { value: '', label: '전체' },
  { value: '한식', label: '한식' },
  { value: '중식', label: '중식' },
  { value: '일식', label: '일식' },
  { value: '양식', label: '양식' },
  { value: '분식', label: '분식' },
]

export const SIGNUP_INPUT: {
  value: keyof SignupForm
  type?: string
  label: string
}[] = [
  { value: 'name', label: '이름' },
  { value: 'nickname', label: '닉네임' },
  { value: 'email', type: 'email', label: '이메일' },
  { value: 'password', type: 'password', label: '비밀번호' },
  { value: 'confirmPw', type: 'password', label: '비밀번호 확인' },
  { value: 'phoneNumber', label: '휴대폰번호' },
  { value: 'favoriteTeam', type: 'select', label: '좋아하는 구단' },
]
