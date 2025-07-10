'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Stadium } from '@/types/Stadium'
import StadiumCard from '../Card/StadiumCard'
import { useEffect, useState } from 'react'
import { useStadiumsStore } from '@/store/useStadiumsStore'
import { getStadiums } from '@/services/stadiums'

export default function StadiumList() {
  const [league, setLeague] = useState('')
  const { stadiums, k1Stadiums, k2Stadiums, setStadiums } =
    useStadiumsStore()

  useEffect(() => {
    if (!stadiums || stadiums.length === 0) {
      const fetchStadiums = async () => {
        try {
          const res = await getStadiums()
          setStadiums(res)
        } catch (err) {
          console.error('구장 데이터를 가져오지 못했습니다: ', err)
        }
      }
      fetchStadiums()
    }
  }, [stadiums, setStadiums])

  const getFilteredStadiums = () => {
    if (league === 'k1') return k1Stadiums ?? []
    if (league === 'k2') return k2Stadiums ?? []
    return stadiums ?? []
  }

  const filteredStadiums = getFilteredStadiums()

  return (
    <>
      <Tabs
        defaultValue=""
        onValueChange={setLeague}
      >
        <TabsList className="flex w-full justify-between">
          <TabsTrigger value="">전체</TabsTrigger>
          <TabsTrigger value="k1">K1 리그</TabsTrigger>
          <TabsTrigger value="k2">K2 리그</TabsTrigger>
        </TabsList>

        <TabsContent value={league}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full mx-auto gap-6">
            {filteredStadiums.map((stadium: Stadium) => (
              <StadiumCard
                key={stadium.id}
                stadium={stadium}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
