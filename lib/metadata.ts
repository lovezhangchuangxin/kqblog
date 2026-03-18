import { Metadata } from 'next';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, DEFAULT_OG_IMAGE } from './config';

interface PostMetadataInput {
  title: string;
  description: string;
  slug: string;
  date: string;
  cover?: string;
  author?: string;
  tags?: string[];
}

/**
 * 生成文章页面的元数据
 * 注意：date 参数用于 publishedTime，而非当前时间
 */
export function generatePostMetadata(input: PostMetadataInput): Metadata {
  const { title, description, slug, date, cover, author } = input;
  const url = `${SITE_URL}/blog/${slug}`;
  const ogImage = cover ? `${SITE_URL}${cover}` : `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: 'article',
      publishedTime: date, // 使用文章实际发布日期
      authors: [author || 'KQ'],
      tags: input.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

interface JsonLdInput {
  title: string;
  description: string;
  date: string;
  slug: string;
  author?: string;
  cover?: string;
  modifiedDate?: string;
}

/**
 * 生成文章的结构化数据 (JSON-LD)
 */
export function generateJsonLd(input: JsonLdInput) {
  const { title, description, date, slug, author, cover, modifiedDate } = input;
  const url = `${SITE_URL}/blog/${slug}`;
  const imageUrl = cover ? `${SITE_URL}${cover}` : `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: date,
    dateModified: modifiedDate || date,
    author: {
      '@type': 'Person',
      name: author || 'KQ',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.svg`,
      },
    },
    image: imageUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return jsonLd;
}

/**
 * 生成网站的结构化数据 (JSON-LD)
 */
export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.svg`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * 生成面包屑的结构化数据 (JSON-LD)
 */
export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * 生成网站的基本元数据
 */
export function generateSiteMetadata(): Metadata {
  return {
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      siteName: SITE_NAME,
      type: 'website',
      locale: 'zh_CN',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * 生成标签页面的元数据
 */
export function generateTagMetadata(tag: string): Metadata {
  return {
    title: `标签: ${tag}`,
    description: `查看所有标签为 "${tag}" 的文章`,
  };
}
