import React from 'react';
import { type Locale } from '@/lib/i18n';
import { DownloadClient } from '@/components/download-client';

interface DownloadPageProps {
  params: Promise<{ lang: string }>;
}

export default async function DownloadPage({ params }: DownloadPageProps) {
  const { lang: rawLang } = await params;
  const lang: Locale = rawLang === 'en' ? 'en' : 'zh';
  return <DownloadClient lang={lang} />;
}
