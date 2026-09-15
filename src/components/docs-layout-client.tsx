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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* 移动端菜单切换按钮 */}
      <div className="lg:hidden mb-6 flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <BookOpen className="h-4 w-4 text-sky-400" />
          <span>{lang === 'zh' ? '文档导航' : 'Documentation Menu'}</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 左侧文档导航边栏 */}
        <aside
          className={`lg:col-span-3 lg:block ${
            mobileMenuOpen ? 'block' : 'hidden'
          } sticky top-24 z-30 space-y-8 bg-slate-950/80 lg:bg-transparent p-4 lg:p-0 rounded-2xl border border-slate-800 lg:border-none`}
        >
          <div className="flex items-center gap-2 pb-4 border-b border-slate-850">
            <BookOpen className="h-5 w-5 text-sky-400" />
            <span className="font-bold text-slate-200 text-sm">
              {lang === 'zh' ? 'SureFlow 技术手册' : 'SureFlow Documentation'}
            </span>
          </div>

          <div className="space-y-6 text-sm">
            {categories.map((cat, catIdx) => (
              <div key={catIdx} className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
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
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition ${
                            isActive
                              ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30 font-semibold'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                          }`}
                        >
                          <FileText className="h-3.5 w-3.5 shrink-0 opacity-70" />
                          <span className="truncate">{item.title}</span>
                          {isActive && <ChevronRight className="h-3 w-3 ml-auto text-sky-400" />}
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
