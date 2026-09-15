'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n';
import { DOC_NAVIGATION } from '@/lib/docs-data';
import { BookOpen, Menu, X, ChevronRight, FileText } from 'lucide-react';

interface DocsLayoutClientProps {
  children: React.ReactNode;
  lang: Locale;
}

export const DocsLayoutClient: React.FC<DocsLayoutClientProps> = ({ children, lang }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = DOC_NAVIGATION[lang] || DOC_NAVIGATION.zh;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 bg-canvas text-ink">
      {/* 移动端菜单切换按钮 */}
      <div className="lg:hidden mb-6 flex items-center justify-between p-3.5 rounded-lg bg-surface-soft border border-hairline">
        <div className="flex items-center gap-2 text-xs font-semibold text-ink">
          <BookOpen className="h-4 w-4 text-ink" />
          <span>{lang === 'zh' ? '文档导航' : 'Documentation Menu'}</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-md bg-canvas text-ink border border-hairline"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* 左侧文档导航边栏 */}
        <aside
          className={`lg:col-span-3 lg:block ${
            mobileMenuOpen ? 'block' : 'hidden'
          } sticky top-24 z-30 space-y-8 bg-canvas lg:bg-transparent p-4 lg:p-0 rounded-lg border border-hairline lg:border-none`}
        >
          <div className="flex items-center gap-2 pb-4 border-b border-hairline">
            <div className="p-1.5 bg-ink text-white rounded-md">
              <BookOpen className="h-4 w-4" />
            </div>
            <span className="font-bold text-ink text-sm">
              {lang === 'zh' ? 'SureFlow 技术手册' : 'SureFlow Documentation'}
            </span>
          </div>

          <div className="space-y-6 text-sm">
            {categories.map((cat, catIdx) => (
              <div key={catIdx} className="space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                  {cat.category}
                </h3>
                <ul className="space-y-1">
                  {cat.items.map((item) => {
                    const docHref = item.slug ? `/${lang}/docs/${item.slug}` : `/${lang}/docs`;
                    const isActive = pathname === docHref || pathname === `${docHref}/`;

                    return (
                      <li key={item.slug}>
                        <Link
                          href={docHref}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-pill text-xs font-medium transition ${
                            isActive
                              ? 'bg-block-lime text-ink font-bold border border-black/10'
                              : 'text-neutral-700 hover:text-ink hover:bg-surface-soft'
                          }`}
                        >
                          <FileText className="h-3.5 w-3.5 shrink-0 opacity-70" />
                          <span className="truncate">{item.title}</span>
                          {isActive && <ChevronRight className="h-3 w-3 ml-auto text-ink" />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* 主文档正文区域 */}
        <main className="lg:col-span-9 min-w-0">{children}</main>
      </div>
    </div>
  );
};
