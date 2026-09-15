import React from 'react';
import Link from 'next/link';
import { type Locale, DICTIONARY } from '@/lib/i18n';
import { DownloadButton } from '@/components/download-button';
import { ModelViewer } from '@/components/model-viewer';
import { FeatureShowcase } from '@/components/dg16-guide';
import { DG16Background } from '@/components/dg16-background';
import {
  ArrowRight,
  ExternalLink,
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
    <div className="relative min-h-screen bg-canvas text-ink selection:bg-neutral-900 selection:text-white">
      {/* 全页面 DG16 标准图纸背景驱动系统 (GSAP ScrollTrigger Driven) */}
      <DG16Background lang={lang} />

      {/* 1. Hero 区域：纯白画布 + 克制精确的工程标题 + 3D 模型视口 */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 左侧文字排版 */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-pill bg-white/90 backdrop-blur-sm text-neutral-800 text-xs font-mono font-medium border border-hairline shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-semantic-success animate-pulse" />
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-ink bg-white/80 hover:bg-white border border-hairline rounded-pill transition shadow-2xs"
              >
                <span>{t.hero.secondaryAction}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* 核心工程指标规范 */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-hairline/80 max-w-lg">
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
            <div className="rounded-2xl border border-hairline/80 bg-white/70 backdrop-blur-md p-3 shadow-sm">
              <ModelViewer
                src="/models/hydraulic-block.glb"
                alt="SureFlow Hydraulic Manifold 3D Demo"
                className="h-[460px] w-full rounded-xl overflow-hidden"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. 主设计工作台实机三维布孔视口展示 */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-hairline-soft/80">
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
          <div className="rounded-2xl border border-hairline/80 bg-white/80 backdrop-blur-md p-3 sm:p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between px-2 text-xs font-mono text-neutral-600">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 inline-block" />
                <span className="ml-2 font-medium text-ink">{t.uiSection.caption}</span>
              </div>
              <span className="hidden sm:inline">Three.js / CSG 布尔切削视口</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-hairline bg-canvas shadow-2xs">
              <img
                src={mainUiSrc}
                alt="SureFlow Studio 3D Viewport Interface"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. GSAP 驱动的 DG16 导引式全流程功能特性链路 */}
      <FeatureShowcase lang={lang} />

      {/* 4. Block Cream 大色块：孔腔库管理与剖面编辑展示 */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-block-cream/90 backdrop-blur-sm rounded-2xl p-8 sm:p-14 text-ink space-y-8 border border-neutral-300/40 shadow-xs">
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
                  <span>{lang === 'zh' ? '螺纹插装阀孔与 ISO 4401 板式阀标准模板' : 'Cartridge valve & ISO 4401 subplate templates'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-ink shrink-0" />
                  <span>{lang === 'zh' ? '分段阶梯孔深度、锥角与倒角参数实时校验' : 'Step bore depth, taper angle & chamfer live validation'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-ink shrink-0" />
                  <span>{lang === 'zh' ? '油口拓扑命名（P / T / A / B）语义化管理' : 'P / T / A / B port topology semantic management'}</span>
                </li>
              </ul>

              <div className="pt-2">
                <Link
                  href={`/${lang}/docs/quick-start`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink hover:underline"
                >
                  <span>{lang === 'zh' ? '查看孔腔库使用指南' : 'View Cavity Library Guide'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* 右侧孔腔库截图 */}
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-black/15 bg-white/90 backdrop-blur-sm p-3 shadow-xs space-y-2">
                <div className="flex items-center justify-between px-1 text-[11px] font-mono text-neutral-600">
                  <span>{t.librarySection.caption}</span>
                  <span>{lang === 'zh' ? '参数化二维截面' : 'Parametric 2D Cross-section'}</span>
                </div>
                <div className="overflow-hidden rounded-lg border border-hairline">
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

      {/* 5. 底部行动号召 (CTA) */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white/85 backdrop-blur-md p-10 sm:p-16 border border-hairline text-center space-y-6 shadow-xs">
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
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-ink bg-white hover:bg-neutral-50 border border-hairline rounded-pill transition shadow-2xs"
              >
                <span>{lang === 'zh' ? 'GitHub 源码仓库' : 'GitHub Source'}</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
