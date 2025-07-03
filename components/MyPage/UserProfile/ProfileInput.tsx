import { flexCol, flexColICenter } from '@/styles/customStyle'

type ProfileInputProps = {
  value: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

export default function ProfileInput({
  value,
  placeholder,
  onChange,
  error,
}: ProfileInputProps) {
  return (
    <div className={flexCol('gap-1')}>
      <div className={flexColICenter('w-full')}>
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full"
        />
        {error && (
          <span className="text-xs text-red-500 text-center">
            {error}
          </span>
        )}
      </div>
    </div>
  )
}
