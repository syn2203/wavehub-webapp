'use client'

import Link from 'next/link'
import { ArrowLeft, AlertCircle } from 'lucide-react'

export default function ChatPage() {
  return (
    <div className='min-h-screen bg-white flex flex-col'>
      <div className='container mx-auto px-3 sm:px-4 py-4 sm:py-8 flex flex-col flex-1 min-h-0'>
        {/* 头部导航 */}
        <div className='mb-4 sm:mb-6 flex items-center justify-between flex-wrap gap-2 sm:gap-0'>
          <Link
            href='/'
            className='flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors text-sm sm:text-base'
          >
            <ArrowLeft className='w-4 h-4 sm:w-5 sm:h-5' />
            <span className='hidden sm:inline'>返回主页</span>
            <span className='sm:hidden'>返回</span>
          </Link>
        </div>

        {/* 主要内容区域 */}
        <div className='flex-1 flex items-center justify-center min-h-0 py-8 sm:py-12'>
          <div className='w-full max-w-md mx-auto'>
            <div className='bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8'>
              <div className='text-center mb-6 sm:mb-8'>
                <div className='inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-yellow-100 rounded-full mb-4'>
                  <AlertCircle className='w-8 h-8 sm:w-10 sm:h-10 text-yellow-600' />
                </div>
                <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>功能已移除</h1>
                <p className='text-gray-600 text-sm sm:text-base'>
                  视频和语音房间功能已从项目中移除
                </p>
              </div>

              <div className='mt-6 pt-6 border-t border-gray-200'>
                <p className='text-xs sm:text-sm text-gray-500 text-center'>
                  如需使用语音或视频功能，请联系管理员
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
