'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Flame, Users, Clock, Mic, Play, Pause, Volume2, MessageCircle, Eye } from 'lucide-react';

interface VoiceChatTopic {
  id: string;
  title: string;
  category: string;
  description: string;
  participants: number;
  duration: string;
  isLive: boolean;
  isPlaying: boolean;
  views: number;
  comments: number;
  tags: string[];
  createdAt: Date;
  thumbnail: string;
  audioUrl?: string;
}

export default function TrendingVoiceChat() {
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [playingId, setPlayingId] = useState<string | null>(null);

  const [trendingTopics] = useState<VoiceChatTopic[]>(() => {
    const now = Date.now();
    return [
      {
        id: '1',
        title: 'AI技术革命：ChatGPT对未来工作的影响',
        category: '科技前沿',
        description: '探讨人工智能技术如何改变我们的工作方式，以及如何适应这个变化',
        participants: 156,
        duration: '45:32',
        isLive: true,
        isPlaying: false,
        views: 2340,
        comments: 89,
        tags: ['AI', 'ChatGPT', '未来工作', '技术革命'],
        createdAt: new Date(now - 1800000), // 30分钟前
        thumbnail: '🤖',
      },
      {
        id: '2',
        title: '新能源汽车市场分析：特斯拉 vs 比亚迪',
        category: '财经观察',
        description: '深度分析新能源汽车市场竞争格局，讨论投资机会和风险',
        participants: 89,
        duration: '32:18',
        isLive: false,
        isPlaying: false,
        views: 1890,
        comments: 67,
        tags: ['新能源', '特斯拉', '比亚迪', '投资分析'],
        createdAt: new Date(now - 3600000), // 1小时前
        thumbnail: '🚗',
      },
      {
        id: '3',
        title: '元宇宙发展现状：机遇还是泡沫？',
        category: '科技趋势',
        description: '讨论元宇宙技术的发展现状，分析其商业价值和未来前景',
        participants: 234,
        duration: '28:45',
        isLive: true,
        isPlaying: false,
        views: 3210,
        comments: 156,
        tags: ['元宇宙', 'VR', 'AR', '科技趋势'],
        createdAt: new Date(now - 900000), // 15分钟前
        thumbnail: '🌐',
      },
      {
        id: '4',
        title: '远程工作新趋势：如何提高团队协作效率',
        category: '职场话题',
        description: '分享远程工作经验，探讨团队协作工具和管理方法',
        participants: 67,
        duration: '38:22',
        isLive: false,
        isPlaying: false,
        views: 1456,
        comments: 45,
        tags: ['远程工作', '团队协作', '效率提升', '管理'],
        createdAt: new Date(now - 7200000), // 2小时前
        thumbnail: '💼',
      },
      {
        id: '5',
        title: '加密货币监管新政策解读',
        category: '金融政策',
        description: '解读最新的加密货币监管政策，分析对市场的影响',
        participants: 123,
        duration: '41:15',
        isLive: false,
        isPlaying: false,
        views: 2100,
        comments: 78,
        tags: ['加密货币', '监管政策', '金融', '市场分析'],
        createdAt: new Date(now - 5400000), // 1.5小时前
        thumbnail: '💰',
      },
    ];
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 每分钟更新一次

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
      科技前沿: 'bg-blue-100 text-blue-700',
      财经观察: 'bg-green-100 text-green-700',
      科技趋势: 'bg-purple-100 text-purple-700',
      职场话题: 'bg-orange-100 text-orange-700',
      金融政策: 'bg-red-100 text-red-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const handlePlayPause = (topicId: string) => {
    if (playingId === topicId) {
      setPlayingId(null);
    } else {
      setPlayingId(topicId);
      // 这里可以添加实际的音频播放逻辑
      setTimeout(() => {
        setPlayingId(null);
      }, 3000); // 模拟播放3秒后停止
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">热点语聊</h3>
            <p className="text-sm text-gray-500">热门话题语音讨论</p>
          </div>
        </div>
        <Link
          href="/trending-voice"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          查看全部 →
        </Link>
      </div>

      <div className="space-y-4">
        {trendingTopics.slice(0, 4).map((topic, index) => (
          <div
            key={topic.id}
            className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-start space-x-4">
              {/* 缩略图和播放按钮 */}
              <div className="flex-shrink-0 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-2xl">
                  {topic.thumbnail}
                </div>
                <button
                  onClick={() => handlePlayPause(topic.id)}
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  {playingId === topic.id ? (
                    <Pause className="w-3 h-3" />
                  ) : (
                    <Play className="w-3 h-3 ml-0.5" />
                  )}
                </button>
                {topic.isLive && (
                  <div className="absolute -top-1 -left-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full flex items-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse"></div>
                    LIVE
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                {/* 标题和分类 */}
                <div className="flex items-center space-x-2 mb-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(topic.category)}`}
                  >
                    {topic.category}
                  </span>
                  <span className="text-xs text-gray-500">#{index + 1}</span>
                  {topic.isLive && (
                    <div className="flex items-center space-x-1 text-red-600">
                      <Mic className="w-3 h-3" />
                      <span className="text-xs font-medium">直播中</span>
                    </div>
                  )}
                </div>

                <Link
                  href={`/voice-chat/${topic.id}`}
                  className="block group-hover:text-blue-600 transition-colors"
                >
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
                    {topic.title}
                  </h4>
                </Link>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{topic.description}</p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {topic.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                  {topic.tags.length > 3 && (
                    <span className="text-xs text-gray-400">+{topic.tags.length - 3}</span>
                  )}
                </div>

                {/* 统计信息 */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{topic.participants}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{topic.views}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{topic.comments}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{topic.duration}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs">{getTimeAgo(topic.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* 音频波形动画（播放时显示） */}
              {playingId === topic.id && (
                <div className="flex-shrink-0 flex items-center space-x-1">
                  <Volume2 className="w-4 h-4 text-blue-600" />
                  <div className="flex items-center space-x-0.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-1 bg-blue-600 rounded-full animate-pulse"
                        style={{
                          height: `${Math.random() * 16 + 8}px`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 统计信息 */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-red-600">
              {trendingTopics.filter((t) => t.isLive).length}
            </div>
            <div className="text-xs text-gray-500">直播中</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              {trendingTopics.reduce((sum, t) => sum + t.participants, 0)}
            </div>
            <div className="text-xs text-gray-500">总参与</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              {trendingTopics.reduce((sum, t) => sum + t.views, 0)}
            </div>
            <div className="text-xs text-gray-500">总浏览</div>
          </div>
        </div>
      </div>

      {/* 行动按钮 */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link href="/voice-chat/create" className="btn-primary py-3 text-center">
          🎙️ 发起语聊
        </Link>
        <Link href="/trending-voice" className="btn-secondary py-3 text-center">
          🔥 更多热点
        </Link>
      </div>
    </div>
  );
}
