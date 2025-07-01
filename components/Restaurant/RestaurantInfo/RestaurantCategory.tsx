import { flexRowICenter } from '@/styles/customStyle'
import { cn } from '@/utils/cn'
import { Star } from 'lucide-react'

type RestaurantCategoryProps = {
  category: string
  avgRating: number
  reviewsLen: number
}

function RestaurantCategory({
  category,
  avgRating,
  reviewsLen,
}: RestaurantCategoryProps) {
  return (
    <div className={flexRowICenter()}>
      <div
        className={cn(
          'rounded-full',
          'border',
          'border-[#ccc]',
          'px-2',
        )}
      >
        {category}
      </div>
      <div className={flexRowICenter('font-semibold')}>
        <Star
          fill="#FFD94D"
          strokeWidth={0}
          size={24}
        />
        {avgRating}
        <span className={cn('test-sm', 'text-[#ccc]')}>
          ({reviewsLen})
        </span>
      </div>
    </div>
  )
}

export default RestaurantCategory
