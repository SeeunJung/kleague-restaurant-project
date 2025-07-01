'use client'

import UserFavorites from '@/components/MyPage/UserHistory/UserFavorites'
import DefaultProfile from '@/components/MyPage/UserProfile/DefaultProfile'
import { useAuthStore } from '@/store/useAuthStore'
import { Card, flexColIJCenter } from '@/styles/customStyle'
import axiosInstance from '@/utils/axiosInstance'
import { useEffect, useState } from 'react'

interface FavoriteRestaurantProps {
  id: number
  name: string
  category: string
  address: string
  stadiumId: number
}

interface FavoriteProps {
  id: number
  restaurantId: number
  restaurant: FavoriteRestaurantProps
}
interface UserData {
  id: number
  nickname: string
  email: string
  phoneNumber: string
  favoriteTeam: string
  createdAt: string
  updatedAt: string
  favorites: FavoriteProps[]
}

export default function Page() {
  const [user, setUser] = useState<UserData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const accessToken = useAuthStore((state) => state.accessToken)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get<UserData>('/users/me')
        setUser(res.data)
      } catch (err) {
        console.error('유저 정보 불러오기 실패', err)
      }
    }
    fetchUser()
  }, [])

  if (!accessToken) {
    ;<div>로그인이 필요한 페이지입니다.</div>
  }
  if (!user) return <div>유저 정보를 불러오는 중입니다.</div>

  return (
    <div className={flexColIJCenter('gap-[20px mt-6 mb-6 p-6')}>
      <div className="w-full max-w-4xl gap-4">
        <div className={Card()}>
          {user && (
            <DefaultProfile
              user={user}
              onEdit={() => setIsEditing(true)}
            />
          )}
        </div>

        <div className={Card()}>
          <UserFavorites favorites={user.favorites} />
        </div>
      </div>
    </div>
  )
}
