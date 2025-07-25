'use client'

import ReviewCard from '@/components/Card/ReviewCard'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import Modal from '@/components/common/Modal'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import useModal from '@/hooks/useModal'
import { mainTitle } from '@/styles/customStyle'
import { Review } from '@/types/Review'
import { useMemo, useRef, useState } from 'react'

interface UserReviewsProps {
  reviews: Review[]
}

const PAGE_SIZE = 10

export default function UserReviews({ reviews }: UserReviewsProps) {
  const { modalOpen, setModalOpen, modalContent, openModal } =
    useModal()
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const observerRef = useRef<HTMLDivElement | null>(null)

  const load = () => {
    if (page * PAGE_SIZE >= reviews.length || isLoading) return
    setIsLoading(true)
    setTimeout(() => {
      setPage((prev) => prev + 1)
      setIsLoading(false)
    }, 500)
  }

  useInfiniteScroll(
    observerRef,
    load,
    page * PAGE_SIZE < reviews.length,
  )

  const visibleReviews = useMemo(() => {
    return reviews.slice(0, page * PAGE_SIZE)
  }, [reviews, page])

  if (reviews.length === 0) return <div>작성한 리뷰가 없습니다.</div>

  return (
    <div>
      <div className="flex flex-row mb-2 items-end gap-2">
        <h3 className={mainTitle()}>내 리뷰</h3>
        <span className="text-sm text-gray-600 font-bold">
          ({reviews.length})
        </span>
      </div>
      <div>
        {visibleReviews.map((review) => {
          if (!review.restaurant) return null
          return (
            <ReviewCard
              key={review.id}
              review={review}
              openModal={openModal}
            />
          )
        })}
        <Modal
          isOpen={modalOpen}
          onOpenChange={setModalOpen}
          contents={modalContent}
        />
        <div
          ref={observerRef}
          className="h-10"
        />
        {isLoading && (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  )
}
