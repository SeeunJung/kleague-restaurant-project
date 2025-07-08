import { Settings } from 'lucide-react'
import { flexCol, flexRowICenter } from '@/styles/customStyle'

interface DefaultProfileProps {
  user: {
    nickname: string
    email: string
    phoneNumber: string
    favoriteTeam: string
    createdAt: string
    updatedAt: string
  }
  onEdit: () => void
}

export default function DefaultProfile({
  user,
  onEdit,
}: DefaultProfileProps) {
  return (
    <div className={flexRowICenter('justify-between m-2 p-2')}>
      <div className={flexCol()}>
        <h2 className="mb-1 text-2xl font-bold">{user.nickname}</h2>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-600">{user.phoneNumber}</p>
        <p className="text-xs text-gray-600">
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <span className="inline-block w-fit mt-1 px-2 py-1 text-[10px] font-semibold bg-gray-300 bg-opacity-75 rounded-full">
          응원팀: {user.favoriteTeam}
        </span>
      </div>

      <div className="flex">
        <button
          onClick={onEdit}
          className={flexRowICenter(
            'w-fit h-fit gap-1 px-4 py-2 text-xs font-bold rounded-full border border-gray-300 cursor-pointer',
          )}
        >
          <Settings
            width={20}
            height={20}
          />
          <span>프로필 수정</span>
        </button>
      </div>
    </div>
  )
}
