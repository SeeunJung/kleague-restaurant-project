import StadiumMapContainer from '@/components/Stadium/StadiumMapContainer'
import StadiumRestaurantContainer from '@/components/Stadium/StadiumRestaurantContainer'

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params
  return (
    <div className="flex flex-col justify-center items-center gap-[20px] mt-6 mb-6 p-6">
      <div className="w-full max-w-4xl gap-4">
        <StadiumMapContainer id={id} />
        <StadiumRestaurantContainer id={id} />
      </div>
    </div>
  )
}
