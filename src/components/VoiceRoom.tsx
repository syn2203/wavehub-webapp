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

    try {
      const enabled = !isMicEnabled
      await room.localParticipant.setMicrophoneEnabled(enabled)
      setIsMicEnabled(enabled)
    } catch (err: any) {
      console.error('Failed to toggle microphone:', err)
      if (err.name === 'NotAllowedError') {
        setError(ERROR_MESSAGES['permission-denied'])
      } else if (err.name === 'NotFoundError') {
        setError(ERROR_MESSAGES['device-not-found'])
      } else {
        setError('无法切换麦克风状态')
      }
    }
  }, [room, isMicEnabled])

  /**
   * 切换扬声器（静音/取消静音所有远程音频）
   */
  const toggleSpeaker = useCallback(() => {
    if (!room) return

    const enabled = !isSpeakerEnabled

    // 静音/取消静音所有远程参与者的音频元素
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
      const devices = await Room.getLocalDevices('audioinput')
      setAudioDevices(devices)

      if (devices.length > 0 && !selectedMicId) {
        setSelectedMicId(devices[0].deviceId)
      }
    } catch (err: any) {
      console.error('Failed to load audio devices:', err)
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
      .on(RoomEvent.AudioPlaybackStatusChanged, handleAudioLevelChanged)
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
        .off(RoomEvent.AudioPlaybackStatusChanged, handleAudioLevelChanged)
        .off(RoomEvent.ConnectionQualityChanged, handleConnectionQualityChanged)
        .off(RoomEvent.Disconnected, handleDisconnected)
    }
  }, [room, updateParticipants])

  /**
   * 组件挂载时自动连接
   */
  useEffect(() => {
    connectToRoom()
    loadAudioDevices()

    return () => {
      // 组件卸载时断开连接
      if (room && room.state === ConnectionState.Connected) {
        room.disconnect()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          participant.isSpeaking ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-50'
        }`}
      >
        <div className='relative'>
          <div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold'>
            {participant.name.charAt(0).toUpperCase()}
          </div>
          {participant.isSpeaking && (
            <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse' />
          )}
        </div>
        <div className='flex-1 min-w-0'>
          <div className='flex items-center space-x-2'>
            <span className='font-medium text-gray-900 truncate'>
              {participant.name}
              {isLocal && <span className='text-xs text-gray-500 ml-1'>(你)</span>}
            </span>
            {participant.audioEnabled ? (
              <Mic className='w-4 h-4 text-green-600' />
            ) : (
              <MicOff className='w-4 h-4 text-red-600' />
            )}
          </div>
          {participant.isSpeaking && (
            <div className='mt-1'>
              <div className='h-1 bg-gray-200 rounded-full overflow-hidden'>
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
    <div className='bg-white rounded-2xl shadow-lg p-6'>
      {/* 头部 */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h3 className='text-xl font-bold text-gray-900 flex items-center'>
            <Users className='w-6 h-6 text-blue-500 mr-2' />
            语音房间
          </h3>
          <p className='text-sm text-gray-600 mt-1'>
            {roomName} • {stats.participantCount} 人在线
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          {connectionState === ConnectionState.Connected ? (
            <div className='flex items-center text-green-600 text-sm'>
              <Wifi className='w-4 h-4 mr-1' />
              已连接
            </div>
          ) : connectionState === ConnectionState.Connecting ? (
            <div className='flex items-center text-yellow-600 text-sm'>
              <Wifi className='w-4 h-4 mr-1 animate-pulse' />
              连接中...
            </div>
          ) : (
            <div className='flex items-center text-gray-400 text-sm'>
              <WifiOff className='w-4 h-4 mr-1' />
              未连接
            </div>
          )}
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2'>
          <AlertCircle className='w-5 h-5 text-red-600 flex-shrink-0 mt-0.5' />
          <div className='flex-1'>
            <p className='text-sm text-red-800'>{error}</p>
            <button
              onClick={() => setError(null)}
              className='text-xs text-red-600 hover:text-red-800 mt-1 underline'
            >
              关闭
            </button>
          </div>
        </div>
      )}

      {/* 连接状态 */}
      {!isConnected && !isConnecting && (
        <div className='text-center py-8'>
          <p className='text-gray-600 mb-4'>点击下方按钮加入语音房间</p>
          <button onClick={connectToRoom} className='btn-primary px-6 py-3'>
            加入房间
          </button>
        </div>
      )}

      {isConnecting && (
        <div className='text-center py-8'>
          <div className='inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4' />
          <p className='text-gray-600'>正在连接到房间...</p>
        </div>
      )}

      {/* 已连接状态 */}
      {isConnected && (
        <>
          {/* 参与者列表 */}
          <div className='mb-6'>
            <h4 className='text-sm font-semibold text-gray-700 mb-3'>
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
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                <Settings className='w-4 h-4 inline mr-1' />
                麦克风设备
              </label>
              <select
                value={selectedMicId}
                onChange={e => switchMicrophone(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                {audioDevices.map(device => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || `麦克风 ${device.deviceId.slice(0, 8)}`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 控制按钮 */}
          <div className='flex items-center justify-center space-x-4'>
            {/* 麦克风按钮 */}
            <button
              onClick={toggleMicrophone}
              className={`p-4 rounded-full transition-all ${
                isMicEnabled
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              title={isMicEnabled ? '关闭麦克风' : '打开麦克风'}
            >
              {isMicEnabled ? <Mic className='w-6 h-6' /> : <MicOff className='w-6 h-6' />}
            </button>

            {/* 扬声器按钮 */}
            <button
              onClick={toggleSpeaker}
              className={`p-4 rounded-full transition-all ${
                isSpeakerEnabled
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              title={isSpeakerEnabled ? '静音扬声器' : '打开扬声器'}
            >
              {isSpeakerEnabled ? <Volume2 className='w-6 h-6' /> : <VolumeX className='w-6 h-6' />}
            </button>

            {/* 挂断按钮 */}
            <button
              onClick={disconnectFromRoom}
              className='p-4 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all'
              title='离开房间'
            >
              <PhoneOff className='w-6 h-6' />
            </button>
          </div>

          {/* 统计信息 */}
          <div className='mt-6 pt-6 border-t border-gray-200'>
            <div className='grid grid-cols-2 gap-4 text-center'>
              <div>
                <div className='text-2xl font-bold text-blue-600'>{stats.participantCount}</div>
                <div className='text-xs text-gray-600'>在线人数</div>
              </div>
              <div>
                <div className='text-2xl font-bold text-green-600'>{stats.activeSpeakers}</div>
                <div className='text-xs text-gray-600'>正在发言</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
