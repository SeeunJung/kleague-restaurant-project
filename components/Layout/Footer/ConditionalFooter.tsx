'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from '.'

function ConditionalFooter() {
  const pathname = usePathname()
  const hideFooterRoutes = ['/login', '/signup']

  if (hideFooterRoutes.includes(pathname)) return null

  return <Footer />
}

export default ConditionalFooter
