'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FeatureShowcaseProps {
  lang: 'zh' | 'en';
}

/* ------------------------------------------------------------------ */
/*  DG16 真实几何数据 (from library.sflib)                              */
/*  outline: 65×65mm rect, center at (0,0)                            */
/*  CV:  (0,0)     cartridge-valve  ⌀32/25/16                        */
/*  LP:  (-10.5,23) locating-pin    ⌀4                               */
/*  X:   (-25,0)    drill-hole      ⌀4                               */
/*  Y:   (25,0)     drill-hole      ⌀4                               */
/*  Z1:  (0,25)     drill-hole      ⌀4                               */
/*  Z2:  (0,-25)    drill-hole      ⌀4                               */
/*  BH1: (23,23)    bolt-hole       M8                                */
/*  BH2: (23,-23)   bolt-hole       M8                                */
/*  BH3: (-23,-23)  bolt-hole       M8                                */
/*  BH4: (-23,23)   bolt-hole       M8                                */
/* ------------------------------------------------------------------ */

interface FeatureCard {
  id: string;
  highlightGroup: string; // which SVG group to highlight
  title: string;
  desc: string;
  badge: string;
  prdRef: string;
}

export function FeatureShowcase({ lang }: FeatureShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  const isZh = lang === 'zh';

  const features: FeatureCard[] = [
    {
      id: 'block-sizing',
      highlightGroup: 'outline',
      badge: 'FR-02',
      title: isZh ? '块体外形定义' : 'Block Stock Sizing',
      desc: isZh
        ? '参数化长方体或导入 STEP 异形外形作为基准几何，拾取安装面即可开始布孔。'
        : 'Parametric rectangular stock or imported STEP reference geometry. Pick a mounting face to begin.',
      prdRef: isZh ? '支持规则体与 STEP AP203/AP214 导入' : 'Supports rectangular stock & STEP AP203/AP214 import',
    },
    {
      id: 'cavity-placement',
      highlightGroup: 'cv',
      badge: 'FR-04',
      title: isZh ? '参数化孔腔布设' : 'Parametric Cavity Placement',
      desc: isZh
        ? '从标准孔腔库中拖拽模板至安装面，精确指定坐标、方向与深度，实时 mesh 布尔渲染。'
        : 'Drag from the cavity library to a mounting face. Define coordinates, orientation, and depth with real-time mesh boolean.',
      prdRef: isZh ? '阶梯沉孔 · 螺纹接口 · 工艺堵孔' : 'Step bores · Threaded ports · Construction plugs',
    },
    {
      id: 'pilot-routing',
      highlightGroup: 'pilot',
      badge: 'FR-03',
      title: isZh ? '油路连通与孔腔库' : 'Cavity Library & Port Routing',
      desc: isZh
        ? '内置标准库涵盖插装阀孔、ISO 4401 板式阀面与 SAE 油口模板，支持 P/T/A/B 语义标注与自定义扩展。'
        : 'Built-in standard library covers cartridge valves, ISO 4401 subplates, and SAE port templates with P/T/A/B semantic tags.',
      prdRef: isZh ? '拖拽布孔 · JSON 扩展 · 企业私有库' : 'Drag to place · JSON schema · Enterprise custom libraries',
    },
    {
      id: 'interference-check',
      highlightGroup: 'bolts',
      badge: 'FR-05',
      title: isZh ? '干涉与壁厚检查' : 'Interference & Wall Thickness Check',
      desc: isZh
        ? '自动检测孔道穿透、最小壁厚不足与元件碰撞，3D 高亮冲突区域并生成诊断报告。'
        : 'Auto-detect channel puncture, minimum wall thickness violations, and component collisions with 3D-highlighted diagnostics.',
      prdRef: isZh ? '100+ 孔道全量检查 ≤ 1s' : 'Full check for 100+ cavities ≤ 1s',
    },
    {
      id: 'step-export',
      highlightGroup: 'all',
      badge: 'FR-09',
      title: isZh ? 'STEP 实体导出' : 'STEP Solid Export',
      desc: isZh
        ? '基于 OpenCASCADE (OCCT) 将 mesh 布尔结果重建为高保真 BRep 实体，直出标准 STEP AP214。'
        : 'Rebuild mesh boolean results into high-fidelity BRep solids via OpenCASCADE (OCCT) for STEP AP214 export.',
      prdRef: isZh ? 'mesh→solid 转换误差 ≤ 0.01mm' : 'mesh→solid conversion tolerance ≤ 0.01mm',
    },
  ];

  // Color palette for each highlight state
  const highlightColors: Record<string, string> = {
    outline: '#c4b5fd',  // violet-300
    cv: '#bef264',       // lime-300
    pilot: '#7dd3fc',    // sky-300
    bolts: '#fcd34d',    // amber-300
    all: '#6ee7b7',      // emerald-300
  };

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      
      // Entrance animation for the entire section
      gsap.from('.dg16-section-title', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Each card triggers a highlight change on the SVG
      cards.forEach((card, i) => {
        const feature = features[i];
        if (!feature) return;

        // Card entrance animation
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
          y: 60,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.05,
        });

        // SVG highlight animation tied to card scroll position
        ScrollTrigger.create({
          trigger: card,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => animateHighlight(feature.highlightGroup),
          onEnterBack: () => animateHighlight(feature.highlightGroup),
        });
      });

    }, containerRef);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animateHighlight = (group: string) => {
    if (!svgRef.current) return;
    const svg = svgRef.current;

    // Reset all groups to dim
    const allGroups = svg.querySelectorAll('[data-hl-group]');
    allGroups.forEach((g) => {
      gsap.to(g, {
        opacity: 0.25,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
        transformOrigin: 'center center',
      });
    });

    // Always keep outline visible
    const outlineEl = svg.querySelector('[data-hl-group="outline"]');
    if (outlineEl) {
      const isOutlineActive = group === 'outline' || group === 'all';
      gsap.to(outlineEl, {
        opacity: isOutlineActive ? 1 : 0.5,
        strokeWidth: isOutlineActive ? 2 : 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    if (group === 'all') {
      // Highlight everything
      allGroups.forEach((g) => {
        gsap.to(g, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        });
      });

      // Pulse animation on all
      const fillColor = highlightColors[group];
      const cvFill = svg.querySelector('[data-fill="cv-inner"]');
      if (cvFill) {
        gsap.to(cvFill, { fill: fillColor, duration: 0.5 });
      }
    } else {
      // Highlight the specific group
      const target = svg.querySelector(`[data-hl-group="${group}"]`);
      if (target) {
        gsap.to(target, {
          opacity: 1,
          scale: 1.03,
          duration: 0.5,
          ease: 'back.out(1.4)',
          transformOrigin: 'center center',
        });
      }

      // Update CV inner fill color to match current highlight theme
      const fillColor = highlightColors[group] || '#e5e7eb';
      const cvFill = svg.querySelector('[data-fill="cv-inner"]');
      if (cvFill) {
        gsap.to(cvFill, { fill: fillColor, duration: 0.5 });
      }
    }

    // Update progress indicator
    if (progressRef.current) {
      const idx = features.findIndex((f) => f.highlightGroup === group);
      const pips = progressRef.current.querySelectorAll('[data-pip]');
      pips.forEach((pip, j) => {
        gsap.to(pip, {
          backgroundColor: j === idx ? '#000' : '#d4d4d4',
          scaleX: j === idx ? 2.5 : 1,
          duration: 0.3,
        });
      });
    }
  };

  return (
    <section ref={containerRef} className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Section header */}
      <div className="dg16-section-title max-w-2xl mb-16 space-y-3">
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-semibold">
          {isZh ? '核心设计链路 · DIN ISO 7368 导引' : 'CORE WORKFLOW · DIN ISO 7368 GUIDED'}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
          {isZh ? '从块体到成品的完整设计流程' : 'Complete Design Pipeline, Block to Export'}
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
          {isZh
            ? '滚动浏览各阶段功能特性。左侧 DG16 标准二通插装阀安装面图纸随之联动高亮，直观呈现孔腔几何在设计流中的变化。'
            : 'Scroll through each workflow stage. The DG16 standard 2-way cartridge mounting pattern on the left highlights in sync, visualizing how cavity geometry evolves through the design pipeline.'}
        </p>
      </div>

      {/* Main layout: sticky SVG left, scrolling cards right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

        {/* Left: Sticky DG16 SVG navigator */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 z-10">
          <div className="rounded-2xl border border-hairline bg-white/95 backdrop-blur-sm shadow-sm p-5 space-y-4">
            {/* Title bar */}
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-ink text-white">DG16</span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">DIN ISO 7368</span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">65 × 65 mm</span>
            </div>

            {/* SVG viewport */}
            <div className="relative aspect-square w-full rounded-xl bg-neutral-50/80 border border-hairline/60 p-3 overflow-hidden">
              {/* Dot grid background */}
              <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#d1d5db_0.8px,transparent_0.8px)] [background-size:12px_12px]" />

              <svg
                ref={svgRef}
                viewBox="-46 -46 92 92"
                className="w-full h-full overflow-visible"
              >
                {/* Center cross hair */}
                <line x1="-40" y1="0" x2="40" y2="0" stroke="#e5e7eb" strokeWidth="0.4" strokeDasharray="2 1.5" />
                <line x1="0" y1="-40" x2="0" y2="40" stroke="#e5e7eb" strokeWidth="0.4" strokeDasharray="2 1.5" />

                {/* Outline group */}
                <g data-hl-group="outline">
                  <rect
                    x="-32.5" y="-32.5" width="65" height="65" rx="1"
                    fill="white" stroke="#000" strokeWidth="1.2"
                  />
                  {/* Corner dimension marks */}
                  <line x1="-32.5" y1="-36" x2="-32.5" y2="-33" stroke="#a3a3a3" strokeWidth="0.3" />
                  <line x1="32.5" y1="-36" x2="32.5" y2="-33" stroke="#a3a3a3" strokeWidth="0.3" />
                  <line x1="-32.5" y1="-35" x2="32.5" y2="-35" stroke="#a3a3a3" strokeWidth="0.25" />
                  <text x="0" y="-37" textAnchor="middle" className="text-[2.6px] font-mono fill-neutral-400">65</text>

                  {/* LP locating pin */}
                  <circle cx="-10.5" cy="-23" r="2" fill="#d4d4d8" stroke="#737373" strokeWidth="0.6" />
                  <text x="-10.5" y="-26.5" textAnchor="middle" className="text-[2.5px] font-mono fill-neutral-500">LP</text>
                </g>

                {/* CV main cavity group */}
                <g data-hl-group="cv">
                  <circle cx="0" cy="0" r="16" fill="#f5f5f5" stroke="#525252" strokeWidth="0.8" />
                  <circle cx="0" cy="0" r="12.5" fill="#fafafa" stroke="#737373" strokeWidth="0.6" />
                  <circle data-fill="cv-inner" cx="0" cy="0" r="8" fill="#e5e7eb" stroke="#525252" strokeWidth="1" />
                  <text x="0" y="0.8" textAnchor="middle" className="text-[3px] font-mono font-bold fill-neutral-700">CV</text>
                  <text x="0" y="4" textAnchor="middle" className="text-[2px] font-mono fill-neutral-400">⌀32/25/16</text>
                </g>

                {/* Pilot holes group */}
                <g data-hl-group="pilot">
                  <circle cx="-25" cy="0" r="2" fill="#e5e7eb" stroke="#737373" strokeWidth="0.6" />
                  <text x="-29.5" y="0.8" textAnchor="end" className="text-[2.5px] font-mono fill-neutral-500">X</text>

                  <circle cx="25" cy="0" r="2" fill="#e5e7eb" stroke="#737373" strokeWidth="0.6" />
                  <text x="29.5" y="0.8" textAnchor="start" className="text-[2.5px] font-mono fill-neutral-500">Y</text>

                  <circle cx="0" cy="-25" r="2" fill="#e5e7eb" stroke="#737373" strokeWidth="0.6" />
                  <text x="0" y="-28" textAnchor="middle" className="text-[2.5px] font-mono fill-neutral-500">Z1</text>

                  <circle cx="0" cy="25" r="2" fill="#e5e7eb" stroke="#737373" strokeWidth="0.6" />
                  <text x="0" y="30" textAnchor="middle" className="text-[2.5px] font-mono fill-neutral-500">Z2</text>
                </g>

                {/* Bolt holes group */}
                <g data-hl-group="bolts">
                  {[
                    [23, -23, 'BH1'],
                    [23, 23, 'BH2'],
                    [-23, 23, 'BH3'],
                    [-23, -23, 'BH4'],
                  ].map(([cx, cy, label]) => (
                    <g key={label as string}>
                      <circle cx={cx as number} cy={cy as number} r="4" fill="#f5f5f5" stroke="#737373" strokeWidth="0.6" />
                      <circle cx={cx as number} cy={cy as number} r="3.375" fill="none" stroke="#a3a3a3" strokeWidth="0.3" strokeDasharray="1.2 0.8" />
                    </g>
                  ))}
                </g>
              </svg>
            </div>

            {/* Progress pips */}
            <div ref={progressRef} className="flex items-center justify-center gap-1.5 pt-1">
              {features.map((_, i) => (
                <div
                  key={i}
                  data-pip
                  className="h-1.5 w-3 rounded-full bg-neutral-300 transition-all origin-center"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Scrolling feature cards */}
        <div className="lg:col-span-7 space-y-8 lg:space-y-12">
          {features.map((feature, idx) => (
            <div
              key={feature.id}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="group rounded-2xl border border-hairline bg-white p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow duration-300"
            >
              <div className="space-y-4">
                {/* Badge row */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] font-bold px-2.5 py-1 rounded-md bg-ink text-white">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[11px] text-neutral-400 font-medium uppercase tracking-wider">
                    {feature.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-ink leading-snug">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-600 leading-relaxed font-light">
                  {feature.desc}
                </p>

                {/* PRD spec tag */}
                <div className="pt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-neutral-100 text-neutral-600 border border-hairline/60">
                    {feature.prdRef}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Spacer for scroll room */}
          <div className="h-20" />
        </div>
      </div>
    </section>
  );
}
