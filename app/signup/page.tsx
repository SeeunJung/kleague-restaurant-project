'use client'
import AuthButtons from '@/components/Auth/AuthButtons'
import AuthInput from '@/components/Auth/AuthInput'
import AuthTitle from '@/components/Auth/AuthTitle'
import { KLEAGUE_TEAMS } from '@/constants'
import {
  Card,
  flexCol,
  flexColIJCenter,
  mainTitle,
} from '@/styles/customStyle'
import { SignupForm } from '@/types/Auth'
import { cn } from '@/utils/cn'
import { useState } from 'react'

function Page() {
  const [form, setForm] = useState<SignupForm>({
    name: '',
    email: '',
    password: '',
    confirmPw: '',
    phoneNumber: '',
    favoriteTeam: '',
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const isFormValid = Object.values(form).every(
    (v) => v.trim() !== '',
  )

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
        </div>
        <AuthButtons
          onButtonClick={() => {}}
          isDisabled={!isFormValid}
        />
      </div>
    </div>
  )
}

export default Page
