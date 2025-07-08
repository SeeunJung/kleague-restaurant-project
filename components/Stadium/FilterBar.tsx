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
  const categories = [
    '전체',
    '한식',
    '양식',
    '중식',
    '일식',
    '분식',
    '기타',
  ]
  const sorting = [
    { value: 'distance', label: '거리순' },
    { value: 'rating', label: '평점순' },
  ]

  return (
    <div className={'w-4/5'}>
      <div className="flex gap-4 items-center">
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 text-sm rounded-full border border-gray-300"
        >
          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category === '전체' ? '전체' : category}
            </option>
          ))}
        </select>

        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 text-sm rounded-full border border-gray-300"
        >
          {sorting.map((sort) => (
            <option
              key={sort.value}
              value={sort.value}
            >
              {sort.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
