import { getRestaurants } from '@/services/restaurants'
import { useRestaurantsStore } from '@/store/useRestaurantsStore'
import {
  Card,
  cardTitle,
  flexCol,
  flexRowICenter,
} from '@/styles/customStyle'
import { cn } from '@/utils/cn'
import { useEffect } from 'react'

import { Tabs } from '../../ui/tabs'
import RestaurantTabs from './RestaurantTabs'
import RestaurantTabsContent from './RestaurantTabsContent'

function MainRestaurantList() {
  const {
    restaurants,
    setRestaurants,
    selectedCategory,
    setSelectedCategory,
    sort,
    loading,
    setLoading,
  } = useRestaurantsStore()

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true)

      try {
        const res = await getRestaurants({
          category: selectedCategory,
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
  }, [selectedCategory, sort, setRestaurants, setLoading])

  return (
    <div className={flexCol('w-full', Card(), 'mb-4')}>
      <Tabs
        defaultValue=""
        value={selectedCategory}
        onValueChange={setSelectedCategory}
        className={cn('w-full')}
      >
        <div className={flexRowICenter('justify-between')}>
          <div className={cardTitle()}>인기 맛집</div>
          <RestaurantTabs onSelect={setSelectedCategory} />
        </div>
        <RestaurantTabsContent
          restaurants={restaurants}
          isLoading={loading}
        />
      </Tabs>
    </div>
  )
}

export default MainRestaurantList
