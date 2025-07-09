import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { FavoriteProps } from '@/types/Mypage'
import UserFavorites from './UserFavorites'
import UserReviews from './UserReviews'
import { Review } from '@/types/Review'

interface UserTabsProps {
  favorites: FavoriteProps[]
  reviews: Review[]
  onRemoveFavorite?: (restaurantId: number) => void
}

export default function MypageTabs({
  favorites,
  reviews,
  onRemoveFavorite,
}: UserTabsProps) {
  return (
    <Tabs
      defaultValue="favorites"
      className="w-full"
    >
      <TabsList>
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
        <UserReviews reviews={reviews} />
      </TabsContent>
    </Tabs>
  )
}
