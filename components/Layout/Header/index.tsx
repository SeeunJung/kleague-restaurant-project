'use client'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'
import { cn } from '@/utils/cn'
import { usePathname } from 'next/navigation'
import { usePathStore } from '@/hooks/usePathStore'

function Header() {
  const [isDesktop, setIsDesktop] = useState<boolean>(true)
  const pathname = usePathname()
  const setPath = usePathStore((state) => state.setPath)

  useEffect(() => {
    if (isMobile) setIsDesktop(false)
  }, [])

  useEffect(() => {
    setPath(pathname)
  }, [pathname, setPath])

  return (
    <div className={cn('w-full', 'fixed', 'top-0', 'left-0', 'z-20')}>
      {isDesktop ? <DesktopHeader /> : <MobileHeader />}
    </div>
  )
}

export default Header
