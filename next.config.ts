import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* additional config options */
  // 允许开发环境中的跨域请求
  allowedDevOrigins: ['192.168.0.110'],
}

export default nextConfig
