import { cn } from '@/utils/cn'
import { ClassValue } from 'clsx'

// Flex
export const flexRow = (...args: ClassValue[]) =>
  cn('flex', 'flex-row', 'gap-2', ...args)

export const flexCol = (...args: ClassValue[]) =>
  cn('flex', 'flex-col', 'gap-2', ...args)

export const flexRowICenter = (...args: ClassValue[]) =>
  cn('flex', 'flex-row', 'items-center', 'gap-2', ...args)

export const flexColICenter = (...args: ClassValue[]) =>
  cn('flex', 'flex-col', 'items-center', 'gap-2', ...args)

export const flexRowJCenter = (...args: ClassValue[]) =>
  cn('flex', 'flex-row', 'justify-center', 'gap-2', ...args)

export const flexColJCenter = (...args: ClassValue[]) =>
  cn('flex', 'flex-col', 'justify-center', 'gap-2', ...args)

export const flexRowIJCenter = (...args: ClassValue[]) =>
  cn(
    'flex',
    'flex-row',
    'items-center',
    'justify-center',
    'gap-2',
    ...args,
  )

export const flexColIJCenter = (...args: ClassValue[]) =>
  cn(
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'gap-2',
    ...args,
  )
