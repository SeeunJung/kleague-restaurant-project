'use client'

import UserFavorites from '@/components/MyPage/UserHistory/UserFavorites'
import DefaultProfile from '@/components/MyPage/UserProfile/DefaultProfile'
import EditProfile from '@/components/MyPage/UserProfile/EditProfile'
import { useAuthStore } from '@/store/useAuthStore'
import { Card, flexColIJCenter } from '@/styles/customStyle'
import axiosInstance from '@/utils/axiosInstance'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const [hasMounted, setHasMounted] = useState(false)
  const [user, setUser] = useState<UserData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const accessToken = useAuthStore.getState().accessToken

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (!hasMounted) return
    if (!accessToken) {
      alert('로그인 후 이용 가능한 서비스입니다.')
      router.push('/login')
    }
  }, [hasMounted, accessToken, router])

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
  }, [accessToken])

  if (!hasMounted || !accessToken) return null
  if (!user) return <div>유저 정보를 불러오는 중입니다.</div>

  return (
    <div className={flexColIJCenter('gap-[20px mt-6 mb-6 p-6')}>
      <div className="w-full max-w-4xl gap-4">
        <div className={Card()}>
          {isEditing ? (
            <EditProfile
              user={user}
              onSave={(updatedFields) => {
                setUser({
                  ...user,
                  ...updatedFields,
                })
                setIsEditing(false)
              }}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
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
