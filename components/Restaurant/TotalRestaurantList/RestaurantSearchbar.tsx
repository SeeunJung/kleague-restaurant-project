import CustomSelectInput from '@/components/common/CustomSelectInput'
import KeywordSearchbar from '@/components/common/KeywordSearchbar'
import { Button } from '@/components/ui/button'
import { useRestaurantFilter } from '@/context/RestaurantFilterContext'
import {
  Card,
  FilteringButton,
  flexCol,
  flexRowICenter,
  flexRowIJCenter,
  subTitle,
} from '@/styles/customStyle'
import { RestaurantSortType } from '@/types/Restaurant'
import { cn } from '@/utils/cn'
import {
  ArrowDownWideNarrow,
  Funnel,
  Grid3x2Icon,
  List,
} from 'lucide-react'

function TotalRestaurantSearchbar() {
  const {
    keyword,
    setKeyword,
    category,
    setCategory,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
  } = useRestaurantFilter()

  return (
    <div className={Card('w-full', flexCol('gap-4'))}>
      <KeywordSearchbar
        keyword={keyword}
        placeholder="맛집 이름을 검색하세요"
        setKeyword={setKeyword}
        isMain={false}
      />
      <div
        className={cn(
          'grid',
          'sm:grid-cols-2',
          'md:grid-cols-3',
          'gap-4',
        )}
      >
        <div className={flexRowICenter()}>
          <Funnel
            size={20}
            color="#ccc"
          />
          <CustomSelectInput
            placeholder="카테고리 선택"
            name="category"
            value={category}
            onChange={setCategory}
            options={['전체', '한식', '중식', '일식', '양식', '분식']}
          />
        </div>
        <div className={flexRowICenter()}>
          <ArrowDownWideNarrow
            size={20}
            color="#ccc"
          />
          <CustomSelectInput
            placeholder="정렬 기준 선택"
            name="sortBy"
            value={sortBy}
            onChange={(val) => setSortBy(val as RestaurantSortType)}
            options={['이름순', '평점순', '리뷰순']}
          />
        </div>
        <div className={cn('grid', 'grid-cols-2', 'gap-4')}>
          <Button
            className={flexRowIJCenter(
              FilteringButton(),
              viewMode === '카드형' && 'bg-slate-100',
            )}
            onClick={() => setViewMode('카드형')}
          >
            <Grid3x2Icon
              size={16}
              color="#ccc"
            />
            <span className={subTitle()}>카드형</span>
          </Button>
          <Button
            className={flexRowIJCenter(
              FilteringButton(),
              viewMode === '리스트형' && 'bg-slate-100',
            )}
            onClick={() => setViewMode('리스트형')}
          >
            <List
              size={16}
              color="#ccc"
            />
            <span className={subTitle()}>리스트형</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TotalRestaurantSearchbar
