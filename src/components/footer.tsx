import React from 'react';
import Link from 'next/link';
import { type Locale, DICTIONARY } from '@/lib/i18n';
import { Box, Github } from 'lucide-react';

interface FooterProps {
  lang: Locale;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = DICTIONARY[lang];

  return (
    <footer className="w-full border-t border-slate-850 bg-slate-950/90 text-slate-400 text-xs py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-sky-600 text-white font-bold text-sm">
                <Box className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">SureFlow</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/weianweigan/SureFlow"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 mb-3 uppercase tracking-wider text-[11px]">
              {lang === 'zh' ? '产品与资源' : 'Products & Resources'}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/features`} className="hover:text-sky-400 transition">
                  {t.nav.features}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/cases`} className="hover:text-sky-400 transition">
                  {t.nav.cases}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/download`} className="hover:text-sky-400 transition">
                  {t.nav.download}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/docs`} className="hover:text-sky-400 transition">
                  {t.nav.docs}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 mb-3 uppercase tracking-wider text-[11px]">
              {lang === 'zh' ? '开源生态' : 'Ecosystem'}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/open-source`} className="hover:text-sky-400 transition">
                  {t.nav.openSource}
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/weianweigan/SureFlow"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-sky-400 transition"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/weianweigan/SureFlow/issues"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-sky-400 transition"
                >
                  Issues & Feedback
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>{t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-600">Edge update powered by Cloudflare</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
