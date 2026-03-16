import Link from 'next/link';

interface PostCardProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  readingTime?: number;
  tags?: string[];
  index?: number;
}

export function PostCard({
  slug,
  title,
  description,
  date,
  readingTime,
  tags = [],
  index = 0,
}: PostCardProps) {
  // 计算交错延迟：使用更协调的递增，最大 320ms
  const delay = Math.min(index * 60, 320);

  return (
    <article
      className="group relative bg-background border border-border rounded-xl p-5 md:p-6
                 transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
                 hover:border-primary/35 hover:shadow-lg hover:shadow-primary/8
                 animate-fade-in-up"
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'backwards',
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* 装饰性渐变背景 - 柔和过渡 */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                   transition-opacity duration-400 pointer-events-none"
        style={{
          background: `radial-gradient(500px at 50% 0%, hsl(var(--primary) / 0.04), transparent 70%)`,
        }}
      />

      {/* 内容 */}
      <div className="relative">
        <Link href={`/blog/${slug}`}>
          <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2.5
                         group-hover:text-primary transition-colors duration-250
                         line-clamp-2">
            {title}
          </h2>
        </Link>

        {description && (
          <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed text-sm md:text-base">
            {description}
          </p>
        )}

        {/* 元信息 */}
        <div className="flex flex-wrap items-center gap-x-3 md:gap-x-4 gap-y-2 text-xs md:text-sm text-muted-foreground">
          <time
            dateTime={date}
            className="flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>
              {new Date(date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </time>

          {readingTime && (
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{readingTime} 分钟</span>
            </span>
          )}

          {/* 标签 */}
          {tags.length > 0 && (
            <div className="flex gap-1.5 ml-auto">
              {tags.slice(0, 2).map((tag) => (
                <Link
                  key={tag}
                  href={`/tag/${tag}`}
                  className="px-2 py-0.5 text-xs font-medium
                             bg-secondary/40 text-primary/70 rounded-full
                             hover:bg-primary/10 hover:text-primary
                             transition-colors duration-200"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 悬停时的微光边框 */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                    transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px hsl(var(--primary) / 0.12)`,
        }}
      />
    </article>
  );
}
