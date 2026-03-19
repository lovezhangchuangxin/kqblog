import { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
}

interface LinkProps {
  href: string;
  children: ReactNode;
}

interface CodeProps {
  children: ReactNode;
  className?: string;
}

interface PreProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// 标题组件
export function h1({ children }: HeadingProps) {
  return (
    <h1 className="text-4xl font-bold mt-4 mb-4 text-foreground">{children}</h1>
  );
}

export function h2({ children }: HeadingProps) {
  return (
    <h2 className="text-3xl font-bold mt-8 mb-4 text-foreground border-b border-border pb-2">
      {children}
    </h2>
  );
}

export function h3({ children }: HeadingProps) {
  return (
    <h3 className="text-2xl font-semibold mt-6 mb-3 text-foreground">
      {children}
    </h3>
  );
}

export function h4({ children }: HeadingProps) {
  return (
    <h4 className="text-xl font-semibold mt-4 mb-2 text-foreground">
      {children}
    </h4>
  );
}

// 段落
export function p({ children }: HeadingProps) {
  return <p className="my-4 leading-7 text-foreground">{children}</p>;
}

// 链接
export function a({ href, children }: LinkProps) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      className="text-primary hover:underline underline-offset-2"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
      {isExternal && <span className="ml-1 text-xs">↗</span>}
    </a>
  );
}

// 代码块 - Shiki rehype 插件会传递 className 和 style
export function pre({ children, className, style }: PreProps) {
  return (
    <pre
      className={`${className || ""} my-4 overflow-x-auto rounded-lg border border-border/50`}
      style={style}
    >
      {children}
    </pre>
  );
}

// 内联代码
export function code({ children, className }: CodeProps) {
  const isInline = !className;
  if (isInline) {
    return (
      <code className="px-1.5 py-0.5 rounded bg-code-bg text-primary font-mono text-sm">
        {children}
      </code>
    );
  }
  return <code className={className}>{children}</code>;
}

// 列表
export function ul({ children }: HeadingProps) {
  return <ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>;
}

export function ol({ children }: HeadingProps) {
  return <ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>;
}

export function li({ children }: HeadingProps) {
  return <li className="leading-7">{children}</li>;
}

// 引用
export function blockquote({ children }: HeadingProps) {
  return (
    <blockquote className="my-4 pl-4 border-l-4 border-primary italic text-muted-foreground">
      {children}
    </blockquote>
  );
}

// 分隔线
export function hr() {
  return <hr className="my-8 border-border" />;
}

// 表格
export function table({ children }: HeadingProps) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse border border-border rounded-lg">
        {children}
      </table>
    </div>
  );
}

export function thead({ children }: HeadingProps) {
  return <thead className="bg-muted/50">{children}</thead>;
}

export function tbody({ children }: HeadingProps) {
  return <tbody className="divide-y divide-border">{children}</tbody>;
}

export function tr({ children }: HeadingProps) {
  return <tr className="border-b border-border">{children}</tr>;
}

export function th({ children }: HeadingProps) {
  return (
    <th className="px-4 py-3 text-left font-semibold text-foreground border border-border">
      {children}
    </th>
  );
}

export function td({ children }: HeadingProps) {
  return (
    <td className="px-4 py-3 text-foreground border border-border">
      {children}
    </td>
  );
}

// 图片
interface ImgProps {
  src: string;
  alt?: string;
}

export function img({ src, alt }: ImgProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt || ""}
      className="my-4 rounded-lg max-w-full h-auto"
    />
  );
}

// 导出所有组件的映射
export const MDXComponents = {
  h1,
  h2,
  h3,
  h4,
  p,
  a,
  pre,
  code,
  ul,
  ol,
  li,
  blockquote,
  hr,
  img,
  table,
  thead,
  tbody,
  tr,
  th,
  td,
};
