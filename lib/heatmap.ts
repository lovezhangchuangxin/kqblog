import { getAllPosts } from './content';

export interface HeatmapDay {
  date: string;
  count: number;
  level: number; // 0-4
}

export interface HeatmapWeek {
  days: HeatmapDay[];
}

/**
 * 获取最近 n 周的日期范围
 */
export function getWeekDates(weeks: number = 52): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 从今天往前推 weeks * 7 天
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - weeks * 7);

  // 调整到周日开始
  const dayOfWeek = startDate.getDay();
  startDate.setDate(startDate.getDate() - dayOfWeek);

  for (let i = 0; i < weeks * 7; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates.push(date);
  }

  return dates;
}

/**
 * 根据文章数量计算活跃度等级 (0-4)
 */
export function getActivityLevel(count: number): number {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  if (count === 3) return 3;
  return 4;
}

/**
 * 格式化日期为 YYYY-MM-DD
 */
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 生成热力图数据
 */
export function generateHeatmapData(weeks: number = 52): HeatmapWeek[] {
  const posts = getAllPosts();
  const dates = getWeekDates(weeks);

  // 统计每天的文章数量
  const postCounts: Record<string, number> = {};

  posts.forEach(post => {
    const postDate = post.date.split('T')[0]; // 取日期部分
    postCounts[postDate] = (postCounts[postDate] || 0) + 1;
  });

  // 按周组织数据
  const weeksData: HeatmapWeek[] = [];
  for (let i = 0; i < dates.length; i += 7) {
    const weekDays: HeatmapDay[] = [];
    for (let j = 0; j < 7 && i + j < dates.length; j++) {
      const date = dates[i + j];
      const dateStr = formatDate(date);
      const count = postCounts[dateStr] || 0;
      weekDays.push({
        date: dateStr,
        count,
        level: getActivityLevel(count),
      });
    }
    weeksData.push({ days: weekDays });
  }

  return weeksData;
}

/**
 * 获取热力图统计信息
 */
export function getHeatmapStats() {
  const posts = getAllPosts();
  const heatmapData = generateHeatmapData(52);

  // 计算活跃天数
  let activeDays = 0;
  let maxPostsInDay = 0;

  heatmapData.forEach(week => {
    week.days.forEach(day => {
      if (day.count > 0) {
        activeDays++;
        maxPostsInDay = Math.max(maxPostsInDay, day.count);
      }
    });
  });

  return {
    totalPosts: posts.length,
    activeDays,
    maxPostsInDay,
    periodWeeks: 52,
  };
}
