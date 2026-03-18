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
    <div className="p-4 rounded-xl border border-border bg-background hover:border-primary/20 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-xs font-medium text-muted-foreground">当前时间</span>
        </div>
        <span className="text-lg font-mono font-semibold text-primary tabular-nums tracking-tight">
          {mounted ? `${hours}:${minutes}:${seconds}` : '--:--:--'}
        </span>
      </div>
      <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
        <span>{year}年{month}月{day}日</span>
        <span>{weekday}</span>
      </div>
    </div>
  );
}
