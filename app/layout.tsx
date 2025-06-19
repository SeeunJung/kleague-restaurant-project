import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'K리그 맛집 지도',
  description: 'K리그 구장 근처 맛집을 소개합니다.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
