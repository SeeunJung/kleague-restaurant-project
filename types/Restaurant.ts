import { Review } from './Review'
import { Stadium } from './Stadium'

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
  stadium: Stadium
  avgRating: number
  reviewCount: number
  reviews: Review[]
}
