import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于',
  description: '了解更多关于 KQ Blog 的信息',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">关于我</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground mb-6">
            你好！欢迎来到我的博客。
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">关于这个博客</h2>
          <p className="text-muted-foreground">
            这是一个基于 Next.js 16 和 Tailwind CSS v4 构建的个人博客。
            我在这里分享技术心得、生活感悟和学习笔记。
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">技术栈</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Next.js 16 (App Router)</li>
            <li>React 19</li>
            <li>Tailwind CSS v4</li>
            <li>MDX (Markdown + JSX)</li>
            <li>Shiki (代码高亮)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">联系方式</h2>
          <p className="text-muted-foreground">
            你可以通过以下方式联系我：
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>GitHub: github.com/yourusername</li>
            <li>Twitter: @yourusername</li>
            <li>Email: your@email.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
