'use client'

import { useState, useMemo } from 'react'
import type { Freelancer, FreelancerCategory } from '@/types'
import { FREELANCER_CATEGORIES } from '@/constants'
import { filterFreelancers } from '@/utils/freelancerFilters'
import FreelancerCard from './FreelancerCard'

interface FreelancersViewProps {
  freelancers: Freelancer[]
}

const ITEMS_PER_PAGE = 8 // 每页显示的数量

export default function FreelancersView({freelancers}: FreelancersViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<FreelancerCategory>('All')
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)

  // 过滤自由职业者
  const filteredFreelancers = useMemo(
    () => filterFreelancers(freelancers, selectedCategory),
    [freelancers, selectedCategory]
  )

  // 当前显示的自由职业者
  const displayedFreelancers = useMemo(
    () => filteredFreelancers.slice(0, displayCount),
    [filteredFreelancers, displayCount]
  )

  // 是否还有更多
  const hasMore = displayCount < filteredFreelancers.length

  const handleCategoryClick = (category: FreelancerCategory) => {
    setSelectedCategory(category)
    setDisplayCount(ITEMS_PER_PAGE) // 切换类别时重置显示数量
  }

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE)
  }

  return (
    <div>
      {/* 类别过滤 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 overflow-x-auto">
          {FREELANCER_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-white border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Freelancers 网格展示 */}
      {filteredFreelancers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayedFreelancers.map((freelancer) => (
            <FreelancerCard key={freelancer.id} freelancer={freelancer}/>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No freelancers found for &quot;{selectedCategory}&quot;
          </p>
          <button
            onClick={() => handleCategoryClick('All')}
            className="mt-4 px-4 py-2 text-sm text-gray-600 hover:text-black underline"
          >
            Show all freelancers
          </button>
        </div>
      )}

      {/* 加载更多 */}
      {filteredFreelancers.length > 0 && (
        <div className="mt-8 text-center">
          {hasMore ? (
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              load more
            </button>
          ) : (
            <p className="text-gray-400 text-sm">No more freelancers to load</p>
          )}
        </div>
      )}
    </div>
  )
}
