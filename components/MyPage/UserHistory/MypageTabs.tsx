'use client'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { UserData } from '@/types/Mypage'
import UserFavorites from './UserFavorites'
import UserReviews from './UserReviews'
import { useUserStore } from '@/store/useUserStore'
import { useEffect } from 'react'

interface UserTabsProps {
  user: UserData
}

export default function MypageTabs({ user }: UserTabsProps) {
  const {
    setFavorites,
    favInitialized,
    setFavInitialized,
    myReviews,
    setMyReviews,
    refetchFavorites,
  } = useUserStore()

  useEffect(() => {
    if (!favInitialized) {
      setFavorites(user.favorites)
      setFavInitialized(true)
    }
    setMyReviews(user.reviews)
  }, [
    user,
    setFavorites,
    setMyReviews,
    favInitialized,
    setFavInitialized,
  ])

  useEffect(() => {
    refetchFavorites()
  }, [refetchFavorites])
  return (
    <Tabs
      defaultValue="favorites"
      className="w-full"
    >
      <TabsList className="flex w-full justify-between">
        <TabsTrigger value="favorites">즐겨찾기</TabsTrigger>
        <TabsTrigger value="reviews">내가 남긴 리뷰</TabsTrigger>
      </TabsList>

      <TabsContent value="favorites">
        <UserFavorites />
      </TabsContent>

      <TabsContent value="reviews">
        <UserReviews reviews={myReviews} />
      </TabsContent>
    </Tabs>
  )
}
