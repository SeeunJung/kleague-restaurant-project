import { Restaurant } from '@/types/Restaurant'

export interface Stadium {
  id: number
  name: string
  team: string
  address: string
  latitude: number
  longitude: number
  logo: string
  restaurants: Partial<Restaurant>[]
  restaurantCount: number
}
