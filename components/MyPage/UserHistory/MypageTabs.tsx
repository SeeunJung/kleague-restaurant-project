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
import useModal from '@/hooks/useModal'
import Modal from '@/components/common/Modal'

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
  const { modalOpen, setModalOpen, modalContent, openModal } =
    useModal()
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
        <UserReviews
          reviews={reviews}
          openModal={openModal}
        />
        <Modal
          isOpen={modalOpen}
          onOpenChange={setModalOpen}
          contents={modalContent}
        />
      </TabsContent>
    </Tabs>
  )
}
