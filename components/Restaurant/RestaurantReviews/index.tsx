'use client'
import { Card, flexCol, mainTitle } from '@/styles/customStyle'
import { Restaurant, Review } from '@/types/Restaurant'
import React, { useState } from 'react'
import RestaurantReviewForm from './RestaurantReviewForm'
import RestaurantReviewsList from './RestaurantReviewsList'

type RestaurantReviewsProps = {
  restaurant: Restaurant
}

function RestauranttReviews({ restaurant }: RestaurantReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(restaurant.reviews)

  const addReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev])
  }
  return (
    <div className={Card('w-full', flexCol('gap-4'))}>
      <div
        className={mainTitle('w-full')}
      >{`리뷰(${reviews.length})`}</div>
      <RestaurantReviewForm
        restaurantId={restaurant.id}
        onReviewSubmit={addReview}
      />
      <RestaurantReviewsList reviews={reviews} />
    </div>
  )
}

export default RestauranttReviews
