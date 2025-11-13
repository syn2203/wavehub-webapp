'use client';

import { useState, useEffect } from 'react';
import TradingViewWidget from './TradingViewWidget';

interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  icon: string;
  color: string;
}

interface CryptoChatWidgetProps {
  isMinimized?: boolean;
  onToggle?: () => void;
}

export default function ChatCryptoWidget({ isMinimized = false, onToggle }: CryptoChatWidgetProps) {
  const [selectedCrypto, setSelectedCrypto] = useState('BINANCE:BTCUSDT');
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([
    { symbol: 'BTC', name: '比特币', price: 95420, change24h: 2.34, icon: '₿', color: 'text-orange-500' },
    { symbol: 'ETH', name: '以太坊', price: 3542, change24h: -1.23, icon: 'Ξ', color: 'text-blue-500' },
    { symbol: 'BNB', name: 'BNB', price: 692, change24h: 0.87, icon: '🟡', color: 'text-yellow-500' },
    { symbol: 'SOL', name: 'Solana', price: 238, change24h: 4.56, icon: '🟣', color: 'text-purple-500' },
  ]);

  const [currentPriceIndex, setCurrentPriceIndex] = useState(0);

  // 模拟价格更新
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoPrices(prev => prev.map(crypto => ({
        ...crypto,
        price: crypto.price * (1 + (Math.random() - 0.5) * 0.002), // ±0.1% 随机变化
        change24h: crypto.change24h + (Math.random() - 0.5) * 0.1
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 价格轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPriceIndex(prev => (prev + 1) % cryptoPrices.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [cryptoPrices.length]);

  const currentPrice = cryptoPrices[currentPriceIndex];

  if (isMinimized) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* 迷你价格显示 */}
        <div 
          className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={onToggle}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`text-lg ${currentPrice.color}`}>{currentPrice.icon}</span>
              <div>
                <div className="font-medium text-sm text-gray-900">{currentPrice.name}</div>
                <div className="text-xs text-gray-500">{currentPrice.symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-sm text-gray-900">
                ${currentPrice.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
              <div className={`text-xs ${currentPrice.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {currentPrice.change24h >= 0 ? '+' : ''}{currentPrice.change24h.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

        {/* 迷你价格滚动条 */}
        <div className="border-t border-gray-100 px-3 py-2">
          <div className="flex space-x-4 text-xs">
            {cryptoPrices.map((crypto, index) => (
              <div 
                key={crypto.symbol}
                className={`flex items-center space-x-1 ${index === currentPriceIndex ? 'opacity-100' : 'opacity-60'}`}
              >
                <span className={crypto.color}>{crypto.icon}</span>
                <span className="font-medium">${crypto.price.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                <span className={crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      {/* 头部控制栏 */}
      <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold flex items-center">
            <span className="mr-2">📈</span>
            实时行情
          </h3>
          <button
            onClick={onToggle}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* 币种选择器 */}
      <div className="p-4 border-b border-gray-100">
        <div className="grid grid-cols-2 gap-2">
          {[
            { symbol: 'BINANCE:BTCUSDT', name: '比特币', icon: '₿', color: 'text-orange-500' },
            { symbol: 'BINANCE:ETHUSDT', name: '以太坊', icon: 'Ξ', color: 'text-blue-500' },
            { symbol: 'BINANCE:BNBUSDT', name: 'BNB', icon: '🟡', color: 'text-yellow-500' },
            { symbol: 'BINANCE:SOLUSDT', name: 'Solana', icon: '🟣', color: 'text-purple-500' },
          ].map((crypto) => (
            <button
              key={crypto.symbol}
              onClick={() => setSelectedCrypto(crypto.symbol)}
              className={`p-2 rounded-lg border transition-all ${
                selectedCrypto === crypto.symbol
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${crypto.color}`}>{crypto.icon}</span>
                <span className="text-xs font-medium text-gray-700">{crypto.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 价格显示 */}
      <div className="p-4 border-b border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          {cryptoPrices.map((crypto) => (
            <div key={crypto.symbol} className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <span className={`text-lg ${crypto.color}`}>{crypto.icon}</span>
                <span className="text-sm font-medium text-gray-900">{crypto.symbol}</span>
              </div>
              <div className="font-bold text-gray-900">
                ${crypto.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
              <div className={`text-sm ${crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TradingView 图表 */}
      <div className="p-4">
        <TradingViewWidget
          symbol={selectedCrypto}
          height={200}
          theme="light"
          style="1"
          allow_symbol_change={false}
        />
      </div>

      {/* 快速操作 */}
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <div className="flex space-x-2">
          <button className="flex-1 py-2 px-3 bg-green-500 text-white rounded text-sm font-medium hover:bg-green-600 transition-colors">
            📊 详细分析
          </button>
          <button className="flex-1 py-2 px-3 bg-blue-500 text-white rounded text-sm font-medium hover:bg-blue-600 transition-colors">
            🔔 价格提醒
          </button>
        </div>
      </div>
    </div>
  );
}
