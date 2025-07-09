'use client'
import { createContext, useContext, useState } from 'react'

type StadiumFilterContextProps = {
  keyword: string
  setKeyword: (keyword: string) => void
}

const StadiumFilterContext =
  createContext<StadiumFilterContextProps | null>(null)

export const StadiumFilterProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [keyword, setKeyword] = useState<string>('')

  return (
    <StadiumFilterContext.Provider value={{ keyword, setKeyword }}>
      {children}
    </StadiumFilterContext.Provider>
  )
}

export const useStadiumFilter = () => {
  const context = useContext(StadiumFilterContext)
  if (!context) throw new Error('Provider 안에서 써라')
  return context
}
