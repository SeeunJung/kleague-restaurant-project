'use client'

import RestaurantCard from "@/components/Card/RestaurantCard"
import { useAuthStore } from "@/store/useAuthStore"
import { mainTitle } from "@/styles/customStyle"
import axiosInstance from "@/utils/axiosInstance"
import { getStadiumNameById } from "@/utils/getStudiumById"
import { useEffect, useState } from "react"

interface FavoriteRestaurantProps{
  id: number
  name: string
  category: string
  address: string
  stadiumId: number
}

interface FavoriteProps{
  id: number
  restaurantId: number
  restaurant: FavoriteRestaurantProps
}

interface UserData{
  favorites: FavoriteProps[]
}

export default function UserFavorites(){
  const [favorites, setFavorites] = useState<FavoriteProps[]>([]);
  const [loading, setLoading] = useState(true);
  const accessToken = useAuthStore(state => state.accessToken);

  useEffect(() => {
    const fetchFavorites = async() => {
      try{
        const res = await axiosInstance.get<UserData>('/users/me');
        setFavorites(res.data.favorites);
      } catch(err){
        console.error('즐겨찾기 목록을 불러오는 데 실패했습니다.', err);
      } finally{
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [accessToken, favorites]);

  if(loading) return <div>로딩 중...</div>
  if(favorites.length === 0) return <div>즐겨찾기한 식당이 없습니다.</div>

  return(
    <div>
      <h3 className={mainTitle("mb-2")}>즐겨찾기한 맛집</h3>
      <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full mx-auto gap-4"}>
        {favorites.map(({ restaurant }) => (
        <RestaurantCard key={restaurant.id} restaurant={{...restaurant}} showDistance={false} stadiumName={getStadiumNameById(restaurant.stadiumId)} />
      ))}
      </div>
    </div>
  )
}