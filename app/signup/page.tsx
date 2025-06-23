'use client'
import AuthButtons from '@/components/Auth/AuthButtons'
import AuthError from '@/components/Auth/AuthError'
import AuthInput from '@/components/Auth/AuthInput'
import AuthTitle from '@/components/Auth/AuthTitle'
import { KLEAGUE_TEAMS } from '@/constants'
import { signup } from '@/services/auth'
import {
  Card,
  flexCol,
  flexColIJCenter,
  mainTitle,
} from '@/styles/customStyle'
import { SignupForm } from '@/types/Auth'
import { AxiosErrorRes } from '@/types/Axios'
import { cn } from '@/utils/cn'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function Page() {
  const router = useRouter()
  const [form, setForm] = useState<SignupForm>({
    name: '',
    nickname: '',
    email: '',
    password: '',
    confirmPw: '',
    phoneNumber: '',
    favoriteTeam: '',
  })
  const [error, setError] = useState<string | null>(null)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const isFormValid = Object.values(form).every(
    (v) => v.trim() !== '',
  )

  const handleSignup = async () => {
    if (form.password !== form.confirmPw) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      await signup(
        form.email,
        form.password,
        form.name,
        form.nickname,
        form.phoneNumber,
        form.favoriteTeam,
      )

      router.push('/login')
    } catch (err: unknown) {
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response
      ) {
        const response = err as AxiosErrorRes
        setError(response.response.data.message || '로그인 실패')
      } else {
        setError('네트워크 또는 서버 에러일까나')
      }
    }
  }

  return (
    <div className={cn('mt-9')}>
      <AuthTitle subT="새로운 계정을 만들어보세요" />
      <div className={Card('w-[350px]', 'mx-auto', 'space-y-5')}>
        <span className={flexColIJCenter(mainTitle())}>회원가입</span>
        <div className={flexCol('w-full', 'gap-3')}>
          <AuthInput
            label="이름"
            name="name"
            value={form.name}
            onChange={handleInput}
          />
          <AuthInput
            label="닉네임"
            name="nickname"
            value={form.nickname}
            onChange={handleInput}
          />
          <AuthInput
            label="이메일"
            name="email"
            value={form.email}
            onChange={handleInput}
          />
          <AuthInput
            label="비밀번호"
            name="password"
            value={form.password}
            type="password"
            onChange={handleInput}
          />
          <AuthInput
            label="비밀번호 확인"
            name="confirmPw"
            value={form.confirmPw}
            type="password"
            onChange={handleInput}
          />
          <AuthInput
            label="휴대폰번호"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleInput}
          />
          <AuthInput
            label="좋아하는 구단"
            name="favoriteTeam"
            type="select"
            value={form.favoriteTeam}
            onChange={handleInput}
            options={KLEAGUE_TEAMS}
          />
          {error && <AuthError error={error} />}
        </div>
        <AuthButtons
          onButtonClick={handleSignup}
          isDisabled={!isFormValid}
        />
      </div>
    </div>
  )
}

export default Page
