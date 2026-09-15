import React from 'react';
import { type Locale, DICTIONARY } from '@/lib/i18n';
import { DownloadButton } from '@/components/download-button';
import {
  Cpu,
  ShieldAlert,
  SlidersHorizontal,
  FileCheck2,
  Sparkles,
} from 'lucide-react';

interface FeaturesPageProps {
  params: Promise<{ lang: string }>;
}

export default async function FeaturesPage({ params }: FeaturesPageProps) {
  const { lang: rawLang } = await params;
  const lang: Locale = rawLang === 'en' ? 'en' : 'zh';
  const t = DICTIONARY[lang];

  const features = [
    {
      icon: <Cpu className="h-7 w-7 text-ink" />,
      title: lang === 'zh' ? 'AI 流道拓扑与路径规划' : 'AI Topology & Path Planning',
      desc:
        lang === 'zh'
          ? '通过空间网格与图神经网络探索算法，自动在三维集成块内部找到最符合流体动力学的油路路径。自动计算弯头压降与流通阻力，大幅降低液压温升。'
          : 'Employs spatial graph search and AI path-finding algorithms to explore internal fluid routes, balancing pressure drops and eliminating excessive right-angle bends.',
      badge: 'Core Engine',
      bgClass: 'bg-block-lime',
    },
    {
      icon: <ShieldAlert className="h-7 w-7 text-ink" />,
      title: lang === 'zh' ? '高精实时干涉与壁厚安全校验' : 'Real-time Clearance & Wall Thickness',
      desc:
        lang === 'zh'
          ? '在任何拖拽、布孔调整操作时，毫秒级计算所有孔道间的三维最小空间距离。根据设定油压（如 31.5 MPa）自动评估最小壁厚安全阈值，彻底防止高压击穿。'
          : 'Instantly computes minimum 3D distances between arbitrary drilling channels. Automatically flags unsafe thin walls against rated working pressure (e.g., 31.5 MPa).',
      badge: 'Reliability',
      bgClass: 'bg-block-mint',
    },
    {
      icon: <SlidersHorizontal className="h-7 w-7 text-ink" />,
      title: lang === 'zh' ? '标准孔腔库与工艺堵孔管理' : 'Standard Cavity Library & Plugging',
      desc:
        lang === 'zh'
          ? '内置 ISO 4401、Sun Hydraulics、Rexroth 等标准插装阀孔、法兰口及螺纹接口规范。智能识别并最小化外部工艺辅助堵孔数量，降低漏油风险。'
          : 'Integrates ISO 4401, Sun Hydraulics, and Rexroth standard cavity interfaces. Intelligently optimizes and minimizes external process plugging points.',
      badge: 'Productivity',
      bgClass: 'bg-block-cream',
    },
    {
      icon: <FileCheck2 className="h-7 w-7 text-ink" />,
      title: lang === 'zh' ? '生产级 STEP 实体无损导出' : 'Production-Ready STEP Solid Export',
      desc:
        lang === 'zh'
          ? '基于工业标准几何拓扑导出 AP203/AP214/AP242 STEP 实体文件，完美对接 SolidWorks、NX、Creo 等主流 CAD/CAM 软件，自动生成孔系加工工序深度清单。'
          : 'Exports compliant AP203/214/242 STEP solids seamlessly into SolidWorks, NX, and Creo, accompanied by manufacturing depth schedules.',
      badge: 'Standards',
      bgClass: 'bg-block-pink',
    },
  ];

  return (
    <div className="bg-canvas text-ink py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-surface-soft text-ink text-xs font-mono font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{lang === 'zh' ? '工业 CAD 核心技术' : 'Next-Gen CAD Engineering'}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink">
            {t.featuresPage.title}
          </h1>
          <p className="text-lg text-neutral-700 font-light">
            {t.featuresPage.subtitle}
          </p>
        </div>

        {/* 详细特性大色块网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((item, idx) => (
            <div
              key={idx}
              className={`${item.bgClass} p-8 sm:p-10 rounded-lg border border-black/10 space-y-4 transition duration-200 hover:border-black shadow-xs`}
            >
              <div className="flex items-center justify-between">
                <div className="p-3 bg-canvas text-ink rounded-full border border-black/10">
                  {item.icon}
                </div>
                <span className="text-xs font-mono font-semibold px-3 py-1 rounded-pill bg-canvas text-ink border border-black/10">
                  {item.badge}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-ink">{item.title}</h2>
              <p className="text-sm text-neutral-800 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 底部行动引导 */}
        <div className="rounded-lg bg-surface-soft p-10 sm:p-14 border border-hairline text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink">
            {lang === 'zh' ? '在您的工作站上体验 SureFlow' : 'Experience SureFlow on Your Machine'}
          </h2>
          <p className="text-sm text-neutral-700 font-light">
            {lang === 'zh'
              ? '通过 sureflow-update.hy3d.space 边缘反代节点，获得极速、稳定的下载与更新体验。'
              : 'Fast and reliable downloads accelerated via sureflow-update.hy3d.space edge proxy.'}
          </p>
          <div className="flex justify-center">
            <DownloadButton lang={lang} />
          </div>
        </div>
      </div>
    </div>
  );
}
