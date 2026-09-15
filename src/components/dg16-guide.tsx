'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Layers,
  Crosshair,
  GitBranch,
  ShieldCheck,
  FileCheck2,
  Cpu,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FeatureShowcaseProps {
  lang: 'zh' | 'en';
}

interface FeatureStep {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  cadIcon: string;
  themeColor: string;
  accentBg: string;
  tag: string;
  metrics: { k: string; v: string }[];
  visualType: 'contour' | 'concentric' | 'flow' | 'tolerance' | 'solid';
}

export function FeatureShowcase({ lang }: FeatureShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);

  const isZh = lang === 'zh';

  const steps: FeatureStep[] = [
    {
      id: 'block-sizing',
      badge: 'FR-02',
      title: isZh ? '基准块体外廓' : 'Parametric Stock Geometry',
      subtitle: isZh ? '标准长方体基料或导入 STEP 异形几何' : 'Parametric rectangular stock or STEP geometry import',
      cadIcon: '/cad-icons/Block.svg',
      themeColor: '#8b5cf6', // violet
      accentBg: 'bg-violet-50 text-violet-700 border-violet-200',
      tag: '65 × 65 × 80 mm',
      metrics: [
        { k: isZh ? '基准面' : 'Base Face', v: 'Face-Z+ (0,0,0)' },
        { k: isZh ? '定位销' : 'Pin LP', v: '⌀4.0 mm (-10.5, -23)' },
        { k: isZh ? '公差' : 'Tolerance', v: 'ISO 2768-m' },
      ],
      visualType: 'contour',
    },
    {
      id: 'cavity-placement',
      badge: 'FR-04',
      title: isZh ? '二通插装阀孔切削' : 'Two-Way Cartridge Cavity',
      subtitle: isZh ? '沉孔阶梯同心布孔，毫秒级 CSG 实时布尔' : 'Stepped concentric counterbores with real-time CSG cut',
      cadIcon: '/cad-icons/TwoWayCartridgeValve.svg',
      themeColor: '#84cc16', // lime
      accentBg: 'bg-lime-50 text-lime-800 border-lime-300',
      tag: 'DIN ISO 7368 · CV16',
      metrics: [
        { k: isZh ? '阶梯孔径' : 'Bores', v: '⌀32 / ⌀25 / ⌀16 mm' },
        { k: isZh ? '切削深度' : 'Depth', v: '43.0 mm' },
        { k: isZh ? '布尔延迟' : 'Latency', v: '< 8 ms' },
      ],
      visualType: 'concentric',
    },
    {
      id: 'pilot-routing',
      badge: 'FR-03',
      title: isZh ? '先导油路与网络拓扑' : 'Pilot Channels & Netlist',
      subtitle: isZh ? 'P/T/A/B 语义拓扑关联，控制油路自动路由' : 'Semantic port mapping with automated pilot routing',
      cadIcon: '/cad-icons/Port.svg',
      themeColor: '#0284c7', // sky
      accentBg: 'bg-sky-50 text-sky-700 border-sky-200',
      tag: 'X / Y / Z1 / Z2 (⌀4mm)',
      metrics: [
        { k: isZh ? '控制孔位' : 'Pilot Ports', v: '4 Ports (±25mm)' },
        { k: isZh ? '连通间隙' : 'Orifice Gap', v: '≥ 2.5 mm' },
        { k: isZh ? '油口标准' : 'Standard', v: 'SAE J514 / ISO 6149' },
      ],
      visualType: 'flow',
    },
    {
      id: 'interference-check',
      badge: 'FR-05',
      title: isZh ? '全域干涉与壁厚诊断' : 'Interference & Wall Thickness',
      subtitle: isZh ? '智能探针秒级扫描紧固螺钉与孔壁间隙' : 'Sub-second clearance scan for fasteners and channel walls',
      cadIcon: '/cad-icons/BoltHole.svg',
      themeColor: '#f59e0b', // amber
      accentBg: 'bg-amber-50 text-amber-800 border-amber-300',
      tag: '4 × M8 (Pitch 46mm)',
      metrics: [
        { k: isZh ? '最小壁厚' : 'Min Wall', v: '≥ 3.0 mm (SAFE)' },
        { k: isZh ? '紧固孔距' : 'Bolt Pitch', v: '46.00 mm' },
        { k: isZh ? '扫描耗时' : 'Scan Time', v: '120 ms' },
      ],
      visualType: 'tolerance',
    },
    {
      id: 'step-export',
      badge: 'FR-09',
      title: isZh ? 'OCCT BRep 实体导出' : 'BRep Solid STEP Export',
      subtitle: isZh ? 'OpenCASCADE 内核逆向重构闭合流形 STEP' : 'OpenCASCADE reconstructs true watertight BRep STEP',
      cadIcon: '/cad-icons/ImportStep.svg',
      themeColor: '#10b981', // mint
      accentBg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      tag: 'STEP AP214 / AP203',
      metrics: [
        { k: isZh ? '拓扑状态' : 'Topology', v: 'Closed Manifold Solid' },
        { k: isZh ? '几何误差' : 'Tolerance', v: '≤ 0.01 mm' },
        { k: isZh ? '五轴加工' : 'CAM Spec', v: 'Siemens NX / Mastercam' },
      ],
      visualType: 'solid',
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.from('.pipeline-header', {
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

      // Cards interactive stagger entrance
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // Card entrance
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
          y: 50,
          scale: 0.96,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
        });

        // Sync active state
        ScrollTrigger.create({
          trigger: card,
          start: 'top 65%',
          end: 'bottom 40%',
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        });

        // Cool 3D Mouse Tilt interaction on each card
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(card, {
            rotationY: x * 0.04,
            rotationX: -y * 0.04,
            transformPerspective: 800,
            duration: 0.3,
            ease: 'power1.out',
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: 'power2.out',
          });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      {/* Section Header: Minimal text, punchy visual headline */}
      <div className="pipeline-header max-w-3xl mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-white/90 backdrop-blur-sm border border-hairline text-neutral-800 text-xs font-mono font-medium shadow-2xs">
          <Cpu className="h-3.5 w-3.5 text-neutral-600" />
          <span>{isZh ? 'DIN ISO 7368 · 工业设计链路' : 'DIN ISO 7368 DESIGN WORKFLOW'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-ink leading-tight">
          {isZh ? '从标准规范到实体制造' : 'From Standard Spec to Solid Manifold'}
        </h2>

        <p className="text-base sm:text-lg text-neutral-600 font-light">
          {isZh
            ? '背景图纸随滚动实时展开对应孔腔的 DrawSVG 激光线框。'
            : 'Background CAD drawing dynamically traces each cavity via DrawSVG laser lines as you scroll.'}
        </p>
      </div>

      {/* Main Grid: Left HUD Telemetry + Right Visual Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* Left: Sticky Precision HUD */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 z-20 space-y-4">
          <div className="rounded-2xl border border-hairline/90 bg-white/90 backdrop-blur-md p-6 shadow-sm space-y-5">
            {/* Header / Standard Tag */}
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-semantic-success animate-pulse" />
                  <span className="font-mono text-xs font-bold text-ink">DIN ISO 7368</span>
                </div>
                <p className="text-[11px] font-mono text-neutral-500">
                  {isZh ? 'DG16 标准二通插装阀' : 'DG16 2-Way Cartridge'}
                </p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-neutral-100 text-neutral-800 border border-hairline">
                65 × 65 mm
              </span>
            </div>

            {/* Step Visual Indicator */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-neutral-500 font-bold">
                <span>{isZh ? '阶段联动图符' : 'ACTIVE CAVITY ICON'}</span>
                <span>{String(activeStep + 1).padStart(2, '0')} / 05</span>
              </div>

              {/* Active CAD Preview Icon */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-soft/80 border border-hairline/80">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white border border-hairline shadow-2xs p-2 shrink-0">
                  <img
                    src={steps[activeStep]?.cadIcon}
                    alt={steps[activeStep]?.title}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-ink px-1.5 py-0.2 rounded bg-white border border-hairline">
                      {steps[activeStep]?.badge}
                    </span>
                    <span className="text-xs font-bold text-ink truncate">
                      {steps[activeStep]?.title}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-neutral-500 truncate">
                    {steps[activeStep]?.tag}
                  </p>
                </div>
              </div>
            </div>

            {/* Step Navigation Bar */}
            <div className="space-y-1.5 pt-1">
              {steps.map((st, idx) => {
                const isActive = idx === activeStep;
                return (
                  <div
                    key={st.id}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all duration-200 ${
                      isActive
                        ? 'bg-ink text-white shadow-xs font-semibold'
                        : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] opacity-70">{String(idx + 1).padStart(2, '0')}</span>
                      <span>{st.badge} · {st.title}</span>
                    </div>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: isActive ? '#fff' : st.themeColor }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Visual-first Feature Cards */}
        <div className="lg:col-span-8 space-y-8">
          {steps.map((step, idx) => {
            const isCurrent = idx === activeStep;

            return (
              <div
                key={step.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                data-feature-index={String(idx)}
                className={`group rounded-2xl p-6 sm:p-8 transition-all duration-300 border ${
                  isCurrent
                    ? 'border-ink bg-white/95 shadow-lg ring-1 ring-black/5'
                    : 'border-hairline/80 bg-white/80 backdrop-blur-md shadow-xs hover:border-neutral-400'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-5 border-b border-hairline/60">
                  {/* Left info */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-white px-2 py-0.5 rounded bg-ink">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-mono text-xs font-bold text-neutral-500 uppercase tracking-wider">
                        {step.badge}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold border ${step.accentBg}`}>
                        {step.tag}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 font-light">
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Right CAD vector visual illustration */}
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-xl bg-surface-soft/80 border border-hairline p-3 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <img
                      src={step.cadIcon}
                      alt={step.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>

                {/* Metrics Chip Matrix (Visual data, no wall of text) */}
                <div className="grid grid-cols-3 gap-3 pt-5">
                  {step.metrics.map((m) => (
                    <div
                      key={m.k}
                      className="rounded-xl bg-surface-soft/60 border border-hairline/60 p-3"
                    >
                      <p className="text-[10px] font-mono uppercase text-neutral-500">
                        {m.k}
                      </p>
                      <p className="text-xs sm:text-sm font-mono font-bold text-ink mt-0.5 truncate">
                        {m.v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
