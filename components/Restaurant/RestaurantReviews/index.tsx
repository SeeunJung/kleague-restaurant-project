'use client'
import {
  Card,
  flexCol,
  flexRowICenter,
  mainTitle,
} from '@/styles/customStyle'
import { Restaurant } from '@/types/Restaurant'
import { SortOptions } from '@/types/Review'
import React, { useEffect, useMemo, useState } from 'react'
import RestaurantReviewForm from './RestaurantReviewForm'
import RestaurantReviewsList from './RestaurantReviewsList'
import CustomSelectInput from '@/components/CustomSelectInput'
import { cn } from '@/utils/cn'
import { sortLabelToValueMap, sortValueToLabelMap } from '@/constants'
import { useReviewStore } from '@/store/useReviewStore'

type RestaurantReviewsProps = {
  restaurant: Restaurant
}

function RestauranttReviews({ restaurant }: RestaurantReviewsProps) {
  const { reviews, setReviews } = useReviewStore()
  const [sortBy, setSortBy] = useState<SortOptions>('created')

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
    <div className={Card('w-full', flexCol('gap-4'))}>
      <div className={flexRowICenter('justify-between')}>
        <div
          className={mainTitle('w-full')}
        >{`리뷰(${reviews.length})`}</div>
        <div className={cn('w-[300px]')}>
          <CustomSelectInput
            placeholder="리뷰 정렬하기"
            name="sortBy"
            value={sortValueToLabelMap[sortBy]}
            onChange={(e) => {
              const selectedLabel = e.target.value
              const mappedValue = sortLabelToValueMap[selectedLabel]
              if (mappedValue) setSortBy(mappedValue)
            }}
            options={['작성 순', '별점 높은 순', '별점 낮은 순']}
          />
        </div>
      </div>
      <RestaurantReviewForm restaurantId={restaurant.id} />
      <RestaurantReviewsList reviews={sortedReviews} />
    </div>
  )
}

export default RestauranttReviews
