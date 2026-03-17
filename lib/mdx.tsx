import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeShiki from '@shikijs/rehype';
import remarkGfm from 'remark-gfm';
import { MDXComponents } from '@/components/blog/MDXComponents';

interface MDXProps {
  content: string;
}

/**
 * MDX 渲染器组件
 * 使用 @shikijs/rehype 进行代码高亮
 * 支持双主题：浅色用 github-light，深色用 github-dark
 * RSC 版本的 MDXRemote 是 async 组件
 */
export async function MDXRenderer({ content }: MDXProps) {
  return (
    <MDXRemote
      source={content}
      components={MDXComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [rehypeShiki, {
              themes: {
                light: 'github-light',
                dark: 'github-dark',
              },
              defaultLanguage: 'text',
            }],
          ],
        },
      }}
    />
  );
}
