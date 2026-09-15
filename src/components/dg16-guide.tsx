'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FeatureShowcaseProps {
  lang: 'zh' | 'en';
}

export function FeatureShowcase({ lang }: FeatureShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<SVGGElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Active stage state (0 to 4)
  const [activeStage, setActiveStage] = useState<number>(0);

  const isZh = lang === 'zh';

  const stages = [
    {
      idx: '01',
      badge: 'FR-02',
      title: isZh ? '基准外廓定义' : 'Stock Geometry',
      spec: isZh ? '65 × 65 mm 标准长方体 / STEP 异形基准导入' : '65 × 65 mm Rectangular Stock / STEP Import',
      zoomLabel: '100%',
      coords: 'X: 0.00  Y: 0.00',
      color: '#8b5cf6', // violet
      status: isZh ? '基准面已锁定 · 定位销 LP 校验通过' : 'DATUM LOCKED · PIN LP VERIFIED',
    },
    {
      idx: '02',
      badge: 'FR-04',
      title: isZh ? '二通插装阀孔切削' : 'Cartridge Cavity',
      spec: isZh ? '⌀32 / ⌀25 / ⌀16 三阶同心孔 · 毫秒级 CSG 实时布尔' : '⌀32/25/16 Stepped Bores · Real-time CSG Cut',
      zoomLabel: '280%',
      coords: 'CV (0.00, 0.00) DEPTH: 43.0mm',
      color: '#84cc16', // lime
      status: isZh ? '主孔轴向切削完成 · 螺纹公差 H7' : 'MAIN BORE CUT · THREAD FIT H7',
    },
    {
      idx: '03',
      badge: 'FR-03',
      title: isZh ? '先导油路与网络拓扑' : 'Pilot Netlist Routing',
      spec: isZh ? 'X / Y / Z1 / Z2 (⌀4mm) 控制油路 · P/T/A/B 语义流向' : 'X / Y / Z1 / Z2 (⌀4mm) · P/T/A/B Semantic Netlist',
      zoomLabel: '220%',
      coords: 'PORTS (±25.0, ±25.0) ⌀4.0mm',
      color: '#0284c7', // sky
      status: isZh ? '先导控制管路连通 · 间隙 ≥ 2.5mm' : 'PILOT NET CONNECTED · GAP ≥ 2.5mm',
    },
    {
      idx: '04',
      badge: 'FR-05',
      title: isZh ? '全域干涉与壁厚诊断' : 'Interference & Wall Clearance',
      spec: isZh ? '4 × M8 螺栓安全壁厚 ≥ 3.0mm · 瞬时探针碰撞扫描' : '4 × M8 Fasteners Wall ≥ 3.0mm · Sub-second Scan',
      zoomLabel: '250%',
      coords: 'BH (23.00, 23.00) PITCH: 46mm',
      color: '#f59e0b', // amber
      status: isZh ? '壁厚裕度 3.42mm · 全孔道零贯穿冲突' : 'WALL MARGIN 3.42mm · ZERO PUNCTURE CONFLICT',
    },
    {
      idx: '05',
      badge: 'FR-09',
      title: isZh ? 'OCCT BRep 实体导出' : 'BRep Solid STEP Export',
      spec: isZh ? 'OpenCASCADE 内核逆向重构 · 标准 STEP AP214 实体流形' : 'OpenCASCADE Kernel · Watertight STEP AP214',
      zoomLabel: '110%',
      coords: 'TOPOLOGY: CLOSED SOLID BREP',
      color: '#10b981', // mint
      status: isZh ? '数控五轴 CAM 拓扑就绪 · 误差 ≤ 0.01mm' : '5-AXIS CAM READY · TOLERANCE ≤ 0.01mm',
    },
  ];

  useEffect(() => {
    if (!sectionRef.current || !cameraRef.current || !svgRef.current) return;

    const ctx = gsap.context(() => {
      const camera = cameraRef.current;
      const svg = svgRef.current;
      if (!camera || !svg) return;

      // DrawSVG initialization on the stage SVG elements
      const drawables = svg.querySelectorAll<SVGGeometryElement>('[data-stage-draw]');
      drawables.forEach((el) => {
        try {
          const len = typeof el.getTotalLength === 'function' ? el.getTotalLength() : 200;
          el.style.strokeDasharray = `${len}`;
          el.style.strokeDashoffset = `${len}`;
          el.setAttribute('data-len', `${len}`);
        } catch {
          // ignore
        }
      });

      // Initial DrawSVG reveal
      gsap.to(drawables, {
        strokeDashoffset: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: 'power2.out',
      });

      // Pinned Inspection Timeline
      // We pin the section for 3200px of scroll
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: 'top top',
          end: '+=3200',
          scrub: 1.0,
          onUpdate: (self) => {
            const p = self.progress;
            let current = 0;
            if (p < 0.2) current = 0;
            else if (p < 0.42) current = 1;
            else if (p < 0.65) current = 2;
            else if (p < 0.86) current = 3;
            else current = 4;
            setActiveStage(current);
          },
        },
      });

      // Stage 0 -> Stage 1: Zoom in to Center CV Stepped Cavity
      masterTl
        // Transition to Stage 2: Camera zooms in deep to Center CV
        .to(camera, {
          scale: 2.7,
          x: 0,
          y: 0,
          duration: 1,
          ease: 'power2.inOut',
        })
        .to('#cv-highlight-ring', {
          opacity: 1,
          stroke: '#84cc16',
          strokeWidth: 1.5,
          scale: 1.05,
          transformOrigin: '0 0',
          duration: 0.5,
        }, '<')
        // Stage 1 -> Stage 2: Pan & Zoom to Pilot Ports (X/Y/Z)
        .to(camera, {
          scale: 2.2,
          x: -30,
          y: 0,
          duration: 1,
          ease: 'power2.inOut',
        })
        .to('#pilot-channel-pulse', {
          opacity: 1,
          stroke: '#0284c7',
          strokeDashoffset: 40,
          repeat: 3,
          duration: 0.8,
        }, '<')
        // Stage 2 -> Stage 3: Pan to Top-Right Corner Bolt & Clearance Radar
        .to(camera, {
          scale: 2.5,
          x: -55,
          y: 55,
          duration: 1,
          ease: 'power2.inOut',
        })
        .to('#bolt-radar-wave', {
          scale: 1.8,
          opacity: 0,
          transformOrigin: '23px -23px',
          repeat: 2,
          duration: 0.6,
        }, '<')
        // Stage 3 -> Stage 4: Zoom Back Out to Full Glorious Solid Overview
        .to(camera, {
          scale: 1.05,
          x: 0,
          y: 0,
          duration: 1.2,
          ease: 'power3.inOut',
        })
        .to('#solid-topology-seal', {
          opacity: 1,
          duration: 0.6,
        }, '<');

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const current = stages[activeStage] || stages[0];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-canvas text-ink overflow-hidden select-none flex flex-col justify-between"
    >
      {/* 1. Top HUD Bar: Minimalist Breadcrumb & Telemetry Readouts */}
      <div className="relative z-20 w-full px-6 py-6 sm:px-12 flex items-center justify-between border-b border-hairline/60 bg-white/70 backdrop-blur-md">
        {/* Left: Section Tag & Step Navigator */}
        <div className="flex items-center gap-6 sm:gap-10">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: current.color }} />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink">
              DIN ISO 7368 · DG16
            </span>
          </div>

          {/* Stepper Dots */}
          <div className="hidden md:flex items-center gap-2">
            {stages.map((st, i) => {
              const isPassed = i <= activeStage;
              const isCurrent = i === activeStage;
              return (
                <div key={st.idx} className="flex items-center gap-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isCurrent
                        ? 'w-7 bg-ink'
                        : isPassed
                        ? 'w-2 bg-neutral-600'
                        : 'w-2 bg-neutral-300'
                    }`}
                  />
                  {i < stages.length - 1 && <div className="h-px w-3 bg-neutral-200" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Real-time Coordinate & Camera Zoom HUD */}
        <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-500">
          <span className="hidden sm:inline px-2.5 py-1 rounded bg-surface-soft border border-hairline/80 font-semibold text-neutral-700">
            {current.coords}
          </span>
          <span className="px-2.5 py-1 rounded bg-ink text-white font-bold">
            ZOOM: {current.zoomLabel}
          </span>
        </div>
      </div>

      {/* 2. Center Stage: High-Precision CAD Blueprint Viewport with Camera Zoom */}
      <div
        ref={stageRef}
        className="relative z-10 flex-1 w-full flex items-center justify-center overflow-hidden"
      >
        {/* Fine crosshair grid watermark */}
        <div className="absolute inset-0 opacity-25 pointer-events-none [background-image:radial-gradient(#9ca3af_1px,transparent_1px)] [background-size:28px_28px]" />

        {/* Full-view SVG Canvas */}
        <div className="relative w-[min(90vw,720px)] h-[min(90vw,720px)] max-h-[64vh]">
          <svg
            ref={svgRef}
            viewBox="-60 -60 120 120"
            className="w-full h-full overflow-visible"
          >
            {/* Camera Wrapper: GSAP smoothly scales and translates this group! */}
            <g ref={cameraRef} id="camera-viewport" className="will-change-transform">
              
              {/* Reference Grid & Axes */}
              <g opacity="0.5">
                <circle cx="0" cy="0" r="54" fill="none" stroke="#e5e7eb" strokeWidth="0.3" strokeDasharray="2 2" />
                <line data-stage-draw x1="-58" y1="0" x2="58" y2="0" stroke="#d1d5db" strokeWidth="0.4" />
                <line data-stage-draw x1="0" y1="-58" x2="0" y2="58" stroke="#d1d5db" strokeWidth="0.4" />
              </g>

              {/* 1. Outer 65×65mm Contour & Chamfers */}
              <g id="stage-outline">
                <rect
                  data-stage-draw
                  x="-32.5"
                  y="-32.5"
                  width="65"
                  height="65"
                  rx="2"
                  fill="rgba(255, 255, 255, 0.9)"
                  stroke="#171717"
                  strokeWidth="1.3"
                />
                {/* Chamfer lines */}
                <line data-stage-draw x1="-32.5" y1="-28" x2="-28" y2="-32.5" stroke="#737373" strokeWidth="0.6" />
                <line data-stage-draw x1="32.5" y1="-28" x2="28" y2="-32.5" stroke="#737373" strokeWidth="0.6" />
                <line data-stage-draw x1="-32.5" y1="28" x2="-28" y2="32.5" stroke="#737373" strokeWidth="0.6" />
                <line data-stage-draw x1="32.5" y1="28" x2="28" y2="32.5" stroke="#737373" strokeWidth="0.6" />

                {/* Locating Pin (LP): (-10.5, -23) */}
                <circle data-stage-draw cx="-10.5" cy="-23" r="2" fill="#f3f4f6" stroke="#404040" strokeWidth="0.7" />
                <circle cx="-10.5" cy="-23" r="0.6" fill="#171717" />
                <text x="-10.5" y="-26" textAnchor="middle" className="text-[2.0px] font-mono font-bold fill-neutral-600">LP</text>
              </g>

              {/* 2. Center CV Stepped Cavity (⌀32/25/16) */}
              <g id="stage-cv">
                <circle
                  data-stage-draw
                  id="cv-highlight-ring"
                  cx="0"
                  cy="0"
                  r="16"
                  fill="#f9fafb"
                  stroke="#262626"
                  strokeWidth="0.9"
                  className="transition-all duration-300"
                />
                <circle
                  data-stage-draw
                  cx="0"
                  cy="0"
                  r="12.5"
                  fill="#f3f4f6"
                  stroke="#525252"
                  strokeWidth="0.7"
                />
                <circle
                  data-stage-draw
                  cx="0"
                  cy="0"
                  r="8"
                  fill="#e5e7eb"
                  stroke="#171717"
                  strokeWidth="1.1"
                />
                <line data-stage-draw x1="-3" y1="0" x2="3" y2="0" stroke="#171717" strokeWidth="0.5" />
                <line data-stage-draw x1="0" y1="-3" x2="0" y2="3" stroke="#171717" strokeWidth="0.5" />
                <text x="0" y="0.8" textAnchor="middle" className="text-[2.6px] font-mono font-black fill-neutral-800">CV16</text>
                <text x="0" y="4.2" textAnchor="middle" className="text-[1.8px] font-mono fill-neutral-500 font-semibold">⌀32/25/16</text>
              </g>

              {/* 3. Pilot Channels X, Y, Z1, Z2 */}
              <g id="stage-pilot">
                {/* Dynamic Flow Laser Lines */}
                <line
                  id="pilot-channel-pulse"
                  x1="-8"
                  y1="0"
                  x2="-23"
                  y2="0"
                  stroke="#0284c7"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  opacity="0.4"
                />
                <line
                  x1="8"
                  y1="0"
                  x2="23"
                  y2="0"
                  stroke="#0284c7"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  opacity="0.4"
                />
                <line
                  x1="0"
                  y1="-8"
                  x2="0"
                  y2="-23"
                  stroke="#0284c7"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  opacity="0.4"
                />
                <line
                  x1="0"
                  y1="8"
                  x2="0"
                  y2="23"
                  stroke="#0284c7"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  opacity="0.4"
                />

                {/* Ports */}
                <circle data-stage-draw cx="-25" cy="0" r="2" fill="#ffffff" stroke="#0284c7" strokeWidth="0.9" />
                <text x="-29" y="0.8" textAnchor="end" className="text-[2.2px] font-mono font-bold fill-neutral-700">X</text>

                <circle data-stage-draw cx="25" cy="0" r="2" fill="#ffffff" stroke="#0284c7" strokeWidth="0.9" />
                <text x="29" y="0.8" textAnchor="start" className="text-[2.2px] font-mono font-bold fill-neutral-700">Y</text>

                <circle data-stage-draw cx="0" cy="-25" r="2" fill="#ffffff" stroke="#0284c7" strokeWidth="0.9" />
                <text x="0" y="-28" textAnchor="middle" className="text-[2.2px] font-mono font-bold fill-neutral-700">Z1</text>

                <circle data-stage-draw cx="0" cy="25" r="2" fill="#ffffff" stroke="#0284c7" strokeWidth="0.9" />
                <text x="0" y="30" textAnchor="middle" className="text-[2.2px] font-mono font-bold fill-neutral-700">Z2</text>
              </g>

              {/* 4. Bolt Clearance Zones & Radar */}
              <g id="stage-bolts">
                {/* Animated Radar Wave on BH1 */}
                <circle
                  id="bolt-radar-wave"
                  cx="23"
                  cy="-23"
                  r="6.5"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="0.8"
                  opacity="0"
                />

                {[
                  { x: 23, y: -23, id: 'BH1' },
                  { x: 23, y: 23, id: 'BH2' },
                  { x: -23, y: 23, id: 'BH3' },
                  { x: -23, y: -23, id: 'BH4' },
                ].map((b) => (
                  <g key={b.id}>
                    {/* Safety clearance dashed circle */}
                    <circle
                      cx={b.x}
                      cy={b.y}
                      r="6.5"
                      fill="rgba(245, 158, 11, 0.05)"
                      stroke="#f59e0b"
                      strokeWidth="0.4"
                      strokeDasharray="1.5 1.5"
                    />
                    <circle data-stage-draw cx={b.x} cy={b.y} r="4.5" fill="#f9fafb" stroke="#525252" strokeWidth="0.8" />
                    <circle data-stage-draw cx={b.x} cy={b.y} r="3.7" fill="none" stroke="#a3a3a3" strokeWidth="0.35" strokeDasharray="2 1" />
                    <text
                      x={b.x > 0 ? b.x + 5.5 : b.x - 5.5}
                      y={b.y + 0.8}
                      textAnchor={b.x > 0 ? 'start' : 'end'}
                      className="text-[1.9px] font-mono fill-neutral-500 font-semibold"
                    >
                      {b.id} M8
                    </text>
                  </g>
                ))}
              </g>

              {/* 5. STEP Solid Topology Seal Overlay */}
              <g id="solid-topology-seal" opacity="0" className="transition-opacity duration-500">
                <rect
                  x="-32.5"
                  y="-32.5"
                  width="65"
                  height="65"
                  rx="2"
                  fill="rgba(200, 230, 205, 0.25)"
                  stroke="#10b981"
                  strokeWidth="1.8"
                />
                <circle cx="0" cy="0" r="16" fill="rgba(200, 230, 205, 0.35)" stroke="#10b981" strokeWidth="1.2" />
              </g>

              {/* Dimension Marks */}
              <g opacity="0.65">
                <line data-stage-draw x1="-32.5" y1="-38" x2="32.5" y2="-38" stroke="#737373" strokeWidth="0.4" />
                <line x1="-32.5" y1="-39.5" x2="-32.5" y2="-33" stroke="#a3a3a3" strokeWidth="0.3" />
                <line x1="32.5" y1="-39.5" x2="32.5" y2="-33" stroke="#a3a3a3" strokeWidth="0.3" />
                <text x="0" y="-40" textAnchor="middle" className="text-[2.6px] font-mono font-bold fill-neutral-700">65.00 mm</text>
              </g>

            </g>
          </svg>
        </div>
      </div>

      {/* 3. Bottom HUD Bar: Ultra-Crisp Typography (Zero Card Clutter) */}
      <div className="relative z-20 w-full px-6 py-8 sm:px-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 border-t border-hairline/60 bg-white/80 backdrop-blur-md">
        {/* Left: Punchy Headline & Hardcore Spec */}
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-black text-white px-2.5 py-0.5 rounded bg-ink">
              {current.idx}
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500">
              {current.badge}
            </span>
            <span className="h-1 w-1 rounded-full bg-neutral-300" />
            <span className="font-mono text-xs font-semibold" style={{ color: current.color }}>
              {current.status}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink leading-tight">
            {current.title}
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
            {current.spec}
          </p>
        </div>

        {/* Right: Scroll Hint */}
        <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-bounce" />
          <span>{isZh ? '向下滚动镜头巡检 ↓' : 'SCROLL TO INSPECT ↓'}</span>
        </div>
      </div>
    </section>
  );
}
