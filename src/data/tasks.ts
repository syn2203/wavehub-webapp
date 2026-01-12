import type { Task } from '@/types'

// 任务 Mock 数据
export const ALL_TASKS: Task[] = [
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
