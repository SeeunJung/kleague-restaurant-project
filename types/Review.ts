import { User } from './Auth'
import { Restaurant } from './Restaurant'

export type Review = {
  id: number
  content: string
  rating: number
  userId: number
  restaurantId: number
  createdAt: Date
  updatedAt: Date
  user: User
  restaurant?: Pick<Restaurant, 'id' | 'name'>
}

export type ReviewFormType = {
  rating: number
  content: string
}

export type SortOptions = 'created' | 'ratingDesc' | 'ratingAsc'
