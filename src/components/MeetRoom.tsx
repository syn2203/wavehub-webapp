'use client'

import {useCallback, useEffect, useState} from 'react'
import {LiveKitRoom, RoomAudioRenderer, VideoConference} from '@livekit/components-react'
import '@livekit/components-styles'
import {Mic, MicOff, PhoneOff, Settings, Users, Video, VideoOff} from 'lucide-react'

interface MeetRoomProps {
  roomName: string
  participantName: string
  onDisconnect?: () => void
  enableVideo?: boolean
}

// 检查是否在安全上下文中（HTTPS 或 localhost）
function isSecureContext(): boolean {
  if (typeof window === 'undefined') return true
  return (
    window.isSecureContext ||
    window.location.protocol === 'https:' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '[::1]'
  )
}

// 检查媒体设备是否可用
function isMediaDevicesAvailable(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false
  return !!(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices)
}

export default function MeetRoom({
                                   roomName,
                                   participantName,
                                   onDisconnect,
                                   enableVideo = true
                                 }: MeetRoomProps) {
  const [token, setToken] = useState<string | null>(null)
  const [serverUrl, setServerUrl] = useState<string>('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isVideoEnabled, setIsVideoEnabled] = useState(enableVideo)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)

  // 检查安全上下文和媒体设备可用性，然后获取 token
  useEffect(() => {
    // 先检查安全上下文
    if (!isSecureContext()) {
      setError(
        '访问摄像头和麦克风需要安全连接（HTTPS）。请使用 HTTPS 访问此页面，或在 localhost 上运行。'
      )
      return
    }

    if (!isMediaDevicesAvailable()) {
      setError(
        '您的浏览器不支持媒体设备访问，或当前环境不安全。请使用现代浏览器（Chrome、Firefox、Safari、Edge）并通过 HTTPS 访问。'
      )
      return
    }

    // 安全上下文检查通过后，获取访问令牌
    const fetchToken = async () => {
      setIsConnecting(true)
      setError(null)

      try {
        const response = await fetch('/api/livekit/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            roomName,
            participantName,
            participantMetadata: {
              avatar: '😊',
              joinedAt: new Date().toISOString()
            }
          })
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()

        // 从 API 响应中获取 URL 和 token
        if (!data.url) {
          throw new Error('服务器未返回 LiveKit URL，请检查服务端配置')
        }

        if (!data.token) {
          throw new Error('服务器未返回访问令牌')
        }

        setServerUrl(data.url)
        setToken(data.token)
        console.log('LiveKit 配置已获取:', {url: data.url, roomName: data.roomName})
      } catch (err: any) {
        console.error('Failed to fetch token:', err)
        setError(err.message || '获取访问令牌失败，请检查网络连接和服务端配置')
      } finally {
        setIsConnecting(false)
      }
    }

    fetchToken()
  }, [roomName, participantName])

  const handleDisconnect = useCallback(() => {
    setToken(null)
    if (onDisconnect) {
      onDisconnect()
    }
  }, [onDisconnect])

  if (error) {
    const isSecurityError = error.includes('HTTPS') || error.includes('安全')
    return (
      <div className='bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700 p-6'>
        <div className='flex items-center space-x-3 text-red-400 mb-4'>
          <Settings className='w-6 h-6'/>
          <h3 className='text-xl font-bold'>{isSecurityError ? '安全上下文错误' : '连接错误'}</h3>
        </div>
        <div className='text-gray-300 mb-4 space-y-2'>
          <p>{error}</p>
          {isSecurityError && (
            <div className='mt-4 p-4 bg-blue-900/30 border border-blue-700 rounded-lg'>
              <p className='text-sm text-blue-200 mb-2 font-semibold'>解决方案：</p>
              <ul className='text-sm text-blue-200 space-y-1 list-disc list-inside'>
                <li>
                  开发环境：使用 <code className='bg-gray-700 px-1 rounded'>localhost</code> 访问
                </li>
                <li>
                  生产环境：使用 HTTPS 协议（
                  <code className='bg-gray-700 px-1 rounded'>https://</code>）
                </li>
                <li>
                  本地测试：运行 <code className='bg-gray-700 px-1 rounded'>npm run dev</code>{' '}
                  并通过 <code className='bg-gray-700 px-1 rounded'>http://localhost:3000</code>{' '}
                  访问
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className='flex space-x-3'>
          <button
            onClick={() => window.location.reload()}
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            重新加载
          </button>
          {isSecurityError && (
            <button
              onClick={() => {
                if (window.location.protocol === 'http:') {
                  window.location.href = window.location.href.replace('http:', 'https:')
                }
              }}
              className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
            >
              尝试切换到 HTTPS
            </button>
          )}
        </div>
      </div>
    )
  }

  if (isConnecting || !token || !serverUrl) {
    return (
      <div className='bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700 p-6'>
        <div className='flex items-center justify-center space-x-3 text-blue-400'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400'></div>
          <span className='text-lg'>正在连接房间...</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className='h-full w-full bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-gray-700'>
      <LiveKitRoom
        video={isVideoEnabled}
        audio={isAudioEnabled}
        token={token}
        serverUrl={serverUrl}
        data-lk-theme='default'
        className='h-full w-full'
        onDisconnected={handleDisconnect}
        options={{
          adaptiveStream: true,
          dynacast: true
        }}
      >
        <div className='flex flex-col h-full w-full'>
          {/* 顶部工具栏 - 移动端优化 */}
          <div
            className='flex items-center justify-between p-2 sm:p-4 bg-gray-800/50 border-b border-gray-700 z-10'>
            <div className='flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1'>
              <Users className='w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0'/>
              <h3 className='text-sm sm:text-lg font-bold text-white truncate'>{roomName}</h3>
            </div>
            <RoomControls
              onVideoToggle={() => setIsVideoEnabled(!isVideoEnabled)}
              onAudioToggle={() => setIsAudioEnabled(!isAudioEnabled)}
              isVideoEnabled={isVideoEnabled}
              isAudioEnabled={isAudioEnabled}
              onDisconnect={handleDisconnect}
            />
          </div>

          {/* 视频会议区域 */}
          <div className='flex-1 overflow-hidden relative min-h-0'>
            <VideoConference/>
          </div>

          {/* 音频渲染器 */}
          <RoomAudioRenderer/>
        </div>
      </LiveKitRoom>
    </div>
  )
}

// 房间控制组件 - 移动端优化
function RoomControls({
                        onVideoToggle,
                        onAudioToggle,
                        isVideoEnabled,
                        isAudioEnabled,
                        onDisconnect
                      }: {
  onVideoToggle: () => void
  onAudioToggle: () => void
  isVideoEnabled: boolean
  isAudioEnabled: boolean
  onDisconnect: () => void
}) {
  return (
    <div className='flex items-center space-x-1 sm:space-x-2 flex-shrink-0'>
      {/* 视频切换按钮 */}
      <button
        onClick={onVideoToggle}
        className={`p-2 sm:p-3 rounded-full transition-all touch-manipulation ${
          isVideoEnabled
            ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600 active:bg-gray-500'
        }`}
        title={isVideoEnabled ? '关闭摄像头' : '打开摄像头'}
        aria-label={isVideoEnabled ? '关闭摄像头' : '打开摄像头'}
      >
        {isVideoEnabled ? (
          <Video className='w-4 h-4 sm:w-5 sm:h-5'/>
        ) : (
          <VideoOff className='w-4 h-4 sm:w-5 sm:h-5'/>
        )}
      </button>

      {/* 音频切换按钮 */}
      <button
        onClick={onAudioToggle}
        className={`p-2 sm:p-3 rounded-full transition-all touch-manipulation ${
          isAudioEnabled
            ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600 active:bg-gray-500'
        }`}
        title={isAudioEnabled ? '关闭麦克风' : '打开麦克风'}
        aria-label={isAudioEnabled ? '关闭麦克风' : '打开麦克风'}
      >
        {isAudioEnabled ? (
          <Mic className='w-4 h-4 sm:w-5 sm:h-5'/>
        ) : (
          <MicOff className='w-4 h-4 sm:w-5 sm:h-5'/>
        )}
      </button>

      {/* 断开连接按钮 */}
      <button
        onClick={onDisconnect}
        className='p-2 sm:p-3 rounded-full bg-red-600 text-white hover:bg-red-700 active:bg-red-800 transition-all touch-manipulation'
        title='离开房间'
        aria-label='离开房间'
      >
        <PhoneOff className='w-4 h-4 sm:w-5 sm:h-5'/>
      </button>
    </div>
  )
}
