import { Metadata } from "next";
import { getAllPosts } from "@/lib/content";
import { PostCard } from "@/components/blog/PostCard";

export const metadata: Metadata = {
  title: "博客文章",
  description: "探索技术、生活与思考的记录",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-background">
      {/* 页面头部 */}
      <div className="relative py-12 px-4 overflow-hidden">
        {/* 装饰背景 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top, hsl(var(--primary) / 0.05), transparent 50%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto">
          <header className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              <span className="text-gradient">博客文章</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              探索技术、生活与思考的记录
            </p>
          </header>
        </div>
      </div>

      {/* 文章列表 */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        {posts.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div
              className="w-24 h-24 mx-auto mb-6 rounded-2xl
                            bg-linear-to-br from-primary/10 to-accent/10
                            flex items-center justify-center"
            >
              <svg
                className="w-12 h-12 text-primary/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              暂无文章
            </h3>
            <p className="text-muted-foreground">敬请期待更多精彩内容...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post, index) => (
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
