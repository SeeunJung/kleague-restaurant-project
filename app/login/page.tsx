'use client'
import AuthButtons from '@/components/Auth/AuthButtons'
import AuthInput from '@/components/Auth/AuthInput'
import Modal from '@/components/common/Modal'
import useModal from '@/hooks/useModal'
import useForm from '@/hooks/useForm'
import { usePathStore } from '@/hooks/usePathStore'
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
import { cn } from '@/utils/cn'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import PageTitle from '@/components/common/PageTitle'

function LoginPage() {
  const router = useRouter()
  const getCallbackURL = (): string => {
    const prevPath = usePathStore.getState().prevPath
    if (prevPath && !prevPath.includes('/signup')) return prevPath
    return '/'
  }

  const { form, handleInput, isFormValid } = useForm<LoginForm>({
    email: '',
    password: '',
  })
  const { modalOpen, setModalOpen, modalContent, openModal } =
    useModal()

  const { loggedIn } = useAuthStore()

  const handleLogin = async () => {
    try {
      const { user, accessToken } = await login(
        form.email,
        form.password,
      )
      loggedIn(user.id, accessToken)

      const callbackURL = getCallbackURL()
      openModal({
        isError: false,
        title: '로그인 성공',
        description:
          callbackURL === '/'
            ? '메인페이지로 이동합니다.'
            : '이전 페이지로 이동합니다.',
        onBtnClick: () => {
          setModalOpen(false)
          router.push(callbackURL)
        },
      })
    } catch (e: unknown) {
      const err = e as AxiosErrorRes
      openModal({
        isError: true,
        title: '로그인 실패',
        description:
          err?.response?.data?.message ||
          '로그인 도중 오류가 발생했습니다.',
      })
    }
  }

  return (
    <div className={cn('mt-9')}>
      <PageTitle subT="로그인하여 더 많은 기능을 이용하세요" />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin()
        }}
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
            label="비밀번호"
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

export default LoginPage
