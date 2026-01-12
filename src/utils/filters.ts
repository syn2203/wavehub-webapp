import type { Task, FilterCategory } from '@/types'
import { CATEGORY_SKILL_MAP } from '@/constants'

/**
 * 根据过滤类别过滤任务
 */
export function filterTasks(tasks: Task[], filter: FilterCategory): Task[] {
  if (filter === 'All Tasks') {
    return tasks
  }

  return tasks.filter((task) => {
    // 直接匹配类别
    if (task.category === filter) {
      return true
    }

    // 特殊类别通过技能标签匹配
    const skills = CATEGORY_SKILL_MAP[filter]
    if (skills) {
      return task.skills.some((skill) =>
        skills.some((categorySkill) =>
          skill.toLowerCase().includes(categorySkill.toLowerCase())
        )
      )
    }

    return false
  })
}
