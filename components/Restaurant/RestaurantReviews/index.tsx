'use client'
import { Card, flexCol } from '@/styles/customStyle'
import { Restaurant } from '@/types/Restaurant'
import React, { useEffect, useMemo } from 'react'
import RestaurantReviewForm from './RestaurantReviewForm'
import RestaurantReviewsList from './RestaurantReviewsList'
import { cn } from '@/utils/cn'
import { useReviewStore } from '@/store/useReviewStore'
import { useAuthStore } from '@/store/useAuthStore'
import ReviewBlurMode from './ReviewBlurMode'
import RestaurantReviewHeader from './RestaurantReviewHeader'
import { useReviewSort } from '@/context/ReviewSortContext'

type RestaurantReviewsProps = {
  restaurant: Restaurant
}

function RestauranttReviews({ restaurant }: RestaurantReviewsProps) {
  const { accessToken } = useAuthStore()
  const { reviews, setReviews } = useReviewStore()
  const { sortBy } = useReviewSort()

  useEffect(() => {
    setReviews(restaurant.reviews)
  }, [restaurant.reviews, setReviews])

  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => {
      switch (sortBy) {
        case 'created':
          return (
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
          )
        case 'ratingDesc':
          return b.rating - a.rating
        case 'ratingAsc':
          return a.rating - b.rating
        default:
          return 0
      }
    })
  }, [reviews, sortBy])

  return (
    <div className={cn('w-full', 'relative')}>
      <div
        className={cn(
          Card('w-full'),
          flexCol('gap-4'),
          !accessToken && 'blur-sm pointer-events-none select-none',
        )}
      >
        <RestaurantReviewHeader reviewCount={reviews.length} />
        <RestaurantReviewForm restaurantId={restaurant.id} />
        <RestaurantReviewsList reviews={sortedReviews} />
      </div>
      {!accessToken && <ReviewBlurMode />}
    </div>
  )
}

export default RestauranttReviews
