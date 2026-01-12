import { useState } from 'react'
import type { TabType, FilterCategory } from '@/types'

export function useTab() {
  const [activeTab, setActiveTab] = useState<TabType>('Tasks')
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('All Tasks')

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    // 切换 tab 时重置过滤条件
    if (tab === 'Tasks') {
      setSelectedFilter('All Tasks')
    }
  }

  return {
    activeTab,
    selectedFilter,
    setSelectedFilter,
    handleTabChange
  }
}
