'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ChatCryptoWidget from '@/components/ChatCryptoWidget';
import ShareModal from '@/components/ShareModal';

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'audio' | 'system';
}

interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  role: string;
  isListening: boolean;
}

export default function ChatPage() {
  // 获取URL参数
  const [urlParams] = useState<{
    section?: string;
    category?: string;
    type?: string;
  }>(() => {
    // 在初始化时解析URL参数，避免在useEffect中设置状态
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      return {
        section: searchParams.get('section') || undefined,
        category: searchParams.get('category') || undefined,
        type: searchParams.get('type') || undefined,
      };
    }
    return {};
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // 使用函数形式的useState来延迟初始化，确保Date.now()只在组件首次挂载时调用一次
    const now = Date.now();
    return [
      {
        id: '1',
        userId: 'system',
        userName: '系统',
        avatar: '🤖',
        message: '欢迎来到 WaveHub 语音聊天室！',
        timestamp: new Date(now - 300000),
        type: 'system'
      },
      {
        id: '2',
        userId: '1',
        userName: '张三',
        avatar: '👨‍💼',
        message: '大家好！今天的会议开始了',
        timestamp: new Date(now - 240000),
        type: 'text'
      },
      {
        id: '3',
        userId: '2',
        userName: '李四',
        avatar: '👩‍💻',
        message: '我已经准备好了，可以开始讨论项目进度',
        timestamp: new Date(now - 180000),
        type: 'text'
      },
      {
        id: '4',
        userId: '3',
        userName: '王五',
        avatar: '👨‍🎨',
        message: '🎤 正在语音通话中...',
        timestamp: new Date(now - 120000),
        type: 'audio'
      },
      {
        id: '5',
        userId: '2',
        userName: '李四',
        avatar: '👩‍💻',
        message: '大家看到比特币今天的走势了吗？涨了2.3%！',
        timestamp: new Date(now - 60000),
        type: 'text'
      },
      {
        id: '6',
        userId: '1',
        userName: '张三',
        avatar: '👨‍💼',
        message: '是的，整个加密货币市场都在上涨，以太坊也表现不错',
        timestamp: new Date(now - 30000),
        type: 'text'
      }
    ];
  });

  const [users] = useState<User[]>([
    { id: '1', name: '张三', avatar: '👨‍💼', status: 'online', role: '产品经理', isListening: true },
    { id: '2', name: '李四', avatar: '👩‍💻', status: 'online', role: '前端开发', isListening: true },
    { id: '3', name: '王五', avatar: '👨‍🎨', status: 'online', role: 'UI设计师', isListening: false },
    { id: '4', name: '赵六', avatar: '👩‍🔬', status: 'away', role: '后端开发', isListening: false },
    { id: '5', name: '孙七', avatar: '👨‍🏫', status: 'online', role: '测试工程师', isListening: true },
    { id: '6', name: '周八', avatar: '👩‍💼', status: 'offline', role: '项目经理', isListening: false },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isCryptoMinimized, setIsCryptoMinimized] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentUser] = useState({
    id: 'current',
    name: '我',
    avatar: '😊'
  });

  // 根据URL参数生成聊天室信息
  const getRoomInfo = () => {
    if (urlParams.section && urlParams.category) {
      const sectionNames: { [key: string]: string } = {
        'meetings': '会议室',
        'collaboration': '团队协作',
        'education': '在线教育',
        'community': '社区交流',
        'innovation': '创新实验'
      };
      
      return {
        title: `${sectionNames[urlParams.section] || urlParams.section} - ${urlParams.category}`,
        description: `专注于${urlParams.category}的语音协作和交流分享`,
        participantCount: users.length + 1,
        onlineCount: users.filter(u => u.status === 'online').length + 1,
        roomId: `${urlParams.section}-${urlParams.category.toLowerCase().replace(/\s+/g, '-')}`,
        createdAt: new Date('2024-01-15T10:00:00Z')
      };
    }
    
    return {
      title: 'WaveHub 语音聊天室',
      description: 'AI驱动的实时语音协作平台，支持高质量语音通话和智能功能',
      participantCount: users.length + 1,
      onlineCount: users.filter(u => u.status === 'online').length + 1,
      roomId: 'wavehub-main-room',
      createdAt: new Date('2024-01-15T10:00:00Z')
    };
  };

  const roomInfo = getRoomInfo();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 根据URL参数添加欢迎消息 - 使用useEffect但避免同步setState
  useEffect(() => {
    if (urlParams.section && urlParams.category) {
      // 使用setTimeout将setState调用推迟到下一个事件循环
      const timer = setTimeout(() => {
        const welcomeMessage: ChatMessage = {
          id: `welcome-${Date.now()}`,
          userId: 'system',
          userName: '系统',
          avatar: '🤖',
          message: `欢迎来到${urlParams.category}协作空间！在这里您可以与团队成员进行高质量的语音协作和交流。`,
          timestamp: new Date(),
          type: 'system'
        };
        
        setMessages(prev => [...prev, welcomeMessage]);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [urlParams.section, urlParams.category]);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 模拟实时消息
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessages = [
        '项目进展很顺利 👍',
        '我觉得这个方案可行',
        '需要再讨论一下细节',
        '大家辛苦了！',
        '下周的计划是什么？',
        '这个功能很有意思',
        '我来分享一下屏幕',
        '音质很清晰！',
        '比特币又创新高了 🚀',
        '以太坊的走势很稳定',
        '今天的行情分析怎么样？',
        'SOL涨得不错啊',
        '大家觉得现在适合入场吗？',
        '刚才看了TradingView的图表分析',
        '加密货币市场真是变化莫测',
        '我设置了价格提醒，到时候通知大家'
      ];
      
      const randomUsers = users.filter(u => u.status === 'online');
      if (randomUsers.length > 0 && Math.random() > 0.7) {
        const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
        const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
        
        const newMsg: ChatMessage = {
          id: Date.now().toString(),
          userId: randomUser.id,
          userName: randomUser.name,
          avatar: randomUser.avatar,
          message: randomMessage,
          timestamp: new Date(),
          type: 'text'
        };
        
        setMessages(prev => [...prev, newMsg]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [users]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      avatar: currentUser.avatar,
      message: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* 头部导航 */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>返回主页</span>
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            
            {/* 面包屑导航 */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">WaveHub</Link>
              {urlParams.section && (
                <>
                  <span>/</span>
                  <span className="text-gray-400">
                    {urlParams.section === 'meetings' ? '会议室' :
                     urlParams.section === 'collaboration' ? '团队协作' :
                     urlParams.section === 'education' ? '在线教育' :
                     urlParams.section === 'community' ? '社区交流' :
                     urlParams.section === 'innovation' ? '创新实验' : urlParams.section}
                  </span>
                </>
              )}
              {urlParams.category && (
                <>
                  <span>/</span>
                  <span className="text-blue-600 font-medium">{urlParams.category}</span>
                </>
              )}
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="text-blue-600 mr-2">🎙️</span>
              {roomInfo.title}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span>{users.filter(u => u.status === 'online').length} 人在线</span>
            </div>
            {/* 分享按钮 */}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span className="font-medium">分享</span>
            </button>
          </div>
        </div>

        {/* 加密货币行情区域 */}
        <div className="mb-6">
          <ChatCryptoWidget 
            isMinimized={isCryptoMinimized}
            onToggle={() => setIsCryptoMinimized(!isCryptoMinimized)}
          />
        </div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 聊天消息区域 */}
          <div className="lg:col-span-3 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900 flex items-center">
                  <span className="text-green-500 mr-2">💬</span>
                  群聊消息
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleListening}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      isListening 
                        ? 'bg-green-100 text-green-700 border border-green-300' 
                        : 'bg-gray-100 text-gray-700 border border-gray-300'
                    }`}
                  >
                    {isListening ? '🔊 正在收听' : '🔇 静音'}
                  </button>
                  <span className="text-xs text-gray-500">
                    {messages.length} 条消息
                  </span>
                </div>
              </div>
            </div>

            {/* 消息列表 */}
            <div 
              ref={chatContainerRef}
              className="h-96 overflow-y-auto p-4 space-y-4"
            >
              {messages.map((message) => (
                <div key={message.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-lg">
                      {message.avatar}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">{message.userName}</span>
                      <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                      {message.type === 'audio' && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                          语音
                        </span>
                      )}
                      {message.type === 'system' && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                          系统
                        </span>
                      )}
                    </div>
                    <div className={`p-3 rounded-lg ${
                      message.userId === currentUser.id 
                        ? 'bg-blue-500 text-white ml-8' 
                        : message.type === 'system'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {message.message}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* 消息输入区域 */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="输入消息..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  发送
                </button>
                <button className="btn-secondary px-4 py-2">
                  🎤
                </button>
              </div>
            </div>
          </div>

          {/* 用户列表区域 */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-semibold text-gray-900 flex items-center">
                <span className="text-blue-500 mr-2">👥</span>
                在线用户 ({users.filter(u => u.status === 'online').length})
              </h2>
            </div>

            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {users.map((user) => (
                <div key={user.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-lg">
                      {user.avatar}
                    </div>
                    {/* 状态指示器 */}
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(user.status)} rounded-full border-2 border-white`}></div>
                    {/* 收听状态 */}
                    {user.isListening && user.status === 'online' && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-xs text-white">🔊</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">{user.name}</h3>
                      {user.status === 'online' && (
                        <span className="text-xs text-green-600">在线</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{user.role}</p>
                    {user.isListening && user.status === 'online' && (
                      <p className="text-xs text-blue-600">正在收听</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 快速行情 */}
            <div className="p-4 border-t border-gray-100">
              <div className="mb-3">
                <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                  <span className="mr-1">📊</span>
                  快速行情
                </h4>
                <div className="space-y-2">
                  {[
                    { symbol: 'BTC', price: 95420, change: 2.34, icon: '₿', color: 'text-orange-500' },
                    { symbol: 'ETH', price: 3542, change: -1.23, icon: 'Ξ', color: 'text-blue-500' }
                  ].map((crypto) => (
                    <div key={crypto.symbol} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm ${crypto.color}`}>{crypto.icon}</span>
                        <span className="text-xs font-medium text-gray-900">{crypto.symbol}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-gray-900">
                          ${crypto.price.toLocaleString()}
                        </div>
                        <div className={`text-xs ${crypto.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setIsCryptoMinimized(false)}
                  className="w-full mt-2 py-1 px-2 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                  查看详细图表
                </button>
              </div>
            </div>

            {/* 语音控制区域 */}
            <div className="p-4 border-t bg-gray-50">
              <div className="space-y-3">
                <button
                  onClick={toggleListening}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    isListening 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {isListening ? '🔇 停止收听' : '🔊 开始收听'}
                </button>
                
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">音频质量</div>
                  <div className="flex items-center justify-center space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`w-2 h-4 rounded-sm ${
                          isListening && level <= 4 
                            ? 'bg-green-500' 
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {isListening ? '优秀 (15ms)' : '未连接'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 分享弹框 */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        roomInfo={roomInfo}
      />
    </div>
  );
}
