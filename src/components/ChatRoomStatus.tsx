'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ChatRoomInfo {
  id: string;
  name: string;
  activeUsers: number;
  totalUsers: number;
  lastActivity: Date;
  topic: string;
  isActive: boolean;
}

export default function ChatRoomStatus() {
  const [chatRooms] = useState<ChatRoomInfo[]>(() => {
    // 使用函数形式的useState来延迟初始化，确保Date.now()只在组件首次挂载时调用一次
    const now = Date.now();
    return [
      {
        id: 'main',
        name: '主聊天室',
        activeUsers: 6,
        totalUsers: 12,
        lastActivity: new Date(now),
        topic: '项目讨论 - WaveHub 功能开发',
        isActive: true
      },
      {
        id: 'dev',
        name: '开发团队',
        activeUsers: 3,
        totalUsers: 8,
        lastActivity: new Date(now - 300000), // 5分钟前
        topic: '技术讨论 - API 设计',
        isActive: true
      },
      {
        id: 'design',
        name: '设计团队',
        activeUsers: 2,
        totalUsers: 5,
        lastActivity: new Date(now - 600000), // 10分钟前
        topic: 'UI/UX 评审',
        isActive: false
      }
    ];
  });

  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeAgo = (date: Date) => {
    const diff = Math.floor((currentTime.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return '刚刚';
    if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`;
    return `${Math.floor(diff / 86400)}天前`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-green-500 to-blue-600">
        <h3 className="text-white font-semibold text-lg flex items-center">
          <span className="mr-2">🎙️</span>
          语音聊天室状态
        </h3>
        <p className="text-green-100 text-sm mt-1">实时语音协作空间</p>
      </div>

      <div className="p-4 space-y-4">
        {chatRooms.map((room) => (
          <div 
            key={room.id}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              room.isActive 
                ? 'border-green-200 bg-green-50 hover:bg-green-100' 
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  room.isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                }`} />
                <h4 className="font-medium text-gray-900">{room.name}</h4>
                {room.isActive && (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    活跃中
                  </span>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {room.activeUsers}/{room.totalUsers}
                </div>
                <div className="text-xs text-gray-500">在线/总数</div>
              </div>
            </div>

            <div className="mb-3">
              <div className="text-sm text-gray-700 mb-1">当前话题:</div>
              <div className="text-sm text-gray-600 bg-white p-2 rounded border">
                {room.topic}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                最后活跃: {getTimeAgo(room.lastActivity)}
              </div>
              <Link
                href="/chat"
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  room.isActive
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                {room.isActive ? '立即加入' : '查看详情'}
              </Link>
            </div>
          </div>
        ))}

        {/* 快速统计 */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {chatRooms.reduce((sum, room) => sum + room.activeUsers, 0)}
              </div>
              <div className="text-xs text-gray-600">活跃用户</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {chatRooms.filter(room => room.isActive).length}
              </div>
              <div className="text-xs text-gray-600">活跃房间</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {chatRooms.length}
              </div>
              <div className="text-xs text-gray-600">总房间数</div>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="mt-4 space-y-2">
          <Link
            href="/chat"
            className="w-full btn-primary py-3 text-center block"
          >
            🚀 快速加入主聊天室
          </Link>
          <button className="w-full btn-secondary py-2">
            ⚙️ 创建新房间
          </button>
        </div>

        {/* 提示信息 */}
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <span className="text-yellow-500 mt-0.5">💡</span>
            <div className="text-sm text-yellow-700">
              <p className="font-medium mb-1">使用提示:</p>
              <ul className="space-y-1 text-xs">
                <li>• 点击&ldquo;立即加入&rdquo;进入语音聊天室</li>
                <li>• 支持实时语音通话和文字聊天</li>
                <li>• 可以看到其他用户的在线状态</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
