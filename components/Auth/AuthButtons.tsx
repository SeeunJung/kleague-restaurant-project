import {
  span,
  button,
  flexColIJCenter,
  authButtonLink,
} from '@/styles/customStyle'
import Link from 'next/link'

type AuthButtonsProps = {
  isLogin?: boolean
  isDisabled: boolean
  onButtonClick: (e: React.MouseEvent) => void
}

function AuthButtons({
  isLogin,
  isDisabled,
  onButtonClick,
}: AuthButtonsProps) {
  const btnLabel = isLogin ? '로그인' : '회원가입'
  const spanText = isLogin
    ? '계정이 없으신가요? '
    : '이미 계정이 있으신가요? '
  const linkLabel = isLogin ? '회원가입' : '로그인'

  return (
    <div className={flexColIJCenter('gap-4')}>
      <button
        className={button('w-full')}
        onClick={onButtonClick}
        disabled={isDisabled}
      >
        {btnLabel}
      </button>
      <div>
        <span className={span()}>{spanText}</span>
        <Link
          href={`/${isLogin ? 'signup' : 'login'}`}
          className={authButtonLink()}
        >
          {linkLabel}
        </Link>
      </div>
    </div>
  )
}

export default AuthButtons
