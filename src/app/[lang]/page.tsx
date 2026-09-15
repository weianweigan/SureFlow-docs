import React from 'react';
import Link from 'next/link';
import { type Locale, DICTIONARY } from '@/lib/i18n';
import { DownloadButton } from '@/components/download-button';
import { ModelViewer } from '@/components/model-viewer';
import {
  ArrowRight,
  ExternalLink,
  Layers,
  CheckCircle2,
} from 'lucide-react';

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang: rawLang } = await params;
  const lang: Locale = rawLang === 'en' ? 'en' : 'zh';
  const t = DICTIONARY[lang];

  const mainUiSrc = lang === 'en' ? '/images/main-ui.en.png' : '/images/main-ui.zh.png';

  return (
    <div className="relative bg-canvas text-ink">
      {/* 1. Hero 区域：纯白画布 + 克制精确的工程标题 + 3D 模型视口 */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 左侧文字排版 */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-pill bg-surface-soft text-neutral-800 text-xs font-mono font-medium border border-hairline">
              <span className="h-2 w-2 rounded-full bg-semantic-success" />
              <span>{t.hero.tag}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-normal text-ink tracking-tightest leading-[1.08]">
              {t.hero.title}
              <span className="block font-bold text-ink mt-1.5">{t.hero.titleHighlight}</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-700 max-w-xl leading-relaxed font-light">
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

            {/* 核心工程指标规范 */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-hairline max-w-lg">
              <div>
                <p className="text-xs font-mono text-neutral-500 uppercase">
                  {t.hero.stats.flow}
                </p>
                <p className="text-sm font-semibold text-ink mt-1">
                  {t.hero.stats.flowVal}
                </p>
              </div>
              <div>
                <p className="text-xs font-mono text-neutral-500 uppercase">
                  {t.hero.stats.format}
                </p>
                <p className="text-sm font-semibold text-ink mt-1 font-mono">
                  {t.hero.stats.formatVal}
                </p>
              </div>
              <div>
                <p className="text-xs font-mono text-neutral-500 uppercase">
                  {t.hero.stats.runtime}
                </p>
                <p className="text-sm font-semibold text-ink mt-1">
                  {t.hero.stats.runtimeVal}
                </p>
              </div>
            </div>
          </div>

          {/* 右侧 3D 阀块交互视口 */}
          <div className="lg:col-span-6">
            <ModelViewer
              src="/models/hydraulic-block.glb"
              alt="SureFlow Hydraulic Manifold 3D Demo"
              className="h-[460px] w-full"
            />
          </div>
        </div>
      </section>

      {/* 2. 主设计工作台实机三维布孔视口展示 (resources/main-ui) */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 border-t border-hairline-soft">
        <div className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-semibold">
              {t.uiSection.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              {t.uiSection.title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-light">
              {t.uiSection.description}
            </p>
          </div>

          {/* 实机截图画框 */}
          <div className="rounded-lg border border-hairline bg-surface-soft p-3 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between px-2 text-xs font-mono text-neutral-600">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 inline-block" />
                <span className="ml-2 font-medium text-ink">{t.uiSection.caption}</span>
              </div>
              <span className="hidden sm:inline">Three.js / CSG 布尔渲染引擎</span>
            </div>
            <div className="overflow-hidden rounded-md border border-hairline bg-canvas">
              <img
                src={mainUiSrc}
                alt="SureFlow Studio 3D Viewport Interface"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Block Lime 大色块：设计链路的四个关键阶段 (PRD 功能模型) */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-block-lime rounded-lg p-8 sm:p-14 text-ink space-y-10">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-800 font-semibold">
              {t.workflowSection.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink">
              {t.workflowSection.title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-light">
              {t.workflowSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.workflowSection.stages.map((st) => (
              <div
                key={st.num}
                className="bg-canvas rounded-md p-6 border border-black/10 space-y-4 shadow-xs hover:border-black transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-surface-soft text-ink">
                    PHASE {st.num}
                  </span>
                  <div className="h-8 w-8 rounded-md bg-surface-soft flex items-center justify-center p-1.5">
                    <img src={st.icon} alt={st.title} className="h-full w-full object-contain" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-ink leading-snug">
                  {st.title}
                </h3>
                <p className="text-xs text-neutral-700 leading-relaxed font-light">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Block Cream 大色块：孔腔库管理与剖面编辑展示 (resources/cavity-library) */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-block-cream rounded-lg p-8 sm:p-14 text-ink space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* 左侧文字介绍 */}
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-700 font-semibold">
                {t.librarySection.tag}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                {t.librarySection.title}
              </h2>
              <p className="text-sm text-neutral-800 leading-relaxed font-light">
                {t.librarySection.description}
              </p>

              <ul className="space-y-2.5 pt-2 text-xs text-neutral-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-ink shrink-0" />
                  <span>螺纹插装阀孔与 ISO 4401 板式阀标准模板</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-ink shrink-0" />
                  <span>分段阶梯孔深度、锥角与倒角参数实时校验</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-ink shrink-0" />
                  <span>油口拓扑命名（P / T / A / B）语义化管理</span>
                </li>
              </ul>

              <div className="pt-2">
                <Link
                  href={`/${lang}/docs/quick-start`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink hover:underline"
                >
                  <span>查看孔腔库使用指南</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* 右侧孔腔库截图 */}
            <div className="lg:col-span-7">
              <div className="rounded-lg border border-black/15 bg-canvas p-3 shadow-xs space-y-2">
                <div className="flex items-center justify-between px-1 text-[11px] font-mono text-neutral-600">
                  <span>{t.librarySection.caption}</span>
                  <span>参数化二维截面</span>
                </div>
                <div className="overflow-hidden rounded-md border border-hairline">
                  <img
                    src="/images/cavity-library.png"
                    alt="SureFlow Cavity Library Management View"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 底部行动号召 (CTA)：Surface Soft 大底板 + 胶囊主按钮 */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-surface-soft p-10 sm:p-16 border border-hairline text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              {lang === 'zh' ? '下载并运行 SureFlow 客户端' : 'Get Started with SureFlow'}
            </h2>
            <p className="text-base text-neutral-700 font-light">
              {lang === 'zh'
                ? '通过 sureflow-update.hy3d.space 边缘节点获取最新发布的 Windows / macOS 客户端。'
                : 'Download the latest Windows or macOS desktop client delivered through sureflow-update.hy3d.space edge proxy.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
              <DownloadButton lang={lang} />
              <a
                href="https://github.com/weianweigan/SureFlow"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-ink bg-canvas hover:bg-neutral-100 border border-hairline rounded-pill transition"
              >
                <span>GitHub 源码仓库</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
