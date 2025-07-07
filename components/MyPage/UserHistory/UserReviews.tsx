'use client'

import ReviewCard from '@/components/Card/ReviewCard'
import { deleteReview, updateReview } from '@/services/mypage'
import { mainTitle } from '@/styles/customStyle'
import { ReviewProps } from '@/types/Mypage'
import { useState } from 'react'

interface UserReviewsProps {
  reviews: ReviewProps[]
}

export default function UserReviews({
  reviews: initialReviews,
}: UserReviewsProps) {
  const [updatedReviews, setUpdatedReviews] =
    useState<ReviewProps[]>(initialReviews)

  const handleDelete = async (id: number) => {
    try {
      await deleteReview(id)
      setUpdatedReviews((prev) =>
        prev.filter((review) => review.id !== id),
      )
    } catch (err) {
      console.error('리뷰 삭제 실패: ', err)
    }
  }

  const handleEdit = async (
    id: number,
    updatedFields: { content: string; rating: number },
  ) => {
    try {
      const updatedReview = await updateReview(id, updatedFields)
      setUpdatedReviews((prev) =>
        prev.map((review) =>
          review.id === id ? { ...review, ...updatedReview } : review,
        ),
      )
    } catch (err) {
      console.error('리뷰 수정 실패: ', err)
    }
  }

  if (updatedReviews.length === 0)
    return <div>작성한 리뷰가 없습니다.</div>

  return (
    <div>
      <div className="flex flex-row mb-2 items-end gap-2">
        <h3 className={mainTitle()}>내 리뷰</h3>
        <span className="text-sm text-gray-600 font-bold">
          ({updatedReviews.length})
        </span>
      </div>
      <div>
        {updatedReviews.map((review) => (
          <ReviewCard
            key={review.id}
            id={review.id}
            restaurantName={review.restaurant.name}
            rating={review.rating}
            createdAt={review.createdAt}
            content={review.content}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  )
}
