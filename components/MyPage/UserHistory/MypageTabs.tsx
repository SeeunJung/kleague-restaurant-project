import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { FavoriteProps } from '@/types/Mypage'
import UserFavorites from './UserFavorites'

interface UserTabsProps {
  favorites: FavoriteProps[]
}

export default function MypageTabs({ favorites }: UserTabsProps) {
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
        <UserFavorites favorites={favorites} />
      </TabsContent>

      <TabsContent value="reviews">
        <div>리뷰 목록</div>
      </TabsContent>
    </Tabs>
  )
}
