// 过滤类别配置
export const FILTER_CATEGORIES = [
  'All Tasks',
  'Development',
  'Design',
  'Marketing',
  'Writing',
  'Smart Contracts',
  'UI/UX',
  'Web3'
] as const

// 特殊类别的技能映射（用于过滤）
export const CATEGORY_SKILL_MAP: Record<string, string[]> = {
  'Smart Contracts': ['Smart Contracts', 'Solidity', 'Governance'],
  'UI/UX': ['UI/UX', 'Figma', 'Design'],
  'Web3': ['Web3', 'Web3.js', 'Blockchain']
}
