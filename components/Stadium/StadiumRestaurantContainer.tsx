'use client';

import { cn } from '@/utils/cn';
import { useEffect, useState } from "react";
import { Card, flexCol, mainTitle } from "@/styles/customStyle";
import RestaurantCard from "../Card/RestaurantCard";
import getDistance from "@/utils/getDistance";
import { RestaurantInfo } from "@/types/Stadium";
import { getStadiumDetailWithRes } from "@/services/stadiums";
import FilterBar from "./FilterBar";

export default function StadiumRestaurantContainer({ id }: { id: number }) {
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([]);
  const [category, setCategory] = useState<string>("전체");
  const [sortBy, setSortBy] = useState<string>("distance");

  useEffect(() => {
    const fetchData = async () => {
      const stadium = await getStadiumDetailWithRes(id);
      const { latitude: stadiumLat, longitude: stadiumLng, restaurants } = stadium;

      const processed = restaurants.map((r) => ({
        ...r,
        distance: getDistance(stadiumLat, stadiumLng, r.latitude, r.longitude),
        avgRating: 3 // 추후 API 연동 예정
      }));
      setRestaurants(processed);
    };
    fetchData();
  }, [id]);

  const filtered = category === "전체"
    ? restaurants
    : restaurants.filter((r) => r.category === category)

  const sorted = [...filtered].sort((a: RestaurantInfo, b: RestaurantInfo) => {
    const aDistance = a.distance ?? Infinity;
    const bDistance = b.distance ?? Infinity;
    const aRating = a.avgRating ?? 0;
    const bRating = b.avgRating ?? 0;

    if (sortBy === "distance") return aDistance - bDistance;
    if (sortBy === "rating") return bRating - aRating;
    return 0;
  }).slice(0, 9);

  return (
    <div className={cn(Card(), flexCol("w-full justify-center mt-6"))}>
      <div>
        <span className={mainTitle("mt-2 mb-2")}>근처 맛집</span>
      </div>
      <FilterBar
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full mx-auto gap-4"}>
        {sorted.length === 0? (
          <p className="text-center w-full mt-6 text-gray-500">일치하는 식당이 존재하지 않습니다.</p>
          ) : (
          sorted.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        )))}
      </div>
    </div>
  );
}