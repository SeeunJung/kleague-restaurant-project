import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RESTAURANT_CATEGORIES } from '@/constants'

type RestaurantTabsProps = {
  onSelect: (val: string) => void
}

function RestaurantTabs({ onSelect }: RestaurantTabsProps) {
  return (
    <TabsList>
      {RESTAURANT_CATEGORIES.map(({ value, label }) => (
        <TabsTrigger
          key={value}
          value={value}
          onClick={() => onSelect(value)}
        >
          {label}
        </TabsTrigger>
      ))}
    </TabsList>
  )
}

export default RestaurantTabs
