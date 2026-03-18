import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-muted-foreground/20">404</h1>
        <h2 className="text-2xl font-semibold mt-4 mb-2">页面未找到</h2>
        <p className="text-muted-foreground mb-8">
          抱歉，您访问的页面不存在或已被移除
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            返回首页
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            浏览文章
          </Link>
        </div>
      </div>
    </div>
  );
}
