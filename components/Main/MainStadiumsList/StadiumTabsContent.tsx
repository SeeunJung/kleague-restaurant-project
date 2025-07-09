import { TabsContent } from '@/components/ui/tabs'
import { KLEAGUE_TYPE } from '@/constants'
import { cn } from '@/utils/cn'
import { Stadium } from '@/types/Stadium'
import StadiumShowButtons from './StadiumShowButtons'
import StadiumCard from '../../common/StadiumCard'
import StadiumCardSkeleton from '@/components/Skeleton/StadiumCardSkeleton'

type StadiumTabsContentProps = {
  tab: string
  stadiums: Stadium[] | null
  isShowAll: boolean
  onToggle: () => void
}

function StadiumTabsContent({
  tab,
  stadiums,
  isShowAll,
  onToggle,
}: StadiumTabsContentProps) {
  if (!stadiums)
    return (
      <TabsContent value={tab}>
        <div
          className={cn(
            'grid',
            'sm:grid-cols-1',
            'md:grid-cols-3',
            'gap-5',
          )}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <StadiumCardSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      </TabsContent>
    )

  const visibleStadiums = isShowAll ? stadiums : stadiums.slice(0, 9)

  return (
    <>
      {KLEAGUE_TYPE.map(({ value }) => (
        <TabsContent
          key={value}
          value={value}
          className={cn('space-y-4')}
        >
          <div
            className={cn(
              'grid',
              'sm:grid-cols-1',
              'md:grid-cols-3',
              'gap-5',
            )}
          >
            {visibleStadiums.map((stadium) => (
              <StadiumCard
                key={stadium.id}
                stadium={stadium}
              />
            ))}
          </div>
          {stadiums.length >= 9 && (
            <StadiumShowButtons
              isShowAll={isShowAll}
              onChange={onToggle}
            />
          )}
        </TabsContent>
      ))}
    </>
  )
}
export default StadiumTabsContent
