import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: '缺少URL参数' }, { status: 400 });
    }

    // 验证URL格式
    let targetUrl: URL;
    try {
      targetUrl = new URL(url);
    } catch {
      return NextResponse.json({ error: '无效的URL格式' }, { status: 400 });
    }

    // 安全检查：只允许HTTP和HTTPS协议
    if (!['http:', 'https:'].includes(targetUrl.protocol)) {
      return NextResponse.json({ error: '只支持HTTP和HTTPS协议' }, { status: 400 });
    }

    // 设置请求头，模拟浏览器访问
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'DNT': '1',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
    };

    // 发起请求
    const response = await fetch(targetUrl.toString(), {
      method: 'GET',
      headers,
      // 设置超时时间
      signal: AbortSignal.timeout(10000), // 10秒超时
    });

    if (!response.ok) {
      return NextResponse.json({ 
        error: `请求失败: ${response.status} ${response.statusText}` 
      }, { status: response.status });
    }

    // 获取内容类型
    const contentType = response.headers.get('content-type') || '';
    
    // 只处理HTML内容
    if (!contentType.includes('text/html')) {
      return NextResponse.json({ 
        error: '只支持HTML页面的抓取' 
      }, { status: 400 });
    }

    // 获取HTML内容
    const html = await response.text();
    
    // 简单的HTML处理：修复相对路径
    const processedHtml = processHtml(html, targetUrl);

    return NextResponse.json({
      success: true,
      html: processedHtml,
      url: targetUrl.toString(),
      title: extractTitle(html),
      contentType,
    });

  } catch (error) {
    console.error('代理请求错误:', error);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json({ error: '请求超时' }, { status: 408 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ error: '未知错误' }, { status: 500 });
  }
}

// 处理HTML内容，修复相对路径等问题
function processHtml(html: string, baseUrl: URL): string {
  let processed = html;
  
  // 修复相对路径的CSS和JS文件
  processed = processed.replace(
    /href=["'](?!https?:\/\/|\/\/|#)([^"']+)["']/gi,
    `href="${baseUrl.origin}$1"`
  );
  
  processed = processed.replace(
    /src=["'](?!https?:\/\/|\/\/|data:|#)([^"']+)["']/gi,
    `src="${baseUrl.origin}$1"`
  );
  
  // 添加base标签
  const baseTag = `<base href="${baseUrl.origin}/">`;
  processed = processed.replace(/<head>/i, `<head>${baseTag}`);
  
  // 移除可能导致问题的脚本
  processed = processed.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  
  // 添加样式来确保内容适应容器
  const customStyles = `
    <style>
      body { 
        margin: 0 !important; 
        padding: 10px !important; 
        max-width: 100% !important; 
        overflow-x: hidden !important; 
      }
      img { 
        max-width: 100% !important; 
        height: auto !important; 
      }
      table { 
        max-width: 100% !important; 
        table-layout: fixed !important; 
      }
      * { 
        box-sizing: border-box !important; 
      }
    </style>
  `;
  
  processed = processed.replace(/<\/head>/i, `${customStyles}</head>`);
  
  return processed;
}

// 提取页面标题
function extractTitle(html: string): string {
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  return titleMatch ? titleMatch[1].trim() : '无标题';
}
