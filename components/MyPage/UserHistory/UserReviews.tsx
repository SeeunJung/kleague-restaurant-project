import ReviewCard from '@/components/Card/ReviewCard'
import { mainTitle } from '@/styles/customStyle'
import { ReviewProps } from '@/types/Mypage'

interface UserReviewsProps {
  reviews: ReviewProps[]
}

export default function UserReviews({ reviews }: UserReviewsProps) {
  if (reviews.length === 0) return <div>작성한 리뷰가 없습니다.</div>

  return (
    <div>
      <h3 className={mainTitle('mb-2')}>내 리뷰</h3>
      <div>
        {reviews.map(
          ({ id, restaurant, rating, createdAt, content }) => (
            <ReviewCard
              key={id}
              restaurantName={restaurant.name}
              rating={rating}
              createdAt={createdAt}
              content={content}
            />
          ),
        )}
      </div>
    </div>
  )
}
