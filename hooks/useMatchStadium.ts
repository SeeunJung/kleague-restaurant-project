import { useStadiumsStore } from '@/store/useStadiumsStore'
import { Stadium } from '@/types/Stadium'

function useMatchStadium(stadiumId: number): Stadium | undefined {
  const { stadiums } = useStadiumsStore()
  const matchedStadium = stadiums?.find((s) => s.id === stadiumId)

  return matchedStadium
}

export default useMatchStadium
