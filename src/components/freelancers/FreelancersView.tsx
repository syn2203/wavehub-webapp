'use client'

import type { Freelancer } from '@/types'
import FreelancerCard from './FreelancerCard'

interface FreelancersViewProps {
  freelancers: Freelancer[]
}

export default function FreelancersView({freelancers}: FreelancersViewProps) {
  return (
    <div>
      {/* Freelancers 瀑布流展示 */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {freelancers.map((freelancer) => (
          <FreelancerCard key={freelancer.id} freelancer={freelancer}/>
        ))}
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
