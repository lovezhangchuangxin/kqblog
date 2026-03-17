'use client';

import { useState, useEffect } from 'react';

// 网站起始日期 - 可根据实际情况修改
const SITE_START_DATE = new Date('2025-01-01');

export function SiteUptime() {
  const [mounted, setMounted] = useState(false);
  const [uptime, setUptime] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    setMounted(true);

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
    <div className="p-5 rounded-xl border border-border bg-background hover:border-primary/25 transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span className="text-sm font-medium text-muted-foreground">运行时间</span>
      </div>

      <div className="flex items-center gap-2 text-lg">
        <span className="font-semibold text-foreground">已运行</span>
        <div className="flex items-center gap-1">
          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono font-bold">
            {mounted ? uptime.days : '--'}
          </span>
          <span className="text-muted-foreground text-sm">天</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono font-bold">
            {mounted ? uptime.hours : '--'}
          </span>
          <span className="text-muted-foreground text-sm">时</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono font-bold">
            {mounted ? uptime.minutes : '--'}
          </span>
          <span className="text-muted-foreground text-sm">分</span>
        </div>
      </div>
    </div>
  );
}
