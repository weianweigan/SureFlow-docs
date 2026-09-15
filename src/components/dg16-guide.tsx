'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Layers, ShieldCheck, Cpu, Sliders, CheckCircle2 } from 'lucide-react';

interface DG16GuideProps {
  lang: 'zh' | 'en';
}

interface StepInfo {
  id: string;
  stepNumber: string;
  title: string;
  badge: string;
  cavityTarget: string;
  highlightHoles: string[];
  highlightOutline: boolean;
  colorClass: string;
  tags: string[];
  specSummary: { label: string; value: string }[];
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function DG16Guide({ lang }: DG16GuideProps) {
  const [activeStep, setActiveStep] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isZh = lang === 'zh';

  const steps: StepInfo[] = [
    {
      id: 'step-datum',
      stepNumber: '01',
      title: isZh ? '安装面轮廓与基准定位' : 'Mounting Face & Datum Pin',
      badge: 'DIN ISO 7368 / 65×65mm',
      cavityTarget: isZh ? '外轮廓 65×65mm + 定位销孔 LP' : 'Outline 65×65mm + Locating Pin LP',
      highlightHoles: ['LP'],
      highlightOutline: true,
      colorClass: 'bg-violet-50/70 border-violet-200 text-violet-950',
      tags: isZh ? ['65×65mm 正方轮廓', '⌀4mm 定位防呆', '法向零公差贴合'] : ['65×65mm Rect Outline', '⌀4mm Foolproof Pin', 'Zero-tolerance Align'],
      specSummary: [
        { label: isZh ? '轮廓类型' : 'Outline Type', value: 'Rect (65×65 mm)' },
        { label: isZh ? '定位孔 LP' : 'Pin Cavity LP', value: '⌀4.0 mm, Depth 4.8 mm' },
        { label: isZh ? '坐标位置' : 'Position', value: 'X: -10.5, Y: +23.0' },
      ],
      desc: isZh
        ? '拾取阀块设计表面，法向自动吸附；通过偏置定位销消除安装对称歧义。'
        : 'Aligns automatically to the manifold face; asymmetric locating pin eliminates mounting ambiguity.',
      icon: Layers,
    },
    {
      id: 'step-main-cavity',
      stepNumber: '02',
      title: isZh ? '主插装通径与阶梯沉孔' : 'Main Cartridge Cavity CV',
      badge: '31.5 MPa / 2-Way Valve',
      cavityTarget: isZh ? '中心主插装孔 CV (⌀32 / ⌀25 / ⌀16)' : 'Main Cavity CV (⌀32 / ⌀25 / ⌀16)',
      highlightHoles: ['CV'],
      highlightOutline: false,
      colorClass: 'bg-lime-50/70 border-lime-200 text-lime-950',
      tags: isZh ? ['三级同心阶梯', 'A/B 主流道通径', '微秒级布尔差集'] : ['3-tier Concentric Steps', 'Main Ports A/B', 'Microsecond Boolean'],
      specSummary: [
        { label: isZh ? '导向沉孔' : 'Pilot Bore', value: '⌀32 mm × L43 mm' },
        { label: isZh ? '阀套沉孔' : 'Sleeve Bore', value: '⌀25 mm × L13 mm' },
        { label: isZh ? '主油口' : 'Main Port', value: '⌀16 mm, 118° Cone Tip' },
      ],
      desc: isZh
        ? '参数化生成标准插装阀阶梯腔，自动切削 A/B 主高压流道并建立装配干涉包络。'
        : 'Generates standard cartridge step bores, connects main A/B ports and builds interference clearance envelope.',
      icon: Cpu,
    },
    {
      id: 'step-pilot',
      stepNumber: '03',
      title: isZh ? '先导控制油路网络' : 'Pilot Control Ports X/Y/Z',
      badge: '4-Way Pilot Matrix',
      cavityTarget: isZh ? '先导孔组 X(-25,0), Y(25,0), Z1(0,25), Z2(0,-25)' : 'Pilot Holes X(-25,0), Y(25,0), Z1(0,25), Z2(0,-25)',
      highlightHoles: ['X', 'Y', 'Z1', 'Z2'],
      highlightOutline: false,
      colorClass: 'bg-sky-50/70 border-sky-200 text-sky-950',
      tags: isZh ? ['4×⌀4mm 细长孔', '盖板控制逻辑', '三维交叉动态测算'] : ['4×⌀4mm Deep Holes', 'Cover Control Logic', '3D Intersection Check'],
      specSummary: [
        { label: isZh ? '孔径公差' : 'Diameter', value: '4 × ⌀4.0 mm' },
        { label: isZh ? '进深' : 'Drill Depth', value: '8.8 mm (118° Tip)' },
        { label: isZh ? '油路映射' : 'Channel Map', value: 'X (Ctrl), Y (Drain), Z1/Z2 (Pilot)' },
      ],
      desc: isZh
        ? '控制油口与内部斜孔三维交汇，实时动态测算连通截面积与壁厚冗余。'
        : 'Control ports intersect with internal angled passages; computes real-time effective flow area and clearance.',
      icon: Sliders,
    },
    {
      id: 'step-bolts',
      stepNumber: '04',
      title: isZh ? '受压紧固螺栓孔组' : 'Mounting Bolt Pattern BH1-4',
      badge: '4 × M8 × 1.25 Metric',
      cavityTarget: isZh ? '螺栓孔 BH1~BH4 (46×46mm 阵列)' : 'Bolt Holes BH1~BH4 (46×46mm Array)',
      highlightHoles: ['BH1', 'BH2', 'BH3', 'BH4'],
      highlightOutline: false,
      colorClass: 'bg-amber-50/70 border-amber-200 text-amber-950',
      tags: isZh ? ['4×M8 螺纹孔', '有效旋合深度 16mm', '防干涉安全圆柱'] : ['4×M8 Threaded Holes', 'Thread Depth 16mm', 'Interference Safety Ring'],
      specSummary: [
        { label: isZh ? '螺纹规格' : 'Thread Spec', value: 'M8×1.25-6H, Depth 16mm' },
        { label: isZh ? '底孔孔径' : 'Tap Drill', value: '⌀6.75 mm' },
        { label: isZh ? '分布间距' : 'Pitch', value: '46.0 × 46.0 mm (Symmetric)' },
      ],
      desc: isZh
        ? '根据 31.5 MPa 额定预紧应力布设，自动在内流道与螺栓底孔间保留安全隔离区。'
        : 'Arranged for 31.5 MPa preload tension; automatically maintains safety clearance to adjacent internal passages.',
      icon: ShieldCheck,
    },
    {
      id: 'step-complete',
      stepNumber: '05',
      title: isZh ? '全拓扑校验与无损导出' : 'Topology Verified & STEP Export',
      badge: 'Ready for Machining',
      cavityTarget: isZh ? '全孔腔装配校验完毕 (Clean Pass)' : 'Complete Assembly Verified (Clean Pass)',
      highlightHoles: ['CV', 'LP', 'X', 'Y', 'Z1', 'Z2', 'BH1', 'BH2', 'BH3', 'BH4'],
      highlightOutline: true,
      colorClass: 'bg-emerald-50/70 border-emerald-200 text-emerald-950',
      tags: isZh ? ['壁厚 ≥ 3.5mm 安全', '零未闭合孤立流道', 'OpenCASCADE 原生导出'] : ['Clearance ≥ 3.5mm OK', 'Zero Dead-ends', 'OpenCASCADE Native Export'],
      specSummary: [
        { label: isZh ? '空间干涉' : 'Collisions', value: '0 (Zero Error)' },
        { label: isZh ? '最小壁厚' : 'Min Wall', value: '4.2 mm (> 3.5mm Pass)' },
        { label: isZh ? '交换格式' : 'Format', value: 'STEP AP214 / AP242' },
      ],
      desc: isZh
        ? '一键完成全块体孔腔干涉与最小壁厚体素扫描，直通五轴加工机床或 CAD 系统。'
        : 'One-click verification for cavity collision and minimum wall thickness, ready for CNC or CAD export.',
      icon: CheckCircle2,
    },
  ];

  // 滚动监听联动
  useEffect(() => {
    const handleScroll = () => {
      const triggerY = window.innerHeight * 0.45;
      let closestIdx = 0;
      let minDistance = Infinity;

      cardRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - triggerY);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveStep(closestIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStep = (idx: number) => {
    setActiveStep(idx);
    const target = cardRefs.current[idx];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const currentStep = steps[activeStep] || steps[0];

  return (
    <div className="relative">
      {/* 双列响应式布局：左侧 Sticky 工业图纸导引，右侧卡片流 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* 左侧：固定悬浮的 DG16 真实工程导引图 (Sticky on Desktop) */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 z-10">
          <div className="rounded-2xl border border-hairline bg-white/95 backdrop-blur shadow-sm p-6 space-y-5">
            
            {/* 顶栏规格标头 */}
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-ink text-white">
                    DG16
                  </span>
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                    DIN ISO 7368-EB-16-2-A
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-ink mt-1">
                  {isZh ? '标准二通插装阀安装面导引' : 'Standard 2-Way Cartridge Cavity Pattern'}
                </h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-neutral-100 text-neutral-700 font-medium">
                STEP {currentStep.stepNumber} / 05
              </span>
            </div>

            {/* 精确 SVG 机械图纸视口 (基于 library.sflib 真实几何) */}
            <div className="relative aspect-square w-full rounded-xl bg-neutral-50 border border-hairline/80 flex items-center justify-center p-4 overflow-hidden select-none">
              
              {/* 背景细发丝网格与基准十字标 */}
              <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <svg
                viewBox="-48 -48 96 96"
                className="w-full h-full max-w-[420px] max-h-[420px] overflow-visible drop-shadow-xs"
              >
                {/* 1. 中心网格中心线 */}
                <line x1="-42" y1="0" x2="42" y2="0" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="0" y1="-42" x2="0" y2="42" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />
                
                {/* 2. 外轮廓: 65×65mm 正方形 (M-32.5,-32.5H32.5V32.5H-32.5V-32.5Z) */}
                <rect
                  x="-32.5"
                  y="-32.5"
                  width="65"
                  height="65"
                  rx="1.5"
                  className={`transition-all duration-500 cursor-pointer ${
                    currentStep.highlightOutline
                      ? 'stroke-ink stroke-[1.8] fill-neutral-200/40 shadow-sm'
                      : 'stroke-neutral-400 stroke-[1] fill-white'
                  }`}
                  onClick={() => scrollToStep(0)}
                />

                {/* 3. 安装螺栓孔组 BH1 ~ BH4 (x: ±23, y: ±23) */}
                {/* BH1: (23, -23) in svg */}
                <g
                  className="cursor-pointer transition-transform duration-300 hover:scale-110"
                  onClick={() => scrollToStep(3)}
                >
                  <circle
                    cx="23"
                    cy="-23"
                    r="4"
                    className={`transition-all duration-300 ${
                      currentStep.highlightHoles.includes('BH1')
                        ? 'fill-amber-500 stroke-ink stroke-[1.5]'
                        : 'fill-neutral-100 stroke-neutral-500 stroke-[0.8]'
                    }`}
                  />
                  <circle cx="23" cy="-23" r="3.375" fill="none" stroke="#94a3b8" strokeWidth="0.4" strokeDasharray="1.5 1" />
                  <text x="23" y="-28" textAnchor="middle" className="text-[3.2px] font-mono font-medium fill-neutral-600">
                    BH1 (M8)
                  </text>
                </g>

                {/* BH2: (23, 23) in svg */}
                <g
                  className="cursor-pointer transition-transform duration-300 hover:scale-110"
                  onClick={() => scrollToStep(3)}
                >
                  <circle
                    cx="23"
                    cy="23"
                    r="4"
                    className={`transition-all duration-300 ${
                      currentStep.highlightHoles.includes('BH2')
                        ? 'fill-amber-500 stroke-ink stroke-[1.5]'
                        : 'fill-neutral-100 stroke-neutral-500 stroke-[0.8]'
                    }`}
                  />
                  <circle cx="23" cy="23" r="3.375" fill="none" stroke="#94a3b8" strokeWidth="0.4" strokeDasharray="1.5 1" />
                  <text x="23" y="31" textAnchor="middle" className="text-[3.2px] font-mono font-medium fill-neutral-600">
                    BH2 (M8)
                  </text>
                </g>

                {/* BH3: (-23, 23) in svg */}
                <g
                  className="cursor-pointer transition-transform duration-300 hover:scale-110"
                  onClick={() => scrollToStep(3)}
                >
                  <circle
                    cx="-23"
                    cy="23"
                    r="4"
                    className={`transition-all duration-300 ${
                      currentStep.highlightHoles.includes('BH3')
                        ? 'fill-amber-500 stroke-ink stroke-[1.5]'
                        : 'fill-neutral-100 stroke-neutral-500 stroke-[0.8]'
                    }`}
                  />
                  <circle cx="-23" cy="23" r="3.375" fill="none" stroke="#94a3b8" strokeWidth="0.4" strokeDasharray="1.5 1" />
                  <text x="-23" y="31" textAnchor="middle" className="text-[3.2px] font-mono font-medium fill-neutral-600">
                    BH3 (M8)
                  </text>
                </g>

                {/* BH4: (-23, -23) in svg */}
                <g
                  className="cursor-pointer transition-transform duration-300 hover:scale-110"
                  onClick={() => scrollToStep(3)}
                >
                  <circle
                    cx="-23"
                    cy="-23"
                    r="4"
                    className={`transition-all duration-300 ${
                      currentStep.highlightHoles.includes('BH4')
                        ? 'fill-amber-500 stroke-ink stroke-[1.5]'
                        : 'fill-neutral-100 stroke-neutral-500 stroke-[0.8]'
                    }`}
                  />
                  <circle cx="-23" cy="-23" r="3.375" fill="none" stroke="#94a3b8" strokeWidth="0.4" strokeDasharray="1.5 1" />
                  <text x="-23" y="-28" textAnchor="middle" className="text-[3.2px] font-mono font-medium fill-neutral-600">
                    BH4 (M8)
                  </text>
                </g>

                {/* 4. 先导控制油口组 X, Y, Z1, Z2 (r=2.0) */}
                {/* X: (-25, 0) */}
                <g
                  className="cursor-pointer transition-transform duration-300 hover:scale-115"
                  onClick={() => scrollToStep(2)}
                >
                  <circle
                    cx="-25"
                    cy="0"
                    r="2"
                    className={`transition-all duration-300 ${
                      currentStep.highlightHoles.includes('X')
                        ? 'fill-sky-500 stroke-ink stroke-[1.5]'
                        : 'fill-neutral-100 stroke-neutral-600 stroke-[0.8]'
                    }`}
                  />
                  <text x="-29" y="1" textAnchor="end" className="text-[3px] font-mono font-semibold fill-neutral-700">
                    X
                  </text>
                </g>

                {/* Y: (25, 0) */}
                <g
                  className="cursor-pointer transition-transform duration-300 hover:scale-115"
                  onClick={() => scrollToStep(2)}
                >
                  <circle
                    cx="25"
                    cy="0"
                    r="2"
                    className={`transition-all duration-300 ${
                      currentStep.highlightHoles.includes('Y')
                        ? 'fill-sky-500 stroke-ink stroke-[1.5]'
                        : 'fill-neutral-100 stroke-neutral-600 stroke-[0.8]'
                    }`}
                  />
                  <text x="29" y="1" textAnchor="start" className="text-[3px] font-mono font-semibold fill-neutral-700">
                    Y
                  </text>
                </g>

                {/* Z1: (0, -25) in svg */}
                <g
                  className="cursor-pointer transition-transform duration-300 hover:scale-115"
                  onClick={() => scrollToStep(2)}
                >
                  <circle
                    cx="0"
                    cy="-25"
                    r="2"
                    className={`transition-all duration-300 ${
                      currentStep.highlightHoles.includes('Z1')
                        ? 'fill-sky-500 stroke-ink stroke-[1.5]'
                        : 'fill-neutral-100 stroke-neutral-600 stroke-[0.8]'
                    }`}
                  />
                  <text x="0" y="-28" textAnchor="middle" className="text-[3px] font-mono font-semibold fill-neutral-700">
                    Z1
                  </text>
                </g>

                {/* Z2: (0, 25) in svg */}
                <g
                  className="cursor-pointer transition-transform duration-300 hover:scale-115"
                  onClick={() => scrollToStep(2)}
                >
                  <circle
                    cx="0"
                    cy="25"
                    r="2"
                    className={`transition-all duration-300 ${
                      currentStep.highlightHoles.includes('Z2')
                        ? 'fill-sky-500 stroke-ink stroke-[1.5]'
                        : 'fill-neutral-100 stroke-neutral-600 stroke-[0.8]'
                    }`}
                  />
                  <text x="0" y="30" textAnchor="middle" className="text-[3px] font-mono font-semibold fill-neutral-700">
                    Z2
                  </text>
                </g>

                {/* 5. 定位销孔 LP: (-10.5, -23) in svg */}
                <g
                  className="cursor-pointer transition-transform duration-300 hover:scale-120"
                  onClick={() => scrollToStep(0)}
                >
                  <circle
                    cx="-10.5"
                    cy="-23"
                    r="2"
                    className={`transition-all duration-300 ${
                      currentStep.highlightHoles.includes('LP')
                        ? 'fill-violet-600 stroke-ink stroke-[1.5]'
                        : 'fill-neutral-300 stroke-neutral-600 stroke-[0.8]'
                    }`}
                  />
                  <text x="-10.5" y="-26.5" textAnchor="middle" className="text-[3px] font-mono font-bold fill-neutral-800">
                    LP
                  </text>
                </g>

                {/* 6. 中心主插装孔 CV: (0, 0) 同心阶梯圆 (dia 32, 25, 16) */}
                <g
                  className="cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => scrollToStep(1)}
                >
                  {/* 外级沉孔 ⌀32 (r=16) */}
                  <circle
                    cx="0"
                    cy="0"
                    r="16"
                    className={`transition-all duration-400 ${
                      currentStep.highlightHoles.includes('CV')
                        ? 'fill-lime-100 stroke-ink stroke-[1.5]'
                        : 'fill-white stroke-neutral-400 stroke-[0.8]'
                    }`}
                  />
                  {/* 中级套孔 ⌀25 (r=12.5) */}
                  <circle
                    cx="0"
                    cy="0"
                    r="12.5"
                    className={`transition-all duration-400 ${
                      currentStep.highlightHoles.includes('CV')
                        ? 'fill-lime-200 stroke-ink stroke-[1.2]'
                        : 'fill-neutral-50 stroke-neutral-400 stroke-[0.7]'
                    }`}
                  />
                  {/* 核心流通孔 ⌀16 (r=8) */}
                  <circle
                    cx="0"
                    cy="0"
                    r="8"
                    className={`transition-all duration-400 ${
                      currentStep.highlightHoles.includes('CV')
                        ? 'fill-lime-400 stroke-ink stroke-[1.5]'
                        : 'fill-neutral-100 stroke-neutral-500 stroke-[0.8]'
                    }`}
                  />
                  <text x="0" y="1" textAnchor="middle" className="text-[3.4px] font-mono font-bold fill-ink">
                    CV
                  </text>
                  <text x="0" y="4.5" textAnchor="middle" className="text-[2.4px] font-mono fill-neutral-700">
                    ⌀32/25/16
                  </text>
                </g>
              </svg>

              {/* 悬浮当前高亮气泡角标 */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/90 border border-hairline shadow-xs text-xs font-mono">
                <span className="text-neutral-500">{isZh ? '当前聚焦孔位:' : 'Target Cavity:'}</span>
                <span className="font-semibold text-ink">{currentStep.cavityTarget}</span>
              </div>
            </div>

            {/* 动态规格 HUD (克制展示当前孔位从 library.sflib 解析的精确技术参数) */}
            <div className="rounded-xl border border-hairline/80 bg-neutral-50/70 p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>{isZh ? 'SFLIB 参数化定义' : 'SFLIB Schema Data'}</span>
                <span>UNIT: MM</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {currentStep.specSummary.map((spec, i) => (
                  <div key={i} className="rounded-lg bg-white p-2 border border-hairline/60">
                    <div className="text-[11px] text-neutral-500">{spec.label}</div>
                    <div className="text-xs font-mono font-semibold text-ink truncate mt-0.5" title={spec.value}>
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 快捷导航进度指示条 */}
            <div className="flex items-center justify-between gap-1 pt-1">
              {steps.map((st, i) => (
                <button
                  key={st.id}
                  onClick={() => scrollToStep(i)}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    i === activeStep ? 'bg-ink' : 'bg-neutral-200 hover:bg-neutral-300'
                  }`}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>

          </div>
        </div>

        {/* 右侧：卡片式序列（每滚动一个卡片，联动左侧图纸切换对应高亮） */}
        <div className="lg:col-span-6 space-y-6 lg:space-y-8 pb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === activeStep;

            return (
              <div
                key={step.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                onClick={() => scrollToStep(idx)}
                className={`cursor-pointer rounded-2xl border p-6 sm:p-8 transition-all duration-500 ${
                  isActive
                    ? `${step.colorClass} shadow-md ring-1 ring-neutral-900/10 scale-[1.01]`
                    : 'border-hairline bg-white/80 hover:bg-neutral-50 text-neutral-700 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="space-y-4">
                  {/* 顶部标签与步骤序号 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-ink text-white">
                        {step.stepNumber}
                      </span>
                      <span className="font-mono text-xs text-neutral-600 font-medium">
                        {step.badge}
                      </span>
                    </div>
                    <Icon className="h-5 w-5 text-neutral-800" />
                  </div>

                  {/* 标题 */}
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">
                    {step.title}
                  </h3>

                  {/* 核心短标签 (拒绝大段文字，直奔工程要点) */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {step.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-white/90 border border-neutral-200 text-ink shadow-2xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* 精确克制描述 (一句话工程定义) */}
                  <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-light pt-1">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
