'use client';

import { button, Card, flexCol, flexRow, flexRowICenter, mainTitle, subTitle } from "@/styles/customStyle";
import { RestaurantCardInfo } from "@/types/Stadium";
import { cn } from "@/utils/cn";
import { Heart, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RestaurantCard({ restaurant } : RestaurantCardInfo){
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  const handleDetailClick = () => {
    router.push(`/restaurants/${restaurant.id}`);
  }

  return(
    <div className={cn(Card(), 'flex flex-col h-full')}>
      <div className={flexRow('justify-between')}>
        <h2 className={cn(mainTitle('sm:text-lg'), 'truncate')}>{restaurant.name}</h2>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`p-1 rounded-full`}
          >
          <Heart fill={isFavorite ? 'red' : 'none'} color={isFavorite ? 'red' : 'black'} />
        </button>
      </div>

      <div className={flexCol('gap-0')}>
          <span className={subTitle('text-sm font-semibold')}>{restaurant.category}</span>
          <span className={cn(subTitle(flexRowICenter()), 'text-sm font-semibold')}>
            <Star fill="#FFD94D" strokeWidth={0} width={18} height={18} />
            {restaurant.avgRating}
          </span>
          <span className="inline-block w-fit mt-1 px-2 py-1 text-xs font-semibold bg-gray-200 bg-opacity-75 rounded-full">{restaurant.distance} km</span>
      </div>

        <div className='flex justify-center mt-4'>
          <button className={cn(button(), 'w-full text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2')}
            onClick={handleDetailClick}>상세보기</button>
        </div>
    </div>
  )
}