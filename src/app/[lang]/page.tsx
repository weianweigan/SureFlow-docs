import React from 'react';
import Link from 'next/link';
import { type Locale, DICTIONARY } from '@/lib/i18n';
import {
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Terminal,
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
      {/* 极简工程背景网格 */}
      <div className="fixed inset-0 pointer-events-none opacity-30 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* 1. 精简 Hero 区域：居中大气排版，移除 Web 3D 视口卡片 */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-white/90 backdrop-blur-sm text-neutral-800 text-xs font-mono font-medium border border-hairline shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-semantic-success animate-pulse" />
            <span>{t.hero.tag}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-ink tracking-tightest leading-[1.12] max-w-3xl">
            {t.hero.title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl leading-relaxed font-light">
            {t.hero.description}
          </p>

          {/* 主操作入口：文档与 GitHub */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href={`/${lang}/docs`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-ink hover:bg-neutral-800 rounded-pill transition shadow-sm"
            >
              <span>{t.hero.primaryAction}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://github.com/weianweigan/SureFlow"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-ink bg-white/90 hover:bg-white border border-hairline rounded-pill transition shadow-2xs"
            >
              <span>{t.hero.secondaryAction}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {/* 极简规范徽标行 */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-hairline/80 max-w-xl">
            {t.hero.badges.map((badge, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-surface-soft/80 border border-hairline text-neutral-700 font-mono text-xs font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 主设计工作台三维建模界面展示 */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-hairline-soft/80">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                {t.uiSection.tag}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                {t.uiSection.title}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-md font-light">
              {t.uiSection.description}
            </p>
          </div>

          {/* 桌面端设计界面画框 */}
          <div className="rounded-2xl border border-hairline/80 bg-white/80 backdrop-blur-md p-3 sm:p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between px-2 text-xs font-mono text-neutral-600">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 inline-block" />
                <span className="ml-2 font-medium text-ink">{t.uiSection.caption}</span>
              </div>
              <span className="hidden sm:inline">
                {lang === 'zh' ? 'Three.js / CSG 实时布尔切削' : 'Three.js / Realtime CSG Boolean'}
              </span>
            </div>
            <div className="overflow-hidden rounded-xl border border-hairline bg-canvas shadow-2xs">
              <img
                src={mainUiSrc}
                alt="SureFlow Studio 3D Interface"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Block Cream 大色块：孔腔库管理与剖面编辑展示 */}
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

      {/* 4. 底部工程架构与开源生态收尾 */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-hairline-soft/80">
        <div className="rounded-2xl bg-white/85 backdrop-blur-md p-10 sm:p-14 border border-hairline text-center space-y-6 shadow-xs">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-surface-soft text-neutral-800 text-xs font-mono font-medium border border-hairline">
              <Terminal className="h-3.5 w-3.5" />
              <span>OPEN SOURCE & PRECISION ENGINEERING</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              {lang === 'zh' ? '基于现代化几何内核与开源生态构建' : 'Engineered on Modern CAD Kernels & Open Ecosystem'}
            </h2>

            <p className="text-sm text-neutral-600 font-light">
              {lang === 'zh'
                ? '集成 OpenCASCADE (OCCT) 高保真几何引擎与 Three.js 硬件加速视口，严格遵循工业流体标准。'
                : 'Integrating OpenCASCADE (OCCT) BRep geometric kernel and Three.js hardware-accelerated viewport.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href={`/${lang}/docs`}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-mono font-bold text-white bg-ink hover:bg-neutral-800 rounded-pill transition shadow-xs"
              >
                <span>{lang === 'zh' ? '查阅架构文档' : 'Read Architecture Docs'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href="https://github.com/weianweigan/SureFlow"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-mono font-bold text-ink bg-white hover:bg-neutral-50 border border-hairline rounded-pill transition shadow-2xs"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
