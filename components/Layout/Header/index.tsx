'use client'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'
import { cn } from '@/utils/cn'

function Header() {
  const [isDesktop, setIsDesktop] = useState<boolean>(true)

  useEffect(() => {
    if (isMobile) setIsDesktop(false)
  }, [])

  return (
    <div className={cn('w-full', 'fixed', 'top-0', 'left-0', 'z-20')}>
      {isDesktop ? <DesktopHeader /> : <MobileHeader />}
    </div>
  )
}

export default Header
