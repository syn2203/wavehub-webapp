'use client';

import { useState } from 'react';
import TradingViewWidget from './TradingViewWidget';

interface CryptoOption {
  symbol: string;
  name: string;
  icon: string;
  color: string;
}

const cryptoOptions: CryptoOption[] = [
  { symbol: 'BINANCE:BTCUSDT', name: '比特币', icon: '₿', color: 'text-orange-500' },
  { symbol: 'BINANCE:ETHUSDT', name: '以太坊', icon: 'Ξ', color: 'text-blue-500' },
  { symbol: 'BINANCE:BNBUSDT', name: 'BNB', icon: '🟡', color: 'text-yellow-500' },
  { symbol: 'BINANCE:ADAUSDT', name: 'Cardano', icon: '🔵', color: 'text-blue-600' },
  { symbol: 'BINANCE:SOLUSDT', name: 'Solana', icon: '🟣', color: 'text-purple-500' },
  { symbol: 'BINANCE:XRPUSDT', name: 'XRP', icon: '💧', color: 'text-blue-400' },
  { symbol: 'BINANCE:DOTUSDT', name: 'Polkadot', icon: '⚫', color: 'text-pink-500' },
  { symbol: 'BINANCE:DOGEUSDT', name: 'Dogecoin', icon: '🐕', color: 'text-yellow-600' },
];

export default function CryptoSelector() {
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoOptions[0]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h3 className="font-semibold text-gray-900 flex items-center mb-4">
          <span className="text-green-500 mr-2">🎯</span>
          自定义币种图表
        </h3>
        
        {/* 币种选择器 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {cryptoOptions.map((crypto) => (
            <button
              key={crypto.symbol}
              onClick={() => setSelectedCrypto(crypto)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                selectedCrypto.symbol === crypto.symbol
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className={`text-lg ${crypto.color}`}>{crypto.icon}</span>
                <span className="text-sm font-medium text-gray-700">{crypto.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* 选中的币种图表 */}
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`text-2xl ${selectedCrypto.color}`}>{selectedCrypto.icon}</span>
            <div>
              <h4 className="font-semibold text-gray-900">{selectedCrypto.name}</h4>
              <p className="text-sm text-gray-500">{selectedCrypto.symbol.replace('BINANCE:', '')}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">数据来源</p>
            <p className="text-sm font-medium text-gray-700">Binance</p>
          </div>
        </div>
        
        <TradingViewWidget 
          symbol={selectedCrypto.symbol}
          height={400}
          theme="light"
          allow_symbol_change={false}
        />
      </div>
    </div>
  );
}
