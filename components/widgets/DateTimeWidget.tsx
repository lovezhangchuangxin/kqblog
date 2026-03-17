'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';

const WEEKDAYS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

// 用于检测客户端挂载状态
const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function DateTimeWidget() {
  const mounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
  const [dateTime, setDateTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const day = dateTime.getDate();
  const weekday = WEEKDAYS[dateTime.getDay()];
  const hours = String(dateTime.getHours()).padStart(2, '0');
  const minutes = String(dateTime.getMinutes()).padStart(2, '0');
  const seconds = String(dateTime.getSeconds()).padStart(2, '0');

  return (
    <div className="p-5 rounded-xl border border-border bg-background hover:border-primary/25 transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="text-sm font-medium text-muted-foreground">当前时间</span>
      </div>

      <div className="space-y-2">
        <div className="text-lg font-semibold text-foreground">
          {year}年{month}月{day}日
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{weekday}</span>
          <span className="text-2xl font-mono font-bold text-primary tabular-nums">
            {mounted ? `${hours}:${minutes}:${seconds}` : '--:--:--'}
          </span>
        </div>
      </div>
    </div>
  );
}
