'use client'
import AuthButtons from '@/components/Auth/AuthButtons'
import AuthInput from '@/components/Auth/AuthInput'
import Modal from '@/components/common/Modal'
import useForm from '@/hooks/useForm'
import useModal from '@/hooks/useModal'
import { reset } from '@/services/auth'
import { Card } from '@/styles/customStyle'
import { SignupForm } from '@/types/Auth'
import { AxiosErrorRes } from '@/types/Axios'
import { cn } from '@/utils/cn'
import { useRouter } from 'next/navigation'
import PageTitle from '@/components/common/PageTitle'

function ResetPwPage() {
  const router = useRouter()

  const { form, handleInput, isFormValid } = useForm<
    Pick<SignupForm, 'email' | 'phoneNumber' | 'password'>
  >({
    email: '',
    phoneNumber: '',
    password: '',
  })

  const { modalOpen, setModalOpen, modalContent, openModal } =
    useModal()

  const handleSubmit = async () => {
    try {
      await reset({
        ...form,
        phoneNumber: form.phoneNumber.replace(/-/g, ''),
      })

      openModal({
        isError: false,
        title: '비밀번호 변경 성공',
        description: '로그인 페이지로 이동합니다.',
        onBtnClick: () => {
          setModalOpen(false)
          router.push('/login')
        },
      })
    } catch (e: unknown) {
      const err = e as AxiosErrorRes
      openModal({
        isError: true,
        title: '비밀번호 변경 실패',
        description:
          err?.response?.data?.message ||
          '비밀번호 변경 중 오류가 발생했습니다.',
      })
    }
  }

  return (
    <div className={cn('mt-9')}>
      <PageTitle subT="비밀번호를 재설정합니다." />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        className={Card('w-[350px]', 'mx-auto', 'space-y-5')}
      >
        <AuthInput
          label="이메일"
          name="email"
          type="email"
          value={form.email}
          onChange={(val) =>
            handleInput({
              target: {
                name: 'email',
                value: val,
              },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        />
        <AuthInput
          label="휴대폰번호"
          name="phoneNumber"
          type="text"
          value={form.phoneNumber}
          onChange={(val) =>
            handleInput({
              target: {
                name: 'phoneNumber',
                value: val,
              },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        />
        <AuthInput
          label="새 비밀번호"
          name="password"
          type="password"
          value={form.password}
          onChange={(val) =>
            handleInput({
              target: {
                name: 'password',
                value: val,
              },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        />
        <AuthButtons
          mode="reset"
          isDisabled={!isFormValid}
        />
      </form>
      <Modal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        contents={modalContent}
      />
    </div>
  )
}

export default ResetPwPage
