import {
  authInput,
  flexCol,
  flexColICenter,
} from '@/styles/customStyle'
import { cn } from '@/utils/cn'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import CustomSelectInput from '../common/CustomSelectInput'
import AuthError from './AuthError'
import formatPhoneNumber from '@/utils/formatPhoneNumber'

type AuthInputProps = {
  label: string
  name: string
  type?: string
  value: string
  onChange: (value: string) => void
  options?: string[]
  error?: string
}

function AuthInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  options = [],
  error,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const isNumericInput = name === 'phoneNumber'
  const isPassword = type === 'password'
  const inputType = isPassword
    ? showPassword
      ? 'text'
      : 'password'
    : type
  let autoComplete: string | undefined

  if (isPassword) {
    if (name === 'password') autoComplete = 'new-password'
    else autoComplete = 'off'
  } else if (name === 'email') autoComplete = 'username'

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

    return (
      <div className={cn('relative', 'w-full')}>
        <input
          id={name}
          name={name}
          type={inputType}
          inputMode={isNumericInput ? 'numeric' : undefined}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => {
            if (isNumericInput) {
              const maskedNumber = formatPhoneNumber(e.target.value)
              onChange(maskedNumber)
            } else {
              onChange(e.target.value)
            }
          }}
          placeholder={`${label}을 입력하세요`}
          className={authInput(
            'w-full',
            isPassword ? 'pr-10' : '',
            error && 'border-red-500',
          )}
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
      <span className={cn('text-sm', 'font-medium', 'text-nowrap')}>
        {label}
      </span>
      <div className={flexColICenter('w-full')}>
        {renderInput()}
        {error && <AuthError error={error} />}
      </div>
    </div>
  )
}

export default AuthInput
