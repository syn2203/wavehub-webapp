'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Room, Track } from 'livekit-client'

interface TranscriptionResult {
  text: string
  timestamp: number
  speaker: string
}

interface UseWhisperTranscriptionOptions {
  room: Room | null
  enabled?: boolean
  isMicEnabled?: boolean
  language?: string
}

export function useWhisperTranscription({
  room,
  enabled = true,
  isMicEnabled = false,
  language = 'zh'
}: UseWhisperTranscriptionOptions) {
  const [transcriptions, setTranscriptions] = useState<TranscriptionResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isModelReady, setIsModelReady] = useState(false)

  const modelRef = useRef<any>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const processorRef = useRef<ScriptProcessorNode | null>(null)
  const isProcessingRef = useRef(false)
  const audioBufferRef = useRef<Float32Array[]>([])

  // 加载 Whisper 模型
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return

    let cancelled = false

    const loadModel = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Turbopack/webpack 会尝试加载包的 ESM 源文件，而那个版本会引入 `fs`/`path` 等 Node-only 模块，
        // 在浏览器端会让 Object.keys(undefined) 抛出 "Cannot convert undefined or null to object"。
        // 直接加载官方打包好的浏览器版本可避免该问题。
        const transformersModule = await import('@xenova/transformers/dist/transformers.min.js')
        const { pipeline, env, AutoProcessor } =
          transformersModule as typeof import('@xenova/transformers')

        if (cancelled) return

        // 配置
        env.allowLocalModels = false
        env.allowRemoteModels = true
        if (env.backends?.onnx?.wasm) {
          env.backends.onnx.wasm.proxy = false
        }

        console.log('正在加载 Whisper Tiny 模型...')

        // 加载模型
        const transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny', {
          quantized: true
        })

        if (cancelled) return

        modelRef.current = transcriber
        setIsModelReady(true)
        setIsLoading(false)
        console.log('✅ Whisper 模型加载完成')
      } catch (err: any) {
        if (cancelled) return
        console.error('加载 Whisper 模型失败:', err)
        setError(`语音识别模型加载失败: ${err.message}`)
        setIsLoading(false)
      }
    }

    loadModel()

    return () => {
      cancelled = true
    }
  }, [enabled])

  // 音频重采样
  const resampleAudio = useCallback(
    (audioData: Float32Array, fromRate: number, toRate: number): Float32Array => {
      if (fromRate === toRate) return audioData
      const ratio = fromRate / toRate
      const newLength = Math.round(audioData.length / ratio)
      const result = new Float32Array(newLength)
      for (let i = 0; i < newLength; i++) {
        result[i] = audioData[Math.round(i * ratio)]
      }
      return result
    },
    []
  )

  // 处理音频转录
  const processAudio = useCallback(
    async (audioData: Float32Array) => {
      if (!modelRef.current || isProcessingRef.current) return

      try {
        isProcessingRef.current = true

        // 重采样到 16kHz
        const resampled = resampleAudio(audioData, 48000, 16000)

        // 检查是否有声音
        const hasSound = resampled.some(sample => Math.abs(sample) > 0.01)
        if (!hasSound) {
          isProcessingRef.current = false
          return
        }

        // 转录 - 使用正确的输入格式
        const result = await modelRef.current(resampled, {
          language: language,
          task: 'transcribe',
          return_timestamps: false,
          chunk_length_s: 30,
          stride_length_s: 5
        })

        if (result?.text && result.text.trim()) {
          const transcription: TranscriptionResult = {
            text: result.text.trim(),
            timestamp: Date.now(),
            speaker: '本地用户'
          }

          setTranscriptions(prev => [...prev.slice(-49), transcription])
        }
      } catch (err: any) {
        console.error('转录失败:', err)
      } finally {
        isProcessingRef.current = false
      }
    },
    [language, resampleAudio]
  )

  // 监听本地音频
  useEffect(() => {
    if (!room || !enabled || !isModelReady || !isMicEnabled) return
    if (typeof window === 'undefined') return

    let audioContext: AudioContext | null = null
    let processor: ScriptProcessorNode | null = null
    let source: MediaStreamAudioSourceNode | null = null
    let audioBuffer: Float32Array[] = []
    let bufferDuration = 0
    const chunkSize = 3 * 48000 // 3秒

    const startCapture = async () => {
      try {
        // 获取本地音频轨道
        const localParticipant = room.localParticipant
        if (!localParticipant) return

        const audioTrack = localParticipant.getTrackPublication(Track.Source.Microphone)
        if (!audioTrack?.track) {
          console.log('等待本地音频轨道...')
          return
        }

        const track = audioTrack.track as any
        const mediaStream = track.mediaStream
        if (!mediaStream) return

        // 创建音频上下文
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
          sampleRate: 48000
        })

        source = audioContext.createMediaStreamSource(mediaStream)
        processor = audioContext.createScriptProcessor(4096, 1, 1)

        processor.onaudioprocess = e => {
          if (!isMicEnabled) {
            audioBuffer = []
            bufferDuration = 0
            return
          }

          const inputData = e.inputBuffer.getChannelData(0)
          const data = new Float32Array(inputData)
          audioBuffer.push(data)
          bufferDuration += data.length

          if (bufferDuration >= chunkSize) {
            const totalLength = audioBuffer.reduce((sum, chunk) => sum + chunk.length, 0)
            const merged = new Float32Array(totalLength)
            let offset = 0
            for (const chunk of audioBuffer) {
              merged.set(chunk, offset)
              offset += chunk.length
            }

            processAudio(merged)

            audioBuffer = []
            bufferDuration = 0
          }
        }

        source.connect(processor)
        processor.connect(audioContext.destination)

        audioContextRef.current = audioContext
        processorRef.current = processor

        console.log('✅ 语音转文本已启动')
      } catch (err: any) {
        console.error('启动语音转文本失败:', err)
        setError(`启动失败: ${err.message}`)
      }
    }

    const timer = setTimeout(() => {
      startCapture()
    }, 1000)

    return () => {
      clearTimeout(timer)
      if (processor) processor.disconnect()
      if (source) source.disconnect()
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close()
      }
      audioBufferRef.current = []
    }
  }, [room, enabled, isModelReady, isMicEnabled, processAudio])

  const clearTranscriptions = useCallback(() => {
    setTranscriptions([])
  }, [])

  return {
    transcriptions,
    isLoading,
    error,
    isModelReady,
    clearTranscriptions
  }
}
