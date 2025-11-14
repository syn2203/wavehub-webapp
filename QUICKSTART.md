# 🚀 快速启动指南

## 本地开发环境快速启动

### 1. 启动 LiveKit Server（Docker）

```bash
docker run --rm -p 7880:7880 \
  -p 7881:7881 \
  -p 7882:7882/udp \
  -e LIVEKIT_KEYS="devkey: secret" \
  livekit/livekit-server \
  --dev
```

### 2. 配置环境变量

创建 `.env.local` 文件：

```bash
# 本地开发配置
NEXT_PUBLIC_LIVEKIT_URL=ws://localhost:7880
LIVEKIT_API_KEY=devkey
LIVEKIT_API_SECRET=secret
```

### 3. 启动 Next.js 开发服务器

```bash
npm run dev
```

### 4. 测试音频房间

1. 打开浏览器访问 `http://localhost:3000/chat`
2. 点击"打开语音房"按钮
3. 点击"加入房间"
4. 允许麦克风权限
5. 点击麦克风图标开始说话

### 5. 多人测试

- 在不同浏览器窗口打开相同的聊天室
- 或者使用无痕模式打开另一个窗口
- 两个窗口可以互相听到对方的声音

## 生产环境部署

### 使用 LiveKit Cloud

1. 注册 [LiveKit Cloud](https://cloud.livekit.io/)
2. 创建项目并获取凭证
3. 更新 `.env.local`：

```bash
NEXT_PUBLIC_LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your-api-key
LIVEKIT_API_SECRET=your-api-secret
```

4. 部署到 Vercel/其他平台

## 常见问题

### 无法连接到 LiveKit Server

- 确认 Docker 容器正在运行：`docker ps`
- 检查端口是否被占用：`lsof -i :7880`
- 查看 LiveKit 日志：`docker logs <container-id>`

### 麦克风权限被拒绝

- 浏览器地址栏 → 锁图标 → 权限设置 → 允许麦克风
- 刷新页面重试

### 听不到声音

- 检查系统音量
- 确认扬声器按钮为绿色（未静音）
- 点击页面任意位置激活音频播放

## 更多文档

详细文档请查看 [LIVEKIT_SETUP.md](./LIVEKIT_SETUP.md)



