import { Settings } from "lucide-react";
import { flexCol, flexRowICenter } from '@/styles/customStyle';

export default function DefaultProfile(){
  return(
    <div className={flexRowICenter('justify-between m-2 p-2')}>
      <div className={flexCol()}>
        <h2 className="mb-1 text-2xl font-bold">닉네임</h2>
        <p className="text-sm text-gray-600">이메일</p>
        <p className="text-sm text-gray-600">전화번호</p>
        <p className="text-xs text-gray-600">가입일</p>
        <span className="inline-block w-fit mt-1 px-2 py-1 text-[10px] font-semibold bg-gray-300 bg-opacity-75 rounded-full">응원팀: </span>
      </div>

      <div className="flex">
        <button className={flexRowICenter('w-fit h-fit gap-1 px-4 py-2 text-xs font-bold rounded-full border border-gray-300 cursor-pointer')}>
          <Settings width={20} height={20} />
          <span>프로필 수정</span>
        </button>
      </div>
    </div>
  )
}