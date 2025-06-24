import FilterBar from "@/components/Stadium/FilterBar";
import StadiumMapContainer from "@/components/Stadium/StadiumMapContainer";

export default async function Page({ params } : { params: Promise<{id: number}>}){
  const { id } = await params;
  return(
    <div className="flex flex-col justify-center items-center gap-[20px]">
      <div className="w-full max-w-4xl">
        <StadiumMapContainer id={id} />
      </div>
      <FilterBar />
      <div>Nearby Restaurants</div>
    </div>
  )
}