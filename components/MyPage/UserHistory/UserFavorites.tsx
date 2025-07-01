'use client'

import FavoriteCard from "@/components/Card/FavoriteCard"
import RestaurantCard from "@/components/Card/RestaurantCard"
import LoadingSpinner from "@/components/LoadingSpinner"
import { useAuthStore } from "@/store/useAuthStore"
import axiosInstance from "@/utils/axiosInstance"
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

  if(loading) return <LoadingSpinner />
  if(favorites.length === 0) return <div>즐겨찾기한 식당이 없습니다.</div>

  return(
    <div>
      {favorites.map(({ restaurant }) => (
        <RestaurantCard key={restaurant.id} restaurant={{...restaurant}} />
      ))}
    </div>
  )
}