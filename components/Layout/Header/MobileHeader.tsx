'use client'
import {
  flexColICenter,
  flexRowICenter,
  mainTitle,
} from '@/styles/customStyle'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import MobileSidebar from './MobileSidebar'

function MobileHeader() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  return (
    <header
      className={flexColICenter(
        'w-full',
        'bg-white',
        'p-4',
        'shadow-md',
      )}
    >
      <nav className={flexRowICenter('w-full', 'justify-between')}>
        <Link
          href="/"
          className={mainTitle()}
        >
          ⚽️ K리그 맛집 지도
        </Link>
        <button>
          {sidebarOpen ? (
            <X
              size={24}
              color="black"
              onClick={() => setSidebarOpen(false)}
            />
          ) : (
            <Menu
              size={24}
              color="black"
              onClick={() => setSidebarOpen(true)}
            />
          )}
        </button>
      </nav>
      <MobileSidebar open={sidebarOpen} />
    </header>
  )
}

export default MobileHeader
