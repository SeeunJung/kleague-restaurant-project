'use client'
import AuthButtons from '@/components/Auth/AuthButtons'
import AuthError from '@/components/Auth/AuthError'
import AuthInput from '@/components/Auth/AuthInput'
import AuthTitle from '@/components/Auth/AuthTitle'
import { login } from '@/services/auth'
import { useAuthStore } from '@/store/useAuthStore'
import {
  Card,
  flexCol,
  flexColIJCenter,
  mainTitle,
} from '@/styles/customStyle'
import { LoginForm } from '@/types/Auth'
import { AxiosErrorRes } from '@/types/Axios'
import { cn } from '@/utils/cn'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function Page() {
  const router = useRouter()
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  })
  const [error, setError] = useState<string | null>(null)
  const { setAccessToken } = useAuthStore()

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const isFormValid = Object.values(form).every(
    (v) => v.trim() !== '',
  )

  const handleLogin = async () => {
    try {
      const { accessToken } = await login(form.email, form.password)
      setAccessToken(accessToken)
      router.push('/')
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
      <AuthTitle subT="로그인하여 더 많은 기능을 이용하세요" />
      <div className={Card('w-[350px]', 'mx-auto', 'space-y-5')}>
        <span className={flexColIJCenter(mainTitle())}>로그인</span>
        <div className={flexCol('w-full', 'gap-3')}>
          <AuthInput
            label="이메일"
            name="email"
            type="email"
            value={form.email}
            onChange={handleInput}
          />
          <AuthInput
            label="비밀번호"
            name="password"
            type="password"
            value={form.password}
            onChange={handleInput}
          />
          {error && <AuthError error={error} />}
        </div>
        <AuthButtons
          isLogin={true}
          isDisabled={!isFormValid}
          onButtonClick={handleLogin}
        />
      </div>
    </div>
  )
}

export default Page
