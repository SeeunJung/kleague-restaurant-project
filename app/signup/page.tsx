'use client'
import AuthButtons from '@/components/Auth/AuthButtons'
import AuthInput from '@/components/Auth/AuthInput'
import AuthTitle from '@/components/Auth/AuthTitle'
import { KLEAGUE_TEAMS, SIGNUP_INPUT } from '@/constants'
import { signup } from '@/services/auth'
import {
  Card,
  flexCol,
  flexColIJCenter,
  mainTitle,
} from '@/styles/customStyle'
import { cn } from '@/utils/cn'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import validationsSchema from '@/schemas/register'
import { useState } from 'react'
import { ModalType } from '@/types/Modal'
import Modal from '@/components/common/Modal'
import { AxiosErrorRes } from '@/types/Axios'

function SignupPage() {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<ModalType>({
    isError: false,
    title: '',
    description: '',
    onBtnClick: () => {},
  })

  const {
    control,
    formState: { isValid, errors },
    getValues,
  } = useForm({
    resolver: zodResolver(validationsSchema),
    defaultValues: {
      name: '',
      nickname: '',
      email: '',
      password: '',
      confirmPw: '',
      phoneNumber: '',
      favoriteTeam: '',
    },
    mode: 'onChange',
  })

  const handleSignup = async () => {
    try {
      await signup(getValues())
      setModalContent({
        isError: false,
        title: '회원가입 성공',
        description: '로그인 페이지로 이동합니다.',
        onBtnClick: () => {
          setModalOpen(false)
          router.push('/login')
        },
      })
      setModalOpen(true)
    } catch (e: unknown) {
      const err = e as AxiosErrorRes
      setModalContent({
        isError: true,
        title: '회원가입 실패',
        description:
          err?.response?.data?.message ||
          '회원가입 도중 오류가 발생했습니다.',
      })
      setModalOpen(true)

    }
  }

  return (
    <div className={cn('mt-9')}>
      <AuthTitle subT="새로운 계정을 만들어보세요" />
      <div className={Card('w-[350px]', 'mx-auto', 'space-y-5')}>
        <span className={flexColIJCenter(mainTitle())}>회원가입</span>
        <div className={flexCol('w-full', 'gap-3')}>
          {SIGNUP_INPUT.map(({ value, type, label }) => (
            <Controller
              key={value}
              name={value}
              control={control}
              render={({ field }) => (
                <AuthInput
                  label={label}
                  name={field.name}
                  type={type}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors[value]?.message}
                  options={
                    type === 'select' ? KLEAGUE_TEAMS : undefined
                  }
                />
              )}
            />
          ))}
        </div>
        <AuthButtons
          onButtonClick={handleSignup}
          isDisabled={!isValid}
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

export default SignupPage