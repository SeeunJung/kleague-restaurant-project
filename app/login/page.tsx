'use client'
import AuthButtons from '@/components/Auth/AuthButtons'
import AuthInput from '@/components/Auth/AuthInput'
import AuthTitle from '@/components/Auth/AuthTitle'
import {
  Card,
  flexCol,
  flexColIJCenter,
  mainTitle,
} from '@/styles/customStyle'
import { LoginForm } from '@/types/Auth'
import { cn } from '@/utils/cn'
import { useState } from 'react'

function Page() {
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  })

  console.log(form)

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const isFormValid = Object.values(form).every(
    (v) => v.trim() !== '',
  )

  return (
    <div className={cn('mt-9')}>
      <AuthTitle subT="로그인하여 더 많은 기능을 이용하세요" />
      <div className={Card('w-[350px]', 'mx-auto', 'space-y-5')}>
        <span className={flexColIJCenter(mainTitle())}>로그인</span>
        <div className={flexCol('w-full', 'gap-3')}>
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
        </div>
        <AuthButtons
          isLogin={true}
          isDisabled={!isFormValid}
          onButtonClick={() => {}}
        />
      </div>
    </div>
  )
}

export default Page
