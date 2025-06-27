'use client'

import { useAuthStore } from "@/store/useAuthStore"
import axiosInstance from "@/utils/axiosInstance";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface FavoriteButtonProps{
  restaurantId: number
}

export default function FavoriteButton({ restaurantId }: FavoriteButtonProps){
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useAuthStore(state => state.accessToken);

  useEffect(() => {
    const checkFavorite = async() => {
      if(!accessToken){
        setIsFavorite(false);
        return;
      }
      try{
        const res = await axiosInstance.post('/favorites/me');
        const favorites = res.data as {restaurantId: number}[];
        const exists = favorites.some((fav) => fav.restaurantId === restaurantId);
        setIsFavorite(exists)
      } catch(err){
        console.error('즐겨찾기 불러오기 실패', err);
      }
    }
    checkFavorite()
  }, [restaurantId, accessToken])

  const toggleFavorite = async() => {
    if(!accessToken){
      alert('즐겨찾기는 로그인 후에 사용 가능합니다.')
      return;
    }
    if(isLoading) return;
    setIsLoading(true);

    try{
      if(isFavorite){
        await axiosInstance.delete(`/favorites/${restaurantId}`);
        setIsFavorite(false);
      } else{
        await axiosInstance.post(`/favorites/${restaurantId}`);
        setIsFavorite(true);
      }
    } catch(error){
      console.error('즐겨찾기 토글 실패', error)
    } finally{
      setIsLoading(false);
    }
  }

  return(
    <button className={`p-1 rounded-full`}
      onClick={toggleFavorite}
      disabled={isLoading}
    >
      <Heart fill={isFavorite ? 'red' : 'none'} color={isFavorite ? 'red' : 'black'} />
    </button>
  )
}