import { flexCol } from '@/styles/customStyle'
import { cn } from '@/utils/cn'
import React from 'react'

function Footer() {
  return (
    <div
      className={cn('w-full', 'bg-[#111827]', 'py-4', 'shadow-md')}
    >
      <div
        className={flexCol(
          'w-full',
          'min-w-[1000px]',
          'mx-auto',
          'p-4',
        )}
      >
        <div className={cn('text-white', 'text-lg', 'font-bold')}>
          ⚽️ K리그 맛집 지도
        </div>
        <div className={cn('text-md', 'text-[#9ea4b5]')}>
          K리그 경기장 주변의 맛집을 찾고 공유하는 플랫폼입니다.
        </div>
        <div className={cn('text-sm', 'text-[#9ea4b5]')}>
          © 2025 가로세로 All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default Footer
