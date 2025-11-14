'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import VoiceRoom from '@/components/VoiceRoom'
import MeetRoom from '@/components/MeetRoom'
import { LogIn, ArrowLeft } from 'lucide-react'

export default function ChatPage() {
  // 房间号输入状态
  const [roomCode, setRoomCode] = useState('123456')
  const [roomCodeError, setRoomCodeError] = useState('')
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false)

  // 房间模式
  const [roomMode, setRoomMode] = useState<'voice' | 'video'>('video')

  // 当前用户名
  const [currentUserName] = useState(() => {
    if (typeof window !== 'undefined') {
      return Math.random().toString(36).substring(2, 11)
    }
    return 'user'
  })

  // 验证房间号格式（6位数字）
  const validateRoomCode = (code: string): boolean => {
    return /^\d{6}$/.test(code)
  }

  // 处理房间号输入
  const handleRoomCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '') // 只允许数字
    if (value.length <= 6) {
      setRoomCode(value)
      setRoomCodeError('')
    }
  }

  // 加入房间
  const handleJoinRoom = () => {
    if (!validateRoomCode(roomCode)) {
      setRoomCodeError('请输入6位数字房间号')
      return
    }
    setHasJoinedRoom(true)
  }

  // 离开房间
  const handleLeaveRoom = () => {
    setHasJoinedRoom(false)
    setRoomCode('')
  }

  // 生成房间名称（使用6位房间号）
  const roomName = hasJoinedRoom ? `room-${roomCode}` : ''

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-950 flex flex-col'>
      <div className='container mx-auto px-3 sm:px-4 py-4 sm:py-8 flex flex-col flex-1 min-h-0'>
        {/* 头部导航 - 移动端优化 */}
        <div className='mb-4 sm:mb-6 flex items-center justify-between flex-wrap gap-2 sm:gap-0'>
          <Link
            href='/'
            className='flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base'
          >
            <ArrowLeft className='w-4 h-4 sm:w-5 sm:h-5' />
            <span className='hidden sm:inline'>返回主页</span>
            <span className='sm:hidden'>返回</span>
          </Link>

          {hasJoinedRoom && (
            <div className='flex items-center space-x-2 bg-gray-800/50 rounded-lg p-1'>
              <button
                onClick={() => setRoomMode('voice')}
                className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  roomMode === 'voice' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                仅语音
              </button>
              <button
                onClick={() => setRoomMode('video')}
                className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  roomMode === 'video' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                视频会议
              </button>
            </div>
          )}
        </div>

        {/* 主要内容区域 */}
        {!hasJoinedRoom ? (
          /* 房间号输入界面 */
          <div className='flex-1 flex items-center justify-center min-h-0 py-8 sm:py-12'>
            <div className='w-full max-w-md mx-auto'>
              <div className='bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700 p-6 sm:p-8'>
                <div className='text-center mb-6 sm:mb-8'>
                  <div className='inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-600/20 rounded-full mb-4'>
                    <LogIn className='w-8 h-8 sm:w-10 sm:h-10 text-blue-400' />
                  </div>
                  <h1 className='text-2xl sm:text-3xl font-bold text-white mb-2'>加入房间</h1>
                  <p className='text-gray-400 text-sm sm:text-base'>请输入6位数字房间号</p>
                </div>

                <div className='space-y-4'>
                  <div>
                    <label
                      htmlFor='roomCode'
                      className='block text-sm font-medium text-gray-300 mb-2'
                    >
                      房间号
                    </label>
                    <input
                      id='roomCode'
                      type='text'
                      inputMode='numeric'
                      pattern='[0-9]*'
                      maxLength={6}
                      value={roomCode}
                      onChange={handleRoomCodeChange}
                      placeholder='请输入6位数字'
                      className='w-full px-4 py-3 sm:py-4 bg-gray-700 border border-gray-600 text-white text-center text-2xl sm:text-3xl font-mono tracking-widest rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-500'
                      autoFocus
                    />
                    {roomCodeError && <p className='mt-2 text-sm text-red-400'>{roomCodeError}</p>}
                  </div>

                  <button
                    onClick={handleJoinRoom}
                    disabled={roomCode.length !== 6}
                    className='w-full py-3 sm:py-4 bg-blue-600 text-white rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2'
                  >
                    <LogIn className='w-5 h-5' />
                    <span>加入房间</span>
                  </button>
                </div>

                <div className='mt-6 pt-6 border-t border-gray-700'>
                  <p className='text-xs sm:text-sm text-gray-500 text-center'>
                    房间号由6位数字组成，请向房间创建者获取
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* 房间界面 */
          <div className='flex-1 flex items-center justify-center min-h-0'>
            <div className='w-full max-w-7xl h-full max-h-[calc(100vh-120px)] sm:max-h-[calc(100vh-200px)]'>
              {roomMode === 'video' ? (
                <MeetRoom
                  roomName={roomName}
                  participantName={currentUserName}
                  enableVideo={true}
                  onDisconnect={handleLeaveRoom}
                />
              ) : (
                <VoiceRoom
                  roomName={roomName}
                  participantName={currentUserName}
                  onDisconnect={handleLeaveRoom}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
