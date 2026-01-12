// 任务类型定义
export type Task = {
  id: number
  title: string
  category: string
  description: string
  price: string
  deliveryTime: string
  badge: 'New' | 'Featured' | null
  skills: string[]
  rating: number
  applications: number
}

// 自由职业者类型定义
export type Freelancer = {
  id: number
  name: string
  title: string
  avatar: string
  location: string
  hourlyRate: string
  rating: number
  reviews: number
  completedJobs: number
  skills: string[]
  bio: string
  verified: boolean
  online: boolean
  responseTime: string
  languages: string[]
  category: string // 行业类别
}

// Tab 类型
export type TabType = 'Tasks' | 'Freelancers'

// 过滤类别类型
export type FilterCategory =
  | 'All Tasks'
  | 'Development'
  | 'Design'
  | 'Marketing'
  | 'Writing'
  | 'Smart Contracts'
  | 'UI/UX'
  | 'Web3'

// 自由职业者类别类型
export type FreelancerCategory =
  | 'All'
  | 'Design'
  | 'Development'
  | 'Marketing'
  | 'Content'
  | 'Music'
  | 'Other'
