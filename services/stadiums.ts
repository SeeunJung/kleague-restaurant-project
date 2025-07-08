import { Stadium } from '@/types/Stadium'
import axiosInstance from '@/utils/axiosInstance'

export const getStadiums = async (): Promise<Stadium[]> => {
  const res = await axiosInstance.get('/stadiums')
  return res.data
}

export const getStadiumsDetail = async (
  stadiumId: number,
): Promise<Stadium> => {
  const res = await axiosInstance.get(`stadiums/${stadiumId}`)
  return res.data
}
