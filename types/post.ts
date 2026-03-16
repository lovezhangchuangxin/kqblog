export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;           // ISO 8601 格式
  tags: string[];
  draft?: boolean;
  excerpt?: string;
  cover?: string;
  author?: string;
  readingTime?: number;   // 自动计算
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;        // MDX 源码
  excerpt: string;
  readingTime: number;
}

export interface PostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
  draft?: boolean;
}

// 用于页面渲染的完整文章数据
export interface PostPageData {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: number;
}
