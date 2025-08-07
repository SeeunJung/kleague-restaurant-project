'use client'

import {
  addFavorite,
  deleteFavorite,
  fetchFavorites,
} from '@/services/favorites'
import { useAuthStore } from '@/store/useAuthStore'
import useModal from '@/hooks/useModal'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import Modal from './Modal'
import { cn } from '@/lib/utils'
import useDebounce from '@/hooks/useDebounce'
import { useUserStore } from '@/store/useUserStore'

interface FavoriteButtonProps {
  restaurantId: number
  version?: 'icon' | 'pill'
}

export default function FavoriteButton({
  restaurantId,
  version = 'icon',
}: FavoriteButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const accessToken = useAuthStore((state) => state.accessToken)
  const { favorites, favInitialized, setFavorites, removeFavorites } =
    useUserStore()
  const { modalOpen, setModalOpen, modalContent, openModal } =
    useModal()

  useEffect(() => {
    if (!accessToken) {
      setIsFavorite(false)
      return
    }

    if (favInitialized) {
      const exists = favorites.some(
        (fav) => fav.restaurantId === restaurantId,
      )
      setIsFavorite(exists)
    }
  }, [favorites, restaurantId, accessToken, favInitialized])

  const toggleFavorite = async () => {
    if (!accessToken) {
      openModal({
        isError: false,
        title: '로그인이 필요합니다',
        description: '즐겨찾기 기능을 사용하려면 로그인 해주세요.',
        onBtnClick: () => {
          window.location.href = '/login'
        },
      })
      return
    }
    if (isLoading) return
    setIsLoading(true)

    try {
      if (isFavorite) {
        await deleteFavorite(restaurantId)
        setIsFavorite(false)
        removeFavorites(restaurantId)
      } else {
        await addFavorite(restaurantId)
        const upadatedFavorites = await fetchFavorites()
        setFavorites(upadatedFavorites)
        setIsFavorite(true)
      }
    } catch (error) {
      console.error('즐겨찾기 토글 실패', error)
    } finally {
      setIsLoading(false)
    }
  }

  const debouncedToggle = useDebounce(toggleFavorite, 500)

  return (
    <button
      className={cn(
        version === 'icon' &&
          'p-2 items-center justify-center rounded-full bg-white border border-gray-200 shadow cursor-pointer',
        version === 'pill' &&
          'flex flex-row items-center gap-2 px-4 py-1 rounded-full bg-white text-black text-xs font-bold border border-gray-300 shadow cursor-pointer',
      )}
      onClick={debouncedToggle}
      disabled={isLoading}
    >
      <Heart
        fill={isFavorite ? 'red' : 'none'}
        color={isFavorite ? 'red' : 'black'}
        className="w-[16px] h-[16px]"
      />
      {version === 'pill' && <span>즐겨찾기</span>}
      <Modal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        contents={modalContent}
      />
    </button>
  )
}
