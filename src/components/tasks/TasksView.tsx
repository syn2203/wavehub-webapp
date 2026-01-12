'use client'

import { useMemo, useState } from 'react'
import type { FilterCategory, Task } from '@/types'
import { FILTER_CATEGORIES } from '@/constants'
import { filterTasks } from '@/utils/filters'
import TaskCard from './TaskCard'

interface TasksViewProps {
  tasks: Task[]
}

export default function TasksView({tasks}: TasksViewProps) {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('All Tasks')

  // 过滤任务
  const filteredTasks = useMemo(
    () => filterTasks(tasks, selectedFilter),
    [tasks, selectedFilter]
  )

  const handleFilterClick = (category: FilterCategory) => {
    setSelectedFilter(category)
  }

  return (
    <div>
      {/* 过滤和排序 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 overflow-x-auto">
          {FILTER_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterClick(category)}
              className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap transition-colors ${
                selectedFilter === category
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-white border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <button
          className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-white transition-colors whitespace-nowrap">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filter
        </button>
      </div>

      {/* 任务网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task}/>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No tasks found for {selectedFilter}</p>
            <button
              onClick={() => handleFilterClick('All Tasks')}
              className="mt-4 px-4 py-2 text-sm text-gray-600 hover:text-black underline"
            >
              Show all tasks
            </button>
          </div>
        )}
      </div>

      {/* 加载更多 */}
      <div className="mt-8 text-center">
        <button
          className="px-6 py-3 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
          load more
        </button>
      </div>
    </div>
  )
}
