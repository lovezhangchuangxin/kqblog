import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/content';
import { generatePostMetadata, generateJsonLd } from '@/lib/metadata';
import { MDXRenderer } from '@/lib/mdx';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 生成静态参数
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 生成元数据
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: '文章未找到',
    };
  }

  return generatePostMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    slug: post.slug,
    date: post.frontmatter.date,
    cover: post.frontmatter.cover,
    tags: post.frontmatter.tags,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = generateJsonLd({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    date: post.frontmatter.date,
    slug: post.slug,
    cover: post.frontmatter.cover,
  });

  return (
    <>
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* 文章头部 */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {post.frontmatter.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {post.frontmatter.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={post.frontmatter.date}>
                {new Date(post.frontmatter.date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>·</span>
              <span>{post.readingTime} 分钟阅读</span>
            </div>
          </header>

          {/* 文章内容 */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <MDXRenderer content={post.content} />
          </div>

          {/* 标签 */}
          <footer className="mt-12 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <a
                  key={tag}
                  href={`/tag/${tag}`}
                  className="px-3 py-1 text-sm bg-secondary text-foreground rounded-full hover:bg-accent transition-colors"
                >
                  #{tag}
                </a>
              ))}
            </div>
          </footer>
        </div>
      </article>
    </>
  );
}
