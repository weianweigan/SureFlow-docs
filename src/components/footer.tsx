import React from 'react';
import Link from 'next/link';
import { type Locale, DICTIONARY } from '@/lib/i18n';
import { Github } from 'lucide-react';

interface FooterProps {
  lang: Locale;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = DICTIONARY[lang];

  return (
    <footer className="w-full border-t border-hairline bg-canvas text-ink py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Tagline */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-canvas border border-hairline overflow-hidden p-0.5 shadow-xs">
                <img src="/logo.svg" alt="SureFlow Logo" className="h-full w-full object-contain" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-ink">SureFlow</span>
            </div>
            <p className="text-neutral-700 max-w-sm text-sm leading-relaxed font-light">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/weianweigan/SureFlow"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-soft hover:bg-neutral-300 text-ink transition"
                title="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-4 font-semibold">
              {lang === 'zh' ? '文档与下载' : 'Docs & Download'}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={`/${lang}/docs`} className="text-ink hover:underline">
                  {t.nav.docs}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/download`} className="text-ink hover:underline">
                  {t.nav.download}
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/weianweigan/SureFlow/releases"
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink hover:underline"
                >
                  GitHub Releases
                </a>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-4 font-semibold">
              {lang === 'zh' ? '开源社区' : 'Community'}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={`/${lang}/open-source`} className="text-ink hover:underline">
                  {t.nav.openSource}
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/weianweigan/SureFlow"
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink hover:underline"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/weianweigan/SureFlow/issues"
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink hover:underline"
                >
                  Issues & Feedback
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-hairline-soft flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <p>{t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <span>Edge update powered by Cloudflare</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
