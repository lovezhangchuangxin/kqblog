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
                 transition-all duration-200 ease-out
                 hover:border-primary/25 hover:shadow-md hover:shadow-primary/5
                 animate-fade-in-up"
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'backwards',
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* 内容 */}
      <div className="relative">
        <Link
          href={`/blog/${slug}`}
          className="block focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg -m-1 p-1"
        >
          <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2.5
                         group-hover:text-primary transition-colors duration-200
                         line-clamp-2 tracking-tight">
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
            <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
              <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                             bg-secondary/50 text-primary/80 rounded-full
                             hover:bg-primary/15 hover:text-primary
                             transition-colors duration-200
                             focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
