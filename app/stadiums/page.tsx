import { Card, mainTitle } from '@/styles/customStyle'
import StadiumList from '@/components/Stadium/StadiumList'

export default async function Page() {
  return (
    <div className={Card('w-4/5 mx-auto mt-6 mb-6')}>
      <h2 className={mainTitle()}>구장 목록</h2>
      <StadiumList />
    </div>
  )
}
