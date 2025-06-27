import {
  button,
  flexRowICenter,
  link,
  mainTitle,
} from '@/styles/customStyle'
import { cn } from '@/utils/cn'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className={cn('w-full', 'bg-white', 'py-4', 'shadow-md')}>
      <div
        className={flexRowICenter(
          'w-full',
          'min-w-[1000px]',
          'mx-auto',
          'px-4',
          'justify-between',
        )}
      >
        <div className={cn('space-x-4')}>
          <Link
            href="/"
            className={mainTitle()}
          >
            ⚽️ K리그 맛집 지도
          </Link>
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
        </div>
        <div className={cn('space-x-4')}>
          <Link
            href="/login"
            className={link()}
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className={button()}
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
