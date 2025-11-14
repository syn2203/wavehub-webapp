'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, TrendingUp, Clock, Flame, Eye } from 'lucide-react';

interface Discussion {
  id: string;
  title: string;
  category: string;
  author: string;
  authorAvatar: string;
  replies: number;
  views: number;
  likes: number;
  lastReply: Date;
  isHot: boolean;
  tags: string[];
}

export default function TrendingDiscussions() {
  const [discussions] = useState<Discussion[]>(() => {
    const now = Date.now();
    return [
      {
        id: '1',
        title: '比特币突破10万美元大关，牛市真的来了吗？',
        category: '加密货币',
        author: '投资老王',
        authorAvatar: '👨‍💼',
        replies: 156,
        views: 2340,
        likes: 89,
        lastReply: new Date(now - 300000),
        isHot: true,
        tags: ['比特币', '牛市', '技术分析'],
      },
      {
        id: '2',
        title: '新手必看：如何构建稳健的投资组合',
        category: '投资策略',
        author: '理财小助手',
        authorAvatar: '👩‍💻',
        replies: 234,
        views: 4560,
        likes: 178,
        lastReply: new Date(now - 600000),
        isHot: true,
        tags: ['新手指南', '投资组合', '风险管理'],
      },
      {
        id: '3',
        title: 'AI概念股还能涨多久？深度分析',
        category: '股票分析',
        author: '科技分析师',
        authorAvatar: '🤖',
        replies: 89,
        views: 1890,
        likes: 67,
        lastReply: new Date(now - 900000),
        isHot: false,
        tags: ['AI', '科技股', '基本面分析'],
      },
      {
        id: '4',
        title: '2024年最值得关注的5个投资赛道',
        category: '市场观察',
        author: '投资达人',
        authorAvatar: '📊',
        replies: 312,
        views: 5670,
        likes: 234,
        lastReply: new Date(now - 1200000),
        isHot: true,
        tags: ['投资赛道', '2024', '趋势分析'],
      },
      {
        id: '5',
        title: '美联储政策对全球市场的影响分析',
        category: '宏观经济',
        author: '经济学者',
        authorAvatar: '🎓',
        replies: 78,
        views: 1456,
        likes: 45,
        lastReply: new Date(now - 1800000),
        isHot: false,
        tags: ['美联储', '货币政策', '全球市场'],
      },
    ];
  });

  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 每分钟更新一次时间

    return () => clearInterval(timer);
  }, []);

  const getTimeAgo = (date: Date) => {
    const diff = Math.floor((currentTime.getTime() - date.getTime()) / 1000);

    if (diff < 60) return '刚刚';
    if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`;
    return `${Math.floor(diff / 86400)}天前`;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      加密货币: 'bg-orange-100 text-orange-700',
      投资策略: 'bg-blue-100 text-blue-700',
      股票分析: 'bg-green-100 text-green-700',
      市场观察: 'bg-purple-100 text-purple-700',
      宏观经济: 'bg-indigo-100 text-indigo-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">热门讨论</h3>
            <p className="text-sm text-gray-500">社区最活跃的话题</p>
          </div>
        </div>
        <Link href="/discussions" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          查看全部 →
        </Link>
      </div>

      <div className="space-y-4">
        {discussions.map((discussion, index) => (
          <div
            key={discussion.id}
            className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-lg">
                  {discussion.authorAvatar}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  {discussion.isHot && (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                      <Flame className="w-3 h-3" />
                      <span>热门</span>
                    </div>
                  )}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(discussion.category)}`}
                  >
                    {discussion.category}
                  </span>
                  <span className="text-xs text-gray-500">#{index + 1}</span>
                </div>

                <Link
                  href={`/discussions/${discussion.id}`}
                  className="block group-hover:text-blue-600 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
                    {discussion.title}
                  </h4>
                </Link>

                <div className="flex flex-wrap gap-1 mb-3">
                  {discussion.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <span>{discussion.author}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{discussion.replies}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{discussion.views}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{discussion.likes}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{getTimeAgo(discussion.lastReply)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">
              {discussions.reduce((sum, d) => sum + d.replies, 0)}
            </div>
            <div className="text-xs text-gray-500">总回复</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              {discussions.reduce((sum, d) => sum + d.views, 0)}
            </div>
            <div className="text-xs text-gray-500">总浏览</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">
              {discussions.filter((d) => d.isHot).length}
            </div>
            <div className="text-xs text-gray-500">热门话题</div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link href="/discussions/new" className="w-full btn-primary py-3 text-center block">
          💬 发起新讨论
        </Link>
      </div>
    </div>
  );
}
