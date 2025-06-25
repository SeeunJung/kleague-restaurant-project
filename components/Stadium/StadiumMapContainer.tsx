import { Card, flexColIJCenter } from "@/styles/customStyle";
import StadiumInfo from "./StadiumInfo";
import StadiumMap from "./StadiumMap";
import { RestaurantInfo } from "@/types/Stadium";

export default async function StadiumMapContainer({ id } : { id: number }){
  const response = await fetch(`https://kleague-restaurant-api.gaanii.dev/stadiums/${id}`,
    {cache: 'no-store'}
  );
  if(!response.ok){
    return <div>구장을 불러오지 못했습니다.</div>
  }
  const stadium = await response.json();
  const { name, team, address, latitude, longitude, restaurants } = stadium;

  return(
    <div className={Card('w-full mx-auto')}>
      <StadiumInfo
        name={name}
        team={team}
        address={address}
        latitude={0}
        longitude={0}
        restaurants={[]}
      />

      <div className={flexColIJCenter()}>
        <StadiumMap
          latitude={latitude}
          longitude={longitude}
          name={name}
          restaurants={restaurants.map((r : RestaurantInfo) => ({
            id: r.id,
            name: r.name,
            latitude: r.latitude,
            longitude: r.longitude
          }))}
         />
      </div>
    </div>
  )
}