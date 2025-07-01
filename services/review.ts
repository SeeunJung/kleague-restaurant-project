import { Review } from '@/types/Restaurant'
import axiosInstance from '@/utils/axiosInstance'

export const createReview = async (
  payload: Pick<Review, 'restaurantId' | 'rating' | 'content'>,
) => {
  const res = await axiosInstance.post('/reviews', payload)

  return res.data
}
