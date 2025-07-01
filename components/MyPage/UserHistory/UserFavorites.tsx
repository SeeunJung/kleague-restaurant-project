import RestaurantCard from '@/components/Card/RestaurantCard'
import { mainTitle } from '@/styles/customStyle'
import { getStadiumNameById } from '@/utils/getStudiumById'
interface FavoriteRestaurantProps {
  id: number
  name: string
  category: string
  address: string
  stadiumId: number
}
interface FavoriteProps {
  id: number
  restaurantId: number
  restaurant: FavoriteRestaurantProps
}
interface UserFavoritesProps {
  favorites: FavoriteProps[]
}

export default function UserFavorites({
  favorites,
}: UserFavoritesProps) {
  if (favorites.length === 0)
    return <div>즐겨찾기한 식당이 없습니다.</div>

  return (
    <div>
      <h3 className={mainTitle('mb-2')}>즐겨찾기한 맛집</h3>
      <div
        className={
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full mx-auto gap-4'
        }
      >
        {favorites.map(({ restaurant }) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={{ ...restaurant }}
            showDistance={false}
            stadiumName={getStadiumNameById(restaurant.stadiumId)}
          />
        ))}
      </div>
    </div>
  )
}
