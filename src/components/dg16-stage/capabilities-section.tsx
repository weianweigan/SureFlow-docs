'use client';

import React from 'react';
import {
  ListOrdered,
  MousePointerClick,
  Sliders,
  Smartphone,
  ShieldAlert,
} from 'lucide-react';

interface CapabilitiesSectionProps {
  lang: 'zh' | 'en';
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ lang }) => {
  const isZh = lang === 'zh';

  const items = [
    {
      icon: ListOrdered,
      titleZh: '顺序引导 (Sequential Guiding)',
      titleEn: 'Sequential Guiding',
      descZh: '按照 DIN ISO 7368 安装工艺时序，光点平滑穿梭，依次聚焦基准定位销 (LP)、主插装阀孔 (CV)、控制油路 (X/Y/Z) 与四角紧固螺孔 (BH1-4)。',
      descEn: 'Follows DIN ISO 7368 standard sequence, smoothly traversing Locating Pin (LP), Cartridge Cavity (CV), Pilot Ports (X/Y/Z), and Bolt Holes (BH1-4).',
    },
    {
      icon: MousePointerClick,
      titleZh: '单孔查看 (Single-Hole Inspection)',
      titleEn: 'Single-Hole Inspection',
      descZh: '支持点击画布上任意孔位或使用键盘 Tab / Enter 键无障碍导航，即刻打断自动时序并锁定该孔的切削分阶、公差与相对坐标。',
      descEn: 'Click any hole or use Tab/Enter keyboard navigation to pause auto-sequence and inspect step bores, tolerances, and relative coordinates.',
    },
    {
      icon: Sliders,
      titleZh: '速度控制 (Variable Speed Control)',
      titleEn: 'Variable Speed Control',
      descZh: '基于 GSAP timeScale 机制，可在“平稳 (0.6x)”、“标准 (1.0x)”、“高速 (2.0x)”之间无缝切换，不重建 timeline，进度毫秒级保持。',
      descEn: 'Powered by GSAP timeScale, smoothly toggle between Smooth (0.6x), Standard (1.0x), and Fast (2.0x) without resetting progress.',
    },
    {
      icon: Smartphone,
      titleZh: '响应式适配 (Responsive Adaptation)',
      titleEn: 'Responsive Adaptation',
      descZh: '利用 gsap.matchMedia() 与统一 viewBox 矢量坐标重算，桌面端左右分栏、手机端垂直并列，光点始终严格对齐孔位中心，绝不发生偏移。',
      descEn: 'Using gsap.matchMedia() with normalized viewBox coordinates, desktop side-by-side and mobile stacked layouts keep tracer alignment pixel-perfect.',
    },
  ];

  return (
    <section className="w-full space-y-6 pt-10 border-t border-hairline/80">
      <div className="space-y-2">
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-semibold">
          {isZh ? '演示平台交互能力' : 'DEMO INTERACTIVE CAPABILITIES'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
          {isZh ? '四项核心交互特性' : 'Four Core Interactive Capabilities'}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-2xl">
          {isZh
            ? 'SureFlow 前端工程套件通过解耦的数据模型与高性能 GSAP 时间轴，为工业级液压组件提供直观、精准的引导交互方案。'
            : 'SureFlow frontend engineering suite decouples geometric data and GSAP timelines to deliver precise interactive guidance for hydraulic components.'}
        </p>
      </div>

      {/* 4 项能力卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-hairline/80 bg-white/90 backdrop-blur-sm p-5 sm:p-6 shadow-2xs space-y-3 hover:border-neutral-400 transition"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-ink">
                  {isZh ? item.titleZh : item.titleEn}
                </h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                {isZh ? item.descZh : item.descEn}
              </p>
            </div>
          );
        })}
      </div>

      {/* 工程提示警示条 (不将演示描述为已验证加工能力) */}
      <div className="rounded-xl bg-surface-soft/80 border border-hairline p-4 flex items-start gap-3 text-xs text-neutral-600">
        <ShieldAlert className="h-4 w-4 text-neutral-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {isZh
            ? '工程说明：本页面所呈现的孔位标注、时序引导与参数卡片主要用于展示 SureFlow 前端交互设计与标准库孔腔组织方式，不构成已通过 FEA 承压校验或 CAM 数控加工验证的成品工艺输出报告。实际生产请以经由 OpenCASCADE 内核导出的正式 STEP AP214 实体模型及工程图纸为准。'
            : 'Engineering Note: The cavity annotations, sequence guiding, and parameter cards on this page demonstrate SureFlow frontend interactive systems and library schemas. They do not constitute certified FEA pressure or CAM fabrication reports. Please refer to official STEP AP214 models exported via OpenCASCADE for manufacturing.'}
        </p>
      </div>
    </section>
  );
};
