# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

This project uses **pnpm**. Always prefer pnpm over npm/yarn.

```bash
pnpm add <package>      # Add dependency
pnpm add -D <package>   # Add dev dependency
pnpm install            # Install all dependencies
```

## Commands

```bash
pnpm dev        # Start development server (localhost:3000)
pnpm build      # Build for production (SSG)
pnpm start      # Start production server
pnpm lint       # Run ESLint
pnpm tsc --noEmit  # Type check without emitting
```

## Architecture

This is a **Next.js 16** personal blog using **App Router** with **Tailwind CSS v4** and **MDX** for content.

### Key Directories

- `app/` - Next.js App Router pages
  - `(blog)/` - Route group for blog pages (uses shared layout with Header/Footer)
  - `rss.xml/` - RSS feed endpoint
- `content/posts/` - MDX blog posts (frontmatter required: title, description, date, tags)
- `lib/` - Core utilities
  - `content.ts` - MDX parsing with gray-matter, frontmatter validation
  - `mdx.tsx` - MDX renderer with Shiki code highlighting
  - `metadata.ts` - SEO metadata generation (OpenGraph, JSON-LD)
- `components/`
  - `layout/` - Header, Footer, ThemeProvider, ThemeSwitcher
  - `blog/` - MDXComponents for custom markdown rendering
- `types/` - TypeScript interfaces (PostFrontmatter, Post, PostMetadata)

### Theme System

- Uses `next-themes` with `data-theme` attribute
- 4 themes: light, dark, ocean, forest
- CSS variables defined in `app/globals.css` using HSL format
- **Important**: `<html>` tag in `app/layout.tsx` requires `suppressHydrationWarning`

### Content Management

- Blog posts are MDX files in `content/posts/`
- Frontmatter validated by `validateFrontmatter()` in `lib/content.ts`
- Required fields: `title`, `description`, `date` (ISO 8601), `tags` (array)
- Optional: `draft`, `cover`, `author`, `excerpt`
- Draft posts (`draft: true`) are filtered from public pages

### Styling

- Tailwind CSS v4 with `@theme inline` syntax (not `@theme`)
- CSS variables use HSL values without units: `--background: 0 0% 100%`
- Apply with `hsl(var(--background))` or use Tailwind color classes

### Static Generation

- All pages are statically generated at build time
- Blog posts use `generateStaticParams()` for pre-rendering
- Build output includes sitemap.xml, robots.txt, and RSS feed
