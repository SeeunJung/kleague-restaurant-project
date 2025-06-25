import { Card, flexCol, mainTitle } from "@/styles/customStyle";
import RestaurantCard from "../Card/RestaurantCard";
import getDistance from "@/utils/getDistance";
import { RestaurantInfo, StadiumInfo } from "@/types/Stadium";

async function fetchAvgRating(id: number): Promise<number>{
  const response = await fetch(`https://kleague-restaurant-api.gaanii.dev/restaurants/${id}`);
  if(!response.ok){
    return 0;
  }
  const restaurant = await response.json();
  return restaurant.avgRating;
}

export default async function StadiumRestaurantContainer({ id } : { id:number }){
  const response = await fetch(`https://kleague-restaurant-api.gaanii.dev/stadiums/${id}`);
  if(!response.ok){
    return <div>맛집 정보를 불러오지 못했습니다.</div>
  }
  const stadium : StadiumInfo = await response.json();
  const { latitude: stadiumLat, longitude: stadiumLng, restaurants } = stadium;
  const topRestaurants = restaurants.slice(0, 9);

  const restaurantDetails: RestaurantInfo[] = await Promise.all(
    topRestaurants.map(async (r) => {
      const distance = getDistance(stadiumLat, stadiumLng, r.latitude, r.longitude);
      const avgRating = await fetchAvgRating(r.id);

      return{
        id: r.id,
        name: r.name,
        category: r.category,
        latitude: r.latitude,
        longitude: r.longitude,
        distance,
        avgRating
      };
    })
  );

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