import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeShiki from '@shikijs/rehype';
import { MDXComponents } from '@/components/blog/MDXComponents';

interface MDXProps {
  content: string;
}

/**
 * MDX 渲染器组件
 * 使用 @shikijs/rehype 进行代码高亮
 */
export async function MDXRenderer({ content }: MDXProps) {
  return (
    <MDXRemote
      source={content}
      components={MDXComponents}
      options={{
        mdxOptions: {
          rehypePlugins: [
            [rehypeShiki, {
              theme: 'github-dark',
              defaultLanguage: 'text',
            }],
          ],
        },
      }}
    />
  );
}
