import React from 'react';
import { type Locale, DICTIONARY } from '@/lib/i18n';
import { DownloadButton } from '@/components/download-button';
import { Factory } from 'lucide-react';

interface CasesPageProps {
  params: Promise<{ lang: string }>;
}

export default async function CasesPage({ params }: CasesPageProps) {
  const { lang: rawLang } = await params;
  const lang: Locale = rawLang === 'en' ? 'en' : 'zh';
  const t = DICTIONARY[lang];

  const fullCases = [
    {
      title: lang === 'zh' ? '250kN 智能重型锻压机主控集成块' : '250kN Forging Press Hydraulic Manifold',
      category: lang === 'zh' ? '重型冶金装备' : 'Heavy Metallurgy',
      specs: lang === 'zh' ? '材质：45# 钢锻件 | 外形：420 × 380 × 260 mm | 额定压力：31.5 MPa | 孔道数：38' : 'Material: Forged 45# Steel | Size: 420x380x260mm | Pressure: 31.5 MPa | Ports: 38',
      metrics: [
        { label: lang === 'zh' ? '设计耗时' : 'Design Time', before: '5 天', after: '18 分钟', gain: '-99%' },
        { label: lang === 'zh' ? '工艺斜孔' : 'Process Holes', before: '12 个', after: '4 个', gain: '-66%' },
        { label: lang === 'zh' ? '总流阻压降' : 'Pressure Drop', before: '2.8 MPa', after: '2.18 MPa', gain: '-22%' },
      ],
      description:
        lang === 'zh'
          ? '大型锻压机主控阀块传统设计经常出现死角或因斜孔过多导致现场装配打压渗漏。SureFlow 利用多目标拓扑规划，自动将 8 个辅助斜孔重组为直角正交通道，不仅彻底避免干涉，还降低了深孔钻工艺难度。'
          : 'Large forging press manifolds frequently suffer from dead oil zones and high leakage risks due to auxiliary angled holes. SureFlow re-routed internal channels to reduce deep drilling difficulties and pressure loss.',
      bgClass: 'bg-block-cream',
    },
    {
      title: lang === 'zh' ? '海上风机变桨伺服高集成度控制阀组' : 'Offshore Wind Turbine Pitch Control Manifold',
      category: lang === 'zh' ? '清洁能源' : 'Clean Energy',
      specs: lang === 'zh' ? '材质：6061-T6 阳极氧化铝合金 | 外形：180 × 160 × 110 mm | 洁净等级：NAS 6' : 'Material: 6061-T6 Aluminum | Size: 180x160x110mm | Cleanliness: NAS 6',
      metrics: [
        { label: lang === 'zh' ? '死油腔容积' : 'Dead Cavity', before: '14.2 cm³', after: '5.1 cm³', gain: '-64%' },
        { label: lang === 'zh' ? '整体重量' : 'Weight', before: '6.8 kg', after: '5.3 kg', gain: '-22%' },
        { label: lang === 'zh' ? '校核周期' : 'Validation', before: '2 天', after: '实时秒级', gain: '实时' },
      ],
      description:
        lang === 'zh'
          ? '海上风电对集成块死区清洁度要求极高。SureFlow 的流道光滑过渡相贯线技术避免了油液长期停滞与杂质淤积，有效保护精密电液伺服阀芯。'
          : 'Offshore wind demands zero stagnant cavities to protect delicate electro-hydraulic servo valves. SureFlow smooth transition technology minimized contaminant accumulation.',
      bgClass: 'bg-block-coral',
    },
  ];

  return (
    <div className="bg-canvas text-ink py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-surface-soft text-ink text-xs font-mono font-medium">
            <Factory className="h-3.5 w-3.5" />
            <span>{lang === 'zh' ? '工业落地成效' : 'Industrial Impact'}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink">
            {t.casesPage.title}
          </h1>
          <p className="text-lg text-neutral-700 font-light">
            {t.casesPage.subtitle}
          </p>
        </div>

        {/* 详细案例列表 */}
        <div className="space-y-10">
          {fullCases.map((item, idx) => (
            <div
              key={idx}
              className={`${item.bgClass} p-8 sm:p-12 rounded-lg border border-black/10 space-y-6 shadow-xs`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/10 pb-4">
                <div>
                  <span className="text-xs font-mono text-neutral-800 font-semibold uppercase">{item.category}</span>
                  <h2 className="text-2xl font-bold text-ink mt-0.5">{item.title}</h2>
                </div>
                <span className="text-xs font-mono text-ink bg-canvas px-3 py-1.5 rounded-pill border border-black/10">
                  {item.specs}
                </span>
              </div>

              <p className="text-base text-neutral-800 leading-relaxed font-light max-w-4xl">
                {item.description}
              </p>

              {/* 性能对比卡片 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {item.metrics.map((m, mi) => (
                  <div key={mi} className="bg-canvas border border-black/10 p-5 rounded-md space-y-2 shadow-xs">
                    <span className="text-xs font-mono text-neutral-500 uppercase">{m.label}</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-neutral-400 line-through font-mono">{m.before}</span>
                      <span className="text-xl font-bold font-mono text-ink">{m.after}</span>
                    </div>
                    <div className="text-[11px] font-mono text-neutral-800 bg-surface-soft px-2.5 py-0.5 rounded-full inline-block font-semibold">
                      效益：{m.gain}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 底部按钮 */}
        <div className="text-center pt-8">
          <DownloadButton lang={lang} />
        </div>
      </div>
    </div>
  );
}
