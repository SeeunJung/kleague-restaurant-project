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
  onRemoveFavorite?: (restaurantId: number) => void
}

export default function MypageTabs({
  user,
  onRemoveFavorite,
}: UserTabsProps) {
  const { favorites, setFavorites, myReviews, setMyReviews } =
    useUserStore()
  useEffect(() => {
    setFavorites(user.favorites)
    setMyReviews(user.reviews)
  }, [user.favorites, user.reviews, setFavorites, setMyReviews])
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
        <UserFavorites
          favorites={favorites}
          onRemoveFavorite={onRemoveFavorite}
        />
      </TabsContent>

      <TabsContent value="reviews">
        <UserReviews reviews={myReviews} />
      </TabsContent>
    </Tabs>
  )
}
