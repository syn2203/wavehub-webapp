import { NextRequest, NextResponse } from 'next/server'
import { AccessToken } from 'livekit-server-sdk'
import { LIVEKIT_CONFIG } from '@/lib/livekit'

/**
 * POST /api/livekit/token
 * 生成 LiveKit 访问令牌
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Received request to generate LiveKit token', body)
    const { roomName, participantName, participantMetadata } = body

    // 验证必需参数
    if (!roomName || !participantName) {
      return NextResponse.json(
        { error: 'roomName and participantName are required' },
        { status: 400 }
      )
    }

    // 创建访问令牌
    const at = new AccessToken(LIVEKIT_CONFIG.apiKey, LIVEKIT_CONFIG.apiSecret, {
      identity: participantName,
      // 令牌有效期：24小时
      ttl: '24h',
      // 参与者元数据（可选）
      metadata: participantMetadata ? JSON.stringify(participantMetadata) : undefined
    })

    // 授予房间权限
    at.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canPublishData: true,
      canSubscribe: true
    })

    // 生成 JWT token
    const token = await at.toJwt()

    const roomInfo = {
      token,
      url: LIVEKIT_CONFIG.url,
      roomName,
      participantName
    }

    console.log('Generated LiveKit token:', participantName, roomInfo)
    return NextResponse.json(roomInfo)
  } catch (error: any) {
    console.error('Error generating LiveKit token:', error)
    return NextResponse.json(
      { error: 'Failed to generate token', details: error.message },
      { status: 500 }
    )
  }
}

/**
 * GET /api/livekit/token
 * 用于测试的简单 token 生成（开发环境）
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const roomName = searchParams.get('roomName') || 'test-room'
  const participantName = searchParams.get('participantName') || `user-${Date.now()}`

  try {
    const at = new AccessToken(LIVEKIT_CONFIG.apiKey, LIVEKIT_CONFIG.apiSecret, {
      identity: participantName,
      ttl: '24h'
    })

    at.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canPublishData: true,
      canSubscribe: true
    })

    const token = await at.toJwt()

    return NextResponse.json({
      token,
      url: LIVEKIT_CONFIG.url,
      roomName,
      participantName
    })
  } catch (error: any) {
    console.error('Error generating LiveKit token:', error)
    return NextResponse.json(
      { error: 'Failed to generate token', details: error.message },
      { status: 500 }
    )
  }
}
