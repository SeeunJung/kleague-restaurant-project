import { mainTitle } from '@/styles/customStyle'
import { cn } from '@/utils/cn'

function MainStadiumMap() {
  return (
    <div className={cn('w-full', 'rounded-lg', 'shadow-lg', 'p-4')}>
      <div className={mainTitle()}>전국 K리그 구장</div>
      <div
        className={cn(
          'bg-gray-100',
          'rounded-lg',
          'w-full',
          'h-[400px]',
        )}
      ></div>
    </div>
  )
}

export default MainStadiumMap
