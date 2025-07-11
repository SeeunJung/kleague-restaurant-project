import RestaurantCard from '@/components/Card/RestaurantCard'
import { mainTitle } from '@/styles/customStyle'
import { FavoriteProps } from '@/types/Mypage'

interface UserFavoritesProps {
  favorites: FavoriteProps[]
  onRemoveFavorite?: (restaurantId: number) => void
}

export default function UserFavorites({
  favorites,
  onRemoveFavorite,
}: UserFavoritesProps) {
  if (favorites.length === 0)
    return <div>즐겨찾기한 식당이 없습니다.</div>

  return (
    <div>
      <div className="flex flex-row mb-2 items-end gap-2">
        <h3 className={mainTitle()}>즐겨찾기한 맛집</h3>
        <span className="text-sm text-gray-600 font-bold">
          ({favorites.length})
        </span>
      </div>
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
            onRemoveFavorite={onRemoveFavorite}
          />
        ))}
      </div>
    </div>
  )
}
