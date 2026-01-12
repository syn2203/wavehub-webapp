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

// 自由职业者类别配置
export const FREELANCER_CATEGORIES = [
  'All',
  'Design',
  'Development',
  'Marketing',
  'Content',
  'Music',
  'Other'
] as const

// 自由职业者类别与技能的映射（用于过滤）
export const FREELANCER_CATEGORY_SKILL_MAP: Record<string, string[]> = {
  'Design': ['Design', 'UI/UX', 'Figma', 'Product Design', 'Illustration', 'Adobe XD', 'Sketch'],
  'Development': ['Development', 'React', 'TypeScript', 'Solidity', 'Web3', 'Blockchain', 'Ethereum', 'Rust', 'Substrate', 'Polkadot', 'React Native', 'iOS', 'Android', 'Flutter'],
  'Marketing': ['Marketing', 'Digital Marketing', 'Growth Hacking', 'Analytics', 'Brand Strategy', 'Social Media', 'Content'],
  'Content': ['Content', 'Writing', 'Content Writing', 'SEO', 'Copywriting', 'Research'],
  'Music': ['Music', 'Audio', 'Sound', 'Production'],
  'Other': ['DevOps', 'Cloud', 'AWS', 'Docker', 'Kubernetes', 'Data', 'Machine Learning', 'Python', 'Data Analysis']
}
