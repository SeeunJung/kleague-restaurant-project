import useMatchStadium from '@/hooks/useMatchStadium'
import {
  Card,
  flexCol,
  flexRowICenter,
  subTitle,
} from '@/styles/customStyle'
import { Restaurant } from '@/types/Restaurant'
import { cn } from '@/utils/cn'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type MainRestaurantCardProps = {
  restaurant: Restaurant
}

function MainRestaurantCard({ restaurant }: MainRestaurantCardProps) {
  const router = useRouter()
  const matchedStadium = useMatchStadium(restaurant.stadiumId)

  const handleClick = () => {
    router.push(`/restaurants/${restaurant.id}`)
  }

  return (
    <div className={flexCol(Card(), 'bg-gray-50', 'cursor-pointer')}>
      <div className={flexRowICenter()}>
        <Image
          src={matchedStadium?.logo || '/img/kleague.png'}
          alt={`${matchedStadium?.name} 로고`}
          width={30}
          height={30}
          style={{ objectFit: 'cover' }}
        />
        <div
          className={cn('text-lg', 'font-semibold')}
          onClick={handleClick}
        >
          {restaurant.name}
        </div>
      </div>
      <div className={subTitle()}>
        {restaurant.category} •{' '}
        {matchedStadium?.name ?? '경기장 정보 없음'}
      </div>
    </div>
  )
}

export default MainRestaurantCard
