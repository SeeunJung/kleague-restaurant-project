import { FavoriteTeam } from './Auth'
import { Restaurant } from './Restaurant'
import { Review } from './Review'

export interface FavoriteProps {
  id: number
  restaurantId: number
  restaurant: Restaurant
}

export interface UserData {
  id: number
  nickname: string
  email: string
  phoneNumber: string
  favoriteTeam: FavoriteTeam
  createdAt: string
  updatedAt: string
  favorites: FavoriteProps[]
  reviews: Review[]
}
