'use client'
import { useAuthStore } from '@/store/useAuthStore'
import { button, link } from '@/styles/customStyle'
import { cn } from '@/utils/cn'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function HeaderAuthControls() {
  const { accessToken, clearAccessToken } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    clearAccessToken()
    router.push('/')
  }

  const actions = accessToken
    ? [
        { label: '마이페이지', href: '/user', className: link() },
        {
          label: '로그아웃',
          href: '/',
          className: button(),
          onClick: handleLogout,
        },
      ]
    : [
        { label: '로그인', href: '/login', className: link() },
        { label: '회원가입', href: 'signup', className: button() },
      ]

  return (
    <div className={cn('space-x-4')}>
      {actions.map((act, idx) => (
        <Link
          key={idx}
          href={act.href}
          className={act.className}
          onClick={act.onClick || undefined}
        >
          {act.label}
        </Link>
      ))}
    </div>
  )
}

export default HeaderAuthControls
