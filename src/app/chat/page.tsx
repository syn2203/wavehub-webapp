'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import VoiceRoom from '@/components/VoiceRoom'
import MeetRoom from '@/components/MeetRoom'
import { generateRoomName } from '@/lib/livekit'

export default function ChatPage() {
  // 获取URL参数
  const [urlParams, setUrlParams] = useState<{
    section?: string
    category?: string
    type?: string
  }>({})

  // 在客户端挂载后解析URL参数
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        const searchParams = new URLSearchParams(window.location.search)
        setUrlParams({
          section: searchParams.get('section') || undefined,
          category: searchParams.get('category') || undefined,
          type: searchParams.get('type') || undefined
        })
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [])

  // 语音房间名称 - 初始使用固定值，避免 hydration mismatch
  const [voiceRoomName, setVoiceRoomName] = useState('wavehub-main-room')

  // 在客户端挂载后根据URL参数更新房间名称
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        const roomName = generateRoomName(urlParams.section, urlParams.category)
        setVoiceRoomName(roomName)
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [urlParams.section, urlParams.category])

  // 根据URL参数生成聊天室信息
  const getRoomInfo = () => {
    if (urlParams.section && urlParams.category) {
      const sectionNames: { [key: string]: string } = {
        meetings: '会议室',
        collaboration: '团队协作',
        education: '在线教育',
        community: '社区交流',
        innovation: '创新实验'
      }

      return {
        title: `${sectionNames[urlParams.section] || urlParams.section} - ${urlParams.category}`,
        description: `专注于${urlParams.category}的语音协作和交流分享`,
        roomId: `${urlParams.section}-${urlParams.category.toLowerCase().replace(/\s+/g, '-')}`
      }
    }

    return {
      title: 'WaveHub 语音聊天室',
      description: 'AI驱动的实时语音协作平台，支持高质量语音通话和智能功能',
      roomId: 'wavehub-main-room'
    }
  }

  const roomInfo = getRoomInfo()
  const [roomMode, setRoomMode] = useState<'voice' | 'video'>('video')
  const [currentUserName] = useState(() => {
    if (typeof window !== 'undefined') {
      return Math.random().toString(36).substring(2, 11)
    }
    return 'user'
  })

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-950 flex flex-col'>
      <div className='container mx-auto px-4 py-8 flex flex-col flex-1'>
        {/* 头部导航 */}
        <div className='mb-6 flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Link
              href='/'
              className='flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors'
            >
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
              <span>返回主页</span>
            </Link>
            <div className='h-6 w-px bg-gray-600' />

            {/* 面包屑导航 */}
            <div className='flex items-center space-x-2 text-sm text-gray-400'>
              <Link href='/' className='hover:text-blue-400 transition-colors'>
                WaveHub
              </Link>
              {urlParams.section && (
                <>
                  <span>/</span>
                  <span className='text-gray-500'>
                    {urlParams.section === 'meetings'
                      ? '会议室'
                      : urlParams.section === 'collaboration'
                        ? '团队协作'
                        : urlParams.section === 'education'
                          ? '在线教育'
                          : urlParams.section === 'community'
                            ? '社区交流'
                            : urlParams.section === 'innovation'
                              ? '创新实验'
                              : urlParams.section}
                  </span>
                </>
              )}
              {urlParams.category && (
                <>
                  <span>/</span>
                  <span className='text-blue-400 font-medium'>{urlParams.category}</span>
                </>
              )}
            </div>

            <h1 className='text-2xl font-bold text-white flex items-center'>
              <span className='text-blue-400 mr-2'>🎙️</span>
              {roomInfo.title}
            </h1>
          </div>

          {/* 模式切换按钮 */}
          <div className='flex items-center space-x-2 bg-gray-800/50 rounded-lg p-1'>
            <button
              onClick={() => setRoomMode('voice')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                roomMode === 'voice'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              仅语音
            </button>
            <button
              onClick={() => setRoomMode('video')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                roomMode === 'video'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              视频会议
            </button>
          </div>
        </div>

        {/* 房间区域 - 居中显示 */}
        <div className='flex-1 flex items-center justify-center min-h-0'>
          <div className='w-full max-w-7xl h-full max-h-[calc(100vh-200px)]'>
            {roomMode === 'video' ? (
              <MeetRoom
                roomName={voiceRoomName}
                participantName={currentUserName}
                enableVideo={true}
                onDisconnect={() => {
                  // 可以在这里添加断开连接后的逻辑
                }}
              />
            ) : (
              <VoiceRoom
                roomName={voiceRoomName}
                participantName={currentUserName}
                onDisconnect={() => {
                  // 可以在这里添加断开连接后的逻辑
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
