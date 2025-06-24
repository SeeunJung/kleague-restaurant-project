'use client'

import { useEffect, useRef } from "react";

interface Restaurant{
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

interface StadiumMapProps{
  center:{
    latitude: number;
    longitude: number;
  };
  stadiumName: string;
  restaurants: Restaurant[];
}


export default function StadiumMap({ center, stadiumName, restaurants } : StadiumMapProps){
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(!window.naver || !mapRef.current) return;
 
    const map = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(center.latitude, center.longitude),
      zoom: 16,
      minZoom: 10,
    });

    new naver.maps.Marker({
      position: new naver.maps.LatLng(center.latitude, center.longitude),
      title: stadiumName,
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