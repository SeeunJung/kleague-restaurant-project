import LoadingSpinner from '@/components/common/LoadingSpinner'
import RestaurantCard from '@/components/common/RestaurantCard'
import { Restaurant } from '@/types/Restaurant'
import { cn } from '@/utils/cn'

type TotalRestaurantListProps = {
  restaurants: Omit<Restaurant, 'reviews'>[]
}

function TotalRestaurantList({
  restaurants,
}: TotalRestaurantListProps) {
  if (restaurants.length === 0) {
    return <LoadingSpinner />
  }

  return (
    <div
      className={cn(
        'grid',
        'sm:grid-cols-1',
        'md:grid-cols-3',
        'gap-3',
      )}
    >
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
        />
      ))}
    </div>
  )
}

export default TotalRestaurantList
