/**
 * LiveKit 配置和工具函数
 */

export const LIVEKIT_CONFIG = {
  // LiveKit 服务器 URL（开发环境可以使用 LiveKit Cloud 或自建服务器）
  // 生产环境请使用环境变量
  url: process.env.NEXT_PUBLIC_LIVEKIT_URL || 'ws://localhost:7880',

  // API Key 和 Secret（仅在服务端使用）
  apiKey: process.env.LIVEKIT_API_KEY || 'devkey',
  apiSecret: process.env.LIVEKIT_API_SECRET || 'secret',
};

/**
 * 生成房间名称
 */
export function generateRoomName(section?: string, category?: string): string {
  if (section && category) {
    return `${section}-${category}`.toLowerCase().replace(/\s+/g, '-');
  }
  return `wavehub-room-${Date.now()}`;
}

/**
 * 验证房间名称格式
 */
export function isValidRoomName(roomName: string): boolean {
  // 房间名称只能包含字母、数字、连字符和下划线
  return /^[a-zA-Z0-9_-]+$/.test(roomName);
}

/**
 * 音频配置预设
 */
export const AUDIO_PRESETS = {
  // 高质量音频（音乐、播客）
  high: {
    audioBitrate: 128000,
    dtx: false, // 不使用 DTX（连续传输模式）
  },
  // 标准质量（语音通话）
  standard: {
    audioBitrate: 64000,
    dtx: true, // 使用 DTX 节省带宽
  },
  // 低质量（网络较差时）
  low: {
    audioBitrate: 32000,
    dtx: true,
  },
};

/**
 * 错误消息映射
 */
export const ERROR_MESSAGES: Record<string, string> = {
  'connection-failed': '连接失败，请检查网络连接',
  'permission-denied': '麦克风权限被拒绝，请在浏览器设置中允许访问麦克风',
  'device-not-found': '未找到音频设备，请检查麦克风是否正常连接',
  'room-full': '房间已满，无法加入',
  'invalid-token': '无效的访问令牌，请刷新页面重试',
  'unknown': '发生未知错误，请稍后重试',
};



