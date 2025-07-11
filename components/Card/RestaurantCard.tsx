'use client'

import {
  button,
  Card,
  flexCol,
  flexRow,
  flexRowICenter,
  mainTitle,
  subTitle,
} from '@/styles/customStyle'
import { RestaurantCardInfo } from '@/types/Restaurant'
import { cn } from '@/utils/cn'
import { Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import FavoriteButton from './FavoriteButton'
import useMatchStadium from '@/hooks/useMatchStadium'

export default function RestaurantCard({
  restaurant,
  showDistance,
  onRemoveFavorite,
}: RestaurantCardInfo) {
  const router = useRouter()
  const matchedStadium = useMatchStadium(restaurant.stadiumId)
  const stadiumName = matchedStadium?.name ?? ''
  const handleDetailClick = () => {
    router.push(`/restaurants/${restaurant.id}`)
  }

  return (
    <div className={cn(Card(), 'flex flex-col h-full')}>
      <div className={flexRow('justify-between')}>
        <h2 className={cn(mainTitle('sm:text-lg'), 'truncate')}>
          {restaurant.name}
        </h2>
        <div>
          <FavoriteButton
            restaurantId={restaurant.id}
            version="icon"
            onRemoveFavorite={onRemoveFavorite}
          />
        </div>
      </div>

      <div className={flexCol('gap-0')}>
        <span className={subTitle('text-sm font-semibold')}>
          {restaurant.category}
        </span>

        {restaurant.avgRating !== undefined && (
          <span
            className={cn(
              subTitle(flexRowICenter()),
              'text-sm font-semibold',
            )}
          >
            <Star
              fill="#FFD94D"
              strokeWidth={0}
              width={18}
              height={18}
            />
            {restaurant.avgRating}
          </span>
        )}

        {showDistance && restaurant.distance !== undefined ? (
          <span className="inline-block w-fit mt-1 px-2 py-1 text-xs font-semibold bg-gray-200 bg-opacity-75 rounded-full">
            {restaurant.distance} km
          </span>
        ) : stadiumName ? (
          <span className="inline-block w-fit mt-1 px-2 py-1 text-xs font-semibold bg-gray-200 bg-opacity-75 rounded-full">
            {stadiumName}
          </span>
        ) : null}
      </div>

      <div className="flex justify-center mt-4">
        <button
          className={cn(button(), 'w-full text-sm px-2 py-2')}
          onClick={handleDetailClick}
        >
          상세보기
        </button>
      </div>
    </div>
  )
}
