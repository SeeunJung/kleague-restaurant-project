'use client'

import { cn } from '@/utils/cn'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Card, flexCol, mainTitle } from '@/styles/customStyle'
import RestaurantCard from '../Card/RestaurantCard'
import getDistance from '@/utils/getDistance'
import { getStadiumsDetail } from '@/services/stadiums'
import FilterBar from './FilterBar'
import { Restaurant } from '@/types/Restaurant'
import LoadingSpinner from '../common/LoadingSpinner'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

const PAGE_SIZE = 9

export default function StadiumRestaurantContainer({
  id,
}: {
  id: number
}) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [category, setCategory] = useState<string>('전체')
  const [sortBy, setSortBy] = useState<string>('distance')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const stadium = await getStadiumsDetail(id)
        const {
          latitude: stadiumLat,
          longitude: stadiumLng,
          restaurants,
        } = stadium

        const processed: Restaurant[] = (restaurants ?? []).map(
          (r) => ({
            ...(r as Restaurant),
            distance: getDistance(
              stadiumLat ?? 0,
              stadiumLng ?? 0,
              r.latitude!,
              r.longitude!,
            ),
          }),
        )
        setRestaurants(processed)
      } catch (e) {
        console.error('레스토랑 목록 불러오기 실패: ', e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [id])

  const filtered =
    category === '전체'
      ? restaurants
      : restaurants.filter((r) => r.category === category)

  const sorted = [...filtered].sort(
    (a: Restaurant, b: Restaurant) => {
      const aDistance = a.distance ?? Infinity
      const bDistance = b.distance ?? Infinity
      const aRating = a.avgRating ?? 0
      const bRating = b.avgRating ?? 0

      if (sortBy === 'distance') return aDistance - bDistance
      if (sortBy === 'rating') return bRating - aRating
      return 0
    },
  )

  const load = () => {
    if (
      page * PAGE_SIZE >= sorted.length ||
      isLoading ||
      isLoadingMore
    )
      return
    setIsLoadingMore(true)
    setTimeout(() => {
      setPage((prev) => prev + 1)
      setIsLoadingMore(false)
    }, 300)
  }

  useInfiniteScroll(
    observerRef,
    load,
    page * PAGE_SIZE < sorted.length,
  )

  const visibleRestaurants = useMemo(() => {
    return sorted.slice(0, page * PAGE_SIZE)
  }, [sorted, page])

  return (
    <div
      className={cn(Card(), flexCol('w-full justify-center mt-6'))}
    >
      <div>
        <span className={mainTitle('mt-2 mb-2')}>근처 맛집</span>
      </div>
      <FilterBar
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : sorted.length === 0 ? (
        <p className="text-center w-full mt-6 text-gray-500">
          일치하는 식당이 존재하지 않습니다.
        </p>
      ) : (
        <>
          <div
            className={
              'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full mx-auto gap-4'
            }
          >
            {visibleRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                showDistance={true}
              />
            ))}
          </div>
          <div
            ref={observerRef}
            className="h-10"
          />
          {isLoadingMore && (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          )}
        </>
      )}
    </div>
  )
}
