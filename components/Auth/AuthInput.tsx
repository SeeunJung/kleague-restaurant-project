import { authInput, flexCol } from '@/styles/customStyle'
import { cn } from '@/utils/cn'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import CustomSelectInput from '../CustomSelectInput'

type AuthInputProps = {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  options?: string[]
}

function AuthInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  options = [],
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const renderInput = () => {
    if (type === 'select') {
      return (
        <CustomSelectInput
          placeholder="좋아하는 구단을 선택해주세요"
          name={name}
          value={value}
          onChange={onChange}
          options={options}
        />
      )
    }

    const isPassword = type === 'password'
    const inputType =
      isPassword && !showPassword ? 'password' : 'text'

    return (
      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={`${label}을 입력하세요`}
          className={authInput('w-full', isPassword ? 'pr-10' : '')}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={flexCol('gap-1')}>
      <label className={cn('text-sm', 'font-medium')}>{label}</label>
      {renderInput()}
    </div>
  )
}

export default AuthInput
