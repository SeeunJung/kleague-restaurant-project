import PageTitle from '@/components/common/PageTitle'
import MainStadiumMap from '@/components/Main/MainStadiumsMap'
import MainStadiumList from '@/components/Main/MainStadiumsList'
import MainRestaurantList from '@/components/Main/MainRestaurantsList'
import { Pages } from '@/styles/customStyle'
import { StadiumFilterProvider } from '@/context/StadiumFilterContext'
import MainSearchbar from '@/components/Main/MainSearchbar'

export default function Home() {
  return (
    <StadiumFilterProvider>
      <div className={Pages()}>
        <PageTitle subT="경기장 주변 맛집을 찾아보세요" />
        <MainSearchbar />
        <MainRestaurantList />
        <MainStadiumMap />
        <MainStadiumList />
      </div>
    </StadiumFilterProvider>
  )
}
