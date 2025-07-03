import {
  button,
  Card,
  flexCol,
  flexColIJCenter,
  flexRow,
  subTitle,
} from '@/styles/customStyle'
import { Restaurant } from '@/types/Restaurant'
import { cn } from '@/utils/cn'
import RestaurantReviewStar from './RestaurantReviewStar'
import { useRouter } from 'next/navigation'
import FavoriteButton from '../Card/FavoriteButton'

type RestaurantCardProps = {
  restaurant: Omit<Restaurant, 'reviews'>
}

function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const router = useRouter()
  const handleClick = (id: number) => {
    router.push(`/restaurants/${id}`)
  }

  return (
    <div className={Card('p-0', 'overflow-hidden')}>
      <div
        className={flexColIJCenter(
          'w-full',
          'h-35',
          'bg-gray-300',
          'text-gray-600',
          'relative',
        )}
      >
        이미지 준비중
        <div
          className={cn(
            'absolute',
            'top-2',
            'left-2',
            'px-2',
            'rounded-full',
            'text-xs',
            'bg-white',
            'border',
            'border-[#ccc]',
          )}
        >
          {restaurant.address.slice(0, 2)}
        </div>
        <div className={cn('absolute', 'top-2', 'right-2')}>
          <FavoriteButton restaurantId={restaurant.id} />
        </div>
      </div>
      <div className={flexCol('w-full', 'p-3', subTitle())}>
        <div className={flexRow('items-start', 'justify-between')}>
          <div
            className={cn('text-black', 'text-lg', 'font-semibold')}
          >
            {restaurant.name}
          </div>
          <div
            className={cn(
              'border',
              'border-[#ccc]',
              'rounded-full',
              'px-2',
              'text-nowrap',
            )}
          >
            {restaurant.category}
          </div>
        </div>
        <div>{restaurant.address}</div>
        <RestaurantReviewStar
          avgRating={restaurant.avgRating}
          reviewCount={restaurant.reviewCount}
        />
        <div className={flexRow('items-start', 'justify-between')}>
          <div>{restaurant.stadium.name}</div>
          <div
            className={button()}
            onClick={() => handleClick(restaurant.id)}
          >
            상세보기
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantCard
