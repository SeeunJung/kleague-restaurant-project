'use client'

import ReviewCard from '@/components/Card/ReviewCard'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { deleteReview, updateReview } from '@/services/mypage'
import { mainTitle } from '@/styles/customStyle'
import { Review } from '@/types/Review'
import { useMemo, useRef, useState } from 'react'

interface UserReviewsProps {
  reviews: Review[]
  openModal: (modalProps: {
    isError: boolean
    title: string
    description: string
  }) => void
}

const PAGE_SIZE = 10

export default function UserReviews({
  reviews,
  openModal,
}: UserReviewsProps) {
  const [allReviews, setAllReviews] = useState<Review[]>(reviews)
  const [page, setPage] = useState(1)
  const observerRef = useRef<HTMLDivElement | null>(null)

  const handleDelete = async (id: number) => {
    try {
      await deleteReview(id)
      setAllReviews((prev) =>
        prev.filter((review) => review.id !== id),
      )
      openModal({
        isError: true,
        title: '리뷰 삭제 성공',
        description: '리뷰 삭제에 성공했습니다.',
      })
    } catch (err) {
      console.error(err)
      openModal({
        isError: true,
        title: '리뷰 삭제 실패',
        description:
          err instanceof Error
            ? err.message
            : '알 수 없는 오류가 발생했습니다.',
      })
    }
  }

  const handleEdit = async (
    id: number,
    updatedFields: { content: string; rating: number },
  ) => {
    try {
      const updatedReview = await updateReview(id, updatedFields)
      setAllReviews((prev) =>
        prev.map((review) =>
          review.id === id ? { ...review, ...updatedReview } : review,
        ),
      )
      openModal({
        isError: true,
        title: '리뷰 수정 성공',
        description: '리뷰 수정에 성공했습니다.',
      })
    } catch (err) {
      console.error(err)
      openModal({
        isError: true,
        title: '리뷰 수정 실패',
        description:
          err instanceof Error
            ? err.message
            : '알 수 없는 오류가 발생했습니다.',
      })
    }
  }

  const load = () => {
    if (page * PAGE_SIZE >= allReviews.length) return
    setPage((prev) => prev + 1)
  }

  useInfiniteScroll(
    observerRef,
    load,
    page * PAGE_SIZE < allReviews.length,
  )

  const visibleReviews = useMemo(() => {
    return allReviews.slice(0, page * PAGE_SIZE)
  }, [allReviews, page])

  if (allReviews.length === 0)
    return <div>작성한 리뷰가 없습니다.</div>

  return (
    <div>
      <div className="flex flex-row mb-2 items-end gap-2">
        <h3 className={mainTitle()}>내 리뷰</h3>
        <span className="text-sm text-gray-600 font-bold">
          ({allReviews.length})
        </span>
      </div>
      <div>
        {visibleReviews.map((review) => {
          if (!review.restaurant) return null
          return (
            <ReviewCard
              key={review.id}
              id={review.id}
              restaurantName={review.restaurant.name}
              restaurantId={review.restaurant.id}
              rating={review.rating}
              createdAt={review.createdAt}
              content={review.content}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )
        })}
        <div
          ref={observerRef}
          className="h-10"
        />
      </div>
    </div>
  )
}
