import React from 'react';
import Link from 'next/link';
import { type Locale, DICTIONARY } from '@/lib/i18n';
import { DownloadButton } from '@/components/download-button';
import { ModelViewer } from '@/components/model-viewer';
import {
  Cpu,
  ShieldCheck,
  FileCode2,
  Zap,
  ArrowRight,
  Boxes,
  ExternalLink,
} from 'lucide-react';

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang: rawLang } = await params;
  const lang: Locale = rawLang === 'en' ? 'en' : 'zh';
  const t = DICTIONARY[lang];

  return (
    <div className="relative bg-canvas text-ink">
      {/* 1. Hero 区域：纯白画布 + 超大负字距标题 + 3D 视口 */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 左侧文字排版 */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-block-lime text-ink text-xs font-mono font-medium border border-black/10">
              <Zap className="h-3.5 w-3.5" />
              <span>{t.hero.tag}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-ink tracking-tightest leading-[1.05]">
              {t.hero.title}
              <span className="block font-bold text-ink mt-2">{t.hero.titleHighlight}</span>
            </h1>

            <p className="text-lg text-neutral-700 max-w-xl leading-relaxed font-light">
              {t.hero.description}
            </p>

            {/* 下载与文档主操作按钮对 */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <DownloadButton lang={lang} />
              <Link
                href={`/${lang}/docs`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-ink bg-surface-soft hover:bg-neutral-300 rounded-pill transition"
              >
                <span>{t.hero.secondaryAction}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* 核心指标统计 */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-hairline max-w-lg">
              <div>
                <p className="text-3xl sm:text-4xl font-light text-ink font-mono tracking-tight">
                  {t.hero.stats.cycleReductionVal}
                </p>
                <p className="text-xs font-mono text-neutral-500 uppercase mt-1">
                  {t.hero.stats.cycleReduction}
                </p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-light text-ink font-mono tracking-tight">
                  {t.hero.stats.accuracyVal}
                </p>
                <p className="text-xs font-mono text-neutral-500 uppercase mt-1">
                  {t.hero.stats.accuracy}
                </p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-light text-ink font-mono tracking-tight">
                  {t.hero.stats.nativeSpeedVal}
                </p>
                <p className="text-xs font-mono text-neutral-500 uppercase mt-1">
                  {t.hero.stats.nativeSpeed}
                </p>
              </div>
            </div>
          </div>

          {/* 右侧 3D 阀块交互视口 */}
          <div className="lg:col-span-6">
            <ModelViewer
              src="/models/hydraulic-block.glb"
              alt="SureFlow Hydraulic Manifold 3D Demo"
              className="h-[480px] w-full"
            />
          </div>
        </div>
      </section>

      {/* 2. 大色块板块：Block Lime（青柠绿系统能力大面板） */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-block-lime rounded-lg p-8 sm:p-14 text-ink space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-800 font-semibold">
              CORE CAPABILITIES • 核心架构
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              {t.featuresPage.title}
            </h2>
            <p className="text-base text-neutral-800 leading-relaxed">
              {t.featuresPage.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.featuresPage.list.map((feat, idx) => {
              const icons = [
                <Cpu key="0" className="h-6 w-6 text-ink" />,
                <ShieldCheck key="1" className="h-6 w-6 text-ink" />,
                <FileCode2 key="2" className="h-6 w-6 text-ink" />,
                <Boxes key="3" className="h-6 w-6 text-ink" />,
              ];

              return (
                <div
                  key={feat.id}
                  className="bg-canvas rounded-md p-6 border border-black/10 space-y-3 shadow-xs hover:border-black transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-full bg-surface-soft text-ink">
                      {icons[idx]}
                    </div>
                    <span className="text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded bg-surface-soft text-ink">
                      {feat.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-ink">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-neutral-700 leading-relaxed font-light">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. 经典暖调大色块：Block Cream / Lilac（工程对比案例） */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-semibold">
              INDUSTRIAL BENCHMARK
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-ink mt-1">
              {t.casesPage.title}
            </h2>
          </div>
          <Link
            href={`/${lang}/cases`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:underline"
          >
            <span>{lang === 'zh' ? '查看全部工程案例' : 'View all case studies'}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.casesPage.items.map((c, i) => (
            <div
              key={i}
              className={`p-8 rounded-lg border border-black/10 space-y-4 ${
                i === 0 ? 'bg-block-cream' : 'bg-block-lilac'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-ink">{c.name}</h3>
                <span className="text-xs font-mono font-semibold bg-canvas text-ink px-2.5 py-1 rounded-pill border border-black/10">
                  {c.tag}
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-700">{c.specs}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-canvas/80 border border-black/10 p-3.5 rounded-md text-neutral-800">
                  <p className="font-semibold text-neutral-600 mb-1">
                    {lang === 'zh' ? '传统人工设计' : 'Traditional'}
                  </p>
                  <p className="leading-relaxed font-light">{c.before}</p>
                </div>
                <div className="bg-canvas border border-ink p-3.5 rounded-md text-ink shadow-xs">
                  <p className="font-semibold text-ink mb-1">
                    {lang === 'zh' ? 'SureFlow AI 协同' : 'With SureFlow AI'}
                  </p>
                  <p className="leading-relaxed font-normal">{c.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 底部行动号召 (CTA)：Surface Soft 大底板 + Pill 胶囊主按钮 */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-surface-soft p-10 sm:p-16 border border-hairline text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              {lang === 'zh' ? '立即开启智能液压流道设计' : 'Ready to Transform Manifold Design?'}
            </h2>
            <p className="text-base text-neutral-700 font-light">
              {lang === 'zh'
                ? '免费下载 SureFlow 桌面客户端，感受由 AI 驱动的流道无损拓扑与规则极速校验。'
                : 'Download SureFlow desktop app today and experience AI-assisted channel topology and real-time clearance verification.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <DownloadButton lang={lang} />
              <a
                href="https://github.com/weianweigan/SureFlow"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-ink bg-canvas hover:bg-neutral-100 border border-hairline rounded-pill transition"
              >
                <span>GitHub Star</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
