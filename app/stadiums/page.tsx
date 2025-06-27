import { getStadiums } from '@/services/stadiums';
import { Card, mainTitle } from '@/styles/customStyle';
import StadiumCard from '@/components/Card/StadiumCard';


export default async function Page(){
  const stadiums = getStadiums();
  return(
    <div className={Card('w-4/5 mx-auto mt-6 mb-6')}>
      <h2 className={mainTitle()}>구장 목록</h2>
      <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full mx-auto gap-6'}>
        {(await stadiums).map((stadium) => (
          <StadiumCard key={stadium.id} stadium={stadium} />
        ))}
      </div>
    </div>
  )
}