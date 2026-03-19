import {
  generateHeatmapData,
  getHeatmapStats,
  type HeatmapWeek,
} from "@/lib/heatmap";
import { HeatmapCell } from "./HeatmapCell";

const MONTHS = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];
const DAYS = ["日", "一", "二", "三", "四", "五", "六"];

export function PostHeatmap() {
  const weeks: HeatmapWeek[] = generateHeatmapData(52);
  const stats = getHeatmapStats();

  // 计算月份标签位置
  const monthLabels: { month: string; index: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week: HeatmapWeek, weekIndex: number) => {
    const firstDay = week.days[0];
    if (firstDay) {
      const date = new Date(firstDay.date);
      const month = date.getMonth();
      if (month !== lastMonth) {
        monthLabels.push({ month: MONTHS[month], index: weekIndex });
        lastMonth = month;
      }
    }
  });

  return (
    <div className="p-5 rounded-xl border border-border bg-background">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">
              发布热力图
            </span>
            <div className="text-xs text-muted-foreground">
              {stats.activeDays} 天活跃 · 最多单日 {stats.maxPostsInDay} 篇
            </div>
          </div>
        </div>

        {/* 图例 */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>少</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-3 h-3 rounded-sm heatmap-level-${level}`}
            />
          ))}
          <span>多</span>
        </div>
      </div>

      {/* 月份标签 */}
      <div className="flex mb-1 ml-6 text-xs text-muted-foreground">
        {monthLabels.map(({ month, index }, i) => (
          <span
            key={`${month}-${i}`}
            className="absolute"
            style={{
              left: `calc(1.5rem + ${index * 12}px + 0.25rem)`,
            }}
          >
            {month}
          </span>
        ))}
      </div>

      {/* 热力图网格 */}
      <div className="flex gap-0.5 overflow-x-auto pb-2">
        {/* 星期标签 */}
        <div className="flex flex-col gap-0.5 mr-1 text-xs text-muted-foreground shrink-0">
          {DAYS.map((day, i) => (
            <div key={day} className="h-3 flex items-center">
              {i % 2 === 1 ? day : ""}
            </div>
          ))}
        </div>

        {/* 热力图格子 */}
        <div className="flex gap-0.5 relative">
          {weeks.map((week: HeatmapWeek, weekIndex: number) => (
            <div key={weekIndex} className="flex flex-col gap-0.5">
              {week.days.map((day, dayIndex: number) => (
                <HeatmapCell
                  key={`${weekIndex}-${dayIndex}`}
                  date={day.date}
                  count={day.count}
                  level={day.level}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
