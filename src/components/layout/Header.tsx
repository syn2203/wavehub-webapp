import type { TabType } from '@/types'

interface HeaderProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  searchPlaceholder?: string
}

export default function Header({ activeTab, onTabChange, searchPlaceholder }: HeaderProps) {
  return (
    <header className='sticky top-0 z-50 bg-white border-b border-gray-200'>
      <div className='max-w-[1400px] mx-auto px-6'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo 和导航 */}
          <div className='flex items-center gap-8'>
            <div className='flex items-center gap-3'>
              <div className='bg-black rounded-lg p-2'>
                <svg
                  className='w-5 h-5 text-white'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
                  />
                </svg>
              </div>
              <span className='text-lg font-medium'>WaveHub</span>
            </div>

            <nav className='hidden md:flex items-center gap-1'>
              <button
                onClick={() => onTabChange('Tasks')}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  activeTab === 'Tasks'
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Tasks
              </button>
              <button
                onClick={() => onTabChange('Freelancers')}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  activeTab === 'Freelancers'
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Freelancers
              </button>
            </nav>
          </div>

          {/* 搜索栏 */}
          <div className='hidden md:flex items-center flex-1 max-w-md mx-8'>
            <div className='relative w-full'>
              <svg
                className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
              <input
                type='text'
                placeholder={searchPlaceholder || 'Search...'}
                className='w-full pl-10 pr-10 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black'
              />
              <button className='absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded'>
                <svg
                  className='w-4 h-4 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* 右侧按钮 */}
          <div className='flex items-center gap-3'>
            <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
              <svg
                className='w-5 h-5 text-gray-600'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                />
              </svg>
            </button>
            <button className='hidden md:flex items-center gap-2 px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors'>
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7'
                />
              </svg>
              Invite & earn
            </button>
            <button className='p-2 hover:bg-gray-100 rounded-lg'>
              <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500' />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
