'use client';

import { useState } from 'react';

interface PriceAlert {
  id: string;
  symbol: string;
  name: string;
  targetPrice: number;
  currentPrice: number;
  type: 'above' | 'below';
  created: Date;
}

export default function CryptoPriceAlert() {
  const [alerts, setAlerts] = useState<PriceAlert[]>([
    {
      id: '1',
      symbol: 'BTC',
      name: '比特币',
      targetPrice: 100000,
      currentPrice: 95420,
      type: 'above',
      created: new Date()
    },
    {
      id: '2',
      symbol: 'ETH',
      name: '以太坊',
      targetPrice: 3000,
      currentPrice: 3542,
      type: 'below',
      created: new Date()
    }
  ]);

  const [newAlert, setNewAlert] = useState({
    symbol: 'BTC',
    name: '比特币',
    targetPrice: '',
    type: 'above' as 'above' | 'below'
  });

  const cryptoOptions = [
    { symbol: 'BTC', name: '比特币', currentPrice: 95420 },
    { symbol: 'ETH', name: '以太坊', currentPrice: 3542 },
    { symbol: 'BNB', name: 'BNB', currentPrice: 692 },
    { symbol: 'ADA', name: 'Cardano', currentPrice: 1.05 },
    { symbol: 'SOL', name: 'Solana', currentPrice: 238 },
  ];

  const addAlert = () => {
    if (!newAlert.targetPrice) return;
    
    const selectedCrypto = cryptoOptions.find(c => c.symbol === newAlert.symbol);
    if (!selectedCrypto) return;

    const alert: PriceAlert = {
      id: Date.now().toString(),
      symbol: newAlert.symbol,
      name: newAlert.name,
      targetPrice: parseFloat(newAlert.targetPrice),
      currentPrice: selectedCrypto.currentPrice,
      type: newAlert.type,
      created: new Date()
    };

    setAlerts([...alerts, alert]);
    setNewAlert({ symbol: 'BTC', name: '比特币', targetPrice: '', type: 'above' });
  };

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getAlertStatus = (alert: PriceAlert) => {
    const isTriggered = alert.type === 'above' 
      ? alert.currentPrice >= alert.targetPrice
      : alert.currentPrice <= alert.targetPrice;
    
    return isTriggered;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h3 className="font-semibold text-gray-900 flex items-center">
          <span className="text-yellow-500 mr-2">🔔</span>
          价格提醒
        </h3>
        <p className="text-sm text-gray-600 mt-1">设置价格达到目标时的提醒</p>
      </div>

      <div className="p-4">
        {/* 添加新提醒 */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">添加新提醒</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <select
              value={newAlert.symbol}
              onChange={(e) => {
                const selected = cryptoOptions.find(c => c.symbol === e.target.value);
                setNewAlert({
                  ...newAlert,
                  symbol: e.target.value,
                  name: selected?.name || ''
                });
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {cryptoOptions.map(crypto => (
                <option key={crypto.symbol} value={crypto.symbol}>
                  {crypto.name} ({crypto.symbol})
                </option>
              ))}
            </select>

            <select
              value={newAlert.type}
              onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value as 'above' | 'below' })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="above">价格高于</option>
              <option value="below">价格低于</option>
            </select>

            <input
              type="number"
              value={newAlert.targetPrice}
              onChange={(e) => setNewAlert({ ...newAlert, targetPrice: e.target.value })}
              placeholder="目标价格 (USD)"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <button
              onClick={addAlert}
              disabled={!newAlert.targetPrice}
              className="btn-primary py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              添加提醒
            </button>
          </div>
        </div>

        {/* 提醒列表 */}
        <div className="space-y-3">
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <span className="text-4xl mb-2 block">📭</span>
              <p>暂无价格提醒</p>
              <p className="text-sm">添加提醒以跟踪您关注的加密货币价格变化</p>
            </div>
          ) : (
            alerts.map((alert) => {
              const isTriggered = getAlertStatus(alert);
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-2 ${
                    isTriggered
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        isTriggered ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
                      }`} />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{alert.name}</span>
                          <span className="text-sm text-gray-500">({alert.symbol})</span>
                          {isTriggered && (
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                              已触发
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          当价格 {alert.type === 'above' ? '高于' : '低于'} ${alert.targetPrice.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-sm text-gray-500">当前价格</div>
                        <div className="font-medium text-gray-900">
                          ${alert.currentPrice.toLocaleString()}
                        </div>
                      </div>
                      <button
                        onClick={() => removeAlert(alert.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* 提示信息 */}
        <div className="mt-6 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <span className="text-blue-500 mt-0.5">💡</span>
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">提示：</p>
              <ul className="space-y-1 text-xs">
                <li>• 价格数据仅供演示，实际应用需要连接实时API</li>
                <li>• 可以设置多个提醒来跟踪不同的价格目标</li>
                <li>• 提醒触发时会在界面上显示绿色状态</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
