'use client'

import RestaurantCard from '@/components/Card/RestaurantCard'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { mainTitle } from '@/styles/customStyle'
import { FavoriteProps } from '@/types/Mypage'
import { useMemo, useRef, useState } from 'react'

const PAGE_SIZE = 9
interface UserFavoritesProps {
  favorites: FavoriteProps[]
  onRemoveFavorite?: (restaurantId: number) => void
}

export default function UserFavorites({
  favorites,
  onRemoveFavorite,
}: UserFavoritesProps) {
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const observerRef = useRef<HTMLDivElement | null>(null)

  const load = () => {
    if (page * PAGE_SIZE >= favorites.length || isLoading) return
    setIsLoading(true)
    setTimeout(() => {
      setPage((prev) => prev + 1)
      setIsLoading(false)
    }, 300)
  }

  useInfiniteScroll(
    observerRef,
    load,
    page * PAGE_SIZE < favorites.length,
  )

  const visibleFavorites = useMemo(() => {
    return favorites.slice(0, page * PAGE_SIZE)
  }, [favorites, page])

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
        {visibleFavorites.map(({ restaurant }) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={{ ...restaurant }}
            showDistance={false}
            onRemoveFavorite={onRemoveFavorite}
          />
        ))}
      </div>
      <div
        ref={observerRef}
        className="h-10"
      />
      {isLoading && (
        <div className="flex justify-center mt-4">
          <LoadingSpinner />
        </div>
      )}
    </div>
  )
}
