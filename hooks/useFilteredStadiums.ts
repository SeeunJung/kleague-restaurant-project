import { Stadium } from '@/types/Stadium'
import { useMemo } from 'react'

function useFilteredStadiums(
  tab: string,
  keyword: string,
  stadiums: Stadium[] | null,
  k1stadiums: Stadium[] | null,
  k2stadiums: Stadium[] | null,
) {
  const filter = (list: Stadium[] | null) => {
    if (!list) return null
    return list.filter(
      (s) =>
        s.name.toLowerCase().includes(keyword.toLowerCase()) ||
        s.team.toLowerCase().includes(keyword.toLowerCase()),
    )
  }

  return useMemo(() => {
    if (tab === 'k1') return filter(k1stadiums)
    if (tab === 'k2') return filter(k2stadiums)
    return filter(stadiums)
  }, [tab, keyword, stadiums, k1stadiums, k2stadiums])
}

export default useFilteredStadiums
