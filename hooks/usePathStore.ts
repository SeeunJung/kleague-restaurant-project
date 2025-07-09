import { create } from 'zustand'

type PathState = {
  prevPath: string
  currentPath: string
  setPath: (newPath: string) => void
}

export const usePathStore = create<PathState>((set, get) => ({
  prevPath: '/',
  currentPath: '/',
  setPath: (newPath) => {
    const { currentPath } = get()
    set({
      prevPath: currentPath,
      currentPath: newPath,
    })
  },
}))
