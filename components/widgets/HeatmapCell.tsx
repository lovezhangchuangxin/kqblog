'use client';

import { useState } from 'react';

interface HeatmapCellProps {
  date: string;
  count: number;
  level: number;
}

export function HeatmapCell({ date, count, level }: HeatmapCellProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className={`w-2.5 h-2.5 rounded-sm cursor-pointer transition-all duration-200 hover:ring-1 hover:ring-primary/50 heatmap-level-${level}`}
      />

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-foreground text-background text-xs whitespace-nowrap z-10 shadow-lg">
          <div className="font-medium">{formatDate(date)}</div>
          <div>{count > 0 ? `${count} 篇文章` : '无文章'}</div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
        </div>
      )}
    </div>
  );
}
