import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'WaveHub - AI驱动的实时语音协作平台',
  description:
    '由AI驱动的实时语音协作平台，连接全球，共创未来。提供高质量语音通信、智能降噪、实时转录等先进功能。',
  keywords: 'AI, 语音协作, 实时通信, 智能降噪, 语音会议, 团队协作, 在线教育',
  authors: [{ name: 'WaveHub' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true
  },
  openGraph: {
    title: 'WaveHub - AI驱动的实时语音协作平台',
    description: '由AI驱动的实时语音协作平台，连接全球，共创未来',
    type: 'website'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='zh-CN' className='scroll-smooth' suppressHydrationWarning>
      <body className={`${inter.variable} font-inter antialiased`}>{children}</body>
    </html>
  )
}
