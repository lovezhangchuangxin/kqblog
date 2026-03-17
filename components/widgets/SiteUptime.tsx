'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';

// 网站起始日期 - 可根据实际情况修改
const SITE_START_DATE = new Date('2025-01-01');

// 用于检测客户端挂载状态
const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function SiteUptime() {
  const mounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
  const [uptime, setUptime] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const calculateUptime = () => {
      const now = new Date();
      const diff = now.getTime() - SITE_START_DATE.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setUptime({ days, hours, minutes });
    };

    calculateUptime();
    const timer = setInterval(calculateUptime, 60000); // 每分钟更新

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-3 rounded-lg border border-border bg-background hover:border-primary/25 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span className="text-xs font-medium text-muted-foreground">运行时间</span>
      </div>
      <div className="flex items-center justify-center gap-3">
        <div className="text-center">
          <div className="text-lg font-mono font-bold text-primary">{mounted ? uptime.days : '--'}</div>
          <div className="text-[10px] text-muted-foreground">天</div>
        </div>
        <span className="text-muted-foreground/50">:</span>
        <div className="text-center">
          <div className="text-lg font-mono font-bold text-primary">{mounted ? String(uptime.hours).padStart(2, '0') : '--'}</div>
          <div className="text-[10px] text-muted-foreground">时</div>
        </div>
        <span className="text-muted-foreground/50">:</span>
        <div className="text-center">
          <div className="text-lg font-mono font-bold text-primary">{mounted ? String(uptime.minutes).padStart(2, '0') : '--'}</div>
          <div className="text-[10px] text-muted-foreground">分</div>
        </div>
      </div>
    </div>
  );
}
