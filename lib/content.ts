import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import { Post, PostMetadata, PostFrontmatter } from '@/types/post';

const CONTENT_DIR = path.join(process.cwd(), 'content/posts');

// 验证 frontmatter schema
function validateFrontmatter(data: unknown): PostFrontmatter {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid frontmatter: must be an object');
  }
  const fm = data as Record<string, unknown>;

  if (typeof fm.title !== 'string' || fm.title.trim() === '') {
    throw new Error('Invalid frontmatter: title is required and must be a non-empty string');
  }
  if (typeof fm.description !== 'string' || fm.description.trim() === '') {
    throw new Error('Invalid frontmatter: description is required and must be a non-empty string');
  }
  if (typeof fm.date !== 'string') {
    throw new Error('Invalid frontmatter: date is required and must be a string');
  }
  // 验证日期格式 (ISO 8601)
  if (isNaN(Date.parse(fm.date))) {
    throw new Error(`Invalid frontmatter: date "${fm.date}" is not a valid date`);
  }
  if (!Array.isArray(fm.tags)) {
    throw new Error('Invalid frontmatter: tags is required and must be an array');
  }

  return {
    title: fm.title,
    description: fm.description,
    date: fm.date,
    tags: fm.tags as string[],
    draft: fm.draft as boolean | undefined,
    excerpt: fm.excerpt as string | undefined,
    cover: fm.cover as string | undefined,
    author: fm.author as string | undefined,
    readingTime: fm.readingTime as number | undefined,
  };
}

export function getAllPosts(): PostMetadata[] {
  // 确保目录存在
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));

  const posts: PostMetadata[] = [];

  for (const filename of files) {
    try {
      const slug = filename.replace('.mdx', '');
      const fileContent = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf-8');
      const { data } = matter(fileContent);
      const frontmatter = validateFrontmatter(data);

      posts.push({
        slug,
        title: frontmatter.title,
        description: frontmatter.description,
        date: frontmatter.date,
        tags: frontmatter.tags,
        readingTime: calculateReadingTime(fileContent),
        draft: frontmatter.draft,
      });
    } catch (error) {
      console.error(`Error parsing ${filename}:`, error);
    }
  }

  return posts
    .filter(post => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) as PostMetadata[];
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const frontmatter = validateFrontmatter(data);

    return {
      slug,
      frontmatter,
      content,
      excerpt: frontmatter.excerpt || generateExcerpt(content),
      readingTime: calculateReadingTime(content),
    };
  } catch (error) {
    console.error(`Error parsing post ${slug}:`, error);
    return null;
  }
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getPostsByTag(tag: string): PostMetadata[] {
  return getAllPosts().filter(post =>
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  // 移除 frontmatter 和代码块来计算
  const plainContent = content
    .replace(/^---[\s\S]*?---/, '') // 移除 frontmatter
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/`[^`]*`/g, '');       // 移除内联代码
  const words = plainContent.split(/\s+/).filter(w => w.length > 0).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function generateExcerpt(content: string, length = 160): string {
  const plainText = content
    .replace(/^---[\s\S]*?---/, '') // 移除 frontmatter
    .replace(/[#*`\[\]!]/g, '')     // 移除 markdown 符号
    .replace(/\n+/g, ' ')            // 换行转空格
    .trim();
  return plainText.length > length
    ? plainText.substring(0, length) + '...'
    : plainText;
}
