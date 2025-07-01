import { TEAM_LOGOS } from '@/constants'
import { flexCol, flexRowICenter } from '@/styles/customStyle'
import { Review } from '@/types/Restaurant'
import { cn } from '@/utils/cn'
import { Star } from 'lucide-react'
import Image from 'next/image'

type RestaurantReviewContentProps = {
  review: Review
}

function RestaurantReviewContent({
  review,
}: RestaurantReviewContentProps) {
  return (
    <div className={flexCol('p-3', 'border-b')}>
      <div className={flexRowICenter()}>
        {review.user && review.user.favoriteTeam && (
          <Image
            src={TEAM_LOGOS[review.user.favoriteTeam]}
            alt="리뷰어 팀 로고"
            width={40}
            height={40}
          />
        )}
        <div className={flexCol('gap-1')}>
          <div className={cn('text-xs', 'font-semibold')}>
            {review.user?.nickname}
          </div>
          <div className={flexRowICenter()}>
            <div className={flexRowICenter()}>
              <Star
                fill="#FFD94D"
                strokeWidth={0}
                size={18}
              />
              <div className={cn('text-xs', 'font-semibold')}>
                {review.rating}
              </div>
            </div>
            <div className={cn('text-xs', 'text-[#ccc]')}>
              {new Date(review.createdAt).toISOString().slice(0, 10)}
            </div>
          </div>
        </div>
      </div>

      <div>{review.content}</div>
    </div>
  )
}

export default RestaurantReviewContent
