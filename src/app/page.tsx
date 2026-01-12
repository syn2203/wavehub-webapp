'use client'

import { useTab } from '@/hooks/useTab'
import { ALL_TASKS } from '@/data/tasks'
import { ALL_FREELANCERS } from '@/data/freelancers'
import Header from '@/components/layout/Header'
import TasksView from '@/components/tasks/TasksView'
import FreelancersView from '@/components/freelancers/FreelancersView'

export default function Page() {
  const { activeTab, handleTabChange } = useTab()

  const searchPlaceholder =
    activeTab === 'Tasks' ? 'Search tasks...' : 'Search freelancers...'

  return (
    <div className='min-h-screen bg-[#fafafa]'>
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        searchPlaceholder={searchPlaceholder}
      />

      <div className='max-w-[1400px] mx-auto px-6 py-8'>
        <div className='grid grid-cols-1 gap-8'>
          {activeTab === 'Tasks' ? (
            <TasksView tasks={ALL_TASKS} />
          ) : (
            <FreelancersView freelancers={ALL_FREELANCERS} />
          )}
        </div>

        {/* Footer */}
        <footer className='mt-16 pt-8 border-t border-gray-200'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'></div>
        </footer>
      </div>
    </div>
  )
}
