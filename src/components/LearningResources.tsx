'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Play, Star, Clock, Users, ChevronRight } from 'lucide-react';

interface LearningResource {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'video' | 'article' | 'webinar';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  rating: number;
  students: number;
  instructor: string;
  thumbnail: string;
  tags: string[];
  price: number;
  isFree: boolean;
}

export default function LearningResources() {
  const [activeTab, setActiveTab] = useState<'all' | 'course' | 'video' | 'article'>('all');

  const resources: LearningResource[] = [
    {
      id: '1',
      title: '加密货币投资完全指南',
      description: '从零开始学习加密货币投资，掌握基本概念、风险管理和投资策略',
      type: 'course',
      level: 'beginner',
      duration: '4小时',
      rating: 4.8,
      students: 1240,
      instructor: '区块链专家',
      thumbnail: '🪙',
      tags: ['加密货币', '投资基础', '风险管理'],
      price: 299,
      isFree: false,
    },
    {
      id: '2',
      title: '技术分析实战教程',
      description: '学习K线图、技术指标和图表模式，提升交易技能',
      type: 'video',
      level: 'intermediate',
      duration: '2.5小时',
      rating: 4.9,
      students: 890,
      instructor: '技术分析师',
      thumbnail: '📊',
      tags: ['技术分析', 'K线图', '交易策略'],
      price: 199,
      isFree: false,
    },
    {
      id: '3',
      title: '价值投资理念与实践',
      description: '深入了解巴菲特的投资哲学，学习如何挑选优质股票',
      type: 'course',
      level: 'advanced',
      duration: '6小时',
      rating: 4.7,
      students: 567,
      instructor: '价值投资专家',
      thumbnail: '💎',
      tags: ['价值投资', '股票分析', '巴菲特'],
      price: 399,
      isFree: false,
    },
    {
      id: '4',
      title: '新手投资入门指南',
      description: '投资基础知识，帮助新手建立正确的投资观念',
      type: 'article',
      level: 'beginner',
      duration: '30分钟',
      rating: 4.6,
      students: 2340,
      instructor: '理财顾问',
      thumbnail: '📚',
      tags: ['投资入门', '理财规划', '新手指南'],
      price: 0,
      isFree: true,
    },
    {
      id: '5',
      title: '市场心理学与交易情绪管理',
      description: '了解市场心理，学会控制交易情绪，提高投资成功率',
      type: 'webinar',
      level: 'intermediate',
      duration: '1.5小时',
      rating: 4.5,
      students: 723,
      instructor: '交易心理学家',
      thumbnail: '🧠',
      tags: ['交易心理', '情绪管理', '行为金融'],
      price: 99,
      isFree: false,
    },
    {
      id: '6',
      title: 'DeFi协议深度解析',
      description: '深入了解去中心化金融协议，掌握DeFi投资机会',
      type: 'course',
      level: 'advanced',
      duration: '5小时',
      rating: 4.8,
      students: 345,
      instructor: 'DeFi研究员',
      thumbnail: '🔗',
      tags: ['DeFi', '去中心化金融', '协议分析'],
      price: 499,
      isFree: false,
    },
  ];

  const filteredResources =
    activeTab === 'all' ? resources : resources.filter((resource) => resource.type === activeTab);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course':
        return BookOpen;
      case 'video':
        return Play;
      case 'article':
        return BookOpen;
      case 'webinar':
        return Users;
      default:
        return BookOpen;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'course':
        return '课程';
      case 'video':
        return '视频';
      case 'article':
        return '文章';
      case 'webinar':
        return '直播';
      default:
        return '课程';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner':
        return '初级';
      case 'intermediate':
        return '中级';
      case 'advanced':
        return '高级';
      default:
        return '初级';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">学习资源</h3>
            <p className="text-sm text-gray-500">提升投资技能，掌握专业知识</p>
          </div>
        </div>
        <Link href="/learn" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          查看全部 →
        </Link>
      </div>

      {/* 标签页 */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {[
          { key: 'all', label: '全部' },
          { key: 'course', label: '课程' },
          { key: 'video', label: '视频' },
          { key: 'article', label: '文章' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 资源列表 */}
      <div className="space-y-4">
        {filteredResources.slice(0, 4).map((resource) => {
          const TypeIcon = getTypeIcon(resource.type);

          return (
            <div
              key={resource.id}
              className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-2xl">
                    {resource.thumbnail}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      <TypeIcon className="w-3 h-3" />
                      <span>{getTypeLabel(resource.type)}</span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(resource.level)}`}
                    >
                      {getLevelLabel(resource.level)}
                    </span>
                    {resource.isFree && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        免费
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/learn/${resource.id}`}
                    className="block group-hover:text-blue-600 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                      {resource.title}
                    </h4>
                  </Link>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{resource.description}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {resource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{resource.duration}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{resource.students}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{resource.rating}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {resource.isFree ? (
                        <span className="font-bold text-green-600">免费</span>
                      ) : (
                        <span className="font-bold text-gray-900">¥{resource.price}</span>
                      )}
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 统计信息 */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">{resources.length}</div>
            <div className="text-xs text-gray-500">总课程</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              {resources.reduce((sum, r) => sum + r.students, 0)}
            </div>
            <div className="text-xs text-gray-500">学员数</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">
              {resources.filter((r) => r.isFree).length}
            </div>
            <div className="text-xs text-gray-500">免费课程</div>
          </div>
        </div>
      </div>

      {/* 行动按钮 */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link href="/learn" className="btn-primary py-3 text-center">
          📚 浏览全部课程
        </Link>
        <Link href="/learn/free" className="btn-secondary py-3 text-center">
          🎁 免费课程
        </Link>
      </div>
    </div>
  );
}
