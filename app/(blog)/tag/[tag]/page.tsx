import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllTags, getPostsByTag } from '@/lib/content';
import { generateTagMetadata } from '@/lib/metadata';

interface PageProps {
  params: Promise<{
    tag: string;
  }>;
}

// 生成静态参数
export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

// 生成元数据
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  return generateTagMetadata(decodeURIComponent(tag));
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            标签: {decodedTag}
          </h1>
          <p className="text-lg text-muted-foreground">
            共 {posts.length} 篇文章
          </p>
        </header>

        <div className="space-y-8">
          {posts.map((post) => (
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
