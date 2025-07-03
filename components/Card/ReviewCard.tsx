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
import { useState } from 'react'

interface ReviewCardProps {
  id: number
  restaurantName?: string
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
  rating,
  createdAt,
  content,
  onDelete,
  onEdit,
}: ReviewCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [newContent, setNewContent] = useState(content)
  const [newRating, setNewRating] = useState(rating)

  const handleSave = () => {
    onEdit(id, { content: newContent, rating: newRating })
    setIsEditing(false)
  }

  return (
    <div className={cn(Card(), 'flex flex-col h-full mt-2')}>
      <div>
        <h2 className={cn(mainTitle('sm:text-lg'), 'truncate')}>
          {restaurantName ?? '이름 없음'}
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

          <div className={flexCol('justify-start items-end gap-2')}>
            <button
              onClick={handleSave}
              className={flexRow(
                'w-fit h-fit gap-1 px-4 py-2 text-xs font-bold rounded-full border border-gray-300 cursor-pointer',
              )}
            >
              <Save size={18} />
              저장
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className={flexRow(
                'w-fit h-fit gap-1 px-4 py-2 text-xs text-white font-bold bg-black rounded-full border border-gray-300 cursor-pointer',
              )}
            >
              <Delete size={18} />
              취소
            </button>
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
          <div className={flexCol('justify-start items-end gap-2')}>
            <button
              onClick={() => setIsEditing(true)}
              className={flexRow(
                'w-fit h-fit gap-1 px-4 py-2 text-xs font-bold rounded-full border border-gray-300 cursor-pointer',
              )}
            >
              <Pencil size={18} />
              수정
            </button>
            <button
              onClick={() => onDelete(id)}
              className={flexRow(
                'w-fit h-fit gap-1 px-4 py-2 text-xs text-white font-bold bg-black rounded-full border border-gray-300 cursor-pointer',
              )}
            >
              <Trash size={18} />
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
