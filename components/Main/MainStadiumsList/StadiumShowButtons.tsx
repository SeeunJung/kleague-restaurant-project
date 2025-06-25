import { cn } from '@/utils/cn'
import React from 'react'

type ListButtonsProps = {
  isShowAll: boolean
  onChange: () => void
}

function StadiumShowButtons({
  isShowAll,
  onChange,
}: ListButtonsProps) {
  return (
    <button
      onClick={onChange}
      className={cn(
        'w-full',
        'p-2',
        'rounded-lg',
        'text-black',
        'bg-gray-200',
        'hover:bg-gray-300',
      )}
    >
      {isShowAll ? '접기' : '더보기'}
    </button>
  )
}

export default StadiumShowButtons
