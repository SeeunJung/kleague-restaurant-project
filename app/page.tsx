import AuthTitle from '@/components/Auth/AuthTitle'
import KeywordSearchbar from '@/components/common/KeywordSearchbar'
import MainStadiumMap from '@/components/Main/MainStadiumsMap'
import MainStadiumList from '@/components/Main/MainStadiumsList'
import MainRestaurantList from '@/components/Main/MainRestaurantsList'
import { Pages } from '@/styles/customStyle'
import { StadiumFilterProvider } from '@/context/StadiumFilterContext'

export default function Home() {
  return (
    <StadiumFilterProvider>
      <div className={Pages()}>
        <AuthTitle subT="경기장 주변 맛집을 찾아보세요" />
        <KeywordSearchbar />
        <MainRestaurantList />
        <MainStadiumMap />
        <MainStadiumList />
      </div>
    </StadiumFilterProvider>
  )
}
