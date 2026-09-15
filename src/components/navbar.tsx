'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale, DICTIONARY } from '@/lib/i18n';
import { Box, Github, Globe, Download } from 'lucide-react';

interface NavbarProps {
  lang: Locale;
}

export const Navbar: React.FC<NavbarProps> = ({ lang }) => {
  const t = DICTIONARY[lang];
  const pathname = usePathname();

  // 切换语言时替换路径前缀
  const getSwitchLangPath = (targetLang: Locale) => {
    if (!pathname) return `/${targetLang}`;
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return `/${targetLang}`;
    segments[0] = targetLang;
    return `/${segments.join('/')}`;
  };

  const navLinks = [
    { href: `/${lang}/features`, label: t.nav.features },
    { href: `/${lang}/cases`, label: t.nav.cases },
    { href: `/${lang}/docs`, label: t.nav.docs },
    { href: `/${lang}/download`, label: t.nav.download },
    { href: `/${lang}/open-source`, label: t.nav.openSource },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href={`/${lang}`} className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Box className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              SureFlow
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                CAD
              </span>
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-sky-400 ${
                  isActive ? 'text-sky-400 font-semibold' : 'text-slate-300'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Language Switch */}
          <Link
            href={getSwitchLangPath(lang === 'zh' ? 'en' : 'zh')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-md hover:bg-slate-800 transition"
            title={lang === 'zh' ? 'Switch to English' : '切换到中文'}
          >
            <Globe className="h-3.5 w-3.5 text-sky-400" />
            <span>{lang === 'zh' ? 'EN' : '中文'}</span>
          </Link>

          {/* GitHub Repo */}
          <a
            href="https://github.com/weianweigan/SureFlow"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-md hover:bg-slate-800 transition"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* Download CTA Button */}
          <Link
            href={`/${lang}/download`}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-md shadow-sm shadow-sky-500/20 transition-all hover:scale-[1.02]"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{t.nav.download}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
