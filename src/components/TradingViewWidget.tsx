'use client';

import { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
  symbol?: string;
  width?: string | number;
  height?: string | number;
  theme?: 'light' | 'dark';
  style?: '1' | '2' | '3' | '4' | '8' | '9';
  locale?: string;
  toolbar_bg?: string;
  enable_publishing?: boolean;
  allow_symbol_change?: boolean;
  container_id?: string;
  type?: 'widget' | 'ticker' | 'market-overview' | 'screener' | 'crypto-mkt-screener';
}

export default function TradingViewWidget({
  symbol = 'BINANCE:BTCUSDT',
  width = '100%',
  height = 400,
  theme = 'light',
  style = '1',
  locale = 'zh_CN',
  toolbar_bg = '#f1f3f6',
  enable_publishing = false,
  allow_symbol_change = true,
  container_id,
  type = 'widget',
}: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 清除之前的内容
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;

    let config;

    switch (type) {
      case 'ticker':
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
        config = {
          symbols: [
            { proName: 'BINANCE:BTCUSDT', title: 'Bitcoin' },
            { proName: 'BINANCE:ETHUSDT', title: 'Ethereum' },
            { proName: 'BINANCE:BNBUSDT', title: 'BNB' },
            { proName: 'BINANCE:ADAUSDT', title: 'Cardano' },
            { proName: 'BINANCE:SOLUSDT', title: 'Solana' },
            { proName: 'BINANCE:XRPUSDT', title: 'XRP' },
            { proName: 'BINANCE:DOTUSDT', title: 'Polkadot' },
            { proName: 'BINANCE:DOGEUSDT', title: 'Dogecoin' },
          ],
          showSymbolLogo: true,
          colorTheme: theme,
          isTransparent: false,
          displayMode: 'adaptive',
          locale: locale,
        };
        break;

      case 'market-overview':
        script.src =
          'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
        config = {
          colorTheme: theme,
          dateRange: '12M',
          showChart: true,
          locale: locale,
          width: width,
          height: height,
          largeChartUrl: '',
          isTransparent: false,
          showSymbolLogo: true,
          showFloatingTooltip: false,
          plotLineColorGrowing: 'rgba(41, 98, 255, 1)',
          plotLineColorFalling: 'rgba(41, 98, 255, 1)',
          gridLineColor: 'rgba(240, 243, 250, 0)',
          scaleFontColor: 'rgba(120, 123, 134, 1)',
          belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
          belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
          belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
          belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
          symbolActiveColor: 'rgba(41, 98, 255, 0.12)',
          tabs: [
            {
              title: '加密货币',
              symbols: [
                { s: 'BINANCE:BTCUSDT', d: 'Bitcoin' },
                { s: 'BINANCE:ETHUSDT', d: 'Ethereum' },
                { s: 'BINANCE:BNBUSDT', d: 'BNB' },
                { s: 'BINANCE:ADAUSDT', d: 'Cardano' },
                { s: 'BINANCE:SOLUSDT', d: 'Solana' },
              ],
              originalTitle: 'Crypto',
            },
          ],
        };
        break;

      case 'screener':
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
        config = {
          width: width,
          height: height,
          defaultColumn: 'overview',
          screener_type: 'crypto_mkt',
          displayCurrency: 'USD',
          colorTheme: theme,
          locale: locale,
          isTransparent: false,
        };
        break;

      case 'crypto-mkt-screener':
        script.src =
          'https://s3.tradingview.com/external-embedding/embed-widget-crypto-mkt-screener.js';
        config = {
          width: width,
          height: height,
          defaultColumn: 'overview',
          screener_type: 'crypto_mkt',
          displayCurrency: 'USD',
          colorTheme: theme,
          locale: locale,
          isTransparent: false,
        };
        break;

      default: // 'widget'
        config = {
          autosize: width === '100%',
          width: width === '100%' ? undefined : width,
          height: height,
          symbol: symbol,
          interval: 'D',
          timezone: 'Asia/Shanghai',
          theme: theme,
          style: style,
          locale: locale,
          toolbar_bg: toolbar_bg,
          enable_publishing: enable_publishing,
          allow_symbol_change: allow_symbol_change,
          container_id: container_id || `tradingview_${Math.random().toString(36).substr(2, 9)}`,
        };
    }

    script.innerHTML = JSON.stringify(config);
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [
    symbol,
    width,
    height,
    theme,
    style,
    locale,
    toolbar_bg,
    enable_publishing,
    allow_symbol_change,
    container_id,
    type,
  ]);

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container"
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
}
