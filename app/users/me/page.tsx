import UserFavorites from "@/components/MyPage/UserHistory/UserFavorites";
import DefaultProfile from "@/components/MyPage/UserProfile/DefaultProfile";

export default function Page(){
  return(
    <div>
      <div>
        <DefaultProfile />
      </div>
      <div>Tab</div>
      <div>
        <UserFavorites />
      </div>
    </div>
  )
}