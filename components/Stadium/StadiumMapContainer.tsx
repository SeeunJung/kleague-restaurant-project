import { Card, flexColIJCenter } from "@/styles/customStyle";
import StadiumInfo from "./StadiumInfo";
import StadiumMap from "./StadiumMap";

interface RestaurantProps{
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  businessHours: string;
  team: string;
  remark: string;
  stadiumId: number;
}

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
      />

      <div className={flexColIJCenter()}>
        <StadiumMap
          center={{ latitude, longitude }}
          stadiumName={name}
          restaurants={restaurants.map((r : RestaurantProps) => ({
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