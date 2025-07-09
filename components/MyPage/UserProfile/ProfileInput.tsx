import { flexCol, flexColICenter } from '@/styles/customStyle'

type ProfileInputProps = {
  label: string
  type: string
  value: string
  placeholder: string
  minlength?: number
  maxlength?: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

export default function ProfileInput({
  label,
  type,
  value,
  placeholder,
  maxlength,
  minlength,
  onChange,
  error,
}: ProfileInputProps) {
  return (
    <div className={flexCol('mb-2')}>
      <div>
        <label className="text-xs font-medium">{label}</label>
        <div
          className={flexColICenter(
            'w-full py-1 px-2 h-[32px] rounded-md border border-[#ccc] text-sm focus-within:border-gray-600 focus-within:border-2',
          )}
        >
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxlength}
            minLength={minlength}
            className="w-full outline-none"
          />
          {error && (
            <span className="text-xs text-red-500 text-center">
              {error}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
