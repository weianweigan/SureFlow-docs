'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale, DICTIONARY } from '@/lib/i18n';
import { Github, Globe, Download } from 'lucide-react';

interface NavbarProps {
  lang: Locale;
}

export const Navbar: React.FC<NavbarProps> = ({ lang }) => {
  const t = DICTIONARY[lang];
  const pathname = usePathname();

  const getSwitchLangPath = (targetLang: Locale) => {
    if (!pathname) return `/${targetLang}`;
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return `/${targetLang}`;
    segments[0] = targetLang;
    return `/${segments.join('/')}`;
  };

  const navLinks = [
    { href: `/${lang}/docs`, label: t.nav.docs },
    { href: `/${lang}/download`, label: t.nav.download },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline bg-canvas/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Official Brand Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-canvas border border-hairline overflow-hidden p-0.5 shadow-xs transition-transform group-hover:scale-105">
            <img src="/logo.svg" alt="SureFlow Logo" className="h-full w-full object-contain" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-ink">
              SureFlow
            </span>
            <span className="text-[11px] font-mono uppercase font-semibold px-2 py-0.5 rounded-full bg-block-lime text-ink border border-black/10">
              CAD
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 border-b-2 ${
                  isActive
                    ? 'border-ink text-ink font-semibold'
                    : 'border-transparent text-neutral-600 hover:text-ink'
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
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-ink bg-surface-soft hover:bg-neutral-300 rounded-pill transition"
            title={lang === 'zh' ? 'Switch to English' : '切换到中文'}
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{lang === 'zh' ? 'EN' : '中文'}</span>
          </Link>

          {/* GitHub Repo */}
          <a
            href="https://github.com/weianweigan/SureFlow"
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-soft hover:bg-neutral-300 text-ink transition"
            title="GitHub Repository"
          >
            <Github className="h-4 w-4" />
          </a>

          {/* Download CTA Button */}
          <Link
            href={`/${lang}/download`}
            className="hidden sm:flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-ink hover:bg-neutral-800 rounded-pill transition-all duration-150 hover:scale-[1.02]"
          >
            <Download className="h-4 w-4" />
            <span>{t.nav.download}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
