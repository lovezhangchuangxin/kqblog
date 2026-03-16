import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import { generateSiteMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateSiteMetadata();

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">博客文章</h1>
          <p className="text-lg text-muted-foreground">
            探索技术、生活与思考的记录
          </p>
        </header>

        <div className="space-y-8">
          {posts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              暂无文章
            </div>
          ) : (
            posts.map((post) => (
              <article
                key={post.slug}
                className="border border-border rounded-lg p-6 hover:border-primary transition-colors"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-semibold text-foreground mb-2 hover:text-primary">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span>·</span>
                  <span>{post.readingTime} 分钟阅读</span>
                  <span>·</span>
                  <div className="flex gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Link
                        key={tag}
                        href={`/tag/${tag}`}
                        className="text-primary hover:underline"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
