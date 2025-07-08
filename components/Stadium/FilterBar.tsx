import CustomSelectInput from '../common/CustomSelectInput'

interface FilterBarProps {
  category: string
  setCategory: (value: string) => void
  sortBy: string
  setSortBy: (value: string) => void
}

export default function FilterBar({
  category,
  setCategory,
  sortBy,
  setSortBy,
}: FilterBarProps) {
  const sortOptions = [
    { label: '거리순', value: 'distance' },
    { label: '평점순', value: 'rating' },
  ]

  return (
    <div className="w-4/5">
      <div className="flex flex-row gap-4">
        <div className="min-w-[100px] max-w-[200px]">
          <CustomSelectInput
            placeholder="카테고리"
            name="category"
            value={category}
            onChange={setCategory}
            options={['전체', '한식', '중식', '일식', '양식', '분식']}
            isFiltering={true}
          />
        </div>

        <div className="min-w-[100px] max-w-[200px]">
          <CustomSelectInput
            placeholder="정렬"
            name="sortBy"
            value={
              sortOptions.find((opt) => opt.value === sortBy)
                ?.label || ''
            }
            onChange={(label) => {
              const value = sortOptions.find(
                (opt) => opt.label === label,
              )?.value
              if (value) setSortBy(value)
            }}
            options={sortOptions.map((opt) => opt.label)}
            isFiltering={true}
          />
        </div>
      </div>
    </div>
  )
}
