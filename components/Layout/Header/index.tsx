'use client'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'

function Header() {
  const [isDesktop, setIsDesktop] = useState<boolean>(true)
  console.log(isDesktop)

  useEffect(() => {
    if (isMobile) setIsDesktop(false)
  }, [])

  return isDesktop ? <DesktopHeader /> : <MobileHeader />
}

export default Header
