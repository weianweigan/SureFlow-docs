import React from 'react';
import { type Locale } from '@/lib/i18n';
import { DG16GuideStage } from '@/components/dg16-stage/dg16-guide-stage';
import { CapabilitiesSection } from '@/components/dg16-stage/capabilities-section';
import { PageHeader } from './page-header';

interface DG16GuidePageProps {
  params: Promise<{ lang: string }>;
}

export default async function DG16GuidePage({ params }: DG16GuidePageProps) {
  const { lang: rawLang } = await params;
  const lang: Locale = rawLang === 'en' ? 'en' : 'zh';

  return (
    <div className="relative min-h-screen bg-canvas text-ink selection:bg-neutral-900 selection:text-white">
      {/* 极简工程底纹网格 */}
      <div className="fixed inset-0 pointer-events-none opacity-35 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [background-size:32px_32px]" />

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        {/* 1. 页面头部 (使用 GSAP 入场时间轴编排) */}
        <PageHeader lang={lang} />

        {/* 2. 居中动画舞台与操作控制区 */}
        <DG16GuideStage lang={lang} />

        {/* 3. 核心能力说明区 (介绍四项交互特性，克制真实) */}
        <CapabilitiesSection lang={lang} />
      </main>
    </div>
  );
}
