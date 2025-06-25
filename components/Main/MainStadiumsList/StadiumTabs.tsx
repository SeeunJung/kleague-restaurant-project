import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { KLEAGUE_TYPE } from '@/constants'

type StadiumTabsContentProps = {
  onSelect: (val: string) => void
}

function StadiumTabs({ onSelect }: StadiumTabsContentProps) {
  return (
    <TabsList>
      {KLEAGUE_TYPE.map(({ value, label }) => (
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

export default StadiumTabs
