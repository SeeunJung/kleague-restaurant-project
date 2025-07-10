'use client'
import { SortOptions } from '@/types/Review'
import { createContext, useContext, useState } from 'react'

type ReviewSortContextProps = {
  sortBy: SortOptions
  setSortBy: (sortBy: SortOptions) => void
}

const ReviewSortContext =
  createContext<ReviewSortContextProps | null>(null)

export const ReviewSortProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [sortBy, setSortBy] = useState<SortOptions>('created')

  return (
    <ReviewSortContext.Provider value={{ sortBy, setSortBy }}>
      {children}
    </ReviewSortContext.Provider>
  )
}

export const useReviewSort = () => {
  const context = useContext(ReviewSortContext)
  if (!context) throw new Error('ReviewSortProvider 안에서 써라')
  return context
}
