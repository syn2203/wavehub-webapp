# WaveHub 项目结构

WaveHub 是一个支持任务拆分与稳定币量化支付的去中心化远程工作平台，让工作按成果即时结算。

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx          # 主页（路由入口）
│   └── globals.css       # 全局样式
│
├── components/            # 组件目录
│   ├── layout/           # 布局组件
│   │   └── Header.tsx    # 顶部导航栏
│   ├── tasks/            # 任务相关组件
│   │   ├── TaskCard.tsx  # 任务卡片
│   │   └── TasksView.tsx # 任务列表视图
│   ├── freelancers/      # 自由职业者相关组件
│   │   ├── FreelancerCard.tsx # 自由职业者卡片
│   │   └── FreelancersView.tsx # 自由职业者列表视图
│   └── common/           # 通用组件（待扩展）
│
├── types/                # TypeScript 类型定义
│   └── index.ts          # 所有类型定义
│
├── data/                 # Mock 数据
│   ├── tasks.ts          # 任务数据
│   └── freelancers.ts    # 自由职业者数据
│
├── constants/            # 常量配置
│   └── index.ts          # 过滤类别、技能映射等
│
├── utils/                # 工具函数
│   └── filters.ts        # 过滤逻辑
│
└── hooks/                # 自定义 Hooks
    └── useTab.ts         # Tab 切换逻辑
```

## 设计原则

### 1. 关注点分离
- **类型定义**：集中在 `types/` 目录
- **数据**：Mock 数据独立在 `data/` 目录
- **业务逻辑**：工具函数在 `utils/` 目录
- **UI 组件**：按功能模块组织在 `components/` 目录

### 2. 可扩展性
- **组件化**：每个功能模块都是独立组件
- **类型安全**：完整的 TypeScript 类型定义
- **配置化**：常量集中管理，易于修改
- **Hook 化**：可复用的状态逻辑抽取为自定义 Hook

### 3. 可维护性
- **单一职责**：每个文件只负责一个功能
- **清晰的命名**：文件和函数命名清晰表达意图
- **模块化**：功能模块独立，便于测试和维护

## 扩展指南

### 添加新功能模块

1. **创建类型定义**（如需要）
   ```typescript
   // src/types/index.ts
   export type NewFeature = { ... }
   ```

2. **创建数据文件**（如需要）
   ```typescript
   // src/data/newFeature.ts
   export const NEW_FEATURE_DATA = [ ... ]
   ```

3. **创建组件**
   ```typescript
   // src/components/newFeature/NewFeatureView.tsx
   export default function NewFeatureView() { ... }
   ```

4. **创建工具函数**（如需要）
   ```typescript
   // src/utils/newFeature.ts
   export function processNewFeature() { ... }
   ```

5. **在页面中使用**
   ```typescript
   // src/app/page.tsx
   import NewFeatureView from '@/components/newFeature/NewFeatureView'
   ```

### 添加新的 Tab

1. 在 `types/index.ts` 中扩展 `TabType`
2. 在 `hooks/useTab.ts` 中更新逻辑
3. 在 `components/layout/Header.tsx` 中添加按钮
4. 在 `app/page.tsx` 中添加条件渲染

### 添加新的过滤类别

1. 在 `constants/index.ts` 的 `FILTER_CATEGORIES` 中添加
2. 如需特殊匹配逻辑，在 `CATEGORY_SKILL_MAP` 中配置
3. 类型会自动更新（通过 `as const` 和类型推导）

## 未来扩展方向

### 功能模块
- [ ] 任务详情页
- [ ] 自由职业者详情页
- [ ] 用户个人中心
- [ ] 钱包连接（Web3）
- [ ] 稳定币支付集成
- [ ] 任务拆分功能
- [ ] 即时结算功能
- [ ] 消息系统
- [ ] 评价系统

### 技术优化
- [ ] API 集成（替换 Mock 数据）
- [ ] 状态管理（Zustand/Redux）
- [ ] 路由优化
- [ ] 性能优化（懒加载、虚拟滚动）
- [ ] 国际化（i18n）
- [ ] 主题切换（暗色模式）
