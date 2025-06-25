'use client'

import { StadiumInfo } from "@/types/Stadium";
import { useEffect, useRef } from "react";

export default function StadiumMap({ latitude, longitude, name, restaurants } : StadiumInfo){
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(!window.naver || !mapRef.current) return;
 
    const map = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(latitude, longitude),
      zoom: 16,
      minZoom: 10,
    });

    new naver.maps.Marker({
      position: new naver.maps.LatLng(latitude, longitude),
      title: name,
      map,
    })

    restaurants.forEach(restaurant => {
      new naver.maps.Marker({
        position: new naver.maps.LatLng(restaurant.latitude, restaurant.longitude),
        map,
        title: restaurant.name
      });
    })
  }, [])

  return(
    <div ref={mapRef} className="mt-4 mb-4 w-full h-[200px] rounded-xl" />
  )
}