'use client'

import { Stadium } from '@/types/Stadium'
import { useEffect, useRef } from 'react'

const MARKER_ICON = '/restaurantMarker.png'

export default function StadiumMap({
  latitude,
  longitude,
  name,
  logo,
  restaurants,
}: Partial<Stadium>) {
  const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!window.naver || !mapRef.current) return

    const map = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(latitude ?? 0, longitude ?? 0),
      zoom: 16,
      minZoom: 10,
    })

    restaurants?.forEach((restaurant) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(
          restaurant.latitude ?? 0,
          restaurant.longitude ?? 0,
        ),
        map,
        icon: {
          url: MARKER_ICON,
          size: new naver.maps.Size(45, 45),
          scaledSize: new naver.maps.Size(45, 45),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(12, 12),
        },
      })
      const infoWindow = new naver.maps.InfoWindow({
        content: `
        <div style="padding: 10px; background-color: white; font-size: 14px; line-height: 1.4; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15)">
          <strong style="display:block; font-size: 16px; margin-bottom: 6px;">
            ${restaurant.name}
          </strong>
          <div><strong>카테고리:</strong> ${restaurant.category ?? '정보 없음'}</div>
          <div><strong>영업시간:</strong> ${restaurant.businessHours ?? '정보 없음'}</div>
          <div><strong>전화번호:</strong> ${restaurant.phone ?? '정보 없음'}</div>
        </div>
        `,
        maxWidth: 300,
        anchorSize: {
          width: 12,
          height: 14,
        },
        borderColor: '#ccc',
      })

      let isOpen = false
      naver.maps.Event.addListener(marker, 'click', () => {
        if (isOpen) {
          infoWindow.close()
          isOpen = false
        } else {
          infoWindow.open(map, marker)
          isOpen = true
        }
      })
      naver.maps.Event.addListener(map, 'click', () => {
        if (isOpen) {
          infoWindow.close()
          isOpen = false
        }
      })
    })

    new naver.maps.Marker({
      position: new naver.maps.LatLng(latitude ?? 0, longitude ?? 0),
      title: name,
      map,
      icon: {
        url: logo ?? MARKER_ICON,
        size: new naver.maps.Size(70, 70),
        scaledSize: new naver.maps.Size(70, 70),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(12, 12),
      },
    })
  }, [])

  return (
    <div
      ref={mapRef}
      className="mt-4 mb-4 w-full h-[300px] rounded-xl"
    />
  )
}
