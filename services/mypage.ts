import { User } from '@/types/Auth'
import axiosInstance from '@/utils/axiosInstance'

export const setUserData = async (
  data: Partial<User>,
): Promise<User> => {
  const res = await axiosInstance.patch(`/users/me`, data)
  return res.data
}
