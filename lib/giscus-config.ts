import type { Theme } from '@giscus/react';

// Giscus 配置
export const giscusConfig = {
  // GitHub 仓库，格式：owner/repo
  repo: 'lovezhangchuangxin/kqblog' as const,
  // 仓库 ID
  repoId: 'R_kgDORpZyFQ' as const,
  // Discussion 分类
  category: 'Announcements' as const,
  // 分类 ID
  categoryId: 'DIC_kwDORpZyFc4C4pdv' as const,
  // 映射方式：pathname | url | title | og:title | specific | number
  mapping: 'title' as const,
  // 评论输入框上方显示的术语（使用 title 映射时，term 会是文章标题）
  term: '欢迎评论' as const,
  // 反应（表情）功能
  reactionsEnabled: true,
  // 元数据加载
  emitMetadata: false,
  // 评论框位置：top | bottom
  inputPosition: 'top' as const,
  // 语言
  lang: 'zh-CN' as const,
  // 加载方式：lazy | direct
  loading: 'lazy' as const,
  // 严格模式
  strict: '0' as const,
};

// 主题映射：将博客主题映射到 Giscus 主题
export const themeMap: Record<string, Theme> = {
  light: 'light',
  dark: 'dark',
  ocean: 'dark_dimmed',
  forest: 'dark_dimmed',
  shuanghua: 'light',
  zidian: 'dark',
  default: 'light',
};

// 获取 Giscus 主题
export function getGiscusTheme(blogTheme: string): Theme {
  return themeMap[blogTheme] || themeMap.default;
}

// 检查 Giscus 是否已配置
export function isGiscusConfigured(): boolean {
  // 配置已完成
  return true;
}
