'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Share2, Users, Link2, Copy, Check, MessageCircle, Clock, Wifi, QrCode, Download, Camera } from 'lucide-react';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomInfo: {
    title: string;
    description: string;
    participantCount: number;
    onlineCount: number;
    roomId: string;
    createdAt: Date;
  };
}

export default function ShareModal({ isOpen, onClose, roomInfo }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMethod, setSaveMethod] = useState<'html2canvas' | 'fallback'>('html2canvas');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/chat?room=${roomInfo.roomId}`;
      setShareUrl(url);
      
      // 生成二维码
      QRCode.toDataURL(url, {
        width: 200,
        margin: 2,
        color: {
          dark: '#1f2937',
          light: '#ffffff'
        }
      }).then(setQrCodeUrl).catch(console.error);
    }
  }, [roomInfo.roomId]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: roomInfo.title,
          text: roomInfo.description,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing: ', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleSaveAsImage = async () => {
    if (!modalRef.current) {
      alert('弹框未找到，请重新打开分享弹框');
      return;
    }
    
    setIsSaving(true);
    
    let closeButton: HTMLElement | null = null;
    let saveButton: HTMLElement | null = null;
    
    try {
      // 等待一下确保DOM完全渲染
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 临时隐藏关闭按钮和保存按钮
      closeButton = modalRef.current.querySelector('[data-close-button]') as HTMLElement;
      saveButton = modalRef.current.querySelector('[data-save-button]') as HTMLElement;
      
      if (closeButton) closeButton.style.visibility = 'hidden';
      if (saveButton) saveButton.style.visibility = 'hidden';

      // 等待样式应用
      await new Promise(resolve => setTimeout(resolve, 50));

      // 调试信息
      console.log('开始截图，元素信息:', {
        width: modalRef.current.offsetWidth,
        height: modalRef.current.offsetHeight,
        scrollWidth: modalRef.current.scrollWidth,
        scrollHeight: modalRef.current.scrollHeight,
        computedStyle: window.getComputedStyle(modalRef.current),
        children: modalRef.current.children.length
      });

      // 优化的html2canvas配置
      const canvas = await html2canvas(modalRef.current, {
        backgroundColor: '#ffffff',
        scale: 1, // 固定为1避免设备像素比问题
        useCORS: false, // 关闭CORS避免跨域问题
        allowTaint: false, // 关闭taint模式提高兼容性
        foreignObjectRendering: false, // 关闭外部对象渲染
        logging: false, // 关闭日志减少干扰
        width: modalRef.current.offsetWidth,
        height: modalRef.current.offsetHeight,
        windowWidth: modalRef.current.offsetWidth,
        windowHeight: modalRef.current.offsetHeight,
        scrollX: 0,
        scrollY: 0,
        x: 0,
        y: 0,
        removeContainer: false,
        imageTimeout: 10000,
        // letterRendering: true, // 这个属性在html2canvas类型定义中不存在
        ignoreElements: (element) => {
          // 忽略某些可能导致问题的元素
          const htmlElement = element as HTMLElement;
          const shouldIgnore = element.classList?.contains('ignore-screenshot') || 
                              element.tagName === 'SCRIPT' ||
                              element.tagName === 'NOSCRIPT' ||
                              element.tagName === 'IFRAME' ||
                              htmlElement.style?.display === 'none' ||
                              htmlElement.style?.visibility === 'hidden' ||
                              htmlElement.style?.opacity === '0';
          
          if (shouldIgnore) {
            console.log('忽略元素:', element);
          }
          return shouldIgnore;
        },
        onclone: (clonedDoc, element) => {
          console.log('克隆文档完成:', clonedDoc, element);
          
          // 确保克隆的元素有正确的样式
          const clonedElement = element;
          clonedElement.style.position = 'relative';
          clonedElement.style.left = '0';
          clonedElement.style.top = '0';
          clonedElement.style.transform = 'none';
          clonedElement.style.margin = '0';
          clonedElement.style.padding = '0';
          
          // 修复不兼容的CSS属性
          const allElements = clonedElement.querySelectorAll('*');
           allElements.forEach((el: any) => {
            // 移除可能导致问题的CSS属性
            const style = el.style;
            
            // 移除lab()颜色函数和其他现代CSS特性
            ['color', 'backgroundColor', 'borderColor', 'boxShadow', 'textShadow'].forEach(prop => {
              const value = style[prop];
              if (value && (value.includes('lab(') || value.includes('lch(') || value.includes('oklab(') || value.includes('oklch('))) {
                style[prop] = ''; // 清除不兼容的颜色
              }
            });
            
            // 修复渐变背景
            if (style.backgroundImage && style.backgroundImage.includes('lab(')) {
              style.backgroundImage = 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)';
            }
            
            // 确保基本样式兼容性
            if (el.classList?.contains('bg-gradient-to-r')) {
              style.background = 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)';
              style.backgroundImage = 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)';
            }
            
            // 修复可能的transform问题
            if (style.transform && style.transform.includes('translate3d')) {
              style.transform = style.transform.replace(/translate3d\([^)]*\)/g, 'translateX(0) translateY(0)');
            }
          });
        }
      });

      console.log('截图完成，canvas信息:', {
        width: canvas.width,
        height: canvas.height,
        hasData: canvas.toDataURL().length > 100
      });

      // 恢复按钮显示
      if (closeButton) closeButton.style.visibility = 'visible';
      if (saveButton) saveButton.style.visibility = 'visible';

      // 检查canvas是否有效
      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        throw new Error('生成的图片无效');
      }

      // 创建下载链接 - 使用更兼容的方式
      const dataUrl = canvas.toDataURL('image/png', 0.9);
      
      // 检查dataUrl是否有效
      if (!dataUrl || dataUrl === 'data:,') {
        throw new Error('图片数据生成失败');
      }

      // 尝试使用现代API下载
      if ('showSaveFilePicker' in window) {
        try {
          // @ts-expect-error - 新的文件系统API
          const fileHandle = await window.showSaveFilePicker({
            suggestedName: `WaveHub聊天室分享-${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.png`,
            types: [{
              description: 'PNG图片',
              accept: { 'image/png': ['.png'] }
            }]
          });
          const writable = await fileHandle.createWritable();
          const response = await fetch(dataUrl);
          await response.body?.pipeTo(writable);
        } catch {
          // 如果新API失败，回退到传统方法
          downloadWithLink(dataUrl);
        }
      } else {
        // 传统下载方法
        downloadWithLink(dataUrl);
      }

    } catch (error) {
      console.error('保存图片失败:', error);
      console.error('错误详情:', {
        message: error instanceof Error ? error.message : '未知错误',
        stack: error instanceof Error ? error.stack : undefined,
        modalRef: !!modalRef.current,
        modalDimensions: modalRef.current ? {
          width: modalRef.current.offsetWidth,
          height: modalRef.current.offsetHeight
        } : null
      });
      
      // 恢复按钮显示（错误情况下）
      if (closeButton) closeButton.style.visibility = 'visible';
      if (saveButton) saveButton.style.visibility = 'visible';
      
      // 提供更详细的错误信息和解决方案
      let errorMessage = '保存图片失败，请重试';
      let suggestion = '';
      
      if (error instanceof Error) {
        if (error.message.includes('网络') || error.message.includes('fetch')) {
          errorMessage = '网络错误，请检查网络连接后重试';
          suggestion = '或尝试使用SVG保存方式';
        } else if (error.message.includes('权限') || error.message.includes('denied')) {
          errorMessage = '没有保存权限，请允许下载文件';
          suggestion = '请在浏览器设置中允许下载';
        } else if (error.message.includes('无效') || error.message.includes('canvas')) {
          errorMessage = '图片生成失败，请刷新页面后重试';
          suggestion = '或尝试使用SVG保存方式';
        } else if (error.message.includes('tainted') || error.message.includes('CORS')) {
          errorMessage = '图片包含跨域内容，无法保存';
          suggestion = '请尝试使用SVG保存方式';
        }
      }
      
      // 自动切换到备用方法
      if (saveMethod === 'html2canvas') {
        const shouldTryFallback = confirm(`${errorMessage}${suggestion ? '\n\n' + suggestion : ''}\n\n是否尝试使用SVG保存方式？`);
        if (shouldTryFallback) {
          setSaveMethod('fallback');
          // 延迟一下再尝试备用方法
          setTimeout(() => {
            handleSaveAsFallback();
          }, 500);
          return; // 不显示错误信息，直接尝试备用方法
        }
      }
      
      alert(`${errorMessage}${suggestion ? '\n\n建议：' + suggestion : ''}`);
    } finally {
      setIsSaving(false);
    }
  };

  // 传统下载方法
  const downloadWithLink = (dataUrl: string) => {
    const link = document.createElement('a');
    link.download = `WaveHub聊天室分享-${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.png`;
    link.href = dataUrl;
    link.style.display = 'none';
    
    // 添加到DOM，点击，然后移除
    document.body.appendChild(link);
    link.click();
    
    // 延迟移除，确保下载开始
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  };

  // 备用保存方法 - 使用Canvas手动绘制
  const handleSaveAsFallback = async () => {
    if (!modalRef.current) return;
    
    setIsSaving(true);
    
    try {
      const modalElement = modalRef.current;
      const rect = modalElement.getBoundingClientRect();
      
      // 创建Canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('无法获取Canvas上下文');
      
      // 设置Canvas尺寸
      canvas.width = rect.width * 2; // 2倍分辨率
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);
      
      // 绘制背景
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, rect.width, rect.height);
      
      // 绘制圆角矩形背景
      const drawRoundedRect = (x: number, y: number, width: number, height: number, radius: number, fillStyle: string) => {
        ctx.fillStyle = fillStyle;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
      };
      
      // 绘制渐变头部
      const gradient = ctx.createLinearGradient(0, 0, rect.width, 0);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(1, '#8b5cf6');
      
      drawRoundedRect(24, 24, rect.width - 48, 80, 16, gradient.toString());
      
      // 绘制文本
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px Inter, system-ui, sans-serif';
      ctx.fillText('分享聊天室', 48, 60);
      
      ctx.font = '14px Inter, system-ui, sans-serif';
      ctx.fillText('邀请朋友加入对话', 48, 85);
      
      // 绘制主题信息
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 16px Inter, system-ui, sans-serif';
      ctx.fillText('聊天室主题', 48, 140);
      
      ctx.font = 'bold 14px Inter, system-ui, sans-serif';
      ctx.fillText(roomInfo.title, 48, 165);
      
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px Inter, system-ui, sans-serif';
      const description = roomInfo.description;
      const maxWidth = rect.width - 96;
      const words = description.split('');
      let line = '';
      let y = 185;
      
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i];
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && i > 0) {
          ctx.fillText(line, 48, y);
          line = words[i];
          y += 16;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 48, y);
      
      // 绘制统计信息
      const statsY = y + 40;
      
      // 在线人数卡片
      drawRoundedRect(48, statsY, (rect.width - 120) / 2, 60, 8, '#f0fdf4');
      ctx.fillStyle = '#16a34a';
      ctx.font = 'bold 18px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${roomInfo.onlineCount} 人`, 48 + (rect.width - 120) / 4, statsY + 30);
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px Inter, system-ui, sans-serif';
      ctx.fillText('在线人数', 48 + (rect.width - 120) / 4, statsY + 50);
      
      // 总成员卡片
      drawRoundedRect(48 + (rect.width - 120) / 2 + 24, statsY, (rect.width - 120) / 2, 60, 8, '#eff6ff');
      ctx.fillStyle = '#2563eb';
      ctx.font = 'bold 18px Inter, system-ui, sans-serif';
      ctx.fillText(`${roomInfo.participantCount} 人`, 48 + (rect.width - 120) * 3 / 4 + 24, statsY + 30);
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px Inter, system-ui, sans-serif';
      ctx.fillText('总成员', 48 + (rect.width - 120) * 3 / 4 + 24, statsY + 50);
      
      // 绘制分享链接
      const linkY = statsY + 100;
      ctx.textAlign = 'left';
      ctx.fillStyle = '#6b7280';
      ctx.font = '14px Inter, system-ui, sans-serif';
      ctx.fillText('分享链接', 48, linkY);
      
      drawRoundedRect(48, linkY + 10, rect.width - 96, 40, 8, '#f9fafb');
      ctx.fillStyle = '#1f2937';
      ctx.font = '10px monospace';
      ctx.fillText(shareUrl, 60, linkY + 32);
      
      // 绘制须知
      const noticeY = linkY + 70;
      drawRoundedRect(48, noticeY, rect.width - 96, 60, 8, '#fef3c7');
      ctx.fillStyle = '#92400e';
      ctx.font = 'bold 14px Inter, system-ui, sans-serif';
      ctx.fillText('分享须知', 60, noticeY + 25);
      ctx.font = '11px Inter, system-ui, sans-serif';
      ctx.fillText('通过此链接加入的用户将能够参与语音聊天和查看聊天记录。', 60, noticeY + 45);
      
      // 下载图片
      const dataUrl = canvas.toDataURL('image/png', 0.9);
      downloadWithLink(dataUrl);
      
    } catch (error) {
      console.error('备用保存方法失败:', error);
      
      // 如果Canvas方法也失败，尝试SVG方法
      try {
        const svgData = createSVGFallback();
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        
        const link = document.createElement('a');
        link.download = `WaveHub聊天室分享-${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.svg`;
        link.href = url;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setTimeout(() => URL.revokeObjectURL(url), 100);
      } catch (svgError) {
        console.error('SVG备用方法也失败:', svgError);
        alert('保存失败，请尝试手动截图保存');
      }
    } finally {
      setIsSaving(false);
    }
  };

  // 创建SVG备用方案
  const createSVGFallback = () => {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="500" height="600" viewBox="0 0 500 600">
        <defs>
          <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- 背景 -->
        <rect width="500" height="600" fill="white" rx="16"/>
        
        <!-- 头部 -->
        <rect x="24" y="24" width="452" height="80" fill="url(#headerGradient)" rx="16"/>
        <text x="48" y="55" fill="white" font-family="Inter, sans-serif" font-size="20" font-weight="bold">分享聊天室</text>
        <text x="48" y="80" fill="white" font-family="Inter, sans-serif" font-size="14" opacity="0.9">邀请朋友加入对话</text>
        
        <!-- 主题信息 -->
        <text x="48" y="140" fill="#1f2937" font-family="Inter, sans-serif" font-size="16" font-weight="bold">聊天室主题</text>
        <text x="48" y="165" fill="#1f2937" font-family="Inter, sans-serif" font-size="14" font-weight="bold">${roomInfo.title}</text>
        <text x="48" y="185" fill="#6b7280" font-family="Inter, sans-serif" font-size="12">${roomInfo.description.substring(0, 30)}...</text>
        
        <!-- 统计信息 -->
        <rect x="48" y="220" width="180" height="60" fill="#f0fdf4" rx="8"/>
        <text x="138" y="245" fill="#16a34a" font-family="Inter, sans-serif" font-size="18" font-weight="bold" text-anchor="middle">${roomInfo.onlineCount} 人</text>
        <text x="138" y="265" fill="#6b7280" font-family="Inter, sans-serif" font-size="12" text-anchor="middle">在线人数</text>
        
        <rect x="248" y="220" width="180" height="60" fill="#eff6ff" rx="8"/>
        <text x="338" y="245" fill="#2563eb" font-family="Inter, sans-serif" font-size="18" font-weight="bold" text-anchor="middle">${roomInfo.participantCount} 人</text>
        <text x="338" y="265" fill="#6b7280" font-family="Inter, sans-serif" font-size="12" text-anchor="middle">总成员</text>
        
        <!-- 分享链接 -->
        <text x="48" y="320" fill="#6b7280" font-family="Inter, sans-serif" font-size="14">分享链接</text>
        <rect x="48" y="330" width="404" height="40" fill="#f9fafb" rx="8"/>
        <text x="60" y="352" fill="#1f2937" font-family="monospace" font-size="10">${shareUrl.substring(0, 50)}...</text>
        
        <!-- 须知 -->
        <rect x="48" y="390" width="404" height="60" fill="#fef3c7" rx="8"/>
        <text x="60" y="415" fill="#92400e" font-family="Inter, sans-serif" font-size="14" font-weight="bold">分享须知</text>
        <text x="60" y="435" fill="#92400e" font-family="Inter, sans-serif" font-size="11">通过此链接加入的用户将能够参与语音聊天和查看聊天记录。</text>
      </svg>
    `;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden animate-scale-in">
        {/* 头部 */}
        <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
          <button
            data-close-button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            data-save-button
            onClick={handleSaveAsImage}
            disabled={isSaving}
            className="absolute top-4 right-16 text-white hover:text-gray-200 transition-colors disabled:opacity-50"
            title="保存为图片"
          >
            {isSaving ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Camera className="w-6 h-6" />
            )}
          </button>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/20 rounded-full">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">分享聊天室</h2>
              <p className="text-blue-100 text-sm">邀请朋友加入对话</p>
            </div>
          </div>
        </div>

        {/* 主题信息 */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-50 rounded-full">
              <MessageCircle className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">聊天室主题</h3>
              <p className="text-gray-700 font-medium">{roomInfo.title}</p>
              <p className="text-gray-500 text-sm mt-1">{roomInfo.description}</p>
            </div>
          </div>
        </div>

        {/* 群聊信息 */}
        <div className="p-6 border-b border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-full">
                <Wifi className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">在线人数</div>
                <div className="font-bold text-green-600">{roomInfo.onlineCount} 人</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">总成员</div>
                <div className="font-bold text-blue-600">{roomInfo.participantCount} 人</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>创建于 {roomInfo.createdAt.toLocaleDateString('zh-CN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</span>
          </div>
        </div>

        {/* 分享链接和二维码 */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 链接部分 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                分享链接
              </label>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Link2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* 二维码部分 */}
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                扫码加入
              </label>
              <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                {qrCodeUrl ? (
                  <div className="text-center">
                    <img 
                      src={qrCodeUrl} 
                      alt="分享链接二维码" 
                      className="w-32 h-32 mx-auto mb-2"
                    />
                    <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                      <QrCode className="w-3 h-3" />
                      <span>扫码快速加入</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="space-y-3 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={handleCopyLink}
                className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${
                  copied
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span>复制链接</span>
                  </>
                )}
              </button>

              <div className="relative">
                <button
                  onClick={saveMethod === 'html2canvas' ? handleSaveAsImage : handleSaveAsFallback}
                  disabled={isSaving}
                  className="flex items-center justify-center space-x-2 py-3 px-4 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full"
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>保存中...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>{saveMethod === 'html2canvas' ? '保存图片(HTML2Canvas)' : '保存图片(Canvas绘制)'}</span>
                    </>
                  )}
                </button>
                
                {/* 保存方式切换 */}
                <button
                  onClick={() => setSaveMethod(saveMethod === 'html2canvas' ? 'fallback' : 'html2canvas')}
                  className="absolute -bottom-6 left-0 text-xs text-purple-600 hover:text-purple-800 underline"
                  title="切换保存方式"
                >
                  {saveMethod === 'html2canvas' ? '改用Canvas绘制' : '改用HTML2Canvas'}
                </button>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              <Share2 className="w-5 h-5" />
              <span>分享到其他应用</span>
            </button>
          </div>

          {/* 分享提示 */}
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-sm text-amber-700">
                <p className="font-medium mb-1">分享须知</p>
                <p>通过此链接加入的用户将能够参与语音聊天和查看聊天记录。请确保只与信任的人分享。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
