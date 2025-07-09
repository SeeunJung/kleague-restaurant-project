import { TabsContent } from '@/components/ui/tabs'
import { RESTAURANT_CATEGORIES } from '@/constants'
import { Restaurant } from '@/types/Restaurant'
import { Swiper, SwiperSlide } from 'swiper/react'
import MainRestaurantCard from './RestaurantCard'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import SwiperCard from '@/components/Skeleton/SwiperCard'

type RestaurantTabsContentProps = {
  restaurants: Restaurant[]
  isLoading: boolean
}

function RestaurantTabsContent({
  restaurants,
  isLoading,
}: RestaurantTabsContentProps) {
  const renderItem =
    isLoading || restaurants.length === 0
      ? Array.from({ length: 4 }).map((_, i) => (
          <SwiperSlide key={`skeleton-${i}`}>
            <SwiperCard />
          </SwiperSlide>
        ))
      : restaurants.slice(0, 10).map((rest) => (
          <SwiperSlide key={rest.id}>
            <MainRestaurantCard restaurant={rest} />
          </SwiperSlide>
        ))

  return (
    <>
      {RESTAURANT_CATEGORIES.map(({ value }) => (
        <TabsContent
          key={value}
          value={value}
        >
          <Swiper
            modules={[Navigation]}
            navigation={true}
            spaceBetween={24}
            grabCursor={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {renderItem}
          </Swiper>
        </TabsContent>
      ))}
    </>
  )
}

export default RestaurantTabsContent
