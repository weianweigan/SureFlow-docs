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
    <div className="relative overflow-hidden">
      {/* 顶部环境光晕 */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-sky-500/10 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute top-96 -right-40 w-[600px] h-[400px] bg-blue-600/10 blur-[140px] rounded-full" />

      {/* Hero 区域 */}
      <section className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 左侧文字与操作 */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
              <Zap className="h-3.5 w-3.5" />
              <span>{t.hero.tag}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              {t.hero.title}
              <span className="block gradient-text mt-1">{t.hero.titleHighlight}</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t.hero.description}
            </p>

            {/* 下载与文档主操作按钮 */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <DownloadButton lang={lang} />
              <Link
                href={`/${lang}/docs`}
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition"
              >
                <span>{t.hero.secondaryAction}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* 核心指标统计 */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {t.hero.stats.cycleReductionVal}
                </p>
                <p className="text-xs text-slate-400 mt-1">{t.hero.stats.cycleReduction}</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-mono">
                  {t.hero.stats.accuracyVal}
                </p>
                <p className="text-xs text-slate-400 mt-1">{t.hero.stats.accuracy}</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono">
                  {t.hero.stats.nativeSpeedVal}
                </p>
                <p className="text-xs text-slate-400 mt-1">{t.hero.stats.nativeSpeed}</p>
              </div>
            </div>
          </div>

          {/* 右侧 3D 阀块交互视口 */}
          <div className="lg:col-span-6">
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-500/20 to-blue-600/20 blur-xl opacity-70" />
              <ModelViewer
                src="/models/hydraulic-block.glb"
                alt="SureFlow Hydraulic Manifold 3D Demo"
                className="relative h-[480px] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 四大核心能力板块 */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t.featuresPage.title}
          </h2>
          <p className="mt-4 text-base text-slate-400">
            {t.featuresPage.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.featuresPage.list.map((feat, idx) => {
            const icons = [
              <Cpu key="0" className="h-6 w-6 text-sky-400" />,
              <ShieldCheck key="1" className="h-6 w-6 text-emerald-400" />,
              <FileCode2 key="2" className="h-6 w-6 text-cyan-400" />,
              <Boxes key="3" className="h-6 w-6 text-blue-400" />,
            ];

            return (
              <div
                key={feat.id}
                className="glass-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/5 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 group-hover:border-sky-500/40 transition">
                    {icons[idx]}
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {feat.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 典型工程对比案例速览 */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-slate-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
              INDUSTRIAL BENCHMARK
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white mt-1">
              {t.casesPage.title}
            </h2>
          </div>
          <Link
            href={`/${lang}/cases`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-400 hover:text-sky-300"
          >
            <span>{lang === 'zh' ? '查看全部工程案例' : 'View all case studies'}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.casesPage.items.map((c, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">{c.name}</h3>
                <span className="text-xs font-mono bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded border border-sky-500/20">
                  {c.tag}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">{c.specs}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-red-950/20 border border-red-900/30 p-3 rounded-lg text-slate-300">
                  <p className="font-semibold text-red-400 mb-1">
                    {lang === 'zh' ? '传统人工设计' : 'Traditional'}
                  </p>
                  <p className="leading-relaxed">{c.before}</p>
                </div>
                <div className="bg-emerald-950/20 border border-emerald-900/30 p-3 rounded-lg text-slate-300">
                  <p className="font-semibold text-emerald-400 mb-1">
                    {lang === 'zh' ? 'SureFlow AI 协同' : 'With SureFlow AI'}
                  </p>
                  <p className="leading-relaxed">{c.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 底部 CTA */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 p-8 sm:p-14 border border-sky-500/20 text-center shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              {lang === 'zh' ? '立即开启智能液压流道设计' : 'Ready to Transform Manifold Design?'}
            </h2>
            <p className="text-base text-slate-300">
              {lang === 'zh'
                ? '免费下载 SureFlow 桌面客户端，感受由 AI 驱动的流道无损拓扑与规则极速校验。'
                : 'Download SureFlow desktop app today and experience AI-assisted channel topology and real-time clearance verification.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <DownloadButton lang={lang} />
              <a
                href="https://github.com/weianweigan/SureFlow"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition"
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
