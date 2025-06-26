import { cn } from '@/lib/utils'
import { flexRowICenter, link, mainTitle } from '@/styles/customStyle'
import Link from 'next/link'
import HeaderAuthControls from './HeaderAuthControls'

function DesktopHeader() {
  return (
    <header className={cn('w-full', 'bg-white', 'py-4', 'shadow-md')}>
      <div
        className={flexRowICenter(
          'w-full',
          'min-w-[500px]',
          'max-w-[1200px]',
          'mx-auto',
          'px-4',
          'justify-between',
        )}
      >
        <div className={flexRowICenter('gap-4')}>
          <Link
            href="/"
            className={mainTitle()}
          >
            ⚽️ K리그 맛집 지도
          </Link>
          <nav className={flexRowICenter()}>
            <Link
              href="/stadium"
              className={link()}
            >
              구장 목록
            </Link>
            <Link
              href="/restaurant"
              className={link()}
            >
              맛집 목록
            </Link>
          </nav>
        </div>
        <HeaderAuthControls />
      </div>
    </header>
  )
}

export default DesktopHeader
