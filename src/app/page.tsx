'use client'

import Link from 'next/link'
import { Users, Mic } from 'lucide-react'

export default function HomePage() {
  return (
    <div className='relative min-h-screen overflow-hidden text-slate-100 flex flex-col'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_55%)] opacity-70' />
      <div className='pointer-events-none absolute inset-y-0 right-[-10%] w-1/2 bg-gradient-to-bl from-cyan-500/20 via-transparent to-fuchsia-500/20 blur-3xl' />
      <div className='relative z-10 flex flex-col min-h-screen'>
        {/* 头部 */}
        <header className='bg-white/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40'>
          <div className='container mx-auto px-6 py-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center'>
                  <Mic className='w-6 h-6 text-white' />
                </div>
                <div>
                  <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                    WaveHub
                  </h1>
                  <p className='text-sm text-gray-600'>AI驱动的实时语音协作平台</p>
                </div>
              </div>
              <nav className='flex items-center space-x-6'>
                <Link href='/chat' className='text-gray-600 hover:text-blue-600 transition-colors'>
                  语音房间
                </Link>
                <button className='btn-primary px-6 py-2'>登录</button>
              </nav>
            </div>
          </div>
        </header>

        {/* 主要内容 */}
        <main className='container mx-auto px-6 py-12 flex-1 flex items-center justify-center'>
          <div className='w-full max-w-6xl'>
            {/* 欢迎区域 */}
            <div className='text-center mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
                由 AI 驱动的实时语音协作平台
                <span className='block text-2xl md:text-3xl text-gray-600 font-normal mt-2'>
                  连接全球，共创未来
                </span>
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8'>
                利用先进的AI技术，提供高质量的实时语音通信体验。
                无论是团队协作、在线会议还是社区交流，WaveHub让沟通更智能、更高效。
              </p>
              <Link
                href='/chat'
                className='inline-flex items-center space-x-2 btn-primary px-8 py-4 text-lg'
              >
                <Users className='w-5 h-5' />
                <span>进入语音房间</span>
              </Link>
            </div>

            {/* 核心数据展示 */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
              <div className='text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl'>
                <div className='text-3xl font-bold text-blue-600 mb-2'>100K+</div>
                <div className='text-gray-600'>全球用户</div>
              </div>
              <div className='text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl'>
                <div className='text-3xl font-bold text-green-600 mb-2'>50M+</div>
                <div className='text-gray-600'>语音通话分钟</div>
              </div>
              <div className='text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl'>
                <div className='text-3xl font-bold text-purple-600 mb-2'>99.9%</div>
                <div className='text-gray-600'>服务可用性</div>
              </div>
              <div className='text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl'>
                <div className='text-3xl font-bold text-orange-600 mb-2'>AI</div>
                <div className='text-gray-600'>智能降噪</div>
              </div>
            </div>
          </div>
        </main>

        {/* 页脚 */}
        <footer className='bg-white/80 backdrop-blur-xl border-t border-white/10 mt-auto'>
          <div className='container mx-auto p-6'>
            <div className='text-center text-sm text-gray-600'>
              <p>&copy; 2024 WaveHub. 保留所有权利。</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
