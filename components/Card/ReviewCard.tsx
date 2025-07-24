'use client'

import { cn } from '@/lib/utils'
import {
  Card,
  flexCol,
  flexRow,
  flexRowICenter,
  mainTitle,
  subTitle,
} from '@/styles/customStyle'
import { Pencil, Save, Star, Trash, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import StarRating from '../Restaurant/RestaurantReviews/StarRating'
import { useUserStore } from '@/store/useUserStore'
import { Review } from '@/types/Review'

interface ReviewCardProps {
  review: Review
  openModal: (modalProps: {
    isError: boolean
    title: string
    description: string
  }) => void
}

export default function ReviewCard({
  review,
  openModal,
}: ReviewCardProps) {
  const { editMyReview, deleteMyReview } = useUserStore()
  const [isEditing, setIsEditing] = useState(false)
  const [newContent, setNewContent] = useState(review.content)
  const [newRating, setNewRating] = useState(review.rating)
  const router = useRouter()

  useEffect(() => {
    setNewContent(review.content)
    setNewRating(review.rating)
  }, [review.content, review.rating])

  const handleSave = () => {
    try {
      editMyReview(review.id, {
        content: newContent,
        rating: newRating,
      })
      setIsEditing(false)
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

  const handleDelete = () => {
    try {
      deleteMyReview(review.id)
      openModal({
        isError: true,
        title: '리뷰 삭제 성공',
        description: '리뷰 삭제에 성공했습니다.',
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

  const handleRoute = (id: number) => {
    router.push(`/restaurants/${id}`)
  }

  return (
    <div className={cn(Card(), 'flex flex-col h-full mt-2')}>
      <div>
        <h2
          onClick={() => handleRoute(review.restaurant!.id)}
          className={cn(
            mainTitle('sm:text-lg'),
            'truncate cursor-pointer hover:underline',
          )}
        >
          {review.restaurant?.name ?? '이름 없음'}
        </h2>
      </div>

      {isEditing ? (
        <div className={flexRow('gap-4 mt-2')}>
          <div className={flexCol('gap-1 w-full')}>
            <StarRating
              rating={newRating}
              onChange={(rating) => setNewRating(Number(rating))}
            />
            <textarea
              className="p-4 w-full resize-none rounded-xl bg-white border border-gray-500"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
          </div>

          <div
            className={flexRow(
              'justify-end items-center gap-4 ml-auto',
            )}
          >
            <Save
              size={18}
              onClick={() => handleSave()}
              className="cursor-pointer"
            />
            <X
              size={18}
              onClick={() => setIsEditing(false)}
              className="cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className={flexCol('gap-1')}>
            <div className={flexRow()}>
              <span
                className={cn(
                  subTitle(flexRowICenter()),
                  'text-sm font-semibold',
                )}
              >
                <Star
                  fill="#FFD94D"
                  strokeWidth={0}
                  width={18}
                  height={18}
                />
                {review.rating}
              </span>
              <span className="text-sm text-gray-600">
                {new Date(review.createdAt)
                  .toISOString()
                  .slice(0, 10)}
              </span>
            </div>
            <p className="w-[90%] text-sm font-semibold">
              {review.content}
            </p>
          </div>
          <div
            className={flexRow(
              'justify-end items-center gap-4 ml-auto',
            )}
          >
            <Pencil
              size={18}
              onClick={() => setIsEditing(true)}
              className="cursor-pointer text-gray-500"
            />
            <Trash
              size={18}
              onClick={() => handleDelete()}
              className="cursor-pointer text-red-600"
            />
          </div>
        </div>
      )}
    </div>
  )
}
