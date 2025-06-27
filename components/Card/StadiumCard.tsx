'use client'

import { Card, flexRow } from "@/styles/customStyle";
import { Stadium } from "@/types/Stadium"
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';
import StadiumInfo from './../Stadium/StadiumInfo';

interface StadiumCardProps{
  stadium: Stadium
}

export default function StadiumCard({ stadium } : StadiumCardProps){
  const router = useRouter();

  const handleClick = () => {
    router.push(`/stadiums/${stadium.id}`)
  };

  return(
    <div className={cn(flexRow(Card()), 'gap-2 transition cursor-pointer')} onClick={handleClick}>
      <StadiumInfo key={stadium.id} name={stadium.name} team={stadium.team} address={stadium.address} logo={stadium.logo} latitude={0} longitude={0} restaurants={[]} />
    </div>
  )
}