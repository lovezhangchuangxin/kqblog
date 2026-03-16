import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import { generateSiteMetadata } from '@/lib/metadata';
import { PostCard } from '@/components/blog/PostCard';

export const metadata: Metadata = generateSiteMetadata();

export default function HomePage() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 px-4 overflow-hidden">
        {/* 装饰背景 - 原神风格几何图形 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* 主渐变光晕 */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] md:w-[900px] md:h-[450px]
                       opacity-40 blur-3xl animate-fade-in"
            style={{
              background: `radial-gradient(ellipse at center, hsl(var(--primary) / 0.25), transparent 60%)`,
              animationDuration: '1s',
            }}
          />
          {/* 装饰圆环 - 更慢更柔和 */}
          <div
            className="absolute top-16 right-8 md:right-16 w-48 h-48 md:w-72 md:h-72 rounded-full
                       border border-primary/8 animate-spin-slow"
          />
          <div
            className="absolute bottom-8 left-8 md:left-16 w-32 h-32 md:w-56 md:h-56 rounded-full
                       border border-accent/8 animate-spin-slow"
            style={{ animationDirection: 'reverse', animationDuration: '30s' }}
          />
          {/* 装饰菱形 */}
          <div
            className="hidden md:block absolute top-32 left-24 w-16 h-16 rotate-45
                       border border-primary/5 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* 主标题 */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5
                       animate-fade-in-up"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards, gradient-flow 10s ease infinite',
              animationFillMode: 'backwards',
            }}
          >
            欢迎来到 KQ Blog
          </h1>

          {/* 副标题 */}
          <p
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto
                       animate-fade-in-up leading-relaxed"
            style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}
          >
            探索技术、分享思考、记录生活
          </p>

          {/* CTA 按钮 */}
          <div
            className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}
          >
            <Link
              href="/blog"
              className="group relative px-8 py-3.5 rounded-xl font-medium
                         overflow-hidden transition-all duration-300
                         hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5
                         active:translate-y-0"
            >
              {/* 按钮背景 */}
              <span
                className="absolute inset-0 bg-gradient-to-r from-primary to-accent
                           opacity-100 group-hover:opacity-90 transition-opacity duration-300"
              />
              <span className="relative text-white flex items-center justify-center gap-2">
                浏览文章
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>

            <Link
              href="/about"
              className="px-8 py-3.5 rounded-xl font-medium
                         border-2 border-primary/25 text-primary
                         hover:border-primary/50 hover:bg-primary/5
                         transition-all duration-300 hover:-translate-y-0.5
                         active:translate-y-0"
            >
              了解更多
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2
              className="text-2xl md:text-3xl font-bold text-foreground animate-fade-in-up"
              style={{ animationFillMode: 'backwards' }}
            >
              <span className="text-gradient">最新文章</span>
            </h2>
            {posts.length > 5 && (
              <Link
                href="/blog"
                className="group flex items-center gap-2 text-primary font-medium
                           animate-fade-in-up hover:text-primary-glow
                           transition-colors duration-200"
                style={{ animationDelay: '80ms', animationFillMode: 'backwards' }}
              >
                查看全部
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            )}
          </div>

          <div className="space-y-5">
            {recentPosts.length === 0 ? (
              <div
                className="text-center py-16 text-muted-foreground animate-fade-in"
                style={{ animationDelay: '100ms' }}
              >
                <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-secondary/50 flex items-center justify-center">
                  <svg className="w-10 h-10 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <p className="text-lg">暂无文章，敬请期待...</p>
              </div>
            ) : (
              recentPosts.map((post, index) => (
                <PostCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  readingTime={post.readingTime}
                  tags={post.tags}
                  index={index}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-xl md:text-2xl font-bold text-foreground mb-8 text-center animate-fade-in-up"
            style={{ animationFillMode: 'backwards' }}
          >
            快速导航
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                href: '/about',
                title: '关于我',
                description: '了解更多',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ),
              },
              {
                href: '/links',
                title: '友情链接',
                description: '优质博客推荐',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                ),
              },
              {
                href: '/rss.xml',
                title: 'RSS 订阅',
                description: '订阅更新',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative p-5 md:p-6 rounded-xl border border-border
                           bg-background hover:border-primary/25
                           transition-all duration-300 ease-out
                           hover:-translate-y-1 hover:shadow-md hover:shadow-primary/5
                           animate-fade-in-up text-center overflow-hidden"
                style={{
                  animationDelay: `${(index + 1) * 80}ms`,
                  animationFillMode: 'backwards'
                }}
              >
                {/* 悬停光效 */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100
                             transition-opacity duration-400 pointer-events-none"
                  style={{
                    background: 'radial-gradient(300px at 50% 50%, hsl(var(--primary) / 0.04), transparent 70%)',
                  }}
                />

                <div className="relative">
                  <div
                    className="w-11 h-11 mx-auto mb-3.5 rounded-xl
                               bg-gradient-to-br from-primary/8 to-accent/8
                               flex items-center justify-center text-primary
                               group-hover:scale-105 transition-transform duration-300"
                  >
                    {item.icon}
                  </div>

                  <h3 className="text-base font-semibold text-foreground mb-1
                                 group-hover:text-primary transition-colors duration-250">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
