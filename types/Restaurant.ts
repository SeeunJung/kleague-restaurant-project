import { Review } from './Review'

export type Restaurant = {
  id: number
  name: string
  category: string
  address: string
  latitude: number
  longitude: number
  phone: string
  businessHours: string
  team: string
  remark: string | null
  stadiumId: number
  avgRating: number
  reviews: Review[]
}
