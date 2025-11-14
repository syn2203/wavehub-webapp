'use client';

import { useState } from 'react';
import Link from 'next/link';
import MarketOverview from '@/components/MarketOverview';
import TrendingDiscussions from '@/components/TrendingDiscussions';
import LearningResources from '@/components/LearningResources';
import TrendingVoiceChat from '@/components/TrendingVoiceChat';
import { MessageCircle, BookOpen, Users, Star, ArrowRight, Globe, Zap, Heart } from 'lucide-react';

// 板块数据
const sections = {
  meetings: {
    title: '会议室',
    icon: Users,
    description: '高质量语音会议，支持AI降噪和实时转录',
    color: 'from-blue-500 to-purple-500',
    categories: [
      {
        name: '产品评审会',
        participants: 12,
        status: '进行中',
        duration: '45分钟',
        type: 'active',
      },
      { name: '技术讨论', participants: 8, status: '等待中', duration: '30分钟', type: 'waiting' },
      { name: '项目汇报', participants: 15, status: '已结束', duration: '60分钟', type: 'ended' },
      { name: '头脑风暴', participants: 6, status: '进行中', duration: '25分钟', type: 'active' },
    ],
  },
  collaboration: {
    title: '团队协作',
    icon: MessageCircle,
    description: '实时语音协作空间，提升团队沟通效率',
    color: 'from-green-500 to-teal-500',
    categories: [
      { name: '开发团队', members: 25, online: 18, activity: 'high', lastActive: '刚刚' },
      { name: '设计团队', members: 12, online: 9, activity: 'medium', lastActive: '3分钟前' },
      { name: '产品团队', members: 15, online: 12, activity: 'high', lastActive: '1分钟前' },
      { name: '运营团队', members: 8, online: 5, activity: 'low', lastActive: '10分钟前' },
    ],
  },
  education: {
    title: '在线教育',
    icon: BookOpen,
    description: 'AI辅助的在线教学和培训平台',
    color: 'from-orange-500 to-red-500',
    categories: [
      { name: 'AI技术分享', level: '高级', duration: '2小时', students: 340, rating: 4.9 },
      { name: '语音技术入门', level: '初级', duration: '1.5小时', students: 520, rating: 4.7 },
      { name: '团队协作技巧', level: '中级', duration: '3小时', students: 280, rating: 4.8 },
      { name: '远程工作指南', level: '初级', duration: '2.5小时', students: 450, rating: 4.6 },
    ],
  },
  community: {
    title: '社区交流',
    icon: Globe,
    description: '全球用户交流社区，分享经验和见解',
    color: 'from-purple-500 to-pink-500',
    categories: [
      { name: '技术交流', posts: 1240, members: 5670, activity: 'high', lastActive: '2分钟前' },
      { name: '产品反馈', posts: 890, members: 3450, activity: 'medium', lastActive: '5分钟前' },
      { name: '新手指南', posts: 2340, members: 8900, activity: 'high', lastActive: '1分钟前' },
      { name: '功能建议', posts: 567, members: 2340, activity: 'medium', lastActive: '8分钟前' },
    ],
  },
  innovation: {
    title: '创新实验',
    icon: Zap,
    description: '探索AI语音技术的前沿应用和创新功能',
    color: 'from-indigo-500 to-blue-500',
    categories: [
      { name: 'AI语音合成', experiments: 34, likes: 2670, views: 15600, status: '测试中' },
      { name: '实时翻译', experiments: 28, likes: 1950, views: 12900, status: '开发中' },
      { name: '情感识别', experiments: 19, likes: 1340, views: 8700, status: '概念验证' },
      { name: '智能摘要', experiments: 42, likes: 3560, views: 21100, status: '公测中' },
    ],
  },
};

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // 处理分类项目点击事件
  const handleCategoryClick = (sectionKey: string, category: any) => {
    // 构建chat页面的URL参数
    const params = new URLSearchParams({
      section: sectionKey,
      category: category.name || category.symbol || category.title,
      type: sectionKey,
    });

    // 跳转到chat页面并传递参数
    window.location.href = `/chat?${params.toString()}`;
  };

  const SectionCard = ({ sectionKey, section }: { sectionKey: string; section: any }) => {
    const Icon = section.icon;
    const isActive = activeSection === sectionKey;

    return (
      <div
        className={`relative group cursor-pointer transition-all duration-300 ${
          isActive ? 'scale-105' : 'hover:scale-102'
        }`}
        onMouseEnter={() => setActiveSection(sectionKey)}
        onMouseLeave={() => setActiveSection(null)}
      >
        <div
          className={`bg-gradient-to-br ${section.color} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{section.title}</h3>
                <p className="text-white/80 text-sm">{section.description}</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
          </div>

          {/* 分类预览 */}
          <div className="space-y-2">
            {section.categories.slice(0, 3).map((category: any, index: number) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-colors"
                onClick={() => handleCategoryClick(sectionKey, category)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium text-sm">{category.name}</span>
                  <div className="flex items-center space-x-2 text-xs text-white/80">
                    {/* 根据不同板块显示不同信息 */}
                    {sectionKey === 'meetings' ? (
                      <>
                        <Users className="w-3 h-3" />
                        <span>{category.participants}人</span>
                        <span
                          className={`px-2 py-1 rounded-full ${
                            category.type === 'active'
                              ? 'bg-green-500/20 text-green-200'
                              : category.type === 'waiting'
                                ? 'bg-yellow-500/20 text-yellow-200'
                                : 'bg-gray-500/20 text-gray-200'
                          }`}
                        >
                          {category.status}
                        </span>
                      </>
                    ) : sectionKey === 'collaboration' ? (
                      <>
                        <Users className="w-3 h-3" />
                        <span>
                          {category.online}/{category.members}
                        </span>
                      </>
                    ) : sectionKey === 'education' ? (
                      <>
                        <span>{category.level}</span>
                        <span>⭐ {category.rating}</span>
                      </>
                    ) : sectionKey === 'community' ? (
                      <>
                        <Users className="w-3 h-3" />
                        <span>{category.members}</span>
                      </>
                    ) : (
                      <>
                        <Heart className="w-3 h-3" />
                        <span>{category.likes}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {section.categories.length > 3 && (
              <div className="text-center">
                <span className="text-white/60 text-xs">
                  还有 {section.categories.length - 3} 个分类...
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 悬浮详情卡片 */}
        {isActive && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl p-6 z-10 animate-scale-in">
            <h4 className="font-bold text-gray-900 mb-4">全部分类</h4>
            <div className="grid grid-cols-1 gap-3">
              {section.categories.map((category: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => handleCategoryClick(sectionKey, category)}
                >
                  <div>
                    <div className="font-medium text-gray-900">{category.name}</div>
                    <div className="text-sm text-gray-500">
                      {sectionKey === 'meetings'
                        ? `${category.participants} 参与者 • ${category.duration}`
                        : sectionKey === 'collaboration'
                          ? `${category.members} 成员 • ${category.lastActive}`
                          : sectionKey === 'education'
                            ? `${category.students} 学员 • ${category.duration}`
                            : sectionKey === 'community'
                              ? `${category.posts} 帖子 • ${category.lastActive}`
                              : `${category.experiments} 实验 • ${category.views} 浏览`}
                    </div>
                  </div>
                  <div className="text-right">
                    {sectionKey === 'meetings' ? (
                      <div
                        className={`px-2 py-1 rounded-full text-xs ${
                          category.type === 'active'
                            ? 'bg-green-100 text-green-800'
                            : category.type === 'waiting'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {category.status}
                      </div>
                    ) : sectionKey === 'collaboration' ? (
                      <div>
                        <div className="font-bold text-gray-900">{category.online}人在线</div>
                        <div
                          className={`text-sm ${
                            category.activity === 'high'
                              ? 'text-green-600'
                              : category.activity === 'medium'
                                ? 'text-yellow-600'
                                : 'text-gray-600'
                          }`}
                        >
                          {category.activity === 'high'
                            ? '活跃'
                            : category.activity === 'medium'
                              ? '一般'
                              : '较少'}
                        </div>
                      </div>
                    ) : sectionKey === 'education' ? (
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{category.rating}</span>
                      </div>
                    ) : sectionKey === 'community' ? (
                      <div
                        className={`px-2 py-1 rounded-full text-xs ${
                          category.activity === 'high'
                            ? 'bg-green-100 text-green-800'
                            : category.activity === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {category.activity === 'high'
                          ? '活跃'
                          : category.activity === 'medium'
                            ? '一般'
                            : '较少'}
                      </div>
                    ) : (
                      <div>
                        <div className="font-bold text-gray-900">{category.status}</div>
                        <div className="flex items-center space-x-1 justify-end">
                          <Heart className="w-3 h-3 text-red-400" />
                          <span className="text-sm">{category.likes}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link href={`/${sectionKey}`} className="w-full btn-primary py-3 text-center block">
                进入 {section.title} 板块
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_55%)] opacity-70" />
      <div className="pointer-events-none absolute inset-y-0 right-[-10%] w-1/2 bg-gradient-to-bl from-cyan-500/20 via-transparent to-fuchsia-500/20 blur-3xl" />
      <div className="relative z-10 min-h-screen">
        {/* 头部 */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    WaveHub
                  </h1>
                  <p className="text-sm text-gray-600">AI驱动的实时语音协作平台</p>
                </div>
              </div>
              <nav className="flex items-center space-x-6">
                <Link href="/chat" className="text-gray-600 hover:text-blue-600 transition-colors">
                  实时聊天
                </Link>
                <Link
                  href="/analysis"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  市场分析
                </Link>
                <Link
                  href="/portfolio"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  投资组合
                </Link>
                <button className="btn-primary px-6 py-2">登录</button>
              </nav>
            </div>
          </div>
        </header>

        {/* 主要内容 */}
        <main className="container mx-auto px-6 py-12">
          {/* 欢迎区域 */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              由 AI 驱动的实时语音协作平台
              <span className="block text-2xl md:text-3xl text-gray-600 font-normal mt-2">
                连接全球，共创未来
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              利用先进的AI技术，提供高质量的实时语音通信体验。
              无论是团队协作、在线会议还是社区交流，WaveHub让沟通更智能、更高效。
            </p>
          </div>

          {/* 核心数据展示 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">100K+</div>
              <div className="text-gray-600">全球用户</div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl">
              <div className="text-3xl font-bold text-green-600 mb-2">50M+</div>
              <div className="text-gray-600">语音通话分钟</div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
              <div className="text-gray-600">服务可用性</div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl">
              <div className="text-3xl font-bold text-orange-600 mb-2">AI</div>
              <div className="text-gray-600">智能降噪</div>
            </div>
          </div>

          {/* 主要板块 */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">探索协作空间</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(sections).map(([key, section]) => (
                <SectionCard key={key} sectionKey={key} section={section} />
              ))}
            </div>
          </div>

          {/* 内容区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
            {/* 市场概览 */}
            <div className="lg:col-span-1">
              <MarketOverview />
            </div>

            {/* 热点语聊 */}
            <div className="lg:col-span-1">
              <TrendingVoiceChat />
            </div>

            {/* 热门讨论 */}
            <div className="lg:col-span-1">
              <TrendingDiscussions />
            </div>

            {/* 学习资源 */}
            <div className="lg:col-span-1">
              <LearningResources />
            </div>
          </div>

          {/* 快速访问 */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">快速访问</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/chat"
                className="flex flex-col items-center p-4 rounded-xl hover:bg-white/60 transition-colors group"
              >
                <MessageCircle className="w-8 h-8 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-gray-900">语音会议</span>
                <span className="text-sm text-gray-500">高质量通话</span>
              </Link>
              <Link
                href="/collaboration"
                className="flex flex-col items-center p-4 rounded-xl hover:bg-white/60 transition-colors group"
              >
                <Users className="w-8 h-8 text-green-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-gray-900">团队协作</span>
                <span className="text-sm text-gray-500">实时沟通</span>
              </Link>
              <Link
                href="/education"
                className="flex flex-col items-center p-4 rounded-xl hover:bg-white/60 transition-colors group"
              >
                <BookOpen className="w-8 h-8 text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-gray-900">在线教育</span>
                <span className="text-sm text-gray-500">AI辅助学习</span>
              </Link>
              <Link
                href="/innovation"
                className="flex flex-col items-center p-4 rounded-xl hover:bg-white/60 transition-colors group"
              >
                <Zap className="w-8 h-8 text-indigo-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-gray-900">创新实验</span>
                <span className="text-sm text-gray-500">前沿技术</span>
              </Link>
            </div>
          </div>
        </main>

        {/* 页脚 */}
        <footer className="bg-white/80 backdrop-blur-xl border-t border-white/10 mt-20">
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Globe className="w-6 h-6 text-blue-500" />
                  <span className="text-xl font-bold text-gray-900">WaveHub</span>
                </div>
                <p className="text-gray-600 text-sm">
                  由AI驱动的实时语音协作平台，连接全球用户，提供高质量的语音通信体验。
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">语音功能</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <Link href="/meetings" className="hover:text-blue-600">
                      语音会议
                    </Link>
                  </li>
                  <li>
                    <Link href="/collaboration" className="hover:text-blue-600">
                      团队协作
                    </Link>
                  </li>
                  <li>
                    <Link href="/recording" className="hover:text-blue-600">
                      通话录音
                    </Link>
                  </li>
                  <li>
                    <Link href="/transcription" className="hover:text-blue-600">
                      实时转录
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">AI技术</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <Link href="/noise-reduction" className="hover:text-blue-600">
                      智能降噪
                    </Link>
                  </li>
                  <li>
                    <Link href="/translation" className="hover:text-blue-600">
                      实时翻译
                    </Link>
                  </li>
                  <li>
                    <Link href="/voice-synthesis" className="hover:text-blue-600">
                      语音合成
                    </Link>
                  </li>
                  <li>
                    <Link href="/emotion-detection" className="hover:text-blue-600">
                      情感识别
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">社区</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <Link href="/community" className="hover:text-blue-600">
                      用户社区
                    </Link>
                  </li>
                  <li>
                    <Link href="/chat" className="hover:text-blue-600">
                      语音聊天
                    </Link>
                  </li>
                  <li>
                    <Link href="/feedback" className="hover:text-blue-600">
                      产品反馈
                    </Link>
                  </li>
                  <li>
                    <Link href="/support" className="hover:text-blue-600">
                      技术支持
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
              <p>&copy; 2024 WaveHub. 保留所有权利。</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
