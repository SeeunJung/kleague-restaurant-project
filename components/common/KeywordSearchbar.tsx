'use client'
import { flexColIJCenter, SearchbarInput } from '@/styles/customStyle'
import { cn } from '@/utils/cn'
import { Search } from 'lucide-react'

type KeywordSearchbarProps = {
  keyword: string
  setKeyword: (value: string) => void
  placeholder: string
  isMain?: boolean
}

function KeywordSearchbar({
  keyword,
  setKeyword,
  placeholder,
  isMain = true,
}: KeywordSearchbarProps) {
  return (
    <div className={cn('relative', 'w-full', isMain && 'max-w-md')}>
      <div
        className={flexColIJCenter(
          'absolute',
          'inset-y-0',
          'left-0',
          'pl-3',
          'pointer-events-none',
        )}
      >
        <Search
          size={24}
          color={'#ccc'}
        />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className={SearchbarInput()}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  )
}

export default KeywordSearchbar
