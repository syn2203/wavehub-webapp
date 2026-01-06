export default function Page() {
  // 任务数据
  const tasks = [
    {
      id: 1,
      title: 'DeFi Dashboard UI/UX Design',
      category: 'Design',
      description: 'Create a modern dashboard interface for DeFi protocol with clean design system',
      price: '500',
      deliveryTime: '5 days',
      badge: 'New',
      skills: ['Figma', 'UI/UX', 'Web3'],
      rating: 4.9,
      applications: 12
    },
    {
      id: 2,
      title: 'Smart Contract Security Audit',
      category: 'Development',
      description: 'Comprehensive security review and testing of Solidity smart contracts',
      price: '2000',
      deliveryTime: '10 days',
      badge: 'Featured',
      skills: ['Solidity', 'Security', 'Testing'],
      rating: 5.0,
      applications: 5
    },
    {
      id: 3,
      title: 'NFT Marketplace Frontend',
      category: 'Development',
      description: 'Build responsive React frontend for NFT trading platform',
      price: '1500',
      deliveryTime: '14 days',
      badge: null,
      skills: ['React', 'Web3.js', 'TypeScript'],
      rating: 4.8,
      applications: 18
    },
    {
      id: 4,
      title: 'Tokenomics Strategy Document',
      category: 'Writing',
      description: 'Detailed whitepaper covering token distribution and utility',
      price: '800',
      deliveryTime: '7 days',
      badge: null,
      skills: ['Economics', 'Research', 'Writing'],
      rating: 4.7,
      applications: 8
    },
    {
      id: 5,
      title: 'Community Growth Marketing',
      category: 'Marketing',
      description: 'Social media strategy and content creation for Web3 project',
      price: '600',
      deliveryTime: '30 days',
      badge: 'New',
      skills: ['Social Media', 'Content', 'Community'],
      rating: 4.6,
      applications: 15
    },
    {
      id: 6,
      title: 'DAO Governance System',
      category: 'Development',
      description: 'Implement voting mechanism and proposal system for DAO',
      price: '3000',
      deliveryTime: '21 days',
      badge: 'Featured',
      skills: ['Smart Contracts', 'Governance', 'Web3'],
      rating: 5.0,
      applications: 3
    }
  ]

  const filterCategories = [
    'All Tasks',
    'Development',
    'Design',
    'Marketing',
    'Writing',
    'Smart Contracts',
    'UI/UX',
    'Web3'
  ]

  return (
    <div className='min-h-screen bg-[#fafafa]'>
      {/* 顶部导航栏 */}
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
                <button className='px-4 py-2 text-sm rounded-lg bg-black text-white'>
                  Tasks
                </button>
                <button className='px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors'>
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
                  placeholder='Search tasks...'
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

      <div className='max-w-[1400px] mx-auto px-6 py-8'>
        <div className='grid grid-cols-1 gap-8'>
          {/* 主内容区 */}
          <div>
            {/* 过滤和排序 */}
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center gap-3 overflow-x-auto'>
                {filterCategories.map((category, index) => (
                  <button
                    key={category}
                    className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap transition-colors ${
                      index === 0
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:bg-white border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <button className='flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-white transition-colors whitespace-nowrap'>
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
                    d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
                  />
                </svg>
                Filter
              </button>
            </div>

            {/* 任务网格 */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className='group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all cursor-pointer'
                >
                  {/* 任务预览图 */}
                  <div className='relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden'>
                    {task.badge && (
                      <div className='absolute top-3 left-3'>
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            task.badge === 'New'
                              ? 'bg-black text-white'
                              : 'bg-yellow-400 text-black'
                          }`}
                        >
                          {task.badge}
                        </span>
                      </div>
                    )}

                    {/* 模拟预览内容 */}
                    <div className='absolute inset-0 p-6 opacity-20'>
                      <div className='grid grid-cols-2 gap-2 h-full'>
                        <div className='bg-white rounded-lg' />
                        <div className='bg-white rounded-lg' />
                        <div className='bg-white rounded-lg' />
                        <div className='bg-white rounded-lg' />
                      </div>
                    </div>

                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                  </div>

                  {/* 任务信息 */}
                  <div className='p-5'>
                    <div className='flex items-start justify-between mb-3'>
                      <div className='flex-1'>
                        <h3 className='text-base mb-1 line-clamp-1 group-hover:text-gray-600 transition-colors font-medium'>
                          {task.title}
                        </h3>
                        <p className='text-sm text-gray-500 line-clamp-2'>{task.description}</p>
                      </div>
                    </div>

                    {/* 技能标签 */}
                    <div className='flex flex-wrap gap-2 mb-4'>
                      {task.skills.map((skill, i) => (
                        <span
                          key={i}
                          className='px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded'
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* 底部信息 */}
                    <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
                      <div className='flex items-center gap-4'>
                        <div className='flex items-center gap-1 text-sm'>
                          <svg
                            className='w-4 h-4 fill-yellow-400 text-yellow-400'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                          </svg>
                          <span>{task.rating}</span>
                        </div>
                        <div className='flex items-center gap-1 text-sm text-gray-500'>
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
                              d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                            />
                          </svg>
                          <span>{task.applications}</span>
                        </div>
                        <div className='flex items-center gap-1 text-sm text-gray-500'>
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
                              d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                          <span>{task.deliveryTime}</span>
                        </div>
                      </div>

                      <div className='text-lg font-semibold'>${task.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 加载更多 */}
            <div className='mt-8 text-center'>
              <button className='px-6 py-3 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors'>
                Load more tasks
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className='mt-16 pt-8 border-t border-gray-200'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'></div>
        </footer>
      </div>
    </div>
  )
}
