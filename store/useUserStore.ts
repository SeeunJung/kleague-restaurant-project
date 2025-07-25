import { editReview, deleteReview } from '@/services/review'
import { FavoriteProps } from '@/types/Mypage'
import { Review } from '@/types/Review'
import { create } from 'zustand'

interface UserState {
  favorites: FavoriteProps[]
  setFavorites: (favorites: FavoriteProps[]) => void
  myReviews: Review[]
  setMyReviews: (myReviews: Review[]) => void
  editMyReview: (
    id: number,
    payload: Pick<Review, 'rating' | 'content'>,
  ) => void
  deleteMyReview: (id: number) => void
}

export const useUserStore = create<UserState>((set) => ({
  favorites: [],
  setFavorites: (favorites) => {
    set({ favorites })
  },
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
}))
