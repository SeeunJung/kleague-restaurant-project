import { Card, flexColIJCenter } from '@/styles/customStyle'
import StadiumInfo from './StadiumInfo'
import StadiumMap from './StadiumMap'
import { getStadiumsDetail } from '@/services/stadiums'
import { Restaurant } from '@/types/Restaurant'

export default async function StadiumMapContainer({
  id,
}: {
  id: number
}) {
  const stadium = await getStadiumsDetail(id)
  const {
    name,
    team,
    logo,
    address,
    latitude,
    longitude,
    restaurants,
  } = stadium

  return (
    <div className={Card('w-full mx-auto')}>
      <StadiumInfo
        name={name}
        team={team}
        address={address}
        logo={logo}
        latitude={0}
        longitude={0}
        restaurants={[]}
      />

      <div className={flexColIJCenter()}>
        <StadiumMap
          latitude={latitude}
          longitude={longitude}
          name={name}
          logo={logo}
          restaurants={restaurants?.map((r: Partial<Restaurant>) => ({
            id: r.id,
            name: r.name,
            category: r.category,
            phone: r.phone,
            businessHours: r.businessHours,
            latitude: r.latitude,
            longitude: r.longitude,
          }))}
        />
      </div>
    </div>
  )
}
