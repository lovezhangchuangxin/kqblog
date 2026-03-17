import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import { Post, PostMetadata, PostFrontmatter } from "@/types/post";

const CONTENT_DIR = path.join(process.cwd(), "content/posts");

// 验证 frontmatter schema
function validateFrontmatter(data: unknown): PostFrontmatter {
  if (typeof data !== "object" || data === null) {
    throw new Error("Invalid frontmatter: must be an object");
  }
  const fm = data as Record<string, unknown>;

  if (typeof fm.title !== "string" || fm.title.trim() === "") {
    throw new Error(
      "Invalid frontmatter: title is required and must be a non-empty string",
    );
  }
  if (typeof fm.description !== "string" || fm.description.trim() === "") {
    throw new Error(
      "Invalid frontmatter: description is required and must be a non-empty string",
    );
  }
  if (typeof fm.date !== "string") {
    throw new Error(
      "Invalid frontmatter: date is required and must be a string",
    );
  }
  // 验证日期格式 (ISO 8601)
  if (isNaN(Date.parse(fm.date))) {
    throw new Error(
      `Invalid frontmatter: date "${fm.date}" is not a valid date`,
    );
  }
  if (!Array.isArray(fm.tags)) {
    throw new Error(
      "Invalid frontmatter: tags is required and must be an array",
    );
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

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const posts: PostMetadata[] = [];

  for (const filename of files) {
    try {
      const slug = filename.replace(".mdx", "");
      const fileContent = fs.readFileSync(
        path.join(CONTENT_DIR, filename),
        "utf-8",
      );
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
    .filter((post) => !post.draft)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    ) as PostMetadata[];
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
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
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getPostsByTag(tag: string): PostMetadata[] {
  return getAllPosts().filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );
}

function calculateReadingTime(content: string): number {
  // 阅读速率配置
  const TEXT_WORDS_PER_MINUTE = 200; // 普通文本阅读速度
  const CODE_CHARS_PER_MINUTE = 250; // 代码阅读速度

  // 移除 frontmatter
  const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---/, "");

  // 提取代码块内容
  const codeBlocks: string[] = [];
  const contentWithoutCodeBlocks = contentWithoutFrontmatter.replace(
    /```[\s\S]*?```/g,
    (match) => {
      codeBlocks.push(match);
      return "";
    },
  );

  // 提取内联代码内容
  const inlineCodes: string[] = [];
  const plainContent = contentWithoutCodeBlocks.replace(/`[^`]*`/g, (match) => {
    inlineCodes.push(match);
    return "";
  });

  // 计算普通文本的词数（支持中英文混合）
  const textWords = countWords(plainContent);
  const textTime = textWords / TEXT_WORDS_PER_MINUTE;

  // 计算代码的阅读时间
  const codeContent = [...codeBlocks, ...inlineCodes].join(" ");
  const codeChars = codeContent.replace(/```|`/g, "").length;
  const codeTime = codeChars / CODE_CHARS_PER_MINUTE;

  // 总阅读时间（分钟）
  const totalMinutes = textTime + codeTime;
  return Math.max(1, Math.ceil(totalMinutes));
}

/**
 * 统计词数，支持中英文混合内容
 * 英文按空格分词，中文按字符数计算
 */
function countWords(text: string): number {
  // 移除 markdown 语法符号，保留链接文本
  const cleanText = text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "") // 移除图片
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // 保留链接文本
    .replace(/^#{1,6}\s+/gm, "") // 移除标题标记
    .replace(/[#*\[\]!]/g, "") // 移除其他 markdown 符号
    .replace(/\s+/g, " ")
    .trim();

  if (cleanText.length === 0) return 0;

  // 分离中英文
  const chineseChars = (cleanText.match(/[\u4e00-\u9fa5]/g) || []).length;
  const nonChineseText = cleanText.replace(/[\u4e00-\u9fa5]/g, " ");
  const englishWords = nonChineseText
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  // 中文字符直接计数，英文单词按词计数
  return chineseChars + englishWords;
}

function generateExcerpt(content: string, length = 160): string {
  const plainText = content
    .replace(/^---[\s\S]*?---/, "") // 移除 frontmatter
    .replace(/[#*`\[\]!]/g, "") // 移除 markdown 符号
    .replace(/\n+/g, " ") // 换行转空格
    .trim();
  return plainText.length > length
    ? plainText.substring(0, length) + "..."
    : plainText;
}
