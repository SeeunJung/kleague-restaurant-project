import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/useAuthStore'
import { flexColIJCenter, link } from '@/styles/customStyle'
import Link from 'next/link'

type MobileSidebarProps = {
  open: boolean
}

function MobileSidebar({ open }: MobileSidebarProps) {
  const { accessToken, clearAccessToken } = useAuthStore()

  const actions = [
    { label: '구장 목록', href: '/stadiums' },
    { label: '맛집 목록', href: '/restaurants' },
    ...(!accessToken
      ? [
          { label: '로그인', href: '/login' },
          { label: '회원가입', href: '/signup' },
        ]
      : [
          {
            label: '마이페이지',
            href: 'user',
          },
          {
            label: '로그아웃',
            href: '/',
            onClick: () => clearAccessToken(),
          },
        ]),
  ]
  return (
    <div className={cn('w-full', !open && 'hidden')}>
      <ul>
        {actions.map((act, idx) => (
          <li
            key={idx}
            className={flexColIJCenter(
              'w-full',
              'p-3',
              'active:bg-gray-100',
            )}
          >
            <Link
              href={act.href}
              className={link()}
              onClick={act.onClick || undefined}
            >
              {act.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MobileSidebar
