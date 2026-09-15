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
      const statusText = svg.querySelector('[data-bg-elem="status-text"]');

      // -------------------------------------------------------------
      // 1. DrawSVG Implementation via stroke-dasharray & stroke-dashoffset
      // -------------------------------------------------------------
      const drawElements = svg.querySelectorAll<SVGGeometryElement>('[data-drawsvg]');

      drawElements.forEach((el) => {
        try {
          let length = 0;
          if (typeof el.getTotalLength === 'function') {
            length = el.getTotalLength();
          } else {
            // Fallback for shapes if getTotalLength is unavailable
            const tagName = el.tagName.toLowerCase();
            if (tagName === 'circle') {
              const r = parseFloat(el.getAttribute('r') || '0');
              length = 2 * Math.PI * r;
            } else if (tagName === 'rect') {
              const w = parseFloat(el.getAttribute('width') || '0');
              const h = parseFloat(el.getAttribute('height') || '0');
              length = 2 * (w + h);
            } else if (tagName === 'line') {
              const x1 = parseFloat(el.getAttribute('x1') || '0');
              const y1 = parseFloat(el.getAttribute('y1') || '0');
              const x2 = parseFloat(el.getAttribute('x2') || '0');
              const y2 = parseFloat(el.getAttribute('y2') || '0');
              length = Math.hypot(x2 - x1, y2 - y1);
            }
          }

          if (length > 0) {
            el.style.strokeDasharray = `${length}`;
            el.style.strokeDashoffset = `${length}`;
            el.setAttribute('data-length', `${length}`);
          }
        } catch {
          // ignore
        }
      });

      // Initial Entrance Laser Plotting DrawSVG animation
      const drawTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      drawTl
        // First draw the CAD coordinate axes
        .to('[data-drawsvg="axes"]', {
          strokeDashoffset: 0,
          duration: 1.2,
          stagger: 0.15,
        })
        // Then progressively sketch the 65x65 outer block boundary
        .to('[data-drawsvg="outline"]', {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: 'power3.inOut',
        }, '-=0.6')
        // Then sketch the concentric CV stepped bore circles
        .to('[data-drawsvg="cv"]', {
          strokeDashoffset: 0,
          duration: 1.0,
          stagger: 0.12,
        }, '-=0.8')
        // Then draw the pilot channel vectors
        .to('[data-drawsvg="pilot"]', {
          strokeDashoffset: 0,
          duration: 0.8,
          stagger: 0.08,
        }, '-=0.6')
        // Then draw the 4 M8 bolt circles and tolerance zones
        .to('[data-drawsvg="bolts"]', {
          strokeDashoffset: 0,
          duration: 0.8,
          stagger: 0.06,
        }, '-=0.5')
        // Finally draw dimension lines and markers
        .to('[data-drawsvg="dims"]', {
          strokeDashoffset: 0,
          duration: 0.7,
          stagger: 0.05,
        }, '-=0.4');

      // -------------------------------------------------------------
      // 2. Initial Setup for ScrollTrigger Positioning
      // -------------------------------------------------------------
      gsap.set(svgWrap, {
        xPercent: 12,
        yPercent: -2,
        scale: 1.05,
        rotation: -4,
        opacity: 0.38,
        transformOrigin: 'center center',
      });

      // -------------------------------------------------------------
      // 3. Global Scroll Scrub Timeline across sections
      // -------------------------------------------------------------
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.0,
        },
      });

      masterTl
        // Move behind 3D CAD viewport
        .to(svgWrap, {
          xPercent: 0,
          yPercent: 3,
          scale: 1.18,
          rotation: 0,
          opacity: 0.32,
          ease: 'none',
        }, 0.18)
        // Move into feature showcase pipeline (focus view)
        .to(svgWrap, {
          xPercent: -16,
          yPercent: 0,
          scale: 1.26,
          rotation: 0,
          opacity: 0.62,
          ease: 'none',
        }, 0.42)
        // Maintain presence through feature cards
        .to(svgWrap, {
          xPercent: -14,
          yPercent: 2,
          scale: 1.22,
          opacity: 0.58,
          ease: 'none',
        }, 0.7)
        // Move into cavity library section
        .to(svgWrap, {
          xPercent: 18,
          yPercent: -3,
          scale: 1.02,
          rotation: 2,
          opacity: 0.3,
          ease: 'none',
        }, 0.85)
        // Finish at bottom footer area
        .to(svgWrap, {
          xPercent: 0,
          yPercent: 8,
          scale: 1.0,
          rotation: 0,
          opacity: 0.25,
          ease: 'none',
        }, 1.0);

      // -------------------------------------------------------------
      // 4. Feature Card Highlights with Energetic DrawSVG Pulse Loops
      // -------------------------------------------------------------
      const featureCards = document.querySelectorAll<HTMLElement>('[data-feature-index]');

      const resetHighlights = () => {
        gsap.to([outlineGroup, cvGroup, pilotGroup, boltGroup], {
          opacity: 0.4,
          duration: 0.4,
          overwrite: 'auto',
        });
        gsap.to(boltZones, {
          fill: 'transparent',
          strokeWidth: 0.4,
          stroke: '#9ca3af',
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
          // FR-02: Outline drawing & dimension line pulse
          ScrollTrigger.create({
            ...trigger,
            onEnter: () => {
              resetHighlights();
              gsap.to(outlineGroup, { opacity: 1, duration: 0.3 });
              gsap.to(dimGroup, { opacity: 1, duration: 0.3 });
              // Quick DrawSVG re-trace effect on the outline
              const outlineRect = svg.querySelector('[data-drawsvg="outline"]') as SVGGeometryElement;
              if (outlineRect) {
                const len = parseFloat(outlineRect.getAttribute('data-length') || '260');
                gsap.fromTo(outlineRect, 
                  { strokeDashoffset: len }, 
                  { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out' }
                );
              }
              if (statusText) statusText.textContent = lang === 'zh' ? 'FR-02 块体外廓 65×65mm 基准锁定' : 'FR-02 STOCK BOUNDS 65×65mm LOCKED';
            },
            onEnterBack: () => {
              resetHighlights();
              gsap.to(outlineGroup, { opacity: 1, duration: 0.3 });
              gsap.to(dimGroup, { opacity: 1, duration: 0.3 });
            },
          });
        } else if (index === '1') {
          // FR-04: CV Stepped concentric rings DrawSVG spin-in
          ScrollTrigger.create({
            ...trigger,
            onEnter: () => {
              resetHighlights();
              gsap.to(cvGroup, { opacity: 1, duration: 0.3 });
              gsap.to(cvRings, {
                fill: '#dceeb1', // block-lime
                stagger: 0.1,
                duration: 0.4,
              });
              const cvCircles = svg.querySelectorAll<SVGGeometryElement>('[data-drawsvg="cv"]');
              cvCircles.forEach((circle) => {
                const len = parseFloat(circle.getAttribute('data-length') || '100');
                gsap.fromTo(circle, 
                  { strokeDashoffset: len }, 
                  { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1 }
                );
              });
              if (statusText) statusText.textContent = lang === 'zh' ? 'FR-04 核心阀孔 CV ⌀32/25/16 阶梯切削' : 'FR-04 CORE CAVITY CV ⌀32/25/16 CSG CUT';
            },
            onEnterBack: () => {
              resetHighlights();
              gsap.to(cvGroup, { opacity: 1, duration: 0.3 });
              gsap.to(cvRings, { fill: '#dceeb1', duration: 0.3 });
            },
          });
        } else if (index === '2') {
          // FR-03: Pilot Channels continuous flow dash
          ScrollTrigger.create({
            ...trigger,
            onEnter: () => {
              resetHighlights();
              gsap.to(pilotGroup, { opacity: 1, duration: 0.3 });
              gsap.to(pilotLines, {
                opacity: 1,
                stroke: '#0284c7',
                strokeDashoffset: 24,
                duration: 0.6,
                repeat: -1,
                ease: 'none',
              });
              if (statusText) statusText.textContent = lang === 'zh' ? 'FR-03 先导油口 X/Y/Z1/Z2 连通拓扑构建' : 'FR-03 PILOT PORTS X/Y/Z1/Z2 ROUTED';
            },
            onEnterBack: () => {
              resetHighlights();
              gsap.to(pilotGroup, { opacity: 1, duration: 0.3 });
            },
          });
        } else if (index === '3') {
          // FR-05: Bolt safety zones DrawSVG trace
          ScrollTrigger.create({
            ...trigger,
            onEnter: () => {
              resetHighlights();
              gsap.to(boltGroup, { opacity: 1, duration: 0.3 });
              gsap.to(boltZones, {
                fill: 'rgba(252, 211, 77, 0.25)', // amber
                stroke: '#f59e0b',
                strokeWidth: 0.8,
                duration: 0.4,
              });
              const boltCircles = svg.querySelectorAll<SVGGeometryElement>('[data-drawsvg="bolts"]');
              boltCircles.forEach((circle) => {
                const len = parseFloat(circle.getAttribute('data-length') || '30');
                gsap.fromTo(circle,
                  { strokeDashoffset: len },
                  { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out', stagger: 0.05 }
                );
              });
              if (statusText) statusText.textContent = lang === 'zh' ? 'FR-05 螺栓孔 BH1-BH4 壁厚与干涉检查 PASS' : 'FR-05 WALL THICKNESS & CLEARANCE CHECK PASS';
            },
            onEnterBack: () => {
              resetHighlights();
              gsap.to(boltGroup, { opacity: 1, duration: 0.3 });
            },
          });
        } else if (index === '4') {
          // FR-09: Complete BRep topology loop
          ScrollTrigger.create({
            ...trigger,
            onEnter: () => {
              gsap.to([outlineGroup, cvGroup, pilotGroup, boltGroup, dimGroup], {
                opacity: 1,
                duration: 0.5,
              });
              gsap.to(cvRings, { fill: '#c8e6cd', duration: 0.4 }); // block-mint
              gsap.to(boltZones, { fill: 'rgba(200, 230, 205, 0.4)', stroke: '#10b981', duration: 0.4 });
              if (statusText) statusText.textContent = lang === 'zh' ? 'FR-09 BRep 实体流形闭环 · STEP 导出就绪' : 'FR-09 BREP SOLID TOPOLOGY · STEP EXPORT READY';
            },
            onEnterBack: () => {
              gsap.to([outlineGroup, cvGroup, pilotGroup, boltGroup, dimGroup], {
                opacity: 1,
                duration: 0.4,
              });
            },
          });
        }
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
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full bg-block-lilac/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 -left-20 w-[500px] h-[500px] rounded-full bg-block-lime/20 blur-[100px] pointer-events-none" />

      {/* Sticky/Fixed Centered DG16 SVG Canvas */}
      <div
        ref={svgWrapRef}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
      >
        <div className="relative w-[min(92vw,800px)] h-[min(92vw,800px)]">
          <svg
            ref={svgRef}
            viewBox="-60 -60 120 120"
            className="w-full h-full overflow-visible"
          >
            {/* 1. Global CAD Coordinate Axes & Grid Lines with DrawSVG */}
            <g data-bg-group="grid" opacity="0.65">
              {/* Outer circle reference */}
              <circle
                data-drawsvg="axes"
                cx="0"
                cy="0"
                r="54"
                fill="none"
                stroke="#d1d5db"
                strokeWidth="0.3"
                strokeDasharray="3 3"
              />
              <circle
                data-drawsvg="axes"
                cx="0"
                cy="0"
                r="42"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="0.25"
              />

              {/* Major X / Y axis centerlines */}
              <line
                data-drawsvg="axes"
                x1="-58"
                y1="0"
                x2="58"
                y2="0"
                stroke="#9ca3af"
                strokeWidth="0.5"
              />
              <line
                data-drawsvg="axes"
                x1="0"
                y1="-58"
                x2="0"
                y2="58"
                stroke="#9ca3af"
                strokeWidth="0.5"
              />

              {/* Coordinate axis labels */}
              <text x="54" y="-1.5" className="text-[2.2px] font-mono fill-neutral-400 font-medium">+X</text>
              <text x="-57" y="-1.5" className="text-[2.2px] font-mono fill-neutral-400 font-medium">-X</text>
              <text x="1.5" y="55" className="text-[2.2px] font-mono fill-neutral-400 font-medium">+Y</text>
              <text x="1.5" y="-53" className="text-[2.2px] font-mono fill-neutral-400 font-medium">-Y</text>
            </g>

            {/* 2. DG16 Outer 65×65mm Block Contour with DrawSVG */}
            <g data-bg-group="outline" opacity="0.85" className="transition-opacity duration-300">
              <rect
                data-drawsvg="outline"
                x="-32.5"
                y="-32.5"
                width="65"
                height="65"
                rx="2"
                fill="rgba(255, 255, 255, 0.85)"
                stroke="#171717"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Chamfer corner accent marks */}
              <line data-drawsvg="outline" x1="-32.5" y1="-28" x2="-28" y2="-32.5" stroke="#737373" strokeWidth="0.6" />
              <line data-drawsvg="outline" x1="32.5" y1="-28" x2="28" y2="-32.5" stroke="#737373" strokeWidth="0.6" />
              <line data-drawsvg="outline" x1="-32.5" y1="28" x2="-28" y2="32.5" stroke="#737373" strokeWidth="0.6" />
              <line data-drawsvg="outline" x1="32.5" y1="28" x2="28" y2="32.5" stroke="#737373" strokeWidth="0.6" />

              {/* Locating Pin (LP): (-10.5, -23), diameter 4mm */}
              <g id="bg-lp">
                <circle data-drawsvg="outline" cx="-10.5" cy="-23" r="2" fill="#e5e7eb" stroke="#525252" strokeWidth="0.7" />
                <circle cx="-10.5" cy="-23" r="0.6" fill="#171717" />
                <text x="-10.5" y="-26" textAnchor="middle" className="text-[2.2px] font-mono font-bold fill-neutral-600">LP ⌀4</text>
              </g>
            </g>

            {/* 3. Central Cavity CV (⌀32/⌀25/⌀16 stepped bore) with DrawSVG */}
            <g data-bg-group="cv" opacity="0.85" className="transition-opacity duration-300">
              {/* Outer Counterbore ⌀32 */}
              <circle
                data-drawsvg="cv"
                data-bg-elem="cv-ring"
                cx="0"
                cy="0"
                r="16"
                fill="#f3f4f6"
                stroke="#262626"
                strokeWidth="1.0"
              />
              {/* Middle Step ⌀25 */}
              <circle
                data-drawsvg="cv"
                data-bg-elem="cv-ring"
                cx="0"
                cy="0"
                r="12.5"
                fill="#e5e7eb"
                stroke="#525252"
                strokeWidth="0.8"
              />
              {/* Inner Seat ⌀16 */}
              <circle
                data-drawsvg="cv"
                data-bg-elem="cv-ring"
                cx="0"
                cy="0"
                r="8"
                fill="#d4d4d8"
                stroke="#171717"
                strokeWidth="1.2"
              />
              {/* Center Crosshair Tick */}
              <line data-drawsvg="cv" x1="-3" y1="0" x2="3" y2="0" stroke="#171717" strokeWidth="0.5" />
              <line data-drawsvg="cv" x1="0" y1="-3" x2="0" y2="3" stroke="#171717" strokeWidth="0.5" />
              <text x="0" y="0.8" textAnchor="middle" className="text-[2.8px] font-mono font-black fill-neutral-800">CV</text>
              <text x="0" y="4.2" textAnchor="middle" className="text-[1.8px] font-mono fill-neutral-500 font-semibold">⌀32/25/16</text>
            </g>

            {/* 4. Pilot Oil Channels: X, Y, Z1, Z2 (⌀4mm) & flow lines with DrawSVG */}
            <g data-bg-group="pilot" opacity="0.85" className="transition-opacity duration-300">
              {/* Pilot Port Flow Vectors */}
              <line
                data-drawsvg="pilot"
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
                data-drawsvg="pilot"
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
                data-drawsvg="pilot"
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
                data-drawsvg="pilot"
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
              <circle data-drawsvg="pilot" cx="-25" cy="0" r="2" fill="#ffffff" stroke="#0284c7" strokeWidth="0.9" />
              <circle cx="-25" cy="0" r="0.8" fill="#0284c7" />
              <text x="-29" y="0.8" textAnchor="end" className="text-[2.4px] font-mono font-bold fill-neutral-700">X (⌀4)</text>

              {/* Port Y: (25, 0) */}
              <circle data-drawsvg="pilot" cx="25" cy="0" r="2" fill="#ffffff" stroke="#0284c7" strokeWidth="0.9" />
              <circle cx="25" cy="0" r="0.8" fill="#0284c7" />
              <text x="29" y="0.8" textAnchor="start" className="text-[2.4px] font-mono font-bold fill-neutral-700">Y (⌀4)</text>

              {/* Port Z1: (0, -25) */}
              <circle data-drawsvg="pilot" cx="0" cy="-25" r="2" fill="#ffffff" stroke="#0284c7" strokeWidth="0.9" />
              <circle cx="0" cy="-25" r="0.8" fill="#0284c7" />
              <text x="0" y="-28" textAnchor="middle" className="text-[2.4px] font-mono font-bold fill-neutral-700">Z1</text>

              {/* Port Z2: (0, 25) */}
              <circle data-drawsvg="pilot" cx="0" cy="25" r="2" fill="#ffffff" stroke="#0284c7" strokeWidth="0.9" />
              <circle cx="0" cy="25" r="0.8" fill="#0284c7" />
              <text x="0" y="30" textAnchor="middle" className="text-[2.4px] font-mono font-bold fill-neutral-700">Z2</text>
            </g>

            {/* 5. Four Bolt Holes: BH1..BH4 (M8) with DrawSVG */}
            <g data-bg-group="bolts" opacity="0.85" className="transition-opacity duration-300">
              {[
                { x: 23, y: -23, id: 'BH1' },
                { x: 23, y: 23, id: 'BH2' },
                { x: -23, y: 23, id: 'BH3' },
                { x: -23, y: -23, id: 'BH4' },
              ].map((b) => (
                <g key={b.id}>
                  {/* Safety wall thickness tolerance zone */}
                  <circle
                    data-drawsvg="bolts"
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
                  <circle data-drawsvg="bolts" cx={b.x} cy={b.y} r="4.5" fill="#f9fafb" stroke="#525252" strokeWidth="0.8" />
                  {/* M8 Thread pitch circle */}
                  <circle data-drawsvg="bolts" cx={b.x} cy={b.y} r="3.7" fill="none" stroke="#a3a3a3" strokeWidth="0.4" strokeDasharray="2 1" />
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

            {/* 6. Dimensions & Engineering Annotations with DrawSVG */}
            <g data-bg-group="dimensions" opacity="0.75">
              {/* Top 65.00mm dimension line */}
              <line data-drawsvg="dims" x1="-32.5" y1="-38" x2="32.5" y2="-38" stroke="#737373" strokeWidth="0.4" />
              <line data-drawsvg="dims" x1="-32.5" y1="-39.5" x2="-32.5" y2="-33" stroke="#a3a3a3" strokeWidth="0.3" />
              <line data-drawsvg="dims" x1="32.5" y1="-39.5" x2="32.5" y2="-33" stroke="#a3a3a3" strokeWidth="0.3" />
              <polygon points="-32.5,-38 -30,-37.2 -30,-38.8" fill="#737373" />
              <polygon points="32.5,-38 30,-37.2 30,-38.8" fill="#737373" />
              <text x="0" y="-40" textAnchor="middle" className="text-[2.8px] font-mono font-bold fill-neutral-700">65.00 mm</text>

              {/* Right 46.00mm bolt pitch dimension line */}
              <line data-drawsvg="dims" x1="40" y1="-23" x2="40" y2="23" stroke="#737373" strokeWidth="0.4" />
              <line data-drawsvg="dims" x1="24" y1="-23" x2="41.5" y2="-23" stroke="#a3a3a3" strokeWidth="0.3" />
              <line data-drawsvg="dims" x1="24" y1="23" x2="41.5" y2="23" stroke="#a3a3a3" strokeWidth="0.3" />
              <polygon points="40,-23 39.2,-20.5 40.8,-20.5" fill="#737373" />
              <polygon points="40,23 39.2,20.5 40.8,20.5" fill="#737373" />
              <text x="43" y="1" textAnchor="start" className="text-[2.5px] font-mono font-semibold fill-neutral-600">46.00 mm (PITCH)</text>

              {/* Bottom engineering note */}
              <text x="-32.5" y="40" className="text-[2.2px] font-mono fill-neutral-400 tracking-wider">
                DIN ISO 7368 · NOMINAL SIZE 16 · TOLERANCE ISO 2768-m
              </text>
            </g>

            {/* 7. Precision Status Tag (Animated by ScrollTrigger) */}
            <g data-bg-elem="status-pill" transform="translate(0, 48)">
              <rect
                x="-42"
                y="-3.8"
                width="84"
                height="7.6"
                rx="3.8"
                fill="rgba(255, 255, 255, 0.95)"
                stroke="#d1d5db"
                strokeWidth="0.6"
              />
              <circle cx="-36" cy="0" r="1.3" fill="#1ea64a" />
              <text
                data-bg-elem="status-text"
                x="-32"
                y="0.9"
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
