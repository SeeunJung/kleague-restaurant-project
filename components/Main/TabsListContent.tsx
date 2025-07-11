import React from 'react'
import { TabsList, TabsTrigger } from '../ui/tabs'
import { KLEAGUE_TYPE, RESTAURANT_CATEGORIES } from '@/constants'

type TabsListContentProps = {
  type: 'league' | 'restaurant'
  onSelect: (val: string) => void
}

function TabsListContent({ type, onSelect }: TabsListContentProps) {
  const DATA =
    type === 'league' ? KLEAGUE_TYPE : RESTAURANT_CATEGORIES

  return (
    <TabsList>
      {DATA.map(({ value, label }) => (
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

export default TabsListContent
