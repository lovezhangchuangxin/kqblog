import type { Theme } from '@giscus/react';

// Giscus 配置
// 请将以下值替换为您的 GitHub 仓库信息
export const giscusConfig = {
  // GitHub 仓库，格式：owner/repo
  repo: 'your-username/your-blog-repo' as const,
  // 仓库 ID（从 giscus.app 获取）
  repoId: '' as const,
  // Discussion 分类
  category: 'Announcements' as const,
  // 分类 ID（从 giscus.app 获取）
  categoryId: '' as const,
  // 映射方式：pathname | url | title | og:title | specific | number
  mapping: 'pathname' as const,
  // 评论输入框上方显示的术语
  term: '欢迎评论' as const,
  // 反应（表情）功能
  reactionsEnabled: true,
  // 元数据加载
  emitMetadata: true,
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
  return (
    giscusConfig.repo !== 'your-username/your-blog-repo' &&
    giscusConfig.repoId !== '' &&
    giscusConfig.categoryId !== ''
  );
}
