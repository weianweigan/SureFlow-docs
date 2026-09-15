import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { type Locale, LOCALES } from '@/lib/i18n';
import { getDocContent } from '@/lib/mdx';
import { DOC_NAVIGATION } from '@/lib/docs-data';
import { ChevronRight, ArrowLeft, ArrowRight, Bookmark, Hash } from 'lucide-react';

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
        <div className="max-w-none text-ink">
          <MarkdownRenderer content={doc.content} />
        </div>

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

// 渲染 Markdown 文本
function MarkdownRenderer({ content }: { content: string }) {
  const blocks = content.split('\n\n');

  return (
    <div className="space-y-5">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // 标题 H2
        if (trimmed.startsWith('## ')) {
          const text = trimmed.replace(/^##\s+/, '');
          const id = text
            .toLowerCase()
            .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
            .replace(/^-+|-+$/g, '');
          return (
            <h2 key={idx} id={id} className="text-2xl font-bold text-ink pt-8 pb-2 border-b border-hairline flex items-center gap-2 group">
              <a href={`#${id}`} className="hover:underline flex items-center gap-2">
                <span>{text}</span>
                <Hash className="h-4 w-4 opacity-0 group-hover:opacity-100 text-neutral-400 transition" />
              </a>
            </h2>
          );
        }

        // 标题 H3
        if (trimmed.startsWith('### ')) {
          const text = trimmed.replace(/^###\s+/, '');
          const id = text
            .toLowerCase()
            .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
            .replace(/^-+|-+$/g, '');
          return (
            <h3 key={idx} id={id} className="text-lg font-bold text-ink pt-4 pb-1">
              {text}
            </h3>
          );
        }

        // 代码块 ```
        if (trimmed.startsWith('```')) {
          const lines = trimmed.split('\n');
          const langTag = lines[0].replace('```', '').trim();
          const codeBody = lines.slice(1, -1).join('\n');
          return (
            <div key={idx} className="rounded-lg overflow-hidden border border-hairline bg-surface-soft my-5">
              {langTag && (
                <div className="px-4 py-1.5 bg-neutral-200 border-b border-hairline text-[11px] font-mono text-neutral-700 font-semibold">
                  {langTag}
                </div>
              )}
              <pre className="p-4 text-xs font-mono text-ink overflow-x-auto leading-relaxed">
                <code>{codeBody}</code>
              </pre>
            </div>
          );
        }

        // 引用提示块 > [!NOTE] 等 (使用 Block Lime 色块)
        if (trimmed.startsWith('>')) {
          return (
            <blockquote
              key={idx}
              className="p-4 rounded-lg border-l-4 border-ink bg-block-lime/60 text-ink text-sm my-4 font-normal"
            >
              {trimmed
                .split('\n')
                .map((l) => l.replace(/^>\s*/, ''))
                .join(' ')}
            </blockquote>
          );
        }

        // 无序列表 -
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const items = trimmed.split('\n').filter((l) => l.startsWith('- ') || l.startsWith('* '));
          return (
            <ul key={idx} className="list-disc list-inside space-y-1.5 text-neutral-800 text-sm font-light">
              {items.map((item, ii) => (
                <li key={ii} className="leading-relaxed">
                  {item.replace(/^[-*]\s+/, '')}
                </li>
              ))}
            </ul>
          );
        }

        // 有序列表 1. 2.
        if (/^\d+\.\s/.test(trimmed)) {
          const items = trimmed.split('\n').filter((l) => /^\d+\.\s/.test(l));
          return (
            <ol key={idx} className="list-decimal list-inside space-y-1.5 text-neutral-800 text-sm font-light">
              {items.map((item, ii) => (
                <li key={ii} className="leading-relaxed">
                  {item.replace(/^\d+\.\s+/, '')}
                </li>
              ))}
            </ol>
          );
        }

        // 表格 |
        if (trimmed.startsWith('|')) {
          const rows = trimmed.split('\n').filter((r) => r.trim().startsWith('|'));
          if (rows.length >= 2) {
            const headerCells = rows[0].split('|').filter(Boolean).map((c) => c.trim());
            const bodyRows = rows.slice(2).map((r) => r.split('|').filter(Boolean).map((c) => c.trim()));

            return (
              <div key={idx} className="overflow-x-auto my-5 border border-hairline rounded-lg">
                <table className="w-full text-xs text-left text-neutral-800">
                  <thead className="bg-surface-soft border-b border-hairline text-ink font-semibold">
                    <tr>
                      {headerCells.map((h, hi) => (
                        <th key={hi} className="p-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline-soft">
                    {bodyRows.map((row, ri) => (
                      <tr key={ri} className="hover:bg-neutral-50 font-light">
                        {row.map((cell, ci) => (
                          <td key={ci} className="p-3">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
        }

        // 普通段落
        return (
          <p key={idx} className="text-neutral-800 text-base leading-relaxed font-light">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}
