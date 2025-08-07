import { fetchFavorites } from '@/services/favorites'
import { editReview, deleteReview } from '@/services/review'
import { FavoriteProps } from '@/types/Mypage'
import { Review } from '@/types/Review'
import { create } from 'zustand'

interface UserState {
  favInitialized: boolean
  setFavInitialized: (value: boolean) => void

  favorites: FavoriteProps[]
  initializeFavorites: () => void
  setFavorites: (favorites: FavoriteProps[]) => void
  refetchFavorites: () => void
  addFavorites: (favorites: FavoriteProps) => void
  removeFavorites: (restaurantId: number) => void

  myReviews: Review[]
  setMyReviews: (myReviews: Review[]) => void
  editMyReview: (
    id: number,
    payload: Pick<Review, 'rating' | 'content'>,
  ) => void
  deleteMyReview: (id: number) => void

  resetUserData: () => void
}

export const useUserStore = create<UserState>((set, get) => ({
  favInitialized: false,
  setFavInitialized: (value) => {
    set({ favInitialized: value })
  },
  favorites: [],
  setFavorites: (favorites) => {
    set({ favorites })
  },
  initializeFavorites: async () => {
    const state = get()
    if (state.favInitialized) return
    try {
      const favorites = await fetchFavorites()
      set({
        favorites,
        favInitialized: true,
      })
    } catch (err) {
      console.error(err)
    }
  },
  refetchFavorites: async () => {
    try {
      const updated = await fetchFavorites()
      set({ favorites: updated })
    } catch (err) {
      console.error(err)
      throw new Error('즐겨찾기 재조회에 실패했습니다.')
    }
  },
  addFavorites: (favorite) =>
    set((state) => ({
      favorites: [...state.favorites, favorite],
    })),
  removeFavorites: (restaurantId) =>
    set((state) => ({
      favorites: state.favorites.filter(
        (fav) => fav.restaurantId !== restaurantId,
      ),
    })),
  myReviews: [],
  setMyReviews: (myReviews) => {
    set({ myReviews })
  },
  editMyReview: async (id, payload) => {
    try {
      const updated = await editReview(id, payload)
      set((state) => ({
        myReviews: state.myReviews.map((r) =>
          r.id === id
            ? {
                ...r,
                content: updated.content,
                rating: updated.rating,
              }
            : r,
        ),
      }))
    } catch (err) {
      console.error(err)
      throw new Error('리뷰 수정에 실패했습니다.')
    }
  },
  deleteMyReview: async (id) => {
    try {
      await deleteReview({ id })
      set((state) => ({
        myReviews: state.myReviews.filter((r) => r.id !== id),
      }))
    } catch (err) {
      console.error(err)
      throw new Error('리뷰 삭제에 실패했습니다.')
    }
  },

  resetUserData: () => {
    set({
      favInitialized: false,
      favorites: [],
      myReviews: [],
    })
  },
}))
