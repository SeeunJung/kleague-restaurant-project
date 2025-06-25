import { K1_TEAMS, K2_TEAMS } from '@/constants'
import { Stadium } from '@/types/Stadium'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StadiumsState {
  stadiums: Stadium[] | null
  k1Stadiums: Stadium[] | null
  k2Stadiums: Stadium[] | null
  setStadiums: (stadiums: Stadium[]) => void
}

export const useStadiumsStore = create<StadiumsState>()(
  persist(
    (set) => ({
      stadiums: null,
      k1Stadiums: null,
      k2Stadiums: null,
      setStadiums: (stadiums) =>
        set({
          stadiums,
          k1Stadiums: stadiums.filter((s) =>
            K1_TEAMS.includes(s.team),
          ),
          k2Stadiums: stadiums.filter((s) =>
            K2_TEAMS.includes(s.team),
          ),
        }),
    }),
    {
      name: 'stadium-storage',
    },
  ),
)
