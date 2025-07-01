'use client'
import {
  Card,
  flexCol,
  flexRowICenter,
  mainTitle,
} from '@/styles/customStyle'
import { Restaurant, Review } from '@/types/Restaurant'
import React, { useMemo, useState } from 'react'
import RestaurantReviewForm from './RestaurantReviewForm'
import RestaurantReviewsList from './RestaurantReviewsList'
import CustomSelectInput from '@/components/CustomSelectInput'
import { cn } from '@/utils/cn'

type RestaurantReviewsProps = {
  restaurant: Restaurant
}

type SortOptions = 'created' | 'ratingDesc' | 'ratingAsc'

const sortLabelToValueMap: Record<string, SortOptions> = {
  '작성 순': 'created',
  '별점 높은 순': 'ratingDesc',
  '별점 낮은 순': 'ratingAsc',
}

const sortValueToLabelMap: Record<SortOptions, string> = {
  created: '작성 순',
  ratingDesc: '별점 높은 순',
  ratingAsc: '별점 낮은 순',
}

function RestauranttReviews({ restaurant }: RestaurantReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(restaurant.reviews)
  const [sortBy, setSortBy] = useState<SortOptions>('created')

  const addReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev])
  }

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
      <RestaurantReviewForm
        restaurantId={restaurant.id}
        onReviewSubmit={addReview}
      />
      <RestaurantReviewsList reviews={sortedReviews} />
    </div>
  )
}

export default RestauranttReviews
