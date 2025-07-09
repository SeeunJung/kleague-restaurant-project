'use client'
import { getStadiums } from '@/services/stadiums'
import { useStadiumsStore } from '@/store/useStadiumsStore'
import { Card, flexCol } from '@/styles/customStyle'
import { useEffect, useState } from 'react'
import { Tabs } from '../../ui/tabs'
import { KLEAGUE_TYPE } from '@/constants'
import useFilteredStadiums from '@/hooks/useFilteredStadiums'
import StadiumTabsContent from './StadiumTabsContent'
import { useStadiumFilter } from '@/context/StadiumFilterContext'
import SectionTabsHeader from '../SectionTabsHeader'
import TabsListContent from '../TabsListContent'

function MainStadiumList() {
  const { keyword } = useStadiumFilter()
  const { stadiums, k1Stadiums, k2Stadiums, setStadiums } =
    useStadiumsStore()
  const [league, setLeague] = useState<string>(KLEAGUE_TYPE[0].value)
  const [showAll, setShowAll] = useState<boolean>(false)

  const filtered = useFilteredStadiums(
    league,
    keyword,
    stadiums,
    k1Stadiums,
    k2Stadiums,
  )

  useEffect(() => {
    if (!stadiums || stadiums.length === 0) {
      const fetchStadiums = async () => {
        const res = await getStadiums()
        setStadiums(res)
      }
      fetchStadiums()
    }
  }, [stadiums, setStadiums])

  return (
    <div className={flexCol('w-full', Card())}>
      <Tabs
        value={league}
        onValueChange={setLeague}
      >
        <SectionTabsHeader title="구장 목록">
          <TabsListContent
            type="league"
            onSelect={setLeague}
          />
        </SectionTabsHeader>
        <StadiumTabsContent
          tab={league}
          stadiums={filtered}
          isShowAll={showAll}
          onToggle={() => setShowAll((prev) => !prev)}
        />
      </Tabs>
    </div>
  )
}

export default MainStadiumList
