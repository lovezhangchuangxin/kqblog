import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import { generateSiteMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateSiteMetadata();

export default function HomePage() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            欢迎来到 KQ Blog
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            探索技术、分享思考、记录生活
          </p>
          <Link
            href="/blog"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            浏览文章
          </Link>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-12 px-4 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            最新文章
          </h2>
          <div className="space-y-6">
            {recentPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-background border border-border rounded-lg p-6 hover:border-primary transition-colors"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-semibold text-foreground mb-2 hover:text-primary">
                    {post.title}
                  </h3>
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
                </div>
              </article>
            ))}
          </div>
          {posts.length > 5 && (
            <div className="text-center mt-8">
              <Link
                href="/blog"
                className="text-primary hover:underline"
              >
                查看更多文章 →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/about"
              className="p-6 border border-border rounded-lg hover:border-primary transition-colors text-center"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">关于我</h3>
              <p className="text-muted-foreground text-sm">了解更多</p>
            </Link>
            <Link
              href="/links"
              className="p-6 border border-border rounded-lg hover:border-primary transition-colors text-center"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">友情链接</h3>
              <p className="text-muted-foreground text-sm">优质博客推荐</p>
            </Link>
            <Link
              href="/rss.xml"
              className="p-6 border border-border rounded-lg hover:border-primary transition-colors text-center"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">RSS 订阅</h3>
              <p className="text-muted-foreground text-sm">订阅更新</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
