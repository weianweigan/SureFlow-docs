import React from 'react';
import { type Locale } from '@/lib/i18n';
import { DocsLayoutClient } from '@/components/docs-layout-client';

interface DocsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function DocsLayout({ children, params }: DocsLayoutProps) {
  const { lang: rawLang } = await params;
  const lang: Locale = rawLang === 'en' ? 'en' : 'zh';
  return <DocsLayoutClient lang={lang}>{children}</DocsLayoutClient>;
}
