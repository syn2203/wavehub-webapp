import type { Freelancer, FreelancerCategory } from '@/types'
import { FREELANCER_CATEGORY_SKILL_MAP } from '@/constants'

/**
 * 根据类别过滤自由职业者
 */
export function filterFreelancers(
  freelancers: Freelancer[],
  category: FreelancerCategory
): Freelancer[] {
  if (category === 'All') {
    return freelancers
  }

  return freelancers.filter((freelancer) => {
    // 直接匹配类别
    if (freelancer.category === category) {
      return true
    }

    // 通过技能标签匹配
    const skills = FREELANCER_CATEGORY_SKILL_MAP[category]
    if (skills) {
      return freelancer.skills.some((skill) =>
        skills.some((categorySkill) =>
          skill.toLowerCase().includes(categorySkill.toLowerCase())
        )
      )
    }

    return false
  })
}
