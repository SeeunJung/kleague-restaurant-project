import { cn } from '@/utils/cn'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

type CustomSelectInputProps = {
  placeholder: string
  name: string
  value: string
  onChange: (value: string) => void
  options: string[]
}

function CustomSelectInput({
  placeholder,
  value,
  onChange,
  options,
}: CustomSelectInputProps) {
  return (
    <Select
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger
        className={cn(
          'w-full',
          'rounded-full',
          'border',
          'border-[#ccc]',
          'text-sm',
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem
            key={opt}
            value={opt}
          >
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default CustomSelectInput
