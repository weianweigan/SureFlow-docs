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

  // 计算上一篇与下一篇
  const allItems = (DOC_NAVIGATION[lang] || DOC_NAVIGATION.zh).flatMap((cat) => cat.items);
  const currentIndex = allItems.findIndex((it) => it.slug === currentSlug);
  const prevDoc = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextDoc = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
      {/* 中间正文 */}
      <article className="xl:col-span-9 min-w-0">
        {/* 面包屑 */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-mono">
          <Link href={`/${lang}/docs`} className="hover:text-slate-300 transition">
            Docs
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-sky-400 font-semibold">{doc.title}</span>
        </div>

        {/* 头部标题与描述 */}
        <div className="border-b border-slate-800 pb-8 mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {doc.title}
          </h1>
          {doc.description && (
            <p className="mt-3 text-base sm:text-lg text-slate-400 leading-relaxed">
              {doc.description}
            </p>
          )}
        </div>

        {/* 渲染正文 Markdown */}
        <div className="prose prose-invert prose-sky max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-slate-300 prose-p:leading-relaxed prose-code:font-mono prose-code:text-sky-300 prose-code:bg-slate-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-slate-800 prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-th:text-slate-200 prose-td:text-slate-300 prose-table:border-slate-800">
          <MarkdownRenderer content={doc.content} />
        </div>

        {/* 上一篇 / 下一篇翻页卡片 */}
        <div className="mt-16 pt-8 border-t border-slate-850 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevDoc ? (
            <Link
              href={prevDoc.slug ? `/${lang}/docs/${prevDoc.slug}` : `/${lang}/docs`}
              className="flex flex-col p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-sky-500/40 transition group text-left"
            >
              <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1 group-hover:text-sky-400">
                <ArrowLeft className="h-3 w-3" />
                {lang === 'zh' ? '上一篇' : 'Previous'}
              </span>
              <span className="text-sm font-semibold text-slate-200 mt-1">
                {prevDoc.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextDoc && (
            <Link
              href={nextDoc.slug ? `/${lang}/docs/${nextDoc.slug}` : `/${lang}/docs`}
              className="flex flex-col p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-sky-500/40 transition group text-right sm:ml-auto w-full"
            >
              <span className="text-[11px] font-mono text-slate-500 flex items-center justify-end gap-1 group-hover:text-sky-400">
                {lang === 'zh' ? '下一篇' : 'Next'}
                <ArrowRight className="h-3 w-3" />
              </span>
              <span className="text-sm font-semibold text-slate-200 mt-1">
                {nextDoc.title}
              </span>
            </Link>
          )}
        </div>
      </article>

      {/* 右侧 TOC 页面目录导航 */}
      {doc.toc.length > 0 && (
        <aside className="hidden xl:block xl:col-span-3 sticky top-24 space-y-4 border-l border-slate-850 pl-6 text-xs">
          <div className="flex items-center gap-2 font-mono uppercase tracking-wider text-slate-400 font-bold">
            <Bookmark className="h-3.5 w-3.5 text-sky-400" />
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
                  className="text-slate-400 hover:text-sky-400 transition block py-0.5 line-clamp-1"
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
    <div className="space-y-4">
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
            <h2 key={idx} id={id} className="text-2xl font-bold text-white pt-6 pb-2 border-b border-slate-850 flex items-center gap-2 group">
              <a href={`#${id}`} className="hover:text-sky-400 flex items-center gap-2">
                <span>{text}</span>
                <Hash className="h-4 w-4 opacity-0 group-hover:opacity-100 text-sky-400 transition" />
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
            <h3 key={idx} id={id} className="text-lg font-bold text-sky-300 pt-4 pb-1">
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
            <div key={idx} className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900 my-4">
              {langTag && (
                <div className="px-4 py-1.5 bg-slate-950 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                  {langTag}
                </div>
              )}
              <pre className="p-4 text-xs font-mono text-sky-100 overflow-x-auto">
                <code>{codeBody}</code>
              </pre>
            </div>
          );
        }

        // 引用提示块 > [!NOTE] 等
        if (trimmed.startsWith('>')) {
          return (
            <blockquote
              key={idx}
              className="p-4 rounded-xl border-l-4 border-sky-500 bg-sky-950/20 text-slate-300 text-sm my-4 space-y-1"
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
            <ul key={idx} className="list-disc list-inside space-y-1 text-slate-300 text-sm">
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
            <ol key={idx} className="list-decimal list-inside space-y-1 text-slate-300 text-sm">
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
              <div key={idx} className="overflow-x-auto my-4 border border-slate-800 rounded-xl">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-200">
                    <tr>
                      {headerCells.map((h, hi) => (
                        <th key={hi} className="p-3 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {bodyRows.map((row, ri) => (
                      <tr key={ri} className="hover:bg-slate-900/40">
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
          <p key={idx} className="text-slate-300 text-sm leading-relaxed">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}
