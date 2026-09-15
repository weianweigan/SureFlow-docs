'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DG16BackgroundProps {
  lang: 'zh' | 'en';
}

export function DG16Background({ lang }: DG16BackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgWrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current || !svgWrapRef.current || !svgRef.current) return;

    const ctx = gsap.context(() => {
      const svgWrap = svgWrapRef.current;
      const svg = svgRef.current;
      if (!svgWrap || !svg) return;

      // Select SVG element groups
      const outlineGroup = svg.querySelector('[data-bg-group="outline"]');
      const cvGroup = svg.querySelector('[data-bg-group="cv"]');
      const cvRings = svg.querySelectorAll('[data-bg-elem="cv-ring"]');
      const pilotGroup = svg.querySelector('[data-bg-group="pilot"]');
      const pilotLines = svg.querySelectorAll('[data-bg-elem="pilot-line"]');
      const boltGroup = svg.querySelector('[data-bg-group="bolts"]');
      const boltZones = svg.querySelectorAll('[data-bg-elem="bolt-zone"]');
      const gridGroup = svg.querySelector('[data-bg-group="grid"]');
      const dimGroup = svg.querySelector('[data-bg-group="dimensions"]');
      const statusPill = svg.querySelector('[data-bg-elem="status-pill"]');
      const statusText = svg.querySelector('[data-bg-elem="status-text"]');

      // 1. Initial State: Hero section (subtle tilt, ethereal CAD blueprint)
      gsap.set(svgWrap, {
        xPercent: 15,
        yPercent: 0,
        scale: 1.05,
        rotation: -4,
        opacity: 0.35,
        transformOrigin: 'center center',
      });

      // 2. Global Scroll Timeline for DG16 transformation across entire page
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      });

      // Motion path across the 5 main page sections:
      // Hero (0-15%) -> Viewport (15-35%) -> Features (35-70%) -> Library (70-85%) -> CTA (85-100%)
      masterTl
        // Phase 1 -> 2: Transition into 3D Viewport section
        .to(svgWrap, {
          xPercent: 0,
          yPercent: 5,
          scale: 1.15,
          rotation: 0,
          opacity: 0.28,
          ease: 'none',
        }, 0.15)
        // Phase 2 -> 3: Transition into Features Section (Center-stage prominence)
        .to(svgWrap, {
          xPercent: -18,
          yPercent: 0,
          scale: 1.25,
          rotation: 0,
          opacity: 0.55,
          ease: 'none',
        }, 0.38)
        // Hold prominence through feature cards
        .to(svgWrap, {
          xPercent: -15,
          yPercent: 2,
          scale: 1.22,
          opacity: 0.5,
          ease: 'none',
        }, 0.68)
        // Phase 3 -> 4: Transition into Cavity Library section
        .to(svgWrap, {
          xPercent: 20,
          yPercent: -4,
          scale: 0.95,
          rotation: 3,
          opacity: 0.25,
          ease: 'none',
        }, 0.82)
        // Phase 4 -> 5: Transition into CTA & Footer
        .to(svgWrap, {
          xPercent: 0,
          yPercent: 10,
          scale: 1.0,
          rotation: 0,
          opacity: 0.22,
          ease: 'none',
        }, 1.0);

      // 3. Feature Cards Specific Triggers (Pinpointing cavity highlights)
      const featureCards = document.querySelectorAll<HTMLElement>('[data-feature-index]');
      
      const resetHighlights = () => {
        gsap.to([outlineGroup, cvGroup, pilotGroup, boltGroup], {
          opacity: 0.45,
          duration: 0.5,
          overwrite: 'auto',
        });
        gsap.to(boltZones, {
          fill: 'transparent',
          strokeWidth: 0.4,
          stroke: '#9ca3af',
          duration: 0.4,
          overwrite: 'auto',
        });
        gsap.to(pilotLines, {
          opacity: 0.2,
          strokeDashoffset: 0,
          duration: 0.4,
          overwrite: 'auto',
        });
        gsap.to(cvRings, {
          fill: '#f3f4f6',
          duration: 0.4,
          overwrite: 'auto',
        });
      };

      featureCards.forEach((card) => {
        const index = card.getAttribute('data-feature-index');
        const trigger = {
          trigger: card,
          start: 'top 65%',
          end: 'bottom 40%',
          toggleActions: 'play reverse play reverse',
        };

        if (index === '0') {
          // FR-02: Block Stock Sizing -> Outline & Dimensions
          ScrollTrigger.create({
            ...trigger,
            onEnter: () => {
              resetHighlights();
              gsap.to(outlineGroup, { opacity: 1, duration: 0.4 });
              gsap.to(dimGroup, { opacity: 1, duration: 0.4 });
              if (statusText) statusText.textContent = lang === 'zh' ? 'FR-02 块体外廓 65×65mm 基准锁定' : 'FR-02 STOCK BOUNDS 65×65mm LOCKED';
            },
            onEnterBack: () => {
              resetHighlights();
              gsap.to(outlineGroup, { opacity: 1, duration: 0.4 });
              gsap.to(dimGroup, { opacity: 1, duration: 0.4 });
              if (statusText) statusText.textContent = lang === 'zh' ? 'FR-02 块体外廓 65×65mm 基准锁定' : 'FR-02 STOCK BOUNDS 65×65mm LOCKED';
            },
          });
        } else if (index === '1') {
          // FR-04: Parametric Cavity Placement -> CV Stepped Bore
          ScrollTrigger.create({
            ...trigger,
            onEnter: () => {
              resetHighlights();
              gsap.to(cvGroup, { opacity: 1, duration: 0.4 });
              gsap.to(cvRings, {
                fill: '#dceeb1', // block-lime
                stagger: 0.1,
                duration: 0.4,
              });
              if (statusText) statusText.textContent = lang === 'zh' ? 'FR-04 核心阀孔 CV ⌀32/25/16 阶梯装配' : 'FR-04 CORE CAVITY CV ⌀32/25/16 PLACED';
            },
            onEnterBack: () => {
              resetHighlights();
              gsap.to(cvGroup, { opacity: 1, duration: 0.4 });
              gsap.to(cvRings, { fill: '#dceeb1', duration: 0.4 });
              if (statusText) statusText.textContent = lang === 'zh' ? 'FR-04 核心阀孔 CV ⌀32/25/16 阶梯装配' : 'FR-04 CORE CAVITY CV ⌀32/25/16 PLACED';
            },
          });
        } else if (index === '2') {
          // FR-03: Cavity Library & Port Routing -> Pilot Channels X, Y, Z1, Z2
          ScrollTrigger.create({
            ...trigger,
            onEnter: () => {
              resetHighlights();
              gsap.to(pilotGroup, { opacity: 1, duration: 0.4 });
              gsap.to(pilotLines, {
                opacity: 1,
                stroke: '#0284c7',
                strokeDashoffset: 20,
                duration: 0.6,
                repeat: -1,
                ease: 'none',
              });
              if (statusText) statusText.textContent = lang === 'zh' ? 'FR-03 先导油口 X/Y/Z1/Z2 连通拓扑构建' : 'FR-03 PILOT PORTS X/Y/Z1/Z2 ROUTED';
            },
            onEnterBack: () => {
              resetHighlights();
              gsap.to(pilotGroup, { opacity: 1, duration: 0.4 });
              gsap.to(pilotLines, { opacity: 1, stroke: '#0284c7', duration: 0.4 });
              if (statusText) statusText.textContent = lang === 'zh' ? 'FR-03 先导油口 X/Y/Z1/Z2 连通拓扑构建' : 'FR-03 PILOT PORTS X/Y/Z1/Z2 ROUTED';
            },
          });
        } else if (index === '3') {
          // FR-05: Interference & Wall Thickness -> Bolt Holes Clearance Zones
          ScrollTrigger.create({
            ...trigger,
            onEnter: () => {
              resetHighlights();
              gsap.to(boltGroup, { opacity: 1, duration: 0.4 });
              gsap.to(boltZones, {
                fill: 'rgba(252, 211, 77, 0.25)', // amber-300
                stroke: '#f59e0b',
                strokeWidth: 0.8,
                duration: 0.4,
              });
              if (statusText) statusText.textContent = lang === 'zh' ? 'FR-05 螺栓孔 BH1-BH4 壁厚与干涉检查 PASS' : 'FR-05 WALL THICKNESS & CLEARANCE CHECK PASS';
            },
            onEnterBack: () => {
              resetHighlights();
              gsap.to(boltGroup, { opacity: 1, duration: 0.4 });
              gsap.to(boltZones, {
                fill: 'rgba(252, 211, 77, 0.25)',
                stroke: '#f59e0b',
                duration: 0.4,
              });
              if (statusText) statusText.textContent = lang === 'zh' ? 'FR-05 螺栓孔 BH1-BH4 壁厚与干涉检查 PASS' : 'FR-05 WALL THICKNESS & CLEARANCE CHECK PASS';
            },
          });
        } else if (index === '4') {
          // FR-09: STEP Solid Export -> Whole Cavity Topology Complete
          ScrollTrigger.create({
            ...trigger,
            onEnter: () => {
              gsap.to([outlineGroup, cvGroup, pilotGroup, boltGroup, dimGroup], {
                opacity: 1,
                duration: 0.6,
              });
              gsap.to(cvRings, { fill: '#c8e6cd', duration: 0.5 }); // block-mint
              gsap.to(boltZones, { fill: 'rgba(200, 230, 205, 0.4)', stroke: '#10b981', duration: 0.5 });
              if (statusText) statusText.textContent = lang === 'zh' ? 'FR-09 BRep 实体流形闭环 · STEP 导出就绪' : 'FR-09 BREP SOLID TOPOLOGY · STEP EXPORT READY';
            },
            onEnterBack: () => {
              gsap.to([outlineGroup, cvGroup, pilotGroup, boltGroup, dimGroup], {
                opacity: 1,
                duration: 0.5,
              });
              if (statusText) statusText.textContent = lang === 'zh' ? 'FR-09 BRep 实体流形闭环 · STEP 导出就绪' : 'FR-09 BREP SOLID TOPOLOGY · STEP EXPORT READY';
            },
          });
        }
      });

      // Default status text for non-feature areas
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          // Outside feature cards, show default standard tag
          const scrollP = self.progress;
          if (scrollP < 0.32 || scrollP > 0.72) {
            if (statusText) {
              statusText.textContent = lang === 'zh' ? 'DIN ISO 7368 · 二通插装阀标准安装面 DG16' : 'DIN ISO 7368 · 2-WAY CARTRIDGE CAVITY DG16';
            }
          }
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Precision CAD grid background layer */}
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] [background-size:40px_40px]" />

      {/* Ambient radial gradient soft focus */}
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full bg-block-lilac/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 -left-20 w-[500px] h-[500px] rounded-full bg-block-lime/15 blur-[100px] pointer-events-none" />

      {/* Sticky/Fixed Centered DG16 SVG Canvas */}
      <div
        ref={svgWrapRef}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
      >
        <div className="relative w-[min(90vw,780px)] h-[min(90vw,780px)]">
          <svg
            ref={svgRef}
            viewBox="-60 -60 120 120"
            className="w-full h-full overflow-visible"
          >
            {/* 1. Global CAD Coordinate Axes & Grid Lines */}
            <g data-bg-group="grid" opacity="0.6">
              {/* Outer circle reference */}
              <circle cx="0" cy="0" r="54" fill="none" stroke="#e5e7eb" strokeWidth="0.3" strokeDasharray="3 3" />
              <circle cx="0" cy="0" r="42" fill="none" stroke="#f3f4f6" strokeWidth="0.25" />

              {/* Major X / Y axis centerlines */}
              <line x1="-58" y1="0" x2="58" y2="0" stroke="#d1d5db" strokeWidth="0.5" strokeDasharray="4 2 1 2" />
              <line x1="0" y1="-58" x2="0" y2="58" stroke="#d1d5db" strokeWidth="0.5" strokeDasharray="4 2 1 2" />

              {/* Angle radial lines */}
              <line x1="-45" y1="-45" x2="45" y2="45" stroke="#f3f4f6" strokeWidth="0.2" strokeDasharray="2 3" />
              <line x1="-45" y1="45" x2="45" y2="-45" stroke="#f3f4f6" strokeWidth="0.2" strokeDasharray="2 3" />

              {/* Coordinate axis labels */}
              <text x="54" y="-1.5" className="text-[2.2px] font-mono fill-neutral-400 font-medium">+X</text>
              <text x="-57" y="-1.5" className="text-[2.2px] font-mono fill-neutral-400 font-medium">-X</text>
              <text x="1.5" y="55" className="text-[2.2px] font-mono fill-neutral-400 font-medium">+Y</text>
              <text x="1.5" y="-53" className="text-[2.2px] font-mono fill-neutral-400 font-medium">-Y</text>
            </g>

            {/* 2. DG16 Outer 65×65mm Block Contour */}
            <g data-bg-group="outline" opacity="0.8" className="transition-opacity duration-300">
              <rect
                x="-32.5"
                y="-32.5"
                width="65"
                height="65"
                rx="2"
                fill="rgba(255, 255, 255, 0.75)"
                stroke="#171717"
                strokeWidth="1.2"
              />

              {/* Chamfer corner accent marks */}
              <line x1="-32.5" y1="-28" x2="-28" y2="-32.5" stroke="#737373" strokeWidth="0.5" />
              <line x1="32.5" y1="-28" x2="28" y2="-32.5" stroke="#737373" strokeWidth="0.5" />
              <line x1="-32.5" y1="28" x2="-28" y2="32.5" stroke="#737373" strokeWidth="0.5" />
              <line x1="32.5" y1="28" x2="28" y2="32.5" stroke="#737373" strokeWidth="0.5" />

              {/* Locating Pin (LP): (-10.5, -23), diameter 4mm */}
              <g id="bg-lp">
                <circle cx="-10.5" cy="-23" r="2" fill="#e5e7eb" stroke="#525252" strokeWidth="0.6" />
                <circle cx="-10.5" cy="-23" r="0.6" fill="#171717" />
                <text x="-10.5" y="-26" textAnchor="middle" className="text-[2.2px] font-mono font-bold fill-neutral-600">LP ⌀4</text>
              </g>
            </g>

            {/* 3. Central Cavity CV (⌀32/⌀25/⌀16 stepped bore) */}
            <g data-bg-group="cv" opacity="0.8" className="transition-opacity duration-300">
              {/* Outer Counterbore ⌀32 */}
              <circle
                data-bg-elem="cv-ring"
                cx="0"
                cy="0"
                r="16"
                fill="#f3f4f6"
                stroke="#262626"
                strokeWidth="0.9"
              />
              {/* Middle Step ⌀25 */}
              <circle
                data-bg-elem="cv-ring"
                cx="0"
                cy="0"
                r="12.5"
                fill="#e5e7eb"
                stroke="#525252"
                strokeWidth="0.7"
              />
              {/* Inner Seat ⌀16 */}
              <circle
                data-bg-elem="cv-ring"
                cx="0"
                cy="0"
                r="8"
                fill="#d4d4d8"
                stroke="#171717"
                strokeWidth="1.1"
              />
              {/* Center Crosshair Tick */}
              <line x1="-3" y1="0" x2="3" y2="0" stroke="#171717" strokeWidth="0.5" />
              <line x1="0" y1="-3" x2="0" y2="3" stroke="#171717" strokeWidth="0.5" />
              <text x="0" y="0.8" textAnchor="middle" className="text-[2.8px] font-mono font-black fill-neutral-800">CV</text>
              <text x="0" y="4.2" textAnchor="middle" className="text-[1.8px] font-mono fill-neutral-500 font-semibold">⌀32/25/16</text>
            </g>

            {/* 4. Pilot Oil Channels: X, Y, Z1, Z2 (⌀4mm) & flow lines */}
            <g data-bg-group="pilot" opacity="0.8" className="transition-opacity duration-300">
              {/* Pilot Port Flow Vectors */}
              <line
                data-bg-elem="pilot-line"
                x1="-8"
                y1="0"
                x2="-23"
                y2="0"
                stroke="#0284c7"
                strokeWidth="0.8"
                strokeDasharray="2 2"
                opacity="0.3"
              />
              <line
                data-bg-elem="pilot-line"
                x1="8"
                y1="0"
                x2="23"
                y2="0"
                stroke="#0284c7"
                strokeWidth="0.8"
                strokeDasharray="2 2"
                opacity="0.3"
              />
              <line
                data-bg-elem="pilot-line"
                x1="0"
                y1="-8"
                x2="0"
                y2="-23"
                stroke="#0284c7"
                strokeWidth="0.8"
                strokeDasharray="2 2"
                opacity="0.3"
              />
              <line
                data-bg-elem="pilot-line"
                x1="0"
                y1="8"
                x2="0"
                y2="23"
                stroke="#0284c7"
                strokeWidth="0.8"
                strokeDasharray="2 2"
                opacity="0.3"
              />

              {/* Port X: (-25, 0) */}
              <circle cx="-25" cy="0" r="2" fill="#ffffff" stroke="#0284c7" strokeWidth="0.8" />
              <circle cx="-25" cy="0" r="0.8" fill="#0284c7" />
              <text x="-29" y="0.8" textAnchor="end" className="text-[2.4px] font-mono font-bold fill-neutral-700">X (⌀4)</text>

              {/* Port Y: (25, 0) */}
              <circle cx="25" cy="0" r="2" fill="#ffffff" stroke="#0284c7" strokeWidth="0.8" />
              <circle cx="25" cy="0" r="0.8" fill="#0284c7" />
              <text x="29" y="0.8" textAnchor="start" className="text-[2.4px] font-mono font-bold fill-neutral-700">Y (⌀4)</text>

              {/* Port Z1: (0, -25) */}
              <circle cx="0" cy="-25" r="2" fill="#ffffff" stroke="#0284c7" strokeWidth="0.8" />
              <circle cx="0" cy="-25" r="0.8" fill="#0284c7" />
              <text x="0" y="-28" textAnchor="middle" className="text-[2.4px] font-mono font-bold fill-neutral-700">Z1</text>

              {/* Port Z2: (0, 25) */}
              <circle cx="0" cy="25" r="2" fill="#ffffff" stroke="#0284c7" strokeWidth="0.8" />
              <circle cx="0" cy="25" r="0.8" fill="#0284c7" />
              <text x="0" y="30" textAnchor="middle" className="text-[2.4px] font-mono font-bold fill-neutral-700">Z2</text>
            </g>

            {/* 5. Four Bolt Holes: BH1..BH4 (M8, at ±23, ±23) */}
            <g data-bg-group="bolts" opacity="0.8" className="transition-opacity duration-300">
              {[
                { x: 23, y: -23, id: 'BH1' },
                { x: 23, y: 23, id: 'BH2' },
                { x: -23, y: 23, id: 'BH3' },
                { x: -23, y: -23, id: 'BH4' },
              ].map((b) => (
                <g key={b.id}>
                  {/* Safety wall thickness tolerance zone */}
                  <circle
                    data-bg-elem="bolt-zone"
                    cx={b.x}
                    cy={b.y}
                    r="6.5"
                    fill="transparent"
                    stroke="#9ca3af"
                    strokeWidth="0.4"
                    strokeDasharray="1.5 1.5"
                  />
                  {/* Bolt clearance hole ⌀9 */}
                  <circle cx={b.x} cy={b.y} r="4.5" fill="#f9fafb" stroke="#525252" strokeWidth="0.7" />
                  {/* M8 Thread pitch circle */}
                  <circle cx={b.x} cy={b.y} r="3.7" fill="none" stroke="#a3a3a3" strokeWidth="0.35" strokeDasharray="2 1" />
                  <text
                    x={b.x > 0 ? b.x + 5.5 : b.x - 5.5}
                    y={b.y + 0.8}
                    textAnchor={b.x > 0 ? 'start' : 'end'}
                    className="text-[2.0px] font-mono fill-neutral-500 font-semibold"
                  >
                    {b.id} M8
                  </text>
                </g>
              ))}
            </g>

            {/* 6. Dimensions & Engineering Annotations */}
            <g data-bg-group="dimensions" opacity="0.7">
              {/* Top 65.00mm dimension line */}
              <line x1="-32.5" y1="-38" x2="32.5" y2="-38" stroke="#a3a3a3" strokeWidth="0.4" />
              <line x1="-32.5" y1="-39.5" x2="-32.5" y2="-33" stroke="#a3a3a3" strokeWidth="0.3" />
              <line x1="32.5" y1="-39.5" x2="32.5" y2="-33" stroke="#a3a3a3" strokeWidth="0.3" />
              <polygon points="-32.5,-38 -30,-37.2 -30,-38.8" fill="#737373" />
              <polygon points="32.5,-38 30,-37.2 30,-38.8" fill="#737373" />
              <text x="0" y="-40" textAnchor="middle" className="text-[2.8px] font-mono font-bold fill-neutral-600">65.00 mm</text>

              {/* Right 46.00mm bolt pitch dimension line */}
              <line x1="40" y1="-23" x2="40" y2="23" stroke="#a3a3a3" strokeWidth="0.4" />
              <line x1="24" y1="-23" x2="41.5" y2="-23" stroke="#a3a3a3" strokeWidth="0.3" />
              <line x1="24" y1="23" x2="41.5" y2="23" stroke="#a3a3a3" strokeWidth="0.3" />
              <polygon points="40,-23 39.2,-20.5 40.8,-20.5" fill="#737373" />
              <polygon points="40,23 39.2,20.5 40.8,20.5" fill="#737373" />
              <text x="43" y="1" textAnchor="start" className="text-[2.5px] font-mono font-semibold fill-neutral-500">46.00 mm (PITCH)</text>

              {/* Bottom engineering note */}
              <text x="-32.5" y="40" className="text-[2.2px] font-mono fill-neutral-400 tracking-wider">
                DIN ISO 7368 · NOMINAL SIZE 16 · TOLERANCE ISO 2768-m
              </text>
            </g>

            {/* 7. Precision Status Tag (Animated by ScrollTrigger) */}
            <g data-bg-elem="status-pill" transform="translate(0, 48)">
              <rect
                x="-40"
                y="-3.5"
                width="80"
                height="7"
                rx="3.5"
                fill="rgba(255, 255, 255, 0.9)"
                stroke="#d1d5db"
                strokeWidth="0.5"
              />
              <circle cx="-35" cy="0" r="1.2" fill="#1ea64a" />
              <text
                data-bg-elem="status-text"
                x="-31"
                y="0.8"
                className="text-[2.4px] font-mono font-bold fill-neutral-800 tracking-tight"
              >
                DIN ISO 7368 · 二通插装阀标准安装面 DG16
              </text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
