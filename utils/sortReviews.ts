import { Review, SortOptions } from '@/types/Review'

export function sortReviews(
  reviews: Review[],
  sortBy: SortOptions,
): Review[] {
  return [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'created':
        return (
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        )
      case 'ratingDesc':
        return b.rating - a.rating
      case 'ratingAsc':
        return a.rating - b.rating
      default:
        return 0
    }
  })
}
