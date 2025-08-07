import axiosInstance from '@/utils/axiosInstance'

export const fetchFavorites = async () => {
  const res = await axiosInstance.post('/favorites/me')
  return res.data
}

export const addFavorite = async (restaurantId: number) => {
  await axiosInstance.post(`/favorites/${restaurantId}`)
}

export const deleteFavorite = async (restaurantId: number) => {
  await axiosInstance.delete(`/favorites/${restaurantId}`)
}
