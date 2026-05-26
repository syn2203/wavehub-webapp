'use client'

import { useState } from 'react'
import {
  Brain,
  Network,
  Shield,
  Zap,
  Users,
  CheckCircle2,
  ArrowRight,
  Play,
  Lock,
  Globe,
  TrendingUp,
  Sparkles,
  BarChart3,
  Wallet,
  Star,
  Menu,
  X,
  Cpu,
  GitBranch,
  Layers,
  ChevronRight,
  FileCheck,
  UserCheck,
} from 'lucide-react'
import { LiquidGlass } from '@/components/ui/liquid-glass'

// ─── Static Data ─────────────────────────────────────────────────────────────

const navLinks = ['产品介绍', '核心功能', '工作流程', '团队协作', '价格方案']

const features = [
  {
    icon: Brain,
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.12)',
    title: 'AI 智能任务拆分',
    desc: '大语言模型深度理解任务需求，自动拆解为可并行子任务，精准匹配执行者技能标签，极大降低协调成本。',
    badge: 'AI Powered',
  },
  {
    icon: GitBranch,
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.12)',
    title: '子任务独立承接',
    desc: '服务提供者浏览开放子任务池，一键承接匹配自身能力的子任务，去中心化自由协作，全球化人才网络。',
    badge: 'Decentralized',
  },
  {
    icon: FileCheck,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.12)',
    title: '任务完成验证',
    desc: '独立验证者对任务交付物进行多方评审，基于共识机制确认完成质量，杜绝主观争议，公平可信。',
    badge: 'Consensus',
  },
  {
    icon: Wallet,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.12)',
    title: '智能合约自动结算',
    desc: '验证通过后智能合约即时自动释放支付，无需中间人，链上记录全程透明，资金安全有保障。',
    badge: 'On-Chain',
  },
  {
    icon: Users,
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.12)',
    title: '团队组队协作模式',
    desc: '支持多人组队承接大型任务，内置任务分工、进度追踪、角色管理，团队收益按贡献智能分配。',
    badge: 'Team Mode',
  },
  {
    icon: Shield,
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.12)',
    title: '去中心化信任体系',
    desc: '基于区块链的声誉系统，所有协作记录上链存储，不可篡改，建立高透明度的全球协作信任网络。',
    badge: 'Trustless',
  },
]

const steps = [
  {
    icon: Layers,
    title: '发布任务',
    desc: '描述项目需求、预算和截止时间，平台自动上链存证。',
    color: '#7c3aed',
  },
  {
    icon: Brain,
    title: 'AI 分析拆分',
    desc: 'AI 引擎深度解析，智能拆解为独立子任务并生成技能标签。',
    color: '#8b5cf6',
  },
  {
    icon: UserCheck,
    title: '承接子任务',
    desc: '服务提供者从任务池中匹配并承接子任务，签署链上协议。',
    color: '#0ea5e9',
  },
  {
    icon: FileCheck,
    title: '验证交付',
    desc: '独立验证节点对交付成果进行多方评审，共识确认完成。',
    color: '#10b981',
  },
  {
    icon: Wallet,
    title: '自动结算',
    desc: '智能合约自动触发支付，资金即时到账，全程链上可查。',
    color: '#f59e0b',
  },
]

const stats = [
  { value: '2.4M+', label: '链上任务总量', sub: '较上月增长 34%' },
  { value: '98.7%', label: '任务完成率', sub: '行业领先水准' },
  { value: '< 2s', label: '平均结算时间', sub: '智能合约即时执行' },
  { value: '180+', label: '覆盖国家地区', sub: '全球化协作网络' },
]

const advantages = [
  {
    icon: Lock,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
    title: '零信任协作',
    desc: '所有协议、任务、交付、结算全部上链存证，不依赖任何中心化机构，彻底消除信任风险。',
  },
  {
    icon: Zap,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
    title: '极速结算',
    desc: '智能合约自动触发，验证通过后资金 2 秒内到账，无需等待审批流程，全球结算无障碍。',
  },
  {
    icon: Globe,
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.1)',
    title: '全球化人才网络',
    desc: '连接全球 180+ 国家的优质服务提供者，突破地理和语言边界，用最优质的人才完成任务。',
  },
  {
    icon: TrendingUp,
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.1)',
    title: '效率倍增',
    desc: 'AI 并行拆分任务，多个子任务同时推进，任务完成速度较传统方式提升 5–10 倍。',
  },
  {
    icon: Cpu,
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.1)',
    title: 'AI 智能匹配',
    desc: '基于技能图谱和历史声誉，AI 精准推荐最适合的执行者，大幅提升匹配成功率和质量。',
  },
  {
    icon: CheckCircle2,
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.1)',
    title: '多方共识验证',
    desc: '独立验证节点组成去中心化评审委员会，基于共识机制评定交付质量，公平且不可操纵。',
  },
]

const testimonials = [
  {
    name: 'Alex Chen',
    role: '区块链创业公司 CTO',
    avatar: 'AC',
    avatarColor: '#7c3aed',
    rating: 5,
    text: 'TaskChain 完全改变了我们的开发模式。AI 自动拆分任务后，团队协作效率提升了 3 倍，跨境结算也变得极其简单透明。',
  },
  {
    name: 'Sarah Kim',
    role: '独立全栈开发者',
    avatar: 'SK',
    avatarColor: '#0ea5e9',
    rating: 5,
    text: '作为自由职业者，我每个月在 TaskChain 上承接 5–8 个子任务，收入稳定，支付透明，链上声誉积累让我获得了更多优质项目。',
  },
  {
    name: 'Marcus Wei',
    role: 'Web3 产品经理',
    avatar: 'MW',
    avatarColor: '#10b981',
    rating: 5,
    text: '独立验证机制解决了我们最头疼的交付争议问题。所有成果评审都有链上记录，甲乙双方对这种透明协作方式都非常满意。',
  },
]

const footerSections = [
  { title: '产品', links: ['功能介绍', '工作流程', '价格方案', '更新日志', 'API 文档'] },
  { title: '开发者', links: ['技术文档', 'SDK 下载', '开放 API', '合约地址', 'GitHub'] },
  { title: '社区', links: ['Discord', 'Twitter/X', 'Telegram', '贡献者计划', '漏洞奖励'] },
  { title: '公司', links: ['关于我们', '团队介绍', '媒体资料', '隐私政策', '联系我们'] },
]

// ─── Hero Dashboard Mockup ────────────────────────────────────────────────────

function TaskFlowMockup() {
  const subtasks = [
    {
      title: '智能合约开发',
      skill: 'Solidity',
      status: '已完成',
      statusColor: '#10b981',
      statusBg: 'rgba(16,185,129,0.12)',
      avatar: '0x3f',
      progress: 100,
      amount: '0.32 ETH',
    },
    {
      title: '前端 DApp 界面',
      skill: 'React + Web3',
      status: '进行中',
      statusColor: '#0ea5e9',
      statusBg: 'rgba(14,165,233,0.12)',
      avatar: '0xa2',
      progress: 78,
      amount: '0.28 ETH',
    },
    {
      title: '后端 API 服务',
      skill: 'Node.js',
      status: '验证中',
      statusColor: '#f59e0b',
      statusBg: 'rgba(245,158,11,0.12)',
      avatar: '0x8c',
      progress: 100,
      amount: '0.25 ETH',
    },
  ]

  return (
    <div
      className='relative w-full max-w-lg float-animation'
      style={{ filter: 'drop-shadow(0 40px 80px rgba(124,58,237,0.28))' }}
    >
      {/* Ambient glow */}
      <div
        className='absolute -inset-10 rounded-full blur-3xl opacity-25 pointer-events-none'
        style={{
          background:
            'radial-gradient(circle, rgba(124,58,237,0.6) 0%, rgba(14,165,233,0.3) 50%, transparent 70%)',
        }}
      />

      {/* Panel */}
      <div
        className='relative rounded-2xl border overflow-hidden'
        style={{
          background: 'rgba(10,10,18,0.92)',
          backdropFilter: 'blur(30px)',
          borderColor: 'rgba(124,58,237,0.3)',
          boxShadow:
            '0 0 0 1px rgba(124,58,237,0.1), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* Window chrome */}
        <div
          className='flex items-center justify-between px-4 py-3 border-b'
          style={{
            borderColor: 'rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <div className='flex items-center gap-1.5'>
            <div className='w-3 h-3 rounded-full' style={{ background: '#ff5f57' }} />
            <div className='w-3 h-3 rounded-full' style={{ background: '#febc2e' }} />
            <div className='w-3 h-3 rounded-full' style={{ background: '#28c840' }} />
          </div>
          <div className='flex items-center gap-2'>
            <div
              className='w-1.5 h-1.5 rounded-full glow-pulse'
              style={{ background: '#10b981' }}
            />
            <span style={{ color: 'rgba(148,163,184,0.6)', fontSize: '11px' }}>
              TaskChain Dashboard
            </span>
          </div>
          <span style={{ color: 'rgba(148,163,184,0.25)', fontSize: '10px' }}>⌘K</span>
        </div>

        <div className='p-4'>
          {/* Main task */}
          <div
            className='rounded-xl p-3 mb-3 border'
            style={{
              background:
                'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(14,165,233,0.08))',
              borderColor: 'rgba(124,58,237,0.25)',
            }}
          >
            <div className='flex items-start justify-between mb-2'>
              <div>
                <div
                  className='inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full mb-1'
                  style={{ background: 'rgba(124,58,237,0.25)', color: '#a78bfa' }}
                >
                  <Sparkles className='w-2.5 h-2.5' />
                  AI 分析完成
                </div>
                <p className='text-sm font-semibold' style={{ color: '#f1f5f9' }}>
                  构建去中心化电商平台 v2.0
                </p>
              </div>
              <div className='text-right shrink-0 ml-3'>
                <div className='text-sm font-bold' style={{ color: '#f59e0b' }}>
                  0.85 ETH
                </div>
                <div style={{ color: 'rgba(148,163,184,0.5)', fontSize: '10px' }}>总预算</div>
              </div>
            </div>
            <div className='flex items-center gap-3 text-xs' style={{ color: 'rgba(148,163,184,0.65)' }}>
              <span>📋 已拆分 3 个子任务</span>
              <span>👥 3/3 已承接</span>
            </div>
          </div>

          {/* Sub-tasks */}
          <div className='space-y-2 mb-3'>
            {subtasks.map((task) => (
              <div
                key={task.title}
                className='rounded-lg p-3 border'
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(255,255,255,0.06)',
                }}
              >
                <div className='flex items-center justify-between mb-1.5'>
                  <div className='flex items-center gap-2'>
                    <div
                      className='w-6 h-6 rounded-md flex items-center justify-center font-bold shrink-0'
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        color: 'rgba(148,163,184,0.7)',
                        fontSize: '9px',
                      }}
                    >
                      {task.avatar}
                    </div>
                    <div>
                      <div style={{ color: '#e2e8f0', fontSize: '11px', fontWeight: 500 }}>
                        {task.title}
                      </div>
                      <div style={{ color: 'rgba(148,163,184,0.45)', fontSize: '10px' }}>
                        {task.skill}
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-2 shrink-0'>
                    <span
                      className='px-2 py-0.5 rounded-full'
                      style={{
                        background: task.statusBg,
                        color: task.statusColor,
                        fontSize: '10px',
                      }}
                    >
                      {task.status}
                    </span>
                    <span style={{ color: '#f59e0b', fontSize: '10px', fontWeight: 600 }}>
                      {task.amount}
                    </span>
                  </div>
                </div>
                <div
                  className='h-1 rounded-full overflow-hidden'
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <div
                    className='h-full rounded-full'
                    style={{
                      width: `${task.progress}%`,
                      background: `linear-gradient(90deg, ${task.statusColor}, ${task.statusColor}88)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Settlement */}
          <div
            className='rounded-lg px-3 py-2 flex items-center justify-between border'
            style={{
              background: 'rgba(16,185,129,0.07)',
              borderColor: 'rgba(16,185,129,0.2)',
            }}
          >
            <div className='flex items-center gap-2'>
              <div
                className='w-1.5 h-1.5 rounded-full glow-pulse'
                style={{ background: '#10b981' }}
              />
              <span style={{ color: '#10b981', fontSize: '11px' }}>智能合约结算准备中</span>
            </div>
            <span
              className='font-mono'
              style={{ color: 'rgba(148,163,184,0.35)', fontSize: '9px' }}
            >
              0x7a3b...f92d
            </span>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div
        className='absolute -top-4 -right-4 px-3 py-1.5 rounded-xl border text-xs font-medium'
        style={{
          background: 'rgba(16,185,129,0.15)',
          borderColor: 'rgba(16,185,129,0.3)',
          color: '#34d399',
          backdropFilter: 'blur(20px)',
        }}
      >
        ✓ 区块链验证
      </div>
      <div
        className='absolute -bottom-4 -left-4 px-3 py-1.5 rounded-xl border text-xs font-medium'
        style={{
          background: 'rgba(124,58,237,0.15)',
          borderColor: 'rgba(124,58,237,0.3)',
          color: '#a78bfa',
          backdropFilter: 'blur(20px)',
        }}
      >
        🤖 AI 驱动
      </div>
    </div>
  )
}

// ─── Team Dashboard Mockup ────────────────────────────────────────────────────

function TeamDashboardMockup() {
  const members = [
    { name: 'Alice', role: '智能合约', avatar: 'AL', color: '#10b981', progress: 100 },
    { name: 'Bob', role: '前端开发', avatar: 'BO', color: '#0ea5e9', progress: 78 },
    { name: 'Carol', role: '后端服务', avatar: 'CA', color: '#f59e0b', progress: 65 },
    { name: 'Dave', role: '安全审计', avatar: 'DA', color: '#7c3aed', progress: 40 },
  ]

  return (
    <div
      className='relative rounded-2xl border overflow-hidden'
      style={{
        background: 'rgba(10,10,18,0.88)',
        backdropFilter: 'blur(30px)',
        borderColor: 'rgba(255,255,255,0.08)',
        boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
      }}
    >
      {/* Header */}
      <div
        className='flex items-center justify-between px-5 py-4 border-b'
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div>
          <h4 className='text-sm font-semibold' style={{ color: '#f1f5f9' }}>
            团队协作面板
          </h4>
          <p style={{ color: 'rgba(148,163,184,0.6)', fontSize: '12px' }}>
            DeFi Trading Bot 项目
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex -space-x-2'>
            {(['AL', 'BO', 'CA', 'DA'] as const).map((a, i) => (
              <div
                key={a}
                className='w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold'
                style={{
                  background: ['#10b981', '#0ea5e9', '#f59e0b', '#7c3aed'][i],
                  borderColor: '#06060b',
                  color: '#fff',
                  fontSize: '9px',
                }}
              >
                {a}
              </div>
            ))}
          </div>
          <span
            className='px-2 py-0.5 rounded-full'
            style={{
              background: 'rgba(14,165,233,0.15)',
              color: '#38bdf8',
              fontSize: '10px',
            }}
          >
            4 成员在线
          </span>
        </div>
      </div>

      <div className='p-5'>
        {/* Overall progress */}
        <div className='mb-5'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-xs' style={{ color: 'rgba(148,163,184,0.7)' }}>
              总体进度
            </span>
            <span className='text-xs font-semibold' style={{ color: '#f1f5f9' }}>
              68%
            </span>
          </div>
          <div
            className='h-2 rounded-full overflow-hidden'
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <div
              className='h-full rounded-full'
              style={{
                width: '68%',
                background: 'linear-gradient(90deg, #7c3aed, #0ea5e9)',
              }}
            />
          </div>
        </div>

        {/* Members */}
        <div className='space-y-3'>
          {members.map((m) => (
            <div key={m.name} className='flex items-center gap-3'>
              <div
                className='w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0 text-xs'
                style={{ background: `${m.color}22`, color: m.color }}
              >
                {m.avatar}
              </div>
              <div className='flex-1 min-w-0'>
                <div className='flex items-center justify-between mb-1'>
                  <div>
                    <span style={{ color: '#e2e8f0', fontSize: '11px', fontWeight: 500 }}>
                      {m.name}
                    </span>
                    <span
                      className='ml-1.5'
                      style={{ color: 'rgba(148,163,184,0.4)', fontSize: '10px' }}
                    >
                      {m.role}
                    </span>
                  </div>
                  <span style={{ color: m.color, fontSize: '10px' }}>{m.progress}%</span>
                </div>
                <div
                  className='h-1 rounded-full overflow-hidden'
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <div
                    className='h-full rounded-full'
                    style={{ width: `${m.progress}%`, background: m.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div
          className='mt-5 grid grid-cols-3 gap-3 pt-4 border-t'
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          {[
            { label: '已完成任务', value: '12' },
            { label: '待验证', value: '3' },
            { label: '待结算', value: '0.42 ETH' },
          ].map((item) => (
            <div key={item.label} className='text-center'>
              <div className='text-sm font-bold mb-0.5' style={{ color: '#f1f5f9' }}>
                {item.value}
              </div>
              <div style={{ color: 'rgba(148,163,184,0.45)', fontSize: '10px' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div style={{ background: '#06060b', color: '#f1f5f9', minHeight: '100vh' }}>

      {/* ── NAVBAR ─────────────────────────────────────────────────── */}
      <header
        className='fixed top-0 left-0 right-0 z-50'
        style={{
          background: 'rgba(6,6,11,0.85)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center gap-2.5'>
            <div
              className='w-8 h-8 rounded-lg flex items-center justify-center shrink-0'
              style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)' }}
            >
              <Network className='w-4 h-4 text-white' />
            </div>
            <span className='text-lg font-bold tracking-tight'>TaskChain</span>
            <span
              className='hidden sm:block text-xs px-2 py-0.5 rounded-full font-medium'
              style={{
                background: 'rgba(124,58,237,0.15)',
                color: '#a78bfa',
                border: '1px solid rgba(124,58,237,0.25)',
              }}
            >
              AI × Web3
            </span>
          </div>

          {/* Desktop nav */}
          <nav className='hidden lg:flex items-center gap-8'>
            {navLinks.map((link) => (
              <a
                key={link}
                href='#'
                className='text-sm transition-colors duration-200'
                style={{ color: 'rgba(148,163,184,0.75)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#f1f5f9')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(148,163,184,0.75)')}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className='flex items-center gap-3'>
            <button
              className='hidden lg:block text-sm px-4 py-2 rounded-lg transition-all duration-200'
              style={{
                color: 'rgba(148,163,184,0.8)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
            >
              登录
            </button>
            <button
              className='text-sm px-4 py-2 rounded-lg font-medium text-white transition-all duration-200'
              style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.88'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              免费注册
            </button>
            <button
              className='lg:hidden p-2 rounded-lg'
              style={{ color: 'rgba(148,163,184,0.8)' }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className='lg:hidden border-t px-6 py-4 space-y-3'
            style={{
              borderColor: 'rgba(255,255,255,0.06)',
              background: 'rgba(6,6,11,0.97)',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link}
                href='#'
                className='block py-2 text-sm'
                style={{ color: 'rgba(148,163,184,0.8)' }}
              >
                {link}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section
        className='relative pt-32 pb-24 overflow-hidden'
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 50% -10%, rgba(124,58,237,0.18), transparent 65%),
            radial-gradient(ellipse 60% 40% at 85% 40%, rgba(14,165,233,0.1), transparent 55%),
            radial-gradient(ellipse 40% 30% at 15% 70%, rgba(124,58,237,0.07), transparent 50%)
          `,
        }}
      >
        {/* Mesh background */}
        <div
          className='absolute inset-0 opacity-30 pointer-events-none'
          style={{
            backgroundImage: `
              linear-gradient(rgba(124,58,237,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124,58,237,0.07) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        <div className='relative max-w-7xl mx-auto px-6'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            {/* Left: copy */}
            <div>
              <div
                className='inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 border'
                style={{
                  background: 'rgba(124,58,237,0.1)',
                  borderColor: 'rgba(124,58,237,0.25)',
                  color: '#a78bfa',
                }}
              >
                <span
                  className='w-2 h-2 rounded-full glow-pulse'
                  style={{ background: '#7c3aed' }}
                />
                全球首个 AI × 区块链任务协作平台
                <ChevronRight className='w-3.5 h-3.5' />
              </div>

              <h1 className='text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight mb-6'>
                <span style={{ color: '#f1f5f9' }}>AI 拆分任务</span>
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  区块链保障协作
                </span>
                <br />
                <span style={{ color: '#f1f5f9' }}>全球高效结算</span>
              </h1>

              <p
                className='text-lg leading-relaxed mb-10 max-w-lg'
                style={{ color: 'rgba(148,163,184,0.85)' }}
              >
                发布任务，AI 自动拆分为可并行子任务；全球服务者自由承接；
                链上验证交付，智能合约秒级结算。重新定义数字时代的工作协作方式。
              </p>

              <div className='flex items-center gap-4 flex-wrap mb-12'>
                <button
                  className='inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-all duration-200'
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
                    boxShadow: '0 0 30px rgba(124,58,237,0.4)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 0 45px rgba(124,58,237,0.65)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(124,58,237,0.4)'
                  }}
                >
                  发布任务
                  <ArrowRight className='w-4 h-4' />
                </button>
                <button
                  className='inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 border'
                  style={{
                    color: '#f1f5f9',
                    borderColor: 'rgba(255,255,255,0.14)',
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(10px)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.24)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  }}
                >
                  <Play className='w-4 h-4' />
                  查看演示
                </button>
                <button
                  className='inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 border'
                  style={{
                    color: '#38bdf8',
                    borderColor: 'rgba(14,165,233,0.25)',
                    background: 'rgba(14,165,233,0.06)',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = 'rgba(14,165,233,0.12)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'rgba(14,165,233,0.06)')
                  }
                >
                  开始协作
                </button>
              </div>

              {/* Trust indicators */}
              <div className='flex items-center gap-6 flex-wrap'>
                {[
                  { icon: Shield, text: '链上安全', color: '#10b981' },
                  { icon: Zap, text: '秒级结算', color: '#f59e0b' },
                  { icon: Globe, text: '180+ 国家', color: '#0ea5e9' },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className='flex items-center gap-1.5'>
                    <Icon className='w-4 h-4' style={{ color }} />
                    <span className='text-sm' style={{ color: 'rgba(148,163,184,0.7)' }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: mockup */}
            <div className='flex justify-center lg:justify-end'>
              <TaskFlowMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────── */}
      <section
        className='py-16 border-y'
        style={{
          borderColor: 'rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.01)',
        }}
      >
        <div className='max-w-7xl mx-auto px-6'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
            {stats.map(({ value, label, sub }) => (
              <div key={label} className='text-center'>
                <div
                  className='text-4xl font-bold mb-1 tracking-tight'
                  style={{
                    background: 'linear-gradient(135deg, #c4b5fd 0%, #38bdf8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {value}
                </div>
                <div
                  className='text-sm font-medium mb-0.5'
                  style={{ color: '#e2e8f0' }}
                >
                  {label}
                </div>
                <div className='text-xs' style={{ color: 'rgba(148,163,184,0.5)' }}>
                  {sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────── */}
      <section className='py-24'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center mb-16'>
            <div
              className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4 border'
              style={{
                background: 'rgba(124,58,237,0.08)',
                borderColor: 'rgba(124,58,237,0.2)',
                color: '#a78bfa',
              }}
            >
              <Cpu className='w-3.5 h-3.5' />
              核心功能
            </div>
            <h2
              className='text-4xl font-bold tracking-tight mb-4'
              style={{ color: '#f1f5f9' }}
            >
              重新定义协作的每个环节
            </h2>
            <p className='text-lg max-w-2xl mx-auto' style={{ color: 'rgba(148,163,184,0.8)' }}>
              从任务发布到结算支付，AI 与区块链技术融入协作全流程，
              消除信任摩擦，释放全球人才潜能。
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {features.map(({ icon: Icon, color, bg, title, desc, badge }) => (
              <div
                key={title}
                className='p-6 rounded-2xl border transition-all duration-300 cursor-default'
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(255,255,255,0.07)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.borderColor = `${color}44`
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = `0 20px 40px ${color}15`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div className='flex items-start justify-between mb-4'>
                  <div
                    className='w-11 h-11 rounded-xl flex items-center justify-center'
                    style={{ background: bg }}
                  >
                    <Icon className='w-5 h-5' style={{ color }} />
                  </div>
                  <span
                    className='text-xs px-2.5 py-1 rounded-full font-medium'
                    style={{
                      background: `${color}18`,
                      color,
                      border: `1px solid ${color}30`,
                    }}
                  >
                    {badge}
                  </span>
                </div>
                <h3
                  className='text-base font-semibold mb-2'
                  style={{ color: '#f1f5f9' }}
                >
                  {title}
                </h3>
                <p className='text-sm leading-relaxed' style={{ color: 'rgba(148,163,184,0.75)' }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
      <section
        className='py-24 border-y'
        style={{
          borderColor: 'rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.01)',
        }}
      >
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center mb-16'>
            <div
              className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4 border'
              style={{
                background: 'rgba(14,165,233,0.08)',
                borderColor: 'rgba(14,165,233,0.2)',
                color: '#38bdf8',
              }}
            >
              <GitBranch className='w-3.5 h-3.5' />
              工作流程
            </div>
            <h2
              className='text-4xl font-bold tracking-tight mb-4'
              style={{ color: '#f1f5f9' }}
            >
              五步完成全链路协作
            </h2>
            <p className='text-lg' style={{ color: 'rgba(148,163,184,0.8)' }}>
              简单直观，从发布任务到支付结算，全程自动化驱动
            </p>
          </div>

          <div className='relative'>
            {/* Connector line */}
            <div
              className='hidden lg:block absolute top-12 left-[10%] right-[10%] h-px'
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 20%, rgba(14,165,233,0.4) 80%, transparent)',
              }}
            />

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8'>
              {steps.map(({ icon: Icon, title, desc, color }, index) => (
                <div key={title} className='relative text-center group'>
                  <div
                    className='relative inline-flex flex-col items-center mb-5 transition-all duration-300'
                    style={{ cursor: 'default' }}
                  >
                    <div
                      className='w-24 h-24 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105'
                      style={{
                        background: `${color}12`,
                        borderColor: `${color}30`,
                        boxShadow: `0 0 25px ${color}18`,
                      }}
                    >
                      <Icon className='w-8 h-8' style={{ color }} />
                    </div>
                    <div
                      className='absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold'
                      style={{ background: color, color: '#fff' }}
                    >
                      {index + 1}
                    </div>
                  </div>
                  <h3
                    className='text-sm font-semibold mb-2'
                    style={{ color: '#f1f5f9' }}
                  >
                    {title}
                  </h3>
                  <p
                    className='text-xs leading-relaxed'
                    style={{ color: 'rgba(148,163,184,0.65)' }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM COLLABORATION ─────────────────────────────────────── */}
      <section className='py-24'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            {/* Left: copy */}
            <div>
              <div
                className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 border'
                style={{
                  background: 'rgba(236,72,153,0.08)',
                  borderColor: 'rgba(236,72,153,0.2)',
                  color: '#f472b6',
                }}
              >
                <Users className='w-3.5 h-3.5' />
                团队组队协作
              </div>

              <h2
                className='text-4xl font-bold tracking-tight mb-6'
                style={{ color: '#f1f5f9' }}
              >
                组建你的
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #f472b6 0%, #a78bfa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  链上协作团队
                </span>
              </h2>

              <p
                className='text-lg leading-relaxed mb-8'
                style={{ color: 'rgba(148,163,184,0.8)' }}
              >
                邀请多位专业人才组队承接大型任务。内置任务分工引擎、实时进度追踪、
                角色权限管理，团队收益由智能合约按贡献比例自动分配。
              </p>

              <div className='space-y-4 mb-8'>
                {[
                  { icon: Users, text: '最多支持 20 人组建协作团队', color: '#ec4899' },
                  { icon: BarChart3, text: '实时任务进度与贡献度追踪', color: '#7c3aed' },
                  { icon: Wallet, text: '智能合约按贡献度自动分配收益', color: '#f59e0b' },
                  { icon: Shield, text: '链上存证，成员权益透明可查', color: '#10b981' },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className='flex items-center gap-3'>
                    <div
                      className='w-8 h-8 rounded-lg flex items-center justify-center shrink-0'
                      style={{ background: `${color}15` }}
                    >
                      <Icon className='w-4 h-4' style={{ color }} />
                    </div>
                    <span className='text-sm' style={{ color: 'rgba(226,232,240,0.85)' }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              <button
                className='inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200'
                style={{
                  background: 'linear-gradient(135deg, #ec4899, #7c3aed)',
                  boxShadow: '0 0 25px rgba(236,72,153,0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(236,72,153,0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(236,72,153,0.3)'
                }}
              >
                组建我的团队
                <ArrowRight className='w-4 h-4' />
              </button>
            </div>

            {/* Right: mockup */}
            <div className='relative'>
              <div
                className='absolute -inset-4 rounded-3xl blur-3xl opacity-12 pointer-events-none'
                style={{
                  background:
                    'radial-gradient(circle, rgba(236,72,153,0.5) 0%, rgba(124,58,237,0.4) 50%, transparent 70%)',
                }}
              />
              <TeamDashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── ADVANTAGES ─────────────────────────────────────────────── */}
      <section
        className='py-24 border-t'
        style={{
          borderColor: 'rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.01)',
        }}
      >
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2
              className='text-4xl font-bold tracking-tight mb-4'
              style={{ color: '#f1f5f9' }}
            >
              为什么选择 TaskChain
            </h2>
            <p className='text-lg' style={{ color: 'rgba(148,163,184,0.8)' }}>
              区块链 + AI 双引擎驱动，构建下一代协作基础设施
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {advantages.map(({ icon: Icon, color, bg, title, desc }) => (
              <div
                key={title}
                className='p-6 rounded-2xl border transition-all duration-300 cursor-default'
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(255,255,255,0.07)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.borderColor = `${color}35`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                }}
              >
                <div
                  className='w-12 h-12 rounded-xl flex items-center justify-center mb-4'
                  style={{ background: bg }}
                >
                  <Icon className='w-6 h-6' style={{ color }} />
                </div>
                <h3
                  className='text-base font-semibold mb-2'
                  style={{ color: '#f1f5f9' }}
                >
                  {title}
                </h3>
                <p
                  className='text-sm leading-relaxed'
                  style={{ color: 'rgba(148,163,184,0.72)' }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────── */}
      <section className='py-24'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2
              className='text-4xl font-bold tracking-tight mb-4'
              style={{ color: '#f1f5f9' }}
            >
              用户真实反馈
            </h2>
            <p className='text-lg' style={{ color: 'rgba(148,163,184,0.8)' }}>
              来自全球协作者的真实使用体验
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-6 mb-16'>
            {testimonials.map(({ name, role, avatar, avatarColor, rating, text }) => (
              <div
                key={name}
                className='p-6 rounded-2xl border transition-all duration-300 cursor-default'
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(255,255,255,0.07)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div className='flex items-center gap-1 mb-4'>
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className='w-4 h-4 fill-current' style={{ color: '#f59e0b' }} />
                  ))}
                </div>
                <p
                  className='text-sm leading-relaxed mb-6'
                  style={{ color: 'rgba(226,232,240,0.8)' }}
                >
                  &ldquo;{text}&rdquo;
                </p>
                <div className='flex items-center gap-3'>
                  <div
                    className='w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0'
                    style={{ background: avatarColor }}
                  >
                    {avatar}
                  </div>
                  <div>
                    <div className='text-sm font-semibold' style={{ color: '#f1f5f9' }}>
                      {name}
                    </div>
                    <div className='text-xs' style={{ color: 'rgba(148,163,184,0.6)' }}>
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Partners */}
          <div className='text-center'>
            <p
              className='text-sm mb-8'
              style={{ color: 'rgba(148,163,184,0.45)' }}
            >
              受到全球领先协议与机构的信任
            </p>
            <div className='flex items-center justify-center gap-6 flex-wrap'>
              {['Ethereum', 'Polygon', 'Chainlink', 'IPFS', 'Arbitrum'].map((partner) => (
                <div
                  key={partner}
                  className='text-sm font-semibold tracking-wider px-5 py-2.5 rounded-lg border'
                  style={{
                    color: 'rgba(148,163,184,0.4)',
                    borderColor: 'rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LIQUID GLASS SHOWCASE ───────────────────────────────────── */}
      <section className='py-28 relative overflow-hidden'>
        {/* Ambient gradient background so glass is clearly visible */}
        <div
          className='absolute inset-0 pointer-events-none'
          style={{
            background: [
              'radial-gradient(ellipse 55% 55% at 18% 30%, rgba(124,58,237,0.38), transparent 65%)',
              'radial-gradient(ellipse 45% 45% at 78% 62%, rgba(14,165,233,0.28), transparent 55%)',
              'radial-gradient(ellipse 35% 35% at 50% 85%, rgba(236,72,153,0.22), transparent 50%)',
            ].join(', '),
          }}
        />

        <div className='max-w-7xl mx-auto px-6 relative'>
          {/* Section header */}
          <div className='text-center mb-16'>
            <div
              className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-medium tracking-wide uppercase'
              style={{
                background: 'rgba(124,58,237,0.12)',
                border: '1px solid rgba(124,58,237,0.28)',
                color: '#a78bfa',
              }}
            >
              iOS 26 Design Language
            </div>
            <h2 className='text-4xl font-bold mb-4' style={{ color: '#f1f5f9' }}>
              Liquid Glass
            </h2>
            <p className='text-lg max-w-xl mx-auto' style={{ color: 'rgba(148,163,184,0.65)' }}>
              苹果 iOS 26 / macOS Tahoe 液态玻璃效果——折射、高光、景深三层叠加
            </p>
          </div>

          {/* Pills row */}
          <div className='flex items-center justify-center gap-3 flex-wrap mb-10'>
            <LiquidGlass variant='pill' intensity='subtle'>
              <span style={{ color: '#e2e8f0' }}>Subtle</span>
            </LiquidGlass>
            <LiquidGlass variant='pill'>
              <span style={{ color: '#e2e8f0' }}>Normal</span>
            </LiquidGlass>
            <LiquidGlass variant='pill' intensity='strong'>
              <span style={{ color: '#e2e8f0' }}>Strong</span>
            </LiquidGlass>
            <LiquidGlass variant='pill' tint='rgba(124,58,237,0.16)' glow='#7c3aed'>
              <span style={{ color: '#c4b5fd' }}>Purple Tint</span>
            </LiquidGlass>
            <LiquidGlass variant='pill' tint='rgba(14,165,233,0.14)' glow='#0ea5e9'>
              <span style={{ color: '#7dd3fc' }}>Blue Tint</span>
            </LiquidGlass>
            <LiquidGlass variant='pill' animate>
              <span style={{ color: '#e2e8f0' }}>Animated</span>
            </LiquidGlass>
          </div>

          {/* Buttons row */}
          <div className='flex items-center justify-center gap-4 flex-wrap mb-12'>
            <LiquidGlass as='button' variant='button' intensity='subtle'>
              <span style={{ color: '#e2e8f0' }}>Subtle Button</span>
            </LiquidGlass>
            <LiquidGlass as='button' variant='button'>
              <span style={{ color: '#e2e8f0' }}>Normal Button</span>
            </LiquidGlass>
            <LiquidGlass as='button' variant='button' intensity='strong' animate>
              <span style={{ color: '#e2e8f0' }}>Strong + Animated</span>
            </LiquidGlass>
            <LiquidGlass
              as='button'
              variant='button'
              tint='rgba(124,58,237,0.16)'
              glow='#7c3aed'
              animate
            >
              <span style={{ color: '#c4b5fd' }}>Glow Button</span>
            </LiquidGlass>
          </div>

          {/* Cards grid */}
          <div className='grid md:grid-cols-3 gap-6 mb-8'>
            <LiquidGlass variant='card' intensity='subtle'>
              <h3 className='text-lg font-semibold mb-2' style={{ color: '#f1f5f9' }}>
                Subtle Glass
              </h3>
              <p className='text-sm leading-relaxed' style={{ color: 'rgba(148,163,184,0.7)' }}>
                轻柔的磨砂玻璃效果，适合在背景复杂度较低时使用。
              </p>
            </LiquidGlass>

            <LiquidGlass variant='card' animate glow='#7c3aed' tint='rgba(124,58,237,0.10)'>
              <h3 className='text-lg font-semibold mb-2' style={{ color: '#f1f5f9' }}>
                Animated + Glow
              </h3>
              <p className='text-sm leading-relaxed' style={{ color: 'rgba(148,163,184,0.7)' }}>
                启用液态动画与紫色光晕，高光缓慢漂移，模拟玻璃内光线流动。
              </p>
            </LiquidGlass>

            <LiquidGlass variant='card' intensity='strong' tint='rgba(14,165,233,0.12)' glow='#0ea5e9'>
              <h3 className='text-lg font-semibold mb-2' style={{ color: '#f1f5f9' }}>
                Strong + Blue
              </h3>
              <p className='text-sm leading-relaxed' style={{ color: 'rgba(148,163,184,0.7)' }}>
                强度最高的模糊与折射，蓝色染色，适合强调性卡片场景。
              </p>
            </LiquidGlass>
          </div>

          {/* Large panel */}
          <LiquidGlass
            variant='panel'
            intensity='strong'
            animate
            tint='rgba(124,58,237,0.09)'
            glow='#7c3aed'
            className='max-w-2xl mx-auto'
          >
            <div className='text-center'>
              <div
                className='inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4'
                style={{
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(14,165,233,0.25))',
                  border: '1px solid rgba(255,255,255,0.14)',
                }}
              >
                <Sparkles className='w-5 h-5' style={{ color: '#c4b5fd' }} />
              </div>
              <h3 className='text-xl font-bold mb-2' style={{ color: '#f1f5f9' }}>
                Liquid Glass Panel
              </h3>
              <p className='text-sm' style={{ color: 'rgba(148,163,184,0.7)' }}>
                大面板变体，强度最高，启用动画，搭配紫色染色与外发光。
                折射层会对背景渐变产生细微畸变，形成真实玻璃透镜感。
              </p>
            </div>
          </LiquidGlass>
        </div>
      </section>

      {/* ── BOTTOM CTA ─────────────────────────────────────────────── */}
      <section
        className='py-24 relative overflow-hidden border-t'
        style={{
          borderColor: 'rgba(255,255,255,0.06)',
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.18), rgba(14,165,233,0.07) 55%, transparent 70%)',
        }}
      >
        <div
          className='absolute inset-0 opacity-15 pointer-events-none'
          style={{
            backgroundImage: `
              linear-gradient(rgba(124,58,237,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124,58,237,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        <div className='relative max-w-3xl mx-auto px-6 text-center'>
          <div
            className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 border'
            style={{
              background: 'rgba(124,58,237,0.12)',
              borderColor: 'rgba(124,58,237,0.25)',
              color: '#a78bfa',
            }}
          >
            <Sparkles className='w-3.5 h-3.5' />
            立即开始你的第一个任务
          </div>

          <h2
            className='text-5xl font-bold tracking-tight mb-6'
            style={{ color: '#f1f5f9' }}
          >
            加入全球协作网络
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              重塑工作的未来
            </span>
          </h2>

          <p className='text-lg mb-10' style={{ color: 'rgba(148,163,184,0.8)' }}>
            无论你是任务发布者还是执行者，加入 TaskChain 即可享受 AI 驱动的高效协作。
            注册即获 3 次免费任务发布额度。
          </p>

          <div className='flex items-center justify-center gap-4 flex-wrap'>
            <button
              className='inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200'
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
                boxShadow: '0 0 40px rgba(124,58,237,0.5)',
                fontSize: '15px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 0 60px rgba(124,58,237,0.7)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 0 40px rgba(124,58,237,0.5)'
              }}
            >
              免费注册，立即发布任务
              <ArrowRight className='w-5 h-5' />
            </button>
            <button
              className='inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200 border'
              style={{
                color: '#f1f5f9',
                borderColor: 'rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.05)',
                fontSize: '15px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.09)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              }}
            >
              加入协作网络
            </button>
          </div>

          <p className='mt-6 text-sm' style={{ color: 'rgba(148,163,184,0.4)' }}>
            无需信用卡 · 3 分钟完成注册 · 立即上手
          </p>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer
        className='py-16 border-t'
        style={{
          borderColor: 'rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.008)',
        }}
      >
        <div className='max-w-7xl mx-auto px-6'>
          <div className='grid grid-cols-2 lg:grid-cols-6 gap-8 mb-12'>
            {/* Brand */}
            <div className='col-span-2'>
              <div className='flex items-center gap-2.5 mb-4'>
                <div
                  className='w-8 h-8 rounded-lg flex items-center justify-center'
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)' }}
                >
                  <Network className='w-4 h-4 text-white' />
                </div>
                <span className='text-lg font-bold'>TaskChain</span>
              </div>
              <p
                className='text-sm leading-relaxed mb-5'
                style={{ color: 'rgba(148,163,184,0.6)' }}
              >
                基于区块链 + AI 的任务分包协作平台。
                让全球人才高效协作，让价值公平流转。
              </p>
              <div className='flex items-center gap-2'>
                {['𝕏', 'in', 'DC', 'GH'].map((icon) => (
                  <button
                    key={icon}
                    className='w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 border'
                    style={{
                      color: 'rgba(148,163,184,0.55)',
                      borderColor: 'rgba(255,255,255,0.08)',
                      background: 'rgba(255,255,255,0.03)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)'
                      e.currentTarget.style.color = '#f1f5f9'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                      e.currentTarget.style.color = 'rgba(148,163,184,0.55)'
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {footerSections.map(({ title, links }) => (
              <div key={title}>
                <h4
                  className='text-sm font-semibold mb-4'
                  style={{ color: '#e2e8f0' }}
                >
                  {title}
                </h4>
                <ul className='space-y-3'>
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href='#'
                        className='text-sm transition-colors duration-200'
                        style={{ color: 'rgba(148,163,184,0.6)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#f1f5f9')}
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = 'rgba(148,163,184,0.6)')
                        }
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className='pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t'
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <p className='text-sm' style={{ color: 'rgba(148,163,184,0.35)' }}>
              &copy; 2025 TaskChain. All rights reserved.
            </p>
            <div className='flex items-center gap-6'>
              {['隐私政策', '服务条款', 'Cookie 政策'].map((item) => (
                <a
                  key={item}
                  href='#'
                  className='text-sm transition-colors duration-200'
                  style={{ color: 'rgba(148,163,184,0.35)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(148,163,184,0.75)')}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'rgba(148,163,184,0.35)')
                  }
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
