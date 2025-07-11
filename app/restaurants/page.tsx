'use client'
import TotalRestaurantList from '@/components/Restaurant/TotalRestaurantList'
import TotalRestaurantSearchbar from '@/components/Restaurant/TotalRestaurantList/RestaurantSearchbar'
import { RestaurantFilterProvider } from '@/context/RestaurantFilterContext'
import useFetchRestaurants from '@/hooks/useFetchRestaurants'
import { useRestaurantsStore } from '@/store/useRestaurantsStore'
import { Pages } from '@/styles/customStyle'

function RestaurantsPage() {
  useFetchRestaurants('', '')
  const restaurants = useRestaurantsStore(
    (state) => state.restaurants,
  )

  return (
    <RestaurantFilterProvider>
      <div className={Pages()}>
        <div>K리그 경기장 주변의 모든 맛집을 찾아보세요</div>
        <TotalRestaurantSearchbar />
        <TotalRestaurantList restaurants={restaurants} />
      </div>
    </RestaurantFilterProvider>
  )
}

export default RestaurantsPage
