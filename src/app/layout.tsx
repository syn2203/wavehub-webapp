import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'TaskChain — AI × 区块链任务分包协作平台',
  description:
    '基于区块链 + AI 的任务分包协作平台。AI 智能拆分任务，全球服务者自由承接，链上验证交付，智能合约秒级结算。',
  keywords: 'AI, 区块链, 任务协作, 智能合约, Web3, 去中心化, 自由职业, 任务分包',
  authors: [{ name: 'TaskChain' }],
  openGraph: {
    title: 'TaskChain — AI × 区块链任务分包协作平台',
    description: '基于区块链 + AI 的任务分包协作平台，重新定义全球协作方式',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true
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
