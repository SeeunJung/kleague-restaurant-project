'use client'
import { useStadiumsStore } from '@/store/useStadiumsStore'
import { Card, flexCol } from '@/styles/customStyle'
import { cn } from '@/utils/cn'
import { useEffect, useRef, useState } from 'react'
import { Tabs } from '@/components/ui/tabs'
import useFilteredStadiums from '@/hooks/useFilteredStadiums'
import { KLEAGUE_TYPE } from '@/constants'
import { useStadiumFilter } from '@/context/StadiumFilterContext'
import SectionTabsHeader from '../SectionTabsHeader'
import TabsListContent from '../TabsListContent'

function MainStadiumMap() {
  const { keyword } = useStadiumFilter()
  const { stadiums, k1Stadiums, k2Stadiums } = useStadiumsStore()
  const mapRef = useRef<HTMLDivElement | null>(null)
  const [league, setLeague] = useState<string>(KLEAGUE_TYPE[0].value)
  const filtered = useFilteredStadiums(
    league,
    keyword,
    stadiums,
    k1Stadiums,
    k2Stadiums,
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.naver || !window.naver.maps) return

    const position = new naver.maps.LatLng(36.1403997, 128.0870439)
    const mapOptions = {
      center: position,
      zoom: 7,
    }

    const map = new window.naver.maps.Map(mapRef.current!, mapOptions)

    filtered?.map((stadium) => {
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
  }, [filtered])

  return (
    <div className={flexCol(Card('w-full'))}>
      <Tabs>
        <SectionTabsHeader title="구장 지도">
          <TabsListContent
            type="league"
            onSelect={setLeague}
          />
        </SectionTabsHeader>
        <div
          ref={mapRef}
          className={cn('w-full', 'h-[400px]')}
        />
      </Tabs>
    </div>
  )
}

export default MainStadiumMap
