'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
}

export default function MarketOverview() {
  const [marketData, setMarketData] = useState<MarketData[]>(() => {
    // 模拟市场数据
    return [
      {
        symbol: 'BTC',
        name: '比特币',
        price: 95420.50,
        change: 2234.80,
        changePercent: 2.34,
        volume: '28.5B',
        marketCap: '1.88T'
      },
      {
        symbol: 'ETH',
        name: '以太坊',
        price: 3542.30,
        change: -43.67,
        changePercent: -1.23,
        volume: '15.2B',
        marketCap: '425.8B'
      },
      {
        symbol: 'AAPL',
        name: '苹果',
        price: 189.95,
        change: 2.28,
        changePercent: 1.2,
        volume: '45.6M',
        marketCap: '2.95T'
      },
      {
        symbol: 'TSLA',
        name: '特斯拉',
        price: 248.98,
        change: 7.72,
        changePercent: 3.2,
        volume: '89.3M',
        marketCap: '792.4B'
      }
    ];
  });

  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // 模拟价格更新
      setMarketData(prev => prev.map(item => ({
        ...item,
        price: item.price + (Math.random() - 0.5) * item.price * 0.001,
        change: item.change + (Math.random() - 0.5) * 10,
        changePercent: item.changePercent + (Math.random() - 0.5) * 0.1
      })));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">市场概览</h3>
            <p className="text-sm text-gray-500">
              实时更新 • {currentTime.toLocaleTimeString('zh-CN')}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500">实时</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {marketData.map((item) => (
          <div 
            key={item.symbol}
            className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-sm text-gray-700">{item.symbol}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.symbol}</div>
                </div>
              </div>
              <div className={`flex items-center space-x-1 ${
                item.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.changePercent >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">价格</span>
                <span className="font-bold text-gray-900">
                  ${item.price.toLocaleString('en-US', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">24h变化</span>
                <span className={`text-sm font-medium ${
                  item.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.change >= 0 ? '+' : ''}${item.change.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">成交量</span>
                <span className="text-sm text-gray-700">{item.volume}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">市值</span>
                <span className="text-sm text-gray-700">{item.marketCap}</span>
              </div>
            </div>

            {/* 简单的价格趋势指示器 */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>趋势</span>
                <div className="flex space-x-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-4 rounded-full ${
                        Math.random() > 0.5 ? 'bg-green-300' : 'bg-red-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">
              {marketData.filter(item => item.changePercent > 0).length}
            </div>
            <div className="text-xs text-gray-500">上涨</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-600">
              {marketData.filter(item => item.changePercent < 0).length}
            </div>
            <div className="text-xs text-gray-500">下跌</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-600">
              {marketData.filter(item => Math.abs(item.changePercent) < 0.1).length}
            </div>
            <div className="text-xs text-gray-500">平盘</div>
          </div>
        </div>
      </div>
    </div>
  );
}
