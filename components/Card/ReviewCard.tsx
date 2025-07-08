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
import { Delete, Pencil, Save, Star, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ReviewCardProps {
  id: number
  restaurantName: string
  restaurantId: number
  rating: number
  createdAt: string
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
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className={flexCol('gap-1')}>
            <input
              type="number"
              min={1}
              max={5}
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
            />
            <textarea
              className="w-[90%]"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
          </div>

          <div className={flexRow('justify-start items-end gap-4')}>
            <Save
              size={18}
              onClick={handleSave}
              className="cursor-pointer"
            />
            <Delete
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
                {new Date(createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="w-[90%] text-sm font-semibold">{content}</p>
          </div>
          <div className={flexRow('justify-start items-end gap-4')}>
            <Pencil
              size={18}
              onClick={() => setIsEditing(true)}
              className="cursor-pointer"
            />
            <Trash
              size={18}
              onClick={() => onDelete(id)}
              className="cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  )
}
