import { cn } from '@/lib/utils'
import {
  Card,
  flexRow,
  flexRowICenter,
  mainTitle,
  subTitle,
} from '@/styles/customStyle'
import { Star } from 'lucide-react'

interface ReviewCardProps {
  restaurantName?: string
  rating: number
  createdAt: string
  content: string
}

export default function ReviewCard({
  restaurantName,
  rating,
  createdAt,
  content,
}: ReviewCardProps) {
  return (
    <div className={cn(Card(), 'flex flex-col h-full mt-2')}>
      <div>
        <h2 className={cn(mainTitle('sm:text-lg'), 'truncate')}>
          {restaurantName ?? '이름 없음'}
        </h2>
      </div>

      <div className={flexRow('gap-4')}>
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

      <p className="text-sm font-semibold">{content}</p>
    </div>
  )
}
