'use client'
import { useStadiumFilter } from '@/context/StadiumFilterContext'
import KeywordSearchbar from '../common/KeywordSearchbar'

function MainSearchbar() {
  const { keyword, setKeyword } = useStadiumFilter()

  return (
    <KeywordSearchbar
      keyword={keyword}
      setKeyword={setKeyword}
      placeholder="구장명 또는 팀명으로 검색"
    />
  )
}

export default MainSearchbar
