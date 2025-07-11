'use client'
import { getRestaurants } from '@/services/restaurants'
import { useRestaurantsStore } from '@/store/useRestaurantsStore'
import { useEffect } from 'react'

function useFetchRestaurants(category: string, sort: string) {
  const { setRestaurants, setLoading } = useRestaurantsStore()

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true)

      try {
        const res = await getRestaurants({
          category,
          sort,
        })
        setRestaurants(res)
      } catch (e) {
        console.error('useEffect Error: ', e)
        setRestaurants([])
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurants()
  }, [category, sort])
}

export default useFetchRestaurants
