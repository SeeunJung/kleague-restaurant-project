import {
  customSelectOptions,
  flexRowICenter,
} from '@/styles/customStyle'
import { cn } from '@/utils/cn'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

type CustomSelectInputProps = {
  placeholder: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  options: string[]
}

function CustomSelectInput({
  placeholder,
  name,
  value,
  onChange,
  options,
}: CustomSelectInputProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOptionClick = (opt: string) => {
    const event = {
      target: { name, value: opt },
    } as React.ChangeEvent<HTMLInputElement>
    onChange(event)
    setIsOpen(false)
  }

  return (
    <div className={cn('relative', 'w-full')}>
      <button
        className={cn(
          'w-full',
          'h-[42px]',
          'p-2',
          'rounded-md',
          'border',
          'border-[#ccc]',
        )}
      >
        <div className={flexRowICenter('justify-between')}>
          <span
            className={cn({
              'text-black': value,
              'text-gray-500 text-sm': !value,
            })}
          >
            {value || placeholder}
          </span>
          <ChevronDown
            size={20}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>
      </button>

      {isOpen && (
        <ul
          className={cn(
            'absolute',
            'z-10',
            'mt-1',
            'w-full',
            'border',
            'border-[#ccc]',
            'bg-white',
            'shadow-md',
            'max-h-60',
            'overflow-auto',
          )}
        >
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => handleOptionClick(opt)}
              className={cn(
                customSelectOptions(),
                'hover:bg-gray-100',
                'cursor-pointer',
              )}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CustomSelectInput
