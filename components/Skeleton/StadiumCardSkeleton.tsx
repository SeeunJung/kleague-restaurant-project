import { Card, flexCol, flexRowICenter } from '@/styles/customStyle'
import Skeleton from 'react-loading-skeleton'

function StadiumCardSkeleton() {
  return (
    <div className={flexCol(Card(), 'gap-5', 'h-[230px]')}>
      <div className={flexRowICenter('justify-between')}>
        <Skeleton
          circle
          width={40}
          height={40}
        />
        <Skeleton width={40} />
      </div>
      <div className={flexCol()}>
        <Skeleton height={28} />
        <Skeleton height={20} />
      </div>
      <div className={flexRowICenter('justify-between')}>
        <Skeleton
          height={20}
          width={55}
        />
        <Skeleton
          circle
          height={36}
          width={37}
        />
      </div>
    </div>
  )
}

export default StadiumCardSkeleton
