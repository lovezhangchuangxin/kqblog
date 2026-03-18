/**
 * 网站核心配置
 * 集中管理站点 URL、名称等常量，避免重复定义
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kqblog.dev";
export const SITE_NAME = "KQ Blog";
export const SITE_DESCRIPTION = "一个基于 Next.js 构建的个人博客，分享技术、生活与思考";
export const DEFAULT_OG_IMAGE = "/images/og-default.png";

export const SITE_CONFIG = {
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  defaultOgImage: DEFAULT_OG_IMAGE,
} as const;
