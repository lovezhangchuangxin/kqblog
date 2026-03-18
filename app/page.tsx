import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import { generateSiteMetadata } from '@/lib/metadata';
import { PostCard } from '@/components/blog/PostCard';
import { QuickStats } from '@/components/widgets/QuickStats';
import { DateTimeWidget } from '@/components/widgets/DateTimeWidget';
import { SiteUptime } from '@/components/widgets/SiteUptime';
import { VisitorCounter } from '@/components/widgets/VisitorCounter';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = generateSiteMetadata();

export default function HomePage() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <div className="mx-4 md:mx-8 lg:mx-12 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* 左侧边栏 - 小组件 */}
            <aside className="w-full lg:w-72 shrink-0 space-y-4">
              <QuickStats />
              <DateTimeWidget />
              <SiteUptime />
              <VisitorCounter />
            </aside>

            {/* 中间主区域 - 最新文章 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-foreground">
                  <span className="text-gradient">最新文章</span>
                </h2>
                {posts.length > 4 && (
                  <Link
                    href="/blog"
                    className="group flex items-center gap-1.5 text-primary text-sm font-medium
                               hover:text-primary-glow transition-colors duration-200"
                  >
                    查看全部
                    <svg
                      className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                )}
              </div>

              <div className="space-y-3">
                {recentPosts.length === 0 ? (
                  <div className="text-center py-16 text-muted-foreground">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-secondary/50 flex items-center justify-center">
                      <svg className="w-8 h-8 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <p>暂无文章，敬请期待...</p>
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
