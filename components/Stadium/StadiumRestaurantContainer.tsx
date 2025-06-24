import { Card, flexCol, mainTitle } from "@/styles/customStyle";
import RestaurantCard from "../Card/RestaurantCard";

interface RestaurantProps{
  id: number;
  name: string;
  category: string;
  // latitude: number;
  // longitude: number;
  distance: number;
  avgRating: number;
}

interface RestaurantListProps{
  id: number;
}

async function fetchRestaurantDetails(id: number) : Promise<RestaurantProps>{
  const response = await fetch(`https://kleague-restaurant-api.gaanii.dev/restaurants/${id}`, {
    cache: "no-store"
  });
  if(!response.ok){
    throw new Error("맛집 정보를 불러오지 못했습니다.");
  }
  const restaurant = await response.json();
  return {
    id: restaurant.id,
    name: restaurant.name,
    category: restaurant.category,
    avgRating: restaurant.avgRating,
    distance: 0
  }
}

export default async function StadiumRestaurantContainer({ id } : { id:number }){
  const response = await fetch(`https://kleague-restaurant-api.gaanii.dev/stadiums/${id}`,
    {cache: 'no-store'}
  );
  if(!response.ok){
    return <div>맛집 정보를 불러오지 못했습니다.</div>
  }
  const stadium = await response.json();
  const { restaurants } : { restaurants: RestaurantListProps[] } = stadium;
  const restaurantDetails = await Promise.all(
    restaurants.map((r) => fetchRestaurantDetails(r.id))
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