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
  stadiumId: number
  stadium: Stadium
  avgRating: number
  reviewCount: number
  reviews: Review[]
  distance?: number
}

export interface RestaurantCardInfo {
  restaurant: Restaurant
  showDistance?: boolean
  stadiumName?: string
  onRemoveFavorite?: (restaurantId: number) => void
}

export type RestaurantSortType = '평점순' | '리뷰순' | '이름순'
export type RestaurantViewType = '카드형' | '리스트형'
