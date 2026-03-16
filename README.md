# KQ Blog

一个基于 Next.js 16 构建的个人博客，支持 MDX 内容、多主题切换、SEO 优化。

## 技术栈

- **框架**: Next.js 16 (App Router)
- **样式**: Tailwind CSS v4
- **内容**: MDX + gray-matter
- **代码高亮**: Shiki
- **主题**: next-themes

## 功能特性

- 📝 MDX 博客文章编写
- 🎨 4 种颜色主题 (浅色/深色/海洋/森林)
- 🔍 SEO 优化 (sitemap, robots.txt, RSS, JSON-LD)
- 📱 响应式设计
- ⚡ 静态生成 (SSG)

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint
```

## 目录结构

```
├── app/                    # Next.js App Router
│   ├── (blog)/            # 博客路由组
│   │   ├── blog/          # 文章列表和详情
│   │   ├── tag/           # 标签分类
│   │   ├── about/         # 关于页面
│   │   └── links/         # 友链页面
│   ├── rss.xml/           # RSS 订阅
│   ├── sitemap.ts         # 站点地图
│   └── robots.ts          # 爬虫规则
├── components/            # React 组件
│   ├── layout/            # 布局组件
│   └── blog/              # 博客组件
├── content/posts/         # MDX 博客文章
├── lib/                   # 工具函数
└── types/                 # TypeScript 类型
```

## 写文章

在 `content/posts/` 目录下创建 `.mdx` 文件：

```mdx
---
title: 文章标题
description: 文章描述
date: "2026-03-16"
tags: [标签1, 标签2]
draft: false
---

文章内容...
```

### Frontmatter 字段

| 字段 | 必填 | 说明 |
|------|------|------|
| title | ✅ | 文章标题 |
| description | ✅ | 文章描述 |
| date | ✅ | 发布日期 (ISO 8601) |
| tags | ✅ | 标签数组 |
| draft | ❌ | 是否为草稿 |
| cover | ❌ | 封面图片 |
| author | ❌ | 作者 |

## 部署

推荐使用 [Vercel](https://vercel.com) 部署：

```bash
vercel deploy
```

## 许可证

MIT
