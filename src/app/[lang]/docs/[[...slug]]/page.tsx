import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { type Locale, LOCALES } from '@/lib/i18n';
import { getDocContent } from '@/lib/mdx';
import { DOC_NAVIGATION } from '@/lib/docs-data';
import { ChevronRight, ArrowLeft, ArrowRight, Bookmark, Hash } from 'lucide-react';
import { marked } from 'marked';

interface DocPageProps {
  params: Promise<{
    lang: string;
    slug?: string[];
  }>;
}

export function generateStaticParams() {
  const slugs = ['', 'installation', 'quick-start', 'workflow', 'import-export', 'faq'];
  const params: Array<{ lang: string; slug?: string[] }> = [];

  for (const lang of LOCALES) {
    for (const s of slugs) {
      if (!s) {
        params.push({ lang, slug: undefined });
      } else {
        params.push({ lang, slug: [s] });
      }
    }
  }
  return params;
}

export default async function DocPage({ params }: DocPageProps) {
  const { lang: rawLang, slug: slugArray = [] } = await params;
  const lang: Locale = rawLang === 'en' ? 'en' : 'zh';
  const currentSlug = slugArray.join('/');

  const doc = getDocContent(lang, slugArray);
  if (!doc) {
    notFound();
  }

  const allItems = (DOC_NAVIGATION[lang] || DOC_NAVIGATION.zh).flatMap((cat) => cat.items);
  const currentIndex = allItems.findIndex((it) => it.slug === currentSlug);
  const prevDoc = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextDoc = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start bg-canvas text-ink">
      {/* 中间正文 */}
      <article className="xl:col-span-9 min-w-0">
        {/* 面包屑 */}
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-6 font-mono">
          <Link href={`/${lang}/docs`} className="hover:text-ink transition">
            Docs
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-ink font-semibold">{doc.title}</span>
        </div>

        {/* 头部标题与描述 */}
        <div className="border-b border-hairline pb-8 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            {doc.title}
          </h1>
          {doc.description && (
            <p className="mt-3 text-base sm:text-lg text-neutral-600 leading-relaxed font-light">
              {doc.description}
            </p>
          )}
        </div>

        {/* 渲染正文 Markdown */}
        <div
          className="markdown-body max-w-none text-ink"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(doc.content) }}
        />

        {/* 上一篇 / 下一篇翻页卡片 */}
        <div className="mt-16 pt-8 border-t border-hairline grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevDoc ? (
            <Link
              href={prevDoc.slug ? `/${lang}/docs/${prevDoc.slug}` : `/${lang}/docs`}
              className="flex flex-col p-4 rounded-lg border border-hairline bg-canvas hover:border-black hover:bg-surface-soft transition group text-left"
            >
              <span className="text-[11px] font-mono text-neutral-500 flex items-center gap-1 group-hover:text-ink">
                <ArrowLeft className="h-3 w-3" />
                {lang === 'zh' ? '上一篇' : 'Previous'}
              </span>
              <span className="text-sm font-semibold text-ink mt-1">
                {prevDoc.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextDoc && (
            <Link
              href={nextDoc.slug ? `/${lang}/docs/${nextDoc.slug}` : `/${lang}/docs`}
              className="flex flex-col p-4 rounded-lg border border-hairline bg-canvas hover:border-black hover:bg-surface-soft transition group text-right sm:ml-auto w-full"
            >
              <span className="text-[11px] font-mono text-neutral-500 flex items-center justify-end gap-1 group-hover:text-ink">
                {lang === 'zh' ? '下一篇' : 'Next'}
                <ArrowRight className="h-3 w-3" />
              </span>
              <span className="text-sm font-semibold text-ink mt-1">
                {nextDoc.title}
              </span>
            </Link>
          )}
        </div>
      </article>

      {/* 右侧 TOC 页面目录导航 */}
      {doc.toc.length > 0 && (
        <aside className="hidden xl:block xl:col-span-3 sticky top-24 space-y-4 border-l border-hairline pl-6 text-xs">
          <div className="flex items-center gap-2 font-mono uppercase tracking-wider text-neutral-400 font-bold">
            <Bookmark className="h-3.5 w-3.5 text-ink" />
            <span>{lang === 'zh' ? '本页导读' : 'On this page'}</span>
          </div>
          <ul className="space-y-2">
            {doc.toc.map((item) => (
              <li
                key={item.id}
                style={{ paddingLeft: item.level === 3 ? '0.75rem' : '0' }}
              >
                <a
                  href={`#${item.id}`}
                  className="text-neutral-600 hover:text-ink hover:underline transition block py-0.5 line-clamp-1 font-light"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}

// 借助 marked 高精度解析 Markdown，完整支持 **加粗**、链接、行内代码、列表、表格与提示块
function renderMarkdown(content: string): string {
  const renderer = new marked.Renderer();

  renderer.heading = ({ text, depth }) => {
    const id = text
      .toLowerCase()
      .replace(/<[^>]+>/g, '')
      .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return `<h${depth} id="${id}"><a href="#${id}">${text}</a></h${depth}>\n`;
  };

  renderer.blockquote = ({ text }) => {
    if (text.includes('[!NOTE]')) {
      const clean = text.replace(/\[!NOTE\]\s*/g, '');
      return `<blockquote class="callout-note"><strong>注意 (Note):</strong><br/>${clean}</blockquote>`;
    }
    if (text.includes('[!TIP]')) {
      const clean = text.replace(/\[!TIP\]\s*/g, '');
      return `<blockquote class="callout-tip"><strong>提示 (Tip):</strong><br/>${clean}</blockquote>`;
    }
    if (text.includes('[!WARNING]')) {
      const clean = text.replace(/\[!WARNING\]\s*/g, '');
      return `<blockquote class="callout-warning"><strong>警告 (Warning):</strong><br/>${clean}</blockquote>`;
    }
    return `<blockquote>${text}</blockquote>`;
  };

  return marked.parse(content, { renderer, gfm: true, breaks: false }) as string;
}
