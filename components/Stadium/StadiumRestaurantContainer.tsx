import { Card, flexCol, mainTitle } from "@/styles/customStyle";
import RestaurantCard from "../Card/RestaurantCard";
import getDistance from "@/utils/getDistance";
import { RestaurantInfo } from "@/types/Stadium";
import { getStadiumDetailWithRes } from "@/services/stadiums";

export default async function StadiumRestaurantContainer({ id } : { id:number }){
  const stadium = await getStadiumDetailWithRes(id);
  const {latitude: stadiumLat, longitude: stadiumLng, restaurants } = stadium;
  const topRestaurants = restaurants.slice(0,9);
  const restaurantDetails: RestaurantInfo[] = [];

  for(const r of topRestaurants){
    const distance = getDistance(stadiumLat, stadiumLng, r.latitude, r.longitude);
    const avgRating = 3; //임의값 설정, 추후 수정 예정
    restaurantDetails.push({
      ...r,
      distance,
      avgRating
    })
  }

  return(
    <div className={flexCol('w-full justify-center')}>
      <div>
        <span className={mainTitle('mt-2 mb-2')}>근처 맛집</span>
      </div>
      <div className={Card('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full mx-auto gap-4')}>
        {restaurantDetails.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  )
}