import { User } from './Auth'

export type Review = {
  id: number
  content: string
  rating: number
  userId: number
  restaurantId: number
  createdAt: Date
  updatedAt: Date
  user: User
}

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
  _count?: {
    rating: number
  }
  reviews: Review[]
  avgRating: number
}
