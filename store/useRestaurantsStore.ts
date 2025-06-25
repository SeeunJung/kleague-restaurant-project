import { Restaurant } from '@/types/Restaurant'
import { create } from 'zustand'

interface RestaurantsState {
  restaurants: Restaurant[]
  setRestaurants: (restaurants: Restaurant[]) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  sort: string
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const useRestaurantsStore = create<RestaurantsState>(
  (set) => ({
    restaurants: [],
    setRestaurants: (restaurants) => set({ restaurants }),
    selectedCategory: '',
    setSelectedCategory: (category) =>
      set({ selectedCategory: category }),
    sort: 'rating',
    loading: false,
    setLoading: (loading) => set({ loading }),
  }),
)
