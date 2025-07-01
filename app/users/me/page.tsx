import UserFavorites from "@/components/MyPage/UserHistory/UserFavorites";
import DefaultProfile from "@/components/MyPage/UserProfile/DefaultProfile";
import { Card, flexColIJCenter } from "@/styles/customStyle";

export default function Page(){
  return(
    <div className={flexColIJCenter("gap-[20px mt-6 mb-6 p-6")}>
      <div className="w-full max-w-4xl gap-4" >
        <div className={Card()}>
          <DefaultProfile />
        </div>
        <div className={Card()}>
          <UserFavorites />
        </div>
      </div>
    </div>
  )
}