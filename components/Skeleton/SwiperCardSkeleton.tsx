import { Card, flexCol, flexRowICenter } from '@/styles/customStyle'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function SwiperCardSkeleton() {
  return (
    <div className={flexCol(Card(), 'bg-gray-50')}>
      <div className={flexRowICenter('h-[45px]')}>
        <Skeleton
          circle
          width={40}
          height={40}
        />
        <Skeleton height={30} />
      </div>
      <div>
        <Skeleton height={20} />
      </div>
    </div>
  )
}

export default SwiperCardSkeleton
