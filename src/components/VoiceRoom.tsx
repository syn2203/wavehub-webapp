'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Room,
  RoomEvent,
  Track,
  RemoteParticipant,
  Participant,
  ConnectionState,
  RoomConnectOptions
} from 'livekit-client'
import { RoomAudioRenderer } from '@livekit/components-react'
import '@livekit/components-styles'
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  PhoneOff,
  Users,
  Wifi,
  WifiOff,
  Settings,
  AlertCircle
} from 'lucide-react'
import { ERROR_MESSAGES } from '@/lib/livekit'

interface VoiceRoomProps {
  roomName: string
  participantName: string
  onDisconnect?: () => void
}

interface ParticipantInfo {
  identity: string
  name: string
  isSpeaking: boolean
  audioEnabled: boolean
  audioLevel: number
}

export default function VoiceRoom({ roomName, participantName, onDisconnect }: VoiceRoomProps) {
  const [room] = useState(() => new Room())
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionState, setConnectionState] = useState<ConnectionState>(
    ConnectionState.Disconnected
  )
  const [error, setError] = useState<string | null>(null)

  // 音频控制状态
  const [isMicEnabled, setIsMicEnabled] = useState(false)
  const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(true)

  // 参与者列表
  const [participants, setParticipants] = useState<ParticipantInfo[]>([])
  const [localParticipant, setLocalParticipant] = useState<ParticipantInfo | null>(null)

  // 音频设备
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([])
  const [selectedMicId, setSelectedMicId] = useState<string>('')

  // 统计信息
  const [stats, setStats] = useState({
    participantCount: 0,
    activeSpeakers: 0
  })


  /**
   * 连接到 LiveKit 房间
   */
  const connectToRoom = useCallback(async () => {
    if (isConnecting || isConnected) return

    setIsConnecting(true)
    setError(null)

    try {
      console.log('开始连接房间:', roomName, participantName)

      // 通过 API 路由获取访问令牌
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

      const { token, url } = await response.json()
      console.log('获取到 token 和 URL:', { token: token?.substring(0, 20) + '...', url })

      // 连接选项
      const connectOptions: RoomConnectOptions = {
        autoSubscribe: true
      }

      // 连接到房间
      console.log('正在连接到 LiveKit 服务器...')
      const responseDate = await room.connect(url, token, connectOptions)

      console.log('✅ 成功连接到房间:', room.name, responseDate)
      setIsConnected(true)

      // 启动音频播放（类似 MeetRoom 的 RoomAudioRenderer）
      // room.startAudio() 会自动处理远程音频轨道的播放
      try {
        await room.startAudio()
        console.log('✅ 音频播放已启动')
      } catch (err) {
        console.warn('⚠️ 音频播放启动失败（可能被浏览器阻止）:', err)
        // 不显示错误，因为后续轨道订阅时会自动重试
      }
    } catch (err: any) {
      console.error('❌ 连接房间失败:', err)
      setError(ERROR_MESSAGES['connection-failed'] || err.message || '连接失败，请检查网络和配置')
    } finally {
      setIsConnecting(false)
    }
      }, [room, roomName, participantName, isConnecting, isConnected])

  /**
   * 断开连接
   */
  const disconnectFromRoom = useCallback(async () => {
    if (!room) return

    try {
      await room.disconnect()
      setIsConnected(false)
      setIsMicEnabled(false)
      setParticipants([])
      setLocalParticipant(null)

      if (onDisconnect) {
        onDisconnect()
      }
    } catch (err: any) {
      console.error('Failed to disconnect:', err)
    }
  }, [room, onDisconnect])

  /**
   * 切换麦克风
   */
  const toggleMicrophone = useCallback(async () => {
    if (!room || !room.localParticipant) return

    // 检查 MediaDevices API 是否可用
    if (typeof window === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('您的浏览器不支持麦克风功能，请使用现代浏览器（Chrome、Firefox、Safari 等）')
      return
    }

    try {
      const enabled = !isMicEnabled
      await room.localParticipant.setMicrophoneEnabled(enabled)
      setIsMicEnabled(enabled)
      
      // 成功时清除错误
      setError(null)
    } catch (err: any) {
      console.error('Failed to toggle microphone:', err)
      
      // 处理各种错误类型
      const errorMessage = err.message || ''
      const errorName = err.name || ''
      
      if (errorName === 'NotAllowedError' || errorName === 'PermissionDeniedError') {
        setError(ERROR_MESSAGES['permission-denied'])
      } else if (errorName === 'NotFoundError' || errorName === 'DevicesNotFoundError') {
        setError(ERROR_MESSAGES['device-not-found'])
      } else if (errorMessage.includes('getUserMedia') || errorMessage.includes('MediaDevices')) {
        setError('无法访问麦克风，请检查浏览器权限设置和网络连接')
      } else if (errorMessage.includes('NotReadableError') || errorMessage.includes('TrackStartError')) {
        setError('麦克风被其他应用占用，请关闭其他使用麦克风的程序')
      } else {
        setError(errorMessage || '无法切换麦克风状态，请稍后重试')
      }
    }
  }, [room, isMicEnabled])

  /**
   * 切换扬声器（静音/取消静音所有远程音频）
   * RoomAudioRenderer 会自动处理音频播放，这里只需要控制静音状态
   */
  const toggleSpeaker = useCallback(async () => {
    if (!room) return

    const enabled = !isSpeakerEnabled

    // 静音/取消静音所有远程参与者的音频元素
    // RoomAudioRenderer 创建的音频元素会被附加到轨道上
    room.remoteParticipants.forEach(participant => {
      participant.audioTrackPublications.forEach(publication => {
        if (publication.track && publication.track.attachedElements.length > 0) {
          publication.track.attachedElements.forEach((element: any) => {
            if (element instanceof HTMLAudioElement) {
              element.muted = !enabled
            }
          })
        }
      })
    })

    setIsSpeakerEnabled(enabled)
  }, [room, isSpeakerEnabled])

  /**
   * 切换音频设备
   */
  const switchMicrophone = useCallback(
    async (deviceId: string) => {
      if (!room || !room.localParticipant) return

      try {
        await room.switchActiveDevice('audioinput', deviceId)
        setSelectedMicId(deviceId)
      } catch (err: any) {
        console.error('Failed to switch microphone:', err)
        setError('切换麦克风失败')
      }
    },
    [room]
  )

  /**
   * 获取音频设备列表
   */
  const loadAudioDevices = useCallback(async () => {
    try {
      // 检查浏览器是否支持 MediaDevices API
      if (typeof window === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.warn('MediaDevices API is not supported in this browser')
        return
      }

      // 先请求麦克风权限（某些浏览器需要先请求权限才能枚举设备）
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true })
      } catch (permissionErr: any) {
        // 权限被拒绝或设备不可用，但不阻止继续尝试枚举设备
        console.warn('Microphone permission not granted, but continuing to enumerate devices:', permissionErr)
      }

      // 获取音频输入设备
      const devices = await Room.getLocalDevices('audioinput')
      
      if (devices && devices.length > 0) {
        setAudioDevices(devices)

        if (!selectedMicId) {
          setSelectedMicId(devices[0].deviceId)
        }
      } else {
        console.warn('No audio input devices found')
        setAudioDevices([])
      }
    } catch (err: any) {
      console.error('Failed to load audio devices:', err)
      // 不显示错误给用户，因为这不是关键功能
      setAudioDevices([])
    }
  }, [selectedMicId])

  /**
   * 更新参与者信息
   */
  const updateParticipants = useCallback(() => {
    if (!room) return

    const remoteParticipants: ParticipantInfo[] = Array.from(room.remoteParticipants.values()).map(
      participant => {
        const audioTrack = participant.getTrackPublication(Track.Source.Microphone)
        return {
          identity: participant.identity,
          name: participant.name || participant.identity,
          isSpeaking: participant.isSpeaking,
          audioEnabled: audioTrack?.isEnabled ?? false,
          audioLevel: participant.audioLevel
        }
      }
    )

    setParticipants(remoteParticipants)

    // 更新本地参与者
    if (room.localParticipant) {
      const localAudioTrack = room.localParticipant.getTrackPublication(Track.Source.Microphone)
      setLocalParticipant({
        identity: room.localParticipant.identity,
        name: room.localParticipant.name || room.localParticipant.identity,
        isSpeaking: room.localParticipant.isSpeaking,
        audioEnabled: localAudioTrack?.isEnabled ?? false,
        audioLevel: room.localParticipant.audioLevel
      })
    }

    // 更新统计信息
    setStats({
      participantCount: room.numParticipants,
      activeSpeakers: [room.localParticipant, ...room.remoteParticipants.values()].filter(
        p => p?.isSpeaking
      ).length
    })
  }, [room])

  /**
   * 设置房间事件监听器
   */
  useEffect(() => {
    if (!room) return

    // 连接状态变化
    const handleConnectionStateChanged = (state: ConnectionState) => {
      console.log('Connection state changed:', state)
      setConnectionState(state)

      if (state === ConnectionState.Disconnected) {
        setIsConnected(false)
        setIsMicEnabled(false)
      } else if (state === ConnectionState.Connected) {
        setIsConnected(true)
      }
    }

    // 参与者加入
    const handleParticipantConnected = (participant: RemoteParticipant) => {
      console.log('Participant connected:', participant.identity)
      updateParticipants()
    }

    // 参与者离开
    const handleParticipantDisconnected = (participant: RemoteParticipant) => {
      console.log('Participant disconnected:', participant.identity)
      updateParticipants()
    }

    // 本地音轨发布
    const handleLocalTrackPublished = () => {
      console.log('Local track published')
      updateParticipants()
    }

    // 本地音轨取消发布
    const handleLocalTrackUnpublished = () => {
      console.log('Local track unpublished')
      updateParticipants()
    }

    // 音轨订阅
    const handleTrackSubscribed = () => {
      updateParticipants()
    }

    // 音轨取消订阅
    const handleTrackUnsubscribed = () => {
      updateParticipants()
    }

    // 说话状态变化
    const handleActiveSpeakersChanged = () => {
      updateParticipants()
    }

    // 音频级别变化
    const handleAudioLevelChanged = () => {
      updateParticipants()
    }

    // 音频播放状态变化（RoomAudioRenderer 会自动处理，这里只做日志记录）
    const handleAudioPlaybackChanged = (canPlayback: boolean) => {
      console.log('Audio playback status:', canPlayback)
    }

    // 连接质量变化
    const handleConnectionQualityChanged = (quality: any, participant: Participant) => {
      console.log('Connection quality changed:', participant.identity, quality)
    }

    // 断开连接
    const handleDisconnected = () => {
      console.log('Disconnected from room')
      setIsConnected(false)
      setIsMicEnabled(false)
      setParticipants([])
      setLocalParticipant(null)
    }

    // 注册事件监听器
    room
      .on(RoomEvent.ConnectionStateChanged, handleConnectionStateChanged)
      .on(RoomEvent.ParticipantConnected, handleParticipantConnected)
      .on(RoomEvent.ParticipantDisconnected, handleParticipantDisconnected)
      .on(RoomEvent.LocalTrackPublished, handleLocalTrackPublished)
      .on(RoomEvent.LocalTrackUnpublished, handleLocalTrackUnpublished)
      .on(RoomEvent.TrackSubscribed, handleTrackSubscribed)
      .on(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed)
      .on(RoomEvent.ActiveSpeakersChanged, handleActiveSpeakersChanged)
      .on(RoomEvent.AudioPlaybackStatusChanged, handleAudioPlaybackChanged)
      .on(RoomEvent.ConnectionQualityChanged, handleConnectionQualityChanged)
      .on(RoomEvent.Disconnected, handleDisconnected)

    return () => {
      // 清理事件监听器
      room
        .off(RoomEvent.ConnectionStateChanged, handleConnectionStateChanged)
        .off(RoomEvent.ParticipantConnected, handleParticipantConnected)
        .off(RoomEvent.ParticipantDisconnected, handleParticipantDisconnected)
        .off(RoomEvent.LocalTrackPublished, handleLocalTrackPublished)
        .off(RoomEvent.LocalTrackUnpublished, handleLocalTrackUnpublished)
        .off(RoomEvent.TrackSubscribed, handleTrackSubscribed)
        .off(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed)
        .off(RoomEvent.ActiveSpeakersChanged, handleActiveSpeakersChanged)
        .off(RoomEvent.AudioPlaybackStatusChanged, handleAudioPlaybackChanged)
        .off(RoomEvent.ConnectionQualityChanged, handleConnectionQualityChanged)
        .off(RoomEvent.Disconnected, handleDisconnected)
    }
  }, [room, updateParticipants])

  /**
   * 组件挂载时自动连接
   */
  useEffect(() => {
    connectToRoom()

    return () => {
      // 组件卸载时断开连接
      if (room && room.state === ConnectionState.Connected) {
        room.disconnect()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * 连接成功后加载音频设备
   */
  useEffect(() => {
    if (isConnected) {
      // 延迟加载设备，确保连接完全建立
      const timer = setTimeout(() => {
        loadAudioDevices()
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isConnected, loadAudioDevices])

  /**
   * 定期更新参与者信息
   */
  useEffect(() => {
    if (!isConnected) return

    const interval = setInterval(() => {
      updateParticipants()
    }, 1000)

    return () => clearInterval(interval)
  }, [isConnected, updateParticipants])


  /**
   * 渲染参与者卡片
   */
  const renderParticipant = (participant: ParticipantInfo, isLocal: boolean = false) => {
    const audioLevelPercent = Math.round(participant.audioLevel * 100)

    return (
      <div
        key={participant.identity}
        className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
          participant.isSpeaking
            ? 'bg-blue-900/50 ring-2 ring-blue-500'
            : 'bg-gray-800/50 border border-gray-700'
        }`}
      >
        <div className='relative'>
          <div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold'>
            {participant.name.charAt(0).toUpperCase()}
          </div>
          {participant.isSpeaking && (
            <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800 animate-pulse' />
          )}
        </div>
        <div className='flex-1 min-w-0'>
          <div className='flex items-center space-x-2'>
            <span className='font-medium text-white truncate'>
              {participant.name}
              {isLocal && <span className='text-xs text-gray-400 ml-1'>(你)</span>}
            </span>
            {participant.audioEnabled ? (
              <Mic className='w-4 h-4 text-green-400' />
            ) : (
              <MicOff className='w-4 h-4 text-red-400' />
            )}
          </div>
          {participant.isSpeaking && (
            <div className='mt-1'>
              <div className='h-1 bg-gray-700 rounded-full overflow-hidden'>
                <div
                  className='h-full bg-green-500 transition-all duration-100'
                  style={{ width: `${audioLevelPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className='bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-gray-700 p-4 sm:p-6'>
      {/* 头部 - 移动端优化 */}
      <div className='flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-2'>
        <div className='min-w-0 flex-1'>
          <h3 className='text-lg sm:text-xl font-bold text-white flex items-center'>
            <Users className='w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mr-2 flex-shrink-0' />
            <span className='truncate'>语音房间</span>
          </h3>
          <p className='text-xs sm:text-sm text-gray-400 mt-1 truncate'>
            {roomName} • {stats.participantCount} 人在线
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          {connectionState === ConnectionState.Connected ? (
            <div className='flex items-center text-green-400 text-sm'>
              <Wifi className='w-4 h-4 mr-1' />
              已连接
            </div>
          ) : connectionState === ConnectionState.Connecting ? (
            <div className='flex items-center text-yellow-400 text-sm'>
              <Wifi className='w-4 h-4 mr-1 animate-pulse' />
              连接中...
            </div>
          ) : (
            <div className='flex items-center text-gray-500 text-sm'>
              <WifiOff className='w-4 h-4 mr-1' />
              未连接
            </div>
          )}
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className='mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg flex items-start space-x-2'>
          <AlertCircle className='w-5 h-5 text-red-400 flex-shrink-0 mt-0.5' />
          <div className='flex-1'>
            <p className='text-sm text-red-200'>{error}</p>
            <button
              onClick={() => setError(null)}
              className='text-xs text-red-400 hover:text-red-300 mt-1 underline'
            >
              关闭
            </button>
          </div>
        </div>
      )}


      {/* 连接状态 */}
      {!isConnected && !isConnecting && (
        <div className='text-center py-8'>
          <p className='text-gray-400 mb-4'>点击下方按钮加入语音房间</p>
          <button onClick={connectToRoom} className='btn-primary px-6 py-3'>
            加入房间
          </button>
        </div>
      )}

      {isConnecting && (
        <div className='text-center py-8'>
          <div className='inline-block w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4' />
          <p className='text-gray-400'>正在连接到房间...</p>
        </div>
      )}

      {/* 已连接状态 */}
      {isConnected && (
        <>
          {/* 音频渲染器 - 自动处理远程音频播放（类似 MeetRoom） */}
          <RoomAudioRenderer room={room} />

          {/* 参与者列表 */}
            <div className='mb-6'>
            <h4 className='text-sm font-semibold text-gray-300 mb-3'>
              参与者 ({stats.participantCount})
            </h4>
            <div className='space-y-2 max-h-64 overflow-y-auto'>
              {localParticipant && renderParticipant(localParticipant, true)}
              {participants.map(participant => renderParticipant(participant))}
            </div>
          </div>

          {/* 音频设备选择 */}
          {audioDevices.length > 1 && (
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-300 mb-2'>
                <Settings className='w-4 h-4 inline mr-1' />
                麦克风设备
              </label>
              <select
                value={selectedMicId}
                onChange={e => switchMicrophone(e.target.value)}
                className='w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
              >
                {audioDevices.map(device => (
                  <option key={device.deviceId} value={device.deviceId} className='bg-gray-700'>
                    {device.label || `麦克风 ${device.deviceId.slice(0, 8)}`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 控制按钮 - 移动端优化 */}
          <div className='flex items-center justify-center space-x-3 sm:space-x-4'>
            {/* 麦克风按钮 */}
            <button
              onClick={toggleMicrophone}
              className={`p-3 sm:p-4 rounded-full transition-all touch-manipulation ${
                isMicEnabled
                  ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-lg shadow-blue-500/50'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 active:bg-gray-500'
              }`}
              title={isMicEnabled ? '关闭麦克风' : '打开麦克风'}
              aria-label={isMicEnabled ? '关闭麦克风' : '打开麦克风'}
            >
              {isMicEnabled ? (
                <Mic className='w-5 h-5 sm:w-6 sm:h-6' />
              ) : (
                <MicOff className='w-5 h-5 sm:w-6 sm:h-6' />
              )}
            </button>

            {/* 扬声器按钮 */}
            <button
              onClick={toggleSpeaker}
              className={`p-3 sm:p-4 rounded-full transition-all touch-manipulation ${
                isSpeakerEnabled
                  ? 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 shadow-lg shadow-green-500/50'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 active:bg-gray-500'
              }`}
              title={isSpeakerEnabled ? '静音扬声器' : '打开扬声器'}
              aria-label={isSpeakerEnabled ? '静音扬声器' : '打开扬声器'}
            >
              {isSpeakerEnabled ? (
                <Volume2 className='w-5 h-5 sm:w-6 sm:h-6' />
              ) : (
                <VolumeX className='w-5 h-5 sm:w-6 sm:h-6' />
              )}
            </button>

            {/* 挂断按钮 */}
            <button
              onClick={disconnectFromRoom}
              className='p-3 sm:p-4 rounded-full bg-red-600 text-white hover:bg-red-700 active:bg-red-800 transition-all shadow-lg shadow-red-500/50 touch-manipulation'
              title='离开房间'
              aria-label='离开房间'
            >
              <PhoneOff className='w-5 h-5 sm:w-6 sm:h-6' />
            </button>
          </div>

          {/* 统计信息 */}
          <div className='mt-6 pt-6 border-t border-gray-700'>
            <div className='grid grid-cols-2 gap-4 text-center'>
              <div>
                <div className='text-2xl font-bold text-blue-400'>{stats.participantCount}</div>
                <div className='text-xs text-gray-400'>在线人数</div>
              </div>
              <div>
                <div className='text-2xl font-bold text-green-400'>{stats.activeSpeakers}</div>
                <div className='text-xs text-gray-400'>正在发言</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
