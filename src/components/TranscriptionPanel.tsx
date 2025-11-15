'use client'

import { useEffect, useRef } from 'react'
import { Loader2, XCircle } from 'lucide-react'

interface TranscriptionResult {
  text: string
  timestamp: number
  speaker: string
}

interface TranscriptionPanelProps {
  transcriptions: TranscriptionResult[]
  isLoading: boolean
  onClear: () => void
}

export default function TranscriptionPanel({
  transcriptions,
  isLoading,
  onClear
}: TranscriptionPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [transcriptions])

  return (
    <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg border border-gray-700 p-3'>
      <div className='flex items-center justify-between mb-2'>
        <h4 className='text-xs font-semibold text-gray-300 flex items-center'>
          {isLoading && <Loader2 className='w-3 h-3 mr-1 animate-spin text-blue-400' />}
          实时转录
        </h4>
        <button
          onClick={onClear}
          className='text-xs text-gray-400 hover:text-white transition-colors flex items-center'
          title='清空转录'
        >
          <XCircle className='w-3 h-3 mr-1' />
          清空
        </button>
      </div>

      <div
        ref={scrollRef}
        className='max-h-32 overflow-y-auto text-xs text-gray-200 leading-relaxed space-y-1'
      >
        {transcriptions.length === 0 && !isLoading && (
          <p className='text-gray-500 text-center py-2'>开始说话以查看实时转录</p>
        )}
        {transcriptions.map((t, index) => (
          <div key={t.timestamp + index} className='animate-fade-in'>
            <span className='text-blue-300 mr-1'>
              [{new Date(t.timestamp).toLocaleTimeString()}]
            </span>
            <span className='text-gray-300'>{t.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
