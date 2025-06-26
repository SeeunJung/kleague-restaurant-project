import { getStadiums } from '@/services/stadiums'
import { useStadiumsStore } from '@/store/useStadiumsStore'
import {
  Card,
  cardTitle,
  flexCol,
  flexRowICenter,
} from '@/styles/customStyle'
import { useEffect, useState } from 'react'
import { Tabs } from '../../ui/tabs'
import { KLEAGUE_TYPE } from '@/constants'
import useFilteredStadiums from '@/hooks/useFilteredStadiums'
import StadiumTabs from './StadiumTabs'
import StadiumTabsContent from './StadiumTabsContent'

type MainStadiumListProps = {
  keyword: string
}

function MainStadiumList({ keyword }: MainStadiumListProps) {
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
        <div className={flexRowICenter('justify-between')}>
          <div className={cardTitle()}>구장 목록</div>
          <StadiumTabs onSelect={setLeague} />
        </div>
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
