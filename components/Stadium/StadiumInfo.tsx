import type { StadiumInfo } from "@/types/Stadium";
import Image from "next/image";

export default function StadiumInfo({ name, team, address, logo } : StadiumInfo){

  return(
    <div className="flex flex-row gap-[15px]">
      <Image src={logo} alt={`${team} 팀 로고`} width={50} height={50} style={{ objectFit: 'cover' }} />
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="mt-1 text-xs text-gray-600">{address}</p>
        <span className="inline-block w-fit mt-1 px-2 py-1 text-[10px] font-semibold bg-gray-300 bg-opacity-75 rounded-full">{team}</span>
      </div>
    </div>
  )
}