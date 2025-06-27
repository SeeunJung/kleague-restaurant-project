import { Stadium, StadiumInfo } from '@/types/Stadium'
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

export const getStadiumDetailWithRes = async(
  id: number
): Promise<StadiumInfo> => {
  const res = await axiosInstance.get(`stadiums/${id}`);
  return res.data;
}