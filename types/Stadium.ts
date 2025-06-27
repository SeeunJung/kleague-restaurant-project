export interface Stadium {
  id: number
  name: string
  team: string
  address: string
  latitude: number
  longitude: number
  logo: string
  restaurantCount: number
}

export interface StadiumInfo {
  id?: number
  name: string
  team?: string
  address?: string
  latitude: number | 0
  longitude: number | 0
  logo: string | ''
  restaurants: RestaurantInfo[] | []
}

export interface RestaurantInfo {
  id: number
  name: string
  category?: string
  latitude: number
  longitude: number
  distance?: number
  phone?: string
  businessHours?: string
  team?: string
  remark?: string
  stadiumId?: number
  avgRating?: number
}

export interface RestaurantCardInfo {
  restaurant: RestaurantInfo
}
