export interface RestaurantProps {
  id: number
  name: string
  category: string
  address: string
  stadiumId: number
}

export interface FavoriteProps {
  id: number
  restaurantId: number
  restaurant: RestaurantProps
}

export interface ReviewProps {
  id: number
  content: string
  rating: number
  userId: number
  restaurantId: number
  createdAt: string
  updatedAt: string
  restaurant: Partial<RestaurantProps>
}

export interface UserData {
  id: number
  nickname: string
  email: string
  phoneNumber: string
  favoriteTeam: string
  createdAt: string
  updatedAt: string
  favorites: FavoriteProps[]
  reviews: ReviewProps[]
}
