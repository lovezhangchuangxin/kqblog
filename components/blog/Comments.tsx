'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { getGiscusTheme, giscusConfig, isGiscusConfigured } from '@/lib/giscus-config';

interface CommentsProps {
  /** 文章路径，用于映射到 Discussion */
  slug?: string;
}

export function Comments({ slug }: CommentsProps) {
  const { theme } = useTheme();

  // 未配置时显示提示信息
  if (!isGiscusConfigured()) {
    return (
      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-foreground mb-6">
          评论
        </h2>
        <div className="p-6 rounded-lg bg-secondary/50 text-muted-foreground text-center">
          <p>评论系统尚未配置</p>
          <p className="text-sm mt-2">
            请在 <code className="px-1.5 py-0.5 bg-secondary rounded">lib/giscus-config.ts</code> 中配置 Giscus 参数
          </p>
          <a
            href="https://giscus.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm text-primary hover:underline"
          >
            前往 giscus.app 获取配置 →
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="text-xl font-bold text-foreground mb-6">
        评论
      </h2>
      <Giscus
        id="comments"
        repo={giscusConfig.repo}
        repoId={giscusConfig.repoId}
        category={giscusConfig.category}
        categoryId={giscusConfig.categoryId}
        mapping={giscusConfig.mapping}
        term={slug || giscusConfig.term}
        reactionsEnabled={giscusConfig.reactionsEnabled ? '1' : '0'}
        emitMetadata={giscusConfig.emitMetadata ? '1' : '0'}
        inputPosition={giscusConfig.inputPosition}
        theme={getGiscusTheme(theme || 'light')}
        lang={giscusConfig.lang}
        loading={giscusConfig.loading}
        strict={giscusConfig.strict}
      />
    </section>
  );
}
