'use client'
import AuthTitle from '@/components/Auth/AuthTitle'
import MainSearchbar from '@/components/Main/MainSearchbar'
import MainStadiumMap from '@/components/Main/MainStadiumsMap'
import MainStadiumList from '@/components/Main/MainStadiumsList'
import MainRestaurantList from '@/components/Main/MainRestaurantsList'
import { flexColICenter } from '@/styles/customStyle'
import { useState } from 'react'

export default function Home() {
  const [searchKey, setSearchKey] = useState<string>('')

  return (
    <div
      className={flexColICenter(
        'w-full',
        'min-w-[375px]',
        'lg:max-w-[1200px]',
        'mx-auto',
        'p-3',
        'gap-6',
      )}
    >
      <AuthTitle subT="경기장 주변 맛집을 찾아보세요" />
      <MainSearchbar
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <MainRestaurantList />
      <MainStadiumMap keyword={searchKey} />
      <MainStadiumList keyword={searchKey} />
    </div>
  )
}
