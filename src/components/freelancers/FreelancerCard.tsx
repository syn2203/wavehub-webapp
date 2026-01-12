import type { Freelancer } from '@/types'

interface FreelancerCardProps {
  freelancer: Freelancer
  onClick?: () => void
}

export default function FreelancerCard({ freelancer, onClick }: FreelancerCardProps) {
  return (
    <div
      onClick={onClick}
      className='bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all cursor-pointer overflow-hidden'
    >
      {/* 头部信息 */}
      <div className='p-5'>
        <div className='flex items-start gap-4 mb-4'>
          {/* 头像 */}
          <div className='relative flex-shrink-0'>
            <div className='w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-lg'>
              {freelancer.avatar}
            </div>
            {freelancer.online && (
              <div className='absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full' />
            )}
          </div>

          {/* 基本信息 */}
          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-2 mb-1'>
              <h3 className='text-base font-semibold text-gray-900 truncate'>
                {freelancer.name}
              </h3>
              {freelancer.verified && (
                <svg
                  className='w-4 h-4 text-blue-500 flex-shrink-0'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
            </div>
            <p className='text-sm text-gray-600 mb-2'>{freelancer.title}</p>
            <div className='flex items-center gap-4 text-xs text-gray-500'>
              <span className='flex items-center gap-1'>
                <svg
                  className='w-3 h-3'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
                {freelancer.location}
              </span>
            </div>
          </div>
        </div>

        {/* 评分和价格 */}
        <div className='flex items-center justify-between mb-4 pb-4 border-b border-gray-100'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <svg
                className='w-4 h-4 fill-yellow-400 text-yellow-400'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
              </svg>
              <span className='text-sm font-semibold text-gray-900'>{freelancer.rating}</span>
            </div>
            <span className='text-xs text-gray-500'>({freelancer.reviews} reviews)</span>
          </div>
          <div className='text-right'>
            <div className='text-lg font-semibold text-gray-900'>{freelancer.hourlyRate}</div>
            <div className='text-xs text-gray-500'>/hr</div>
          </div>
        </div>

        {/* 简介 */}
        <p className='text-sm text-gray-600 mb-4 line-clamp-2'>{freelancer.bio}</p>

        {/* 技能标签 */}
        <div className='flex flex-wrap gap-2 mb-4'>
          {freelancer.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className='px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded'
            >
              {skill}
            </span>
          ))}
          {freelancer.skills.length > 4 && (
            <span className='px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded'>
              +{freelancer.skills.length - 4}
            </span>
          )}
        </div>

        {/* 底部信息 */}
        <div className='flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100'>
          <div className='flex items-center gap-4'>
            <span>{freelancer.completedJobs} jobs</span>
            <span className='flex items-center gap-1'>
              <svg
                className='w-3 h-3'
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
              {freelancer.responseTime}
            </span>
          </div>
          <div className='flex items-center gap-1'>
            {freelancer.languages.slice(0, 2).map((lang, index) => (
              <span key={index} className='px-1.5 py-0.5 bg-gray-100 rounded text-xs'>
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
