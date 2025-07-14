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
import { useState } from 'react'
import StarRating from '../Restaurant/RestaurantReviews/StarRating'

interface ReviewCardProps {
  id: number
  restaurantName: string
  restaurantId: number
  rating: number
  createdAt: Date
  content: string
  onDelete: (id: number) => void
  onEdit: (
    id: number,
    updatedFields: { content: string; rating: number },
  ) => void
}

export default function ReviewCard({
  id,
  restaurantName,
  restaurantId,
  rating,
  createdAt,
  content,
  onDelete,
  onEdit,
}: ReviewCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [newContent, setNewContent] = useState(content)
  const [newRating, setNewRating] = useState(rating)
  const router = useRouter()

  const handleSave = () => {
    onEdit(id, { content: newContent, rating: newRating })
    setIsEditing(false)
  }

  const handleRoute = (id: number) => {
    router.push(`/restaurants/${id}`)
  }

  return (
    <div className={cn(Card(), 'flex flex-col h-full mt-2')}>
      <div>
        <h2
          onClick={() => handleRoute(restaurantId)}
          className={cn(
            mainTitle('sm:text-lg'),
            'truncate cursor-pointer hover:underline',
          )}
        >
          {restaurantName}
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
              onClick={handleSave}
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
                {rating}
              </span>
              <span className="text-sm text-gray-600">
                {new Date(createdAt).toISOString().slice(0, 10)}
              </span>
            </div>
            <p className="w-[90%] text-sm font-semibold">{content}</p>
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
              onClick={() => onDelete(id)}
              className="cursor-pointer text-red-600"
            />
          </div>
        </div>
      )}
    </div>
  )
}
