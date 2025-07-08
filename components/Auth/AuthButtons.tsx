import {
  span,
  button,
  flexColIJCenter,
  authButtonLink,
} from '@/styles/customStyle'
import Link from 'next/link'

type AuthButtonsProps = {
  mode: 'login' | 'signup' | 'reset'
  isDisabled: boolean
}

function AuthButtons({ mode, isDisabled }: AuthButtonsProps) {
  const btnLabel = {
    login: '로그인',
    signup: '회원가입',
    reset: '비밀번호 재설정',
  }[mode]

  const extraUI = {
    login: {
      text: '계정이 없으신가요? ',
      linkText: '회원가입',
      linkHref: '/signup',
    },
    signup: {
      text: '이미 계정이 있으신가요? ',
      linkText: '로그인',
      linkHref: '/login',
    },
    reset: {
      text: '계정이 기억나셨나요? ',
      linkText: '로그인',
      linkHref: '/login',
    },
  }[mode]

  return (
    <div className={flexColIJCenter('gap-4', 'w-full')}>
      <button
        type="submit"
        className={button('w-full')}
        disabled={isDisabled}
      >
        {btnLabel}
      </button>
      <div>
        <span className={span()}>{extraUI.text}</span>
        <Link
          href={extraUI.linkHref}
          className={authButtonLink()}
        >
          {extraUI.linkText}
        </Link>
      </div>
    </div>
  )
}

export default AuthButtons
