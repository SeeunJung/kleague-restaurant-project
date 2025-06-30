'use client'
import AuthButtons from '@/components/Auth/AuthButtons'
import AuthInput from '@/components/Auth/AuthInput'
import AuthTitle from '@/components/Auth/AuthTitle'
import Modal from '@/components/common/Modal'
import { login } from '@/services/auth'
import { useAuthStore } from '@/store/useAuthStore'
import {
  authButtonLink,
  Card,
  flexCol,
  flexColICenter,
  flexColIJCenter,
  mainTitle,
} from '@/styles/customStyle'
import { LoginForm } from '@/types/Auth'
import { AxiosErrorRes } from '@/types/Axios'
import { ModalType } from '@/types/Modal'
import { cn } from '@/utils/cn'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  })

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<ModalType>({
    isError: false,
    title: '',
    description: '',
    onBtnClick: () => {},
  })

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
      setModalContent({
        isError: false,
        title: '로그인 성공',
        description: '메인페이지로 이동합니다.',
        onBtnClick: () => {
          setModalOpen(false)
          router.push('/')
        },
      })
    } catch (e: unknown) {
      const err = e as AxiosErrorRes
      setModalContent({
        isError: true,
        title: '로그인 실패',
        description:
          err?.response?.data?.message ||
          '로그인 도중 오류가 발생했습니다.',
      })
    } finally {
      setModalOpen(true)
    }
  }

  return (
    <div className={cn('mt-9')}>
      <AuthTitle subT="로그인하여 더 많은 기능을 이용하세요" />
      <div
        className={Card(
          'w-[350px]',
          'mx-auto',
          'space-y-4',
          flexColICenter(),
        )}
      >
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
        </div>
        <Link
          href="/resetpw"
          className={authButtonLink()}
        >
          비밀번호를 잊으셨나요?
        </Link>
        <AuthButtons
          mode="login"
          isDisabled={!isFormValid}
          onButtonClick={handleLogin}
        />
      </div>
      <Modal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        contents={modalContent}
      />
    </div>
  )
}

export default LoginPage
