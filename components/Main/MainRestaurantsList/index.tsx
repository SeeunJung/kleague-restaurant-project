'use client'
import { useRestaurantsStore } from '@/store/useRestaurantsStore'
import { Card, flexCol } from '@/styles/customStyle'
import { cn } from '@/utils/cn'
import { Tabs } from '../../ui/tabs'
import RestaurantTabsContent from './RestaurantTabsContent'
import SectionTabsHeader from '../SectionTabsHeader'
import TabsListContent from '../TabsListContent'
import useFetchRestaurants from '@/hooks/useFetchRestaurants'

function MainRestaurantList() {
  const {
    restaurants,
    selectedCategory,
    setSelectedCategory,
    sort,
    loading,
  } = useRestaurantsStore()

  useFetchRestaurants(selectedCategory, sort)

  return (
    <div className={flexCol('w-full', Card(), 'mb-4')}>
      <Tabs
        defaultValue=""
        value={selectedCategory}
        onValueChange={setSelectedCategory}
        className={cn('w-full')}
      >
        <SectionTabsHeader title="인기 맛집">
          <TabsListContent
            type="restaurant"
            onSelect={setSelectedCategory}
          />
        </SectionTabsHeader>
        <RestaurantTabsContent
          restaurants={restaurants}
          isLoading={loading}
        />
      </Tabs>
    </div>
  )
}

export default MainRestaurantList
