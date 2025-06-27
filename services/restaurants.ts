import { Restaurant } from '@/types/Restaurant'
import axiosInstance from '@/utils/axiosInstance'

type GetRestaurantsParams = {
  category?: string
  sort?: string
}

export const getRestaurants = async (
  params?: GetRestaurantsParams,
): Promise<Restaurant[]> => {
  const res = await axiosInstance.get('/restaurants', { params })
  return res.data
}

export const getRestaurantsDetail = async (
  restId: number,
): Promise<Restaurant> => {
  const res = await axiosInstance.get(`/restaurants/${restId}`)
  return res.data
}
