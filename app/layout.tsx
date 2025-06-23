import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

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
      <head>
        <Script strategy='beforeInteractive' src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=hn8jtoo8nm`} defer />
      </head>
      <body>{children}</body>
    </html>
  )
}
