import axiosInstance from '@/utils/axiosInstance'

interface Favorite {
  restaurantId: number
}

export const fetchFavorites = async (): Promise<Favorite[]> => {
  const res = await axiosInstance.post('/favorites/me')
  return res.data
}

export const addFavorite = async (
  restaurantId: number,
): Promise<void> => {
  await axiosInstance.post(`/favorites/${restaurantId}`)
}

export const deleteFavorite = async (
  restaurantId: number,
): Promise<void> => {
  await axiosInstance.delete(`/favorites/${restaurantId}`)
}
