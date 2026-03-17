import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/content";
import { generatePostMetadata, generateJsonLd } from "@/lib/metadata";
import { MDXRenderer } from "@/lib/mdx";
import { Comments } from "@/components/blog/Comments";

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
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "文章未找到",
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
        {/* 文章头部 */}
        <header className="relative py-8 px-4 overflow-hidden">
          {/* 装饰背景 */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at top left, hsl(var(--primary) / 0.08), transparent 50%),
                radial-gradient(ellipse at bottom right, hsl(var(--accent) / 0.05), transparent 50%)
              `,
            }}
          />

          <div className="relative max-w-3xl mx-auto">
            {/* 返回链接 */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground
                         hover:text-primary transition-colors duration-200 mb-5
                         animate-fade-in-up"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              返回文章列表
            </Link>

            {/* 标题 */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4
                         leading-tight animate-fade-in-up animate-delay-100"
            >
              <span className="text-gradient">{post.frontmatter.title}</span>
            </h1>

            {/* 描述 */}
            <p className="text-lg text-muted-foreground mb-5 animate-fade-in-up animate-delay-200">
              {post.frontmatter.description}
            </p>

            {/* 元信息 */}
            <div
              className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground
                         animate-fade-in-up animate-delay-300"
            >
              <time
                dateTime={post.frontmatter.date}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                           bg-secondary/50"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {new Date(post.frontmatter.date).toLocaleDateString("zh-CN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>

              <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {post.readingTime} 分钟阅读
              </span>
            </div>
          </div>
        </header>

        {/* 文章内容 */}
        <div className="max-w-3xl mx-auto pb-16">
          <div
            className="prose prose-neutral dark:prose-invert max-w-none
                       prose-headings:text-gradient prose-headings:font-bold
                       prose-a:text-primary prose-a:no-underline
                       hover:prose-a:text-primary-glow
                       prose-code:text-primary prose-code:bg-secondary/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                       prose-pre:bg-code-bg prose-pre:border prose-pre:border-border
                       prose-img:rounded-xl prose-img:shadow-lg
                       animate-fade-in-up animate-delay-400"
          >
            <MDXRenderer content={post.content} />
          </div>

          {/* 评论系统 */}
          <div className="animate-fade-in-up animate-delay-500">
            <Comments slug={post.slug} />
          </div>

          {/* 标签 */}
          <footer className="mt-12 pt-8 border-t border-border animate-fade-in-up animate-delay-500">
            <div className="flex flex-wrap gap-3">
              {post.frontmatter.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tag/${tag}`}
                  className="group px-4 py-2 text-sm font-medium
                             bg-secondary/50 text-foreground rounded-lg
                             border border-border/50 hover:border-primary/30
                             hover:bg-primary/5 hover:text-primary
                             transition-all duration-200"
                >
                  <span className="text-primary mr-1">#</span>
                  {tag}
                </Link>
              ))}
            </div>
          </footer>
        </div>
      </article>
    </>
  );
}
