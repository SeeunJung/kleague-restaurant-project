export interface FavoriteRestaurantProps {
  id: number
  name: string
  category: string
  address: string
  stadiumId: number
}

export interface FavoriteProps {
  id: number
  restaurantId: number
  restaurant: FavoriteRestaurantProps
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
}
