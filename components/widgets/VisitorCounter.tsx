'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'kqblog_visitor';
const TODAY_KEY = 'kqblog_visitor_date';

// 用于检测客户端挂载状态
const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function VisitorCounter() {
  const mounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
  const [totalVisits, setTotalVisits] = useState(0);
  const [todayVisits, setTodayVisits] = useState(0);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem(TODAY_KEY);
    let total = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    let todayCount = 0;

    if (storedDate === today) {
      // 同一天，增加今日访问
      todayCount = parseInt(localStorage.getItem(`${STORAGE_KEY}_today`) || '0', 10) + 1;
    } else {
      // 新的一天，重置今日计数
      todayCount = 1;
      localStorage.setItem(TODAY_KEY, today);
    }

    total += 1;

    localStorage.setItem(STORAGE_KEY, String(total));
    localStorage.setItem(`${STORAGE_KEY}_today`, String(todayCount));

    // 动画效果 - 使用 queueMicrotask 避免同步 setState
    queueMicrotask(() => {
      setAnimated(false);
      setTimeout(() => {
        setTotalVisits(total);
        setTodayVisits(todayCount);
        setAnimated(true);
      }, 100);
    });
  }, []);

  return (
    <div className="p-4 rounded-xl border border-border bg-background hover:border-primary/20 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span className="text-xs font-medium text-muted-foreground">访客统计</span>
        </div>
        <div className="flex items-center gap-4 text-right">
          <div>
            <div
              className={`text-lg font-bold text-primary tabular-nums transition-all duration-500 ${
                animated && mounted ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {mounted ? totalVisits.toLocaleString() : '---'}
            </div>
            <div className="text-[10px] text-muted-foreground">累计</div>
          </div>
          <div className="w-px h-8 bg-border/60" aria-hidden="true" />
          <div>
            <div
              className={`text-lg font-bold text-accent tabular-nums transition-all duration-500 ${
                animated && mounted ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {mounted ? todayVisits : '--'}
            </div>
            <div className="text-[10px] text-muted-foreground">今日</div>
          </div>
        </div>
      </div>
    </div>
  );
}
