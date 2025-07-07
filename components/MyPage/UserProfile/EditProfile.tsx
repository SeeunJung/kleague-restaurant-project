'use client'

import { Delete, Save } from 'lucide-react'
import { flexCol, flexRowICenter } from '@/styles/customStyle'
import React, { useEffect, useState } from 'react'
import { KLEAGUE_TEAMS } from '@/constants'
import ProfileInput from './ProfileInput'
import { setUserData } from '@/services/mypage'
import { FavoriteTeam } from '@/types/Auth'

interface EditProfileProps {
  user: {
    nickname: string
    email: string
    phoneNumber: string
    favoriteTeam: FavoriteTeam
    createdAt: string
    updatedAt: string
  }
  onSave: (updatedFields: {
    nickname: string
    phoneNumber: string
    favoriteTeam: FavoriteTeam
  }) => void
  onCancel: () => void
}

export default function EditProfile({
  user,
  onSave,
  onCancel,
}: EditProfileProps) {
  const [nickname, setNickname] = useState(user.nickname)
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
  const [favoriteTeam, setFavoriteTeam] = useState(user.favoriteTeam)
  const [loading, setLoading] = useState(false)
  const [nicknameError, setNicknameError] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const validateNickname = (value: string) => {
    if (!value.trim() || value.length < 2 || value.length > 15) {
      setNicknameError('닉네임은 2~15자 사이로 입력해주세요.')
    } else {
      setNicknameError('')
    }
  }

  const validatePhoneNumber = (value: string) => {
    const phoneRegex = /^01[0-9]{8,9}$/
    if (!phoneRegex.test(value)) {
      setPhoneError('올바른 전화번호 형식이 아닙니다.')
    } else {
      setPhoneError('')
    }
  }

  useEffect(() => {
    validateNickname(nickname)
  }, [nickname])

  useEffect(() => {
    validatePhoneNumber(phoneNumber)
  }, [phoneNumber])

  const handleSave = async () => {
    if (nicknameError || phoneError) return
    setLoading(true)
    try {
      const updatedUser = await setUserData({
        nickname,
        phoneNumber,
        favoriteTeam,
      })

      onSave({
        nickname: updatedUser.nickname,
        phoneNumber: updatedUser.phoneNumber,
        favoriteTeam: updatedUser.favoriteTeam,
      })
    } catch (err) {
      console.error('유저 정보 수정 실패: ', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={flexRowICenter('justify-between m-2 p-2')}>
      <div className={flexCol()}>
        <ProfileInput
          value={nickname}
          placeholder="닉네임을 입력해주세요."
          onChange={(e) => setNickname(e.target.value)}
          error={nicknameError}
        />
        <p className="text-sm text-gray-600">{user.email}</p>
        <ProfileInput
          value={phoneNumber}
          placeholder="전화번호를 입력해주세요."
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={phoneError}
        />
        <p className="text-xs text-gray-600">
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <select
          value={favoriteTeam}
          onChange={(e) =>
            setFavoriteTeam(e.target.value as FavoriteTeam)
          }
        >
          {KLEAGUE_TEAMS.map((team) => (
            <option
              key={team}
              value={team}
            >
              {team}
            </option>
          ))}
        </select>
      </div>

      <div className={flexCol('justify-end')}>
        <button
          onClick={handleSave}
          disabled={
            loading ||
            !!nicknameError ||
            !!phoneError ||
            !nickname.trim() ||
            !phoneNumber.trim()
          }
          className={flexRowICenter(
            `w-fit h-fit gap-1 px-4 py-2 text-xs text-white font-bold bg-black rounded-full border border-gray-300 cursor-pointer ${
              loading ||
              nicknameError ||
              phoneError ||
              !nickname.trim() ||
              !phoneNumber.trim()
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`,
          )}
        >
          <Save
            width={20}
            height={20}
          />
          <span>저장</span>
        </button>

        <button
          onClick={onCancel}
          className={flexRowICenter(
            'w-fit h-fit gap-1 px-4 py-2 text-xs text-white font-bold bg-black rounded-full border border-gray-300 cursor-pointer',
          )}
        >
          <Delete
            width={20}
            height={20}
          />
          <span>취소</span>
        </button>
      </div>
    </div>
  )
}
