import { getAllPosts, getAllTags } from './content';

/**
 * 获取文章总数
 */
export function getTotalPosts(): number {
  return getAllPosts().length;
}

/**
 * 获取标签总数
 */
export function getTotalTags(): number {
  return getAllTags().length;
}

/**
 * 计算所有文章的总阅读时间（分钟）
 */
export function getTotalReadingTime(): number {
  const posts = getAllPosts();
  return posts.reduce((total, post) => total + (post.readingTime || 0), 0);
}

/**
 * 获取站点统计数据
 */
export function getSiteStats() {
  const posts = getAllPosts();
  const totalPosts = posts.length;
  const totalTags = getAllTags().length;
  const totalReadingTime = posts.reduce((total, post) => total + (post.readingTime || 0), 0);

  // 获取最近发布的文章
  const latestPost = posts[0];

  // 计算本月发布的文章数
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const postsThisMonth = posts.filter(post => {
    const postDate = new Date(post.date);
    return postDate.getMonth() === currentMonth && postDate.getFullYear() === currentYear;
  }).length;

  return {
    totalPosts,
    totalTags,
    totalReadingTime,
    latestPost,
    postsThisMonth,
  };
}
