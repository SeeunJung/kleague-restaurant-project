import { Settings } from 'lucide-react'
import {
  flexCol,
  flexRow,
  flexRowICenter,
} from '@/styles/customStyle'
import Image from 'next/image'
import { TEAM_LOGOS } from '@/constants'
import { UserData } from '@/types/Mypage'

interface DefaultProfileProps {
  user: UserData
  onEdit: () => void
}

export default function DefaultProfile({
  user,
  onEdit,
}: DefaultProfileProps) {
  return (
    <div className="flex items-center justify-between px-1 py-2">
      <div className="flex flex-row gap-2 sm:gap-4">
        <div className="flex-shrink-0">
          <Image
            src={TEAM_LOGOS[user.favoriteTeam]}
            alt="사용자 팀 로고"
            width={96}
            height={96}
            className="w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24"
          />
        </div>
        <div className={flexCol('flex-1 gap-0.5')}>
          <h2 className="mb-1 text-lg md:text-xl lg:text-2xl font-bold">
            {user.nickname}
          </h2>
          <p className="text-xs md:text-sm text-gray-600">
            {user.email}
          </p>
          <p className="text-[10px] md:text-sm text-gray-600">
            {user.phoneNumber}
          </p>
          <p className="text-[10px] md:text-sm text-gray-600">
            가입일:{' '}
            {new Date(user.createdAt).toISOString().slice(0, 10)}
          </p>
          <div className={flexRow('items-center gap-2 md:gap-4')}>
            <span className="inline-block min-w-max w-fit mt-1 px-2 py-1 text-[8px] md:text-xs font-semibold bg-gray-300 bg-opacity-75 rounded-full">
              응원팀: {user.favoriteTeam}
            </span>
            <p className="min-w-max text-[8px] md:text-xs lg:text-sm text-gray-600 font-semibold">
              즐겨찾기: {user.favorites.length}곳
            </p>
            <p className="min-w-max text-[8px] md:text-xs lg:text-sm text-gray-600 font-semibold">
              리뷰: {user.reviews.length}개
            </p>
          </div>
        </div>
      </div>

      <div className="mr-0 sm:mr-2">
        <button
          onClick={onEdit}
          className={flexRowICenter(
            'flex items-center justify-center w-fit h-fit p-2 sm:gap-1 sm:px-4 sm:py-2 sm:text-xs sm:font-bold rounded-full border border-gray-300 transition-all cursor-pointer',
          )}
        >
          <Settings
            width={18}
            height={18}
          />
          <span className="hidden sm:inline">프로필 수정</span>
        </button>
      </div>
    </div>
  )
}
