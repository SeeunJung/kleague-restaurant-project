import LoadingSpinner from '@/components/common/LoadingSpinner'
import RestaurantCard from '@/components/common/RestaurantCard'
import { useRestaurantFilter } from '@/context/RestaurantFilterContext'
import { flexCol, mainTitle } from '@/styles/customStyle'
import { Restaurant } from '@/types/Restaurant'
import { cn } from '@/utils/cn'
import { useMemo } from 'react'

type TotalRestaurantListProps = {
  restaurants: Omit<Restaurant, 'reviews'>[]
}

function TotalRestaurantList({
  restaurants,
}: TotalRestaurantListProps) {
  const { keyword, category, sortBy, viewMode } =
    useRestaurantFilter()

  const filteredRestaurants = useMemo(() => {
    return restaurants
      .filter((r) => r.name.includes(keyword))
      .filter((r) => category === '전체' || r.category === category)
      .sort((a, b) => {
        switch (sortBy) {
          case '평점순':
            return b.avgRating - a.avgRating
          case '리뷰순':
            return b.reviewCount - a.reviewCount
          case '이름순':
            return a.name.localeCompare(b.name, 'ko')
          default:
            return 0
        }
      })
  }, [restaurants, keyword, category, sortBy])

  if (restaurants.length === 0) return <LoadingSpinner />
  return (
    <div className={flexCol()}>
      <div
        className={mainTitle()}
      >{`맛집 목록(${restaurants.length}곳)`}</div>
      <div
        className={cn('grid', 'gap-3', {
          'sm: grid-cols-1 md:grid-cols-3': viewMode === '카드형',
          'sm: grid-cols-1': viewMode === '리스트형',
        })}
      >
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  )
}

export default TotalRestaurantList
