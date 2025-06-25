'use client'
import { useStadiumsStore } from '@/store/useStadiumsStore'
import { Card, flexCol, mainTitle } from '@/styles/customStyle'
import { cn } from '@/utils/cn'
import { useEffect, useRef } from 'react'

function MainStadiumMap() {
  const { stadiums } = useStadiumsStore()
  const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.naver || !window.naver.maps) return

    const position = new naver.maps.LatLng(36.1403997, 128.0870439)
    const mapOptions = {
      center: position,
      zoom: 7,
    }

    const map = new window.naver.maps.Map(mapRef.current!, mapOptions)

    stadiums?.map((stadium) => {
      new window.naver.maps.Marker({
        position: new naver.maps.LatLng(
          stadium.latitude,
          stadium.longitude,
        ),
        map,
        title: stadium.name,
        icon: {
          url: stadium.logo,
          size: new naver.maps.Size(25, 25),
          scaledSize: new naver.maps.Size(25, 25),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(12, 12),
        },
      })
    })
  }, [stadiums])

  return (
    <div className={flexCol(Card('w-full'))}>
      <div className={mainTitle()}>전국 K리그 구장</div>
      <div
        ref={mapRef}
        className={cn('w-full', 'h-[400px]')}
      />
    </div>
  )
}

export default MainStadiumMap
