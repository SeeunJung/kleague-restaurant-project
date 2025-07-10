'use client'

import {
  button,
  Card,
  flexCol,
  flexRowICenter,
  mainTitle,
  subTitle,
} from '@/styles/customStyle'
import { Stadium } from '@/types/Stadium'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface StadiumCardProps {
  stadium: Stadium
}

export default function StadiumCard({ stadium }: StadiumCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/stadiums/${stadium.id}`)
  }

  return (
    <div
      className={flexCol(Card(), 'gap-5 transition cursor-pointer')}
      onClick={handleClick}
    >
      <div className={flexRowICenter('justify-between')}>
        <Image
          src={stadium.logo}
          alt={`${stadium.team} 로고`}
          width={40}
          height={40}
          className="w-auto"
        />
        <span className="inline-block w-fit mt-1 px-2 py-1 text-[10px] font-semibold bg-gray-300 bg-opacity-75 rounded-full">
          {stadium.team}
        </span>
      </div>
      <div className={flexCol()}>
        <div className={mainTitle()}>{stadium.name}</div>
        <div className={subTitle()}>{stadium.address}</div>
        <button
          className={button('rounded-lg p-2 text-sm')}
          onClick={handleClick}
        >
          상세보기
        </button>
      </div>
    </div>
  )
}
