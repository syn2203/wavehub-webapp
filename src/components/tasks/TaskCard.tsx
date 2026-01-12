import type { Task } from '@/types'

interface TaskCardProps {
  task: Task
  onClick?: () => void
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <div
      onClick={onClick}
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
  )
}
