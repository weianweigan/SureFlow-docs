import React from 'react';
import { type Locale, LOCALES } from '@/lib/i18n';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang: rawLang } = await params;
  const lang: Locale = rawLang === 'en' ? 'en' : 'zh';

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <Navbar lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
    </div>
  );
}
