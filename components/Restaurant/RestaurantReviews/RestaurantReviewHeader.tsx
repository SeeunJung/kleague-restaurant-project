import CustomSelectInput from '@/components/common/CustomSelectInput'
import { sortLabelToValueMap, sortValueToLabelMap } from '@/constants'
import { useReviewSort } from '@/context/ReviewSortContext'
import { flexRowICenter, mainTitle } from '@/styles/customStyle'
import { cn } from '@/utils/cn'

type RestaurantReviewHeaderProps = {
  reviewCount: number
}
function RestaurantReviewHeader({
  reviewCount,
}: RestaurantReviewHeaderProps) {
  const { sortBy, setSortBy } = useReviewSort()

  return (
    <div className={flexRowICenter('justify-between')}>
      <div
        className={mainTitle('w-full')}
      >{`리뷰(${reviewCount})`}</div>
      <div className={cn('w-[300px]')}>
        <CustomSelectInput
          placeholder="리뷰 정렬하기"
          name="sortBy"
          value={sortValueToLabelMap[sortBy]}
          onChange={(label) => {
            const mappedValue = sortLabelToValueMap[label]
            if (mappedValue) setSortBy(mappedValue)
          }}
          options={['작성 순', '별점 높은 순', '별점 낮은 순']}
        />
      </div>
    </div>
  )
}

export default RestaurantReviewHeader
