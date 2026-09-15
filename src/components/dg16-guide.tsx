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
  ArrowDownRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FeatureShowcaseProps {
  lang: 'zh' | 'en';
}

interface FeatureCard {
  id: string;
  badge: string;
  title: string;
  desc: string;
  prdRef: string;
  specDetails: { label: string; val: string }[];
  highlightTarget: string;
  icon: React.ElementType;
}

export function FeatureShowcase({ lang }: FeatureShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);

  const isZh = lang === 'zh';

  const features: FeatureCard[] = [
    {
      id: 'block-sizing',
      badge: 'FR-02',
      title: isZh ? '块体基准外形定义' : 'Block Stock Sizing & Reference',
      desc: isZh
        ? '参数化生成标准长方体基料，或直接导入已有零件的 STEP AP203/AP214 异形几何。任意拾取六个正交面或法向倾斜面作为第一布孔安装面。'
        : 'Generate parametric rectangular block stock or import existing STEP AP203/AP214 non-standard geometry. Pick any orthogonal or angled mounting surface to begin placement.',
      prdRef: isZh ? '规则体 & STEP AP203/AP214 基准导入' : 'Rectangular stock & STEP AP203/AP214 reference import',
      specDetails: [
        { label: isZh ? '基准尺寸' : 'Stock Dimension', val: '65 × 65 × 80 mm' },
        { label: isZh ? '坐标原点' : 'Origin', val: 'Face Center (0, 0, 0)' },
        { label: isZh ? '公差等级' : 'Tolerance Class', val: 'ISO 2768-m' },
      ],
      highlightTarget: isZh ? '背景高亮：65×65mm 外形轮廓与定位销 LP' : 'Background: 65×65mm Outline & Locating Pin LP',
      icon: Layers,
    },
    {
      id: 'cavity-placement',
      badge: 'FR-04',
      title: isZh ? '参数化孔腔布设与布尔' : 'Parametric Cavity Placement & Boolean',
      desc: isZh
        ? '从标准孔腔库中拖拽二通插装阀孔模板至安装面，精确指定相对坐标与沉孔深度。基于 CSG 引擎实现毫秒级实时布尔切削与网格渲染。'
        : 'Drag 2-way cartridge valve cavity templates directly to the mounting face with exact coordinates and counterbore depth. Real-time CSG boolean cut with live mesh feedback.',
      prdRef: isZh ? '阶梯沉孔 · 螺纹公差 · 毫秒级 CSG 预览' : 'Stepped counterbores · Thread tolerances · Live CSG cut',
      specDetails: [
        { label: isZh ? '主阀孔径' : 'Main Bore', val: '⌀32 / ⌀25 / ⌀16 mm' },
        { label: isZh ? '装配深度' : 'Depth', val: '43.0 mm (Standard)' },
        { label: isZh ? '孔道轴向' : 'Axis Alignment', val: 'Normal to Face (Z-)' },
      ],
      highlightTarget: isZh ? '背景高亮：CV ⌀32/25/16 阶梯孔同心沉切环' : 'Background: CV ⌀32/25/16 Stepped Concentric Rings',
      icon: Crosshair,
    },
    {
      id: 'pilot-routing',
      badge: 'FR-03',
      title: isZh ? '先导油路与孔腔库拓扑' : 'Pilot Routing & Cavity Library',
      desc: isZh
        ? '内置标准库涵盖插装阀孔、ISO 4401 板式阀面与 SAE 油口模板。支持先导控制油孔（X/Y/Z1/Z2）连通拓扑构建与 P/T/A/B 语义流向关联。'
        : 'Built-in library includes cartridge cavities, ISO 4401 subplates, and SAE port templates. Connect pilot channels (X/Y/Z1/Z2) and assign P/T/A/B semantic netlists.',
      prdRef: isZh ? '拖拽布设 · JSON 扩展 · 企业私有库' : 'Drag-to-place · JSON schema · Enterprise custom libraries',
      specDetails: [
        { label: isZh ? '控制油口' : 'Pilot Ports', val: 'X, Y, Z1, Z2 (⌀4 mm)' },
        { label: isZh ? '连通净距' : 'Orifice Gap', val: '2.5 mm minimum' },
        { label: isZh ? '拓扑语义' : 'Netlist Semantic', val: 'DIN ISO 7368 Standard' },
      ],
      highlightTarget: isZh ? '背景高亮：先导油口 X/Y/Z1/Z2 连通矢量' : 'Background: Pilot Channels X/Y/Z1/Z2 Vectors',
      icon: GitBranch,
    },
    {
      id: 'interference-check',
      badge: 'FR-05',
      title: isZh ? '壁厚诊断与全局干涉检查' : 'Interference & Wall Thickness Diagnostics',
      desc: isZh
        ? '一键扫描全块体内部复杂油网，毫秒级检测钻孔贯通、最小允许壁厚违规与螺栓紧固干涉，并在视口中以三维热力色块精准定位隐患。'
        : 'One-click scan of complex internal hydraulic netlists. Sub-second detection of channel puncture, minimum wall thickness violations, and bolt interference with 3D diagnostics.',
      prdRef: isZh ? '100+ 孔道全量检查 ≤ 1s · 3D 红色高亮' : 'Full check for 100+ cavities ≤ 1s · 3D Conflict Highlights',
      specDetails: [
        { label: isZh ? '紧固孔径' : 'Fasteners', val: '4 × M8 (Pitch: 46mm)' },
        { label: isZh ? '最小壁厚' : 'Min Wall Spec', val: '≥ 3.0 mm (Safe Zone)' },
        { label: isZh ? '扫描性能' : 'Performance', val: '≤ 120ms (DG16 Sub-tree)' },
      ],
      highlightTarget: isZh ? '背景高亮：4×M8 螺栓安全壁厚检测容差环' : 'Background: 4×M8 Bolt Safety Tolerance Clearance Rings',
      icon: ShieldCheck,
    },
    {
      id: 'step-export',
      badge: 'FR-09',
      title: isZh ? 'OCCT BRep 实体流形闭环与 STEP 导出' : 'OCCT BRep Solid Rebuild & STEP Export',
      desc: isZh
        ? '超越传统网格简化，借助底层 OpenCASCADE 几何内核将布尔特征逆向求解为纯正 BRep 边界表示实体，直接输出用于五轴加工与 FEA 的标准 STEP AP214。'
        : 'Moving beyond mesh approximation, OpenCASCADE (OCCT) geometry kernel reconstructs true BRep solids for 5-axis CAM machining and FEA validation in standard STEP AP214.',
      prdRef: isZh ? 'OCCT 几何内核 · 实体转换误差 ≤ 0.01mm' : 'OCCT geometry kernel · solid tolerance ≤ 0.01mm',
      specDetails: [
        { label: isZh ? '导出标准' : 'Export Standard', val: 'ISO 10303-21 (STEP AP214)' },
        { label: isZh ? '几何形态' : 'Topology Type', val: 'Manifold Closed BRep Solid' },
        { label: isZh ? '数控加工' : 'CAM Compatibility', val: 'Siemens NX / Mastercam / CATIA' },
      ],
      highlightTarget: isZh ? '背景高亮：全拓扑闭环 · 标准 STEP 实体就绪' : 'Background: Full Topology Closed · STEP Solid Ready',
      icon: FileCheck2,
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.from('.feature-pipeline-header', {
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

      // Animate each card
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        });

        // Update active step state for sidebar sync
        ScrollTrigger.create({
          trigger: card,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      {/* Section Header */}
      <div className="feature-pipeline-header max-w-3xl mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-white/90 backdrop-blur-sm border border-hairline text-neutral-800 text-xs font-mono font-medium shadow-2xs">
          <Cpu className="h-3.5 w-3.5 text-neutral-600" />
          <span>{isZh ? '全链路工程设计管道' : 'FULL ENGINEERING DESIGN PIPELINE'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-ink leading-tight">
          {isZh ? '由 DG16 标准图纸驱动的五大核心能力' : 'Five Core Capabilities Driven by DG16 Standard'}
        </h2>

        <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-light">
          {isZh
            ? '全页面背景中的 DIN ISO 7368 二通插装阀标准图纸与右侧卡片实时联动。向下滚动，见证由外形定义、孔腔布设、先导油路、壁厚干涉到最终 STEP 实体导出的全流程。'
            : 'The DIN ISO 7368 cartridge valve drawing in the background responds directly to each feature card. Scroll down to experience the complete workflow from stock sizing to STEP solid export.'}
        </p>
      </div>

      {/* Main Grid: Left Sticky Telemetry HUD + Right Feature Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Sticky Engineering HUD Bar */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 z-20 space-y-4">
          <div className="rounded-2xl border border-hairline/80 bg-white/85 backdrop-blur-md p-6 shadow-xs space-y-5">
            {/* Header / Standard specification info */}
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-semantic-success animate-pulse" />
                  <span className="font-mono text-xs font-bold text-ink">DIN ISO 7368</span>
                </div>
                <p className="text-[11px] font-mono text-neutral-500">
                  {isZh ? '二通插装阀安装面 DG16' : '2-Way Cartridge Surface DG16'}
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full font-mono text-[10px] font-bold bg-neutral-100 text-neutral-700 border border-hairline">
                65 × 65 mm
              </span>
            </div>

            {/* Current Pipeline Step Telemetry */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-600 font-bold">
                {isZh ? '当前联动特征阶段' : 'CURRENT PIPELINE STAGE'}
              </span>
              <div className="p-3 rounded-lg bg-surface-soft/80 border border-hairline/70 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-ink px-1.5 py-0.5 rounded bg-white border border-hairline">
                    {features[activeStep]?.badge}
                  </span>
                  <span className="text-xs font-semibold text-ink truncate">
                    {features[activeStep]?.title}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-neutral-600 flex items-center gap-1 pt-1">
                  <ArrowDownRight className="h-3 w-3 text-neutral-500 shrink-0" />
                  <span className="truncate">{features[activeStep]?.highlightTarget}</span>
                </p>
              </div>
            </div>

            {/* Step navigation indicator pills */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-600 font-bold">
                {isZh ? '设计链路进度' : 'PIPELINE PROGRESS'}
              </span>
              <div className="space-y-1.5">
                {features.map((feat, idx) => {
                  const isActive = idx === activeStep;
                  const Icon = feat.icon;
                  return (
                    <div
                      key={feat.id}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all duration-200 ${
                        isActive
                          ? 'bg-ink text-white shadow-xs font-semibold'
                          : 'bg-neutral-50/70 text-neutral-600 hover:bg-neutral-100/80'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                        <span>{String(idx + 1).padStart(2, '0')}. {feat.badge}</span>
                      </div>
                      <span className="text-[11px] opacity-80">
                        {isActive ? (isZh ? '联动激活' : 'ACTIVE') : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Background driver note */}
            <div className="pt-2 text-[11px] font-mono text-neutral-600 leading-relaxed border-t border-hairline">
              💡 {isZh
                ? '提示：背景中的 DG16 坐标图正在随页面滚动实时调整高亮图元与壁厚标尺。'
                : 'Notice: Background DG16 CAD blueprint highlights and tolerance gauges adapt in real time as you scroll.'}
            </div>
          </div>
        </div>

        {/* Right: Scrolling Feature Cards */}
        <div className="lg:col-span-8 space-y-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const isCurrent = idx === activeStep;

            return (
              <div
                key={feature.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                data-feature-index={String(idx)}
                className={`group rounded-2xl p-7 sm:p-9 transition-all duration-300 border ${
                  isCurrent
                    ? 'border-ink/70 bg-white/95 shadow-md ring-1 ring-black/5'
                    : 'border-hairline/80 bg-white/80 backdrop-blur-md shadow-xs hover:border-neutral-400'
                }`}
              >
                <div className="space-y-5">
                  {/* Card top badge row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-ink text-white font-mono text-xs font-bold">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-mono text-xs font-bold text-neutral-500 tracking-wider">
                        PRD-{feature.badge}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-surface-soft text-neutral-700 border border-hairline">
                      <Icon className="h-3.5 w-3.5" />
                      <span>{feature.badge}</span>
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-700 font-light leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>

                  {/* Technical Spec Metrics Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {feature.specDetails.map((spec) => (
                      <div
                        key={spec.label}
                        className="rounded-lg bg-surface-soft/60 border border-hairline/60 p-3"
                      >
                        <p className="text-[10px] font-mono uppercase text-neutral-500">
                          {spec.label}
                        </p>
                        <p className="text-xs font-mono font-bold text-ink mt-0.5">
                          {spec.val}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* PRD Reference Tag */}
                  <div className="pt-2 flex items-center justify-between text-xs font-mono text-neutral-500 border-t border-hairline/60">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
                      <span>{feature.prdRef}</span>
                    </span>
                    <span className="text-[11px] text-neutral-500 hidden sm:inline">
                      {feature.highlightTarget}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
