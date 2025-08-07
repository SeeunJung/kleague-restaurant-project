'use client'

import { useAuthStore } from '@/store/useAuthStore'
import { useUserStore } from '@/store/useUserStore'
import { useEffect } from 'react'

export default function FavoritesInitializer() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const { favInitialized, initializeFavorites, resetUserData } =
    useUserStore()

  useEffect(() => {
    if (accessToken && !favInitialized) {
      initializeFavorites()
    }
  }, [accessToken, favInitialized, initializeFavorites])

  useEffect(() => {
    resetUserData()
  }, [accessToken, resetUserData])

  return null
}
