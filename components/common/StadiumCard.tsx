import {
  button,
  flexCol,
  flexRowICenter,
  mainTitle,
  subTitle,
} from '@/styles/customStyle'
import { Stadium } from '@/types/Stadium'
import { cn } from '@/utils/cn'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type StadiumCardProps = {
  stadium: Stadium
}

function StadiumCard({ stadium }: StadiumCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/stadiums/${stadium.id}`)
  }

  return (
    <div
      className={flexCol(
        'rounded-xl',
        'shadow-lg',
        'p-4',
        'gap-5',
        'h-[210px]',
      )}
    >
      <div className={flexRowICenter('justify-between')}>
        <Image
          src={stadium.logo}
          alt={`${stadium.team} 로고`}
          width={40}
          height={40}
          className={cn('w-auto')}
        />
        <div
          className={cn(
            'rounded-xl',
            'px-2',
            'py-1',
            'text-sm',
            'font-medium',
            'bg-gray-100',
          )}
        >
          {stadium.team}
        </div>
      </div>
      <div className={flexCol()}>
        <div className={mainTitle()}>{stadium.name}</div>
        <div className={subTitle()}>{stadium.address}</div>
      </div>
      <div className={flexRowICenter('justify-between')}>
        <span className={subTitle()}>
          맛집 {stadium.restaurantCount}곳
        </span>
        <button
          className={button('rounded-2xl', 'p-2', 'text-sm')}
          onClick={handleClick}
        >
          보기
        </button>
      </div>
    </div>
  )
}

export default StadiumCard
