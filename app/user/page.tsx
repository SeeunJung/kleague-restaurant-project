'use client'

import LoadingSpinner from '@/components/common/LoadingSpinner'
import MypageTabs from '@/components/MyPage/UserHistory/MypageTabs'
import DefaultProfile from '@/components/MyPage/UserProfile/DefaultProfile'
import EditProfile from '@/components/MyPage/UserProfile/EditProfile'
import { useAuthStore } from '@/store/useAuthStore'
import { Card, flexColIJCenter } from '@/styles/customStyle'
import { UserData } from '@/types/Mypage'
import axiosInstance from '@/utils/axiosInstance'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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

  const removeFavorite = (restaurantId: number) => {
    if (!user) return
    setUser({
      ...user,
      favorites: user.favorites.filter(
        (fav) => fav.restaurant.id !== restaurantId,
      ),
    })
  }

  if (!hasMounted || !accessToken) return <LoadingSpinner />
  if (!user) return <LoadingSpinner />

  return (
    <div className={flexColIJCenter('gap-[20px] mt-6 mb-6 p-6')}>
      <div className="w-full max-w-4xl gap-4">
        <div className={Card()}>
          <DefaultProfile
            user={user}
            onEdit={() => setIsEditing(true)}
          />
          {isEditing ? (
            <>
              <hr className="mt-2 mb-2" />
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
            </>
          ) : (
            ''
          )}
        </div>

        <div className={Card('mt-4')}>
          <MypageTabs
            user={user}
            onRemoveFavorite={removeFavorite}
          />
        </div>
      </div>
    </div>
  )
}
