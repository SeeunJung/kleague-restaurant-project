import type { StadiumInfo } from "@/types/Stadium";

export default function StadiumInfo({ name, team, address } : StadiumInfo){

  return(
    <div className="flex flex-row gap-[15px]">
      <div>구장 홈팀 로고</div>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="mt-1 text-xs text-gray-600">{address}</p>
        <span className="inline-block w-fit mt-1 px-2 py-1 text-[10px] font-semibold bg-gray-300 bg-opacity-75 rounded-full">{team}</span>
      </div>
    </div>
  )
}