'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TRAIL_IMAGES = [
  { src: '/images/trail/cav-01.png', alt: 'Cavity Profile 01', type: 'cavity' },
  { src: '/images/trail/top-01.png', alt: 'Top Hole Pattern 01', type: 'top' },
  { src: '/images/trail/cav-02.png', alt: 'Cavity Profile 02', type: 'cavity' },
  { src: '/images/trail/top-02.png', alt: 'Top Hole Pattern 02', type: 'top' },
  { src: '/images/trail/cav-03.png', alt: 'Cavity Profile 03', type: 'cavity' },
  { src: '/images/trail/top-03.png', alt: 'Top Hole Pattern 03', type: 'top' },
  { src: '/images/trail/cav-04.png', alt: 'Cavity Profile 04', type: 'cavity' },
  { src: '/images/trail/top-04.png', alt: 'Top Hole Pattern 04', type: 'top' },
  { src: '/images/trail/cav-05.png', alt: 'Cavity Profile 05', type: 'cavity' },
  { src: '/images/trail/cav-06.png', alt: 'Cavity Profile 06', type: 'cavity' },
];

const POOL_SIZE = 24;
const RIPPLE_POOL_SIZE = 6;
const DISTANCE_THRESHOLD = 32; // 鼠标滑动触发距离阈值（像素）

export function CursorTrail() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ripplesRef = useRef<(HTMLDivElement | null)[]>([]);
  const currentIndexRef = useRef(0);
  const rippleIndexRef = useRef(0);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // 1. 无障碍与移动触屏检测
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || isTouchDevice) {
      return;
    }

    const items = itemsRef.current.filter((el): el is HTMLDivElement => el !== null);
    const ripples = ripplesRef.current.filter((el): el is HTMLDivElement => el !== null);
    if (items.length === 0) return;

    // 初始状态：全部隐藏
    items.forEach((item) => {
      gsap.set(item, {
        opacity: 0,
        scale: 0.5,
        x: -200,
        y: -200,
        force3D: true,
      });
    });

    ripples.forEach((rip) => {
      gsap.set(rip, {
        opacity: 0,
        scale: 0,
        x: -200,
        y: -200,
        force3D: true,
      });
    });

    // 2. 鼠标滑动拖尾逻辑
    const handlePointerMove = (e: PointerEvent) => {
      const { clientX, clientY } = e;

      if (!lastPosRef.current) {
        lastPosRef.current = { x: clientX, y: clientY };
        return;
      }

      const dx = clientX - lastPosRef.current.x;
      const dy = clientY - lastPosRef.current.y;
      const distance = Math.hypot(dx, dy);

      if (distance < DISTANCE_THRESHOLD) {
        return;
      }

      lastPosRef.current = { x: clientX, y: clientY };

      const targetEl = items[currentIndexRef.current];
      currentIndexRef.current = (currentIndexRef.current + 1) % items.length;

      if (!targetEl) return;

      const halfW = 28;
      const halfH = 28;

      const rotStart = gsap.utils.random(-14, 14);
      const rotEnd = rotStart + gsap.utils.random(-8, 8);
      const driftX = gsap.utils.random(-16, 16);
      const driftY = gsap.utils.random(-24, 16);

      gsap.killTweensOf(targetEl);

      gsap.set(targetEl, {
        x: clientX - halfW,
        y: clientY - halfH,
        scale: 0.5,
        rotation: rotStart,
        opacity: 0.85,
        transformOrigin: 'center center',
      });

      gsap.to(targetEl, {
        duration: 0.85,
        ease: 'power2.out',
        x: clientX - halfW + driftX,
        y: clientY - halfH + driftY,
        scale: 0.88,
        rotation: rotEnd,
        opacity: 0,
        overwrite: 'auto',
      });
    };

    // 3. 鼠标单击爆发动效 (Click Stamp & Ripple Burst)
    const handlePointerDown = (e: PointerEvent) => {
      // 仅响应鼠标主键（左键）
      if (e.button !== 0) return;

      const { clientX, clientY } = e;
      lastPosRef.current = { x: clientX, y: clientY };

      // (A) 触发高科技感 CAD 扩散冲击波环
      const rippleEl = ripples[rippleIndexRef.current];
      rippleIndexRef.current = (rippleIndexRef.current + 1) % ripples.length;
      if (rippleEl) {
        gsap.killTweensOf(rippleEl);
        gsap.set(rippleEl, {
          x: clientX - 40,
          y: clientY - 40,
          scale: 0.2,
          opacity: 0.9,
        });
        gsap.to(rippleEl, {
          duration: 0.65,
          ease: 'power2.out',
          scale: 2.2,
          opacity: 0,
        });
      }

      // (B) 触发中心孔腔主印戳（Stamp）
      const stampEl = items[currentIndexRef.current];
      currentIndexRef.current = (currentIndexRef.current + 1) % items.length;
      if (stampEl) {
        const halfW = 28;
        const halfH = 28;
        gsap.killTweensOf(stampEl);
        gsap.set(stampEl, {
          x: clientX - halfW,
          y: clientY - halfH,
          scale: 0.3,
          rotation: gsap.utils.random(-15, 15),
          opacity: 1,
          transformOrigin: 'center center',
        });
        gsap.to(stampEl, {
          duration: 0.9,
          ease: 'back.out(2)',
          scale: 1.25,
          y: clientY - halfH - 12,
          opacity: 0,
        });
      }

      // (C) 伴随 2 枚微型零件向四周发散迸发
      for (let i = 0; i < 2; i++) {
        const burstEl = items[currentIndexRef.current];
        currentIndexRef.current = (currentIndexRef.current + 1) % items.length;
        if (!burstEl) continue;

        const angle = gsap.utils.random(0, Math.PI * 2);
        const dist = gsap.utils.random(35, 65);
        const bx = Math.cos(angle) * dist;
        const by = Math.sin(angle) * dist;

        gsap.killTweensOf(burstEl);
        gsap.set(burstEl, {
          x: clientX - 28,
          y: clientY - 28,
          scale: 0.45,
          rotation: gsap.utils.random(-30, 30),
          opacity: 0.85,
          transformOrigin: 'center center',
        });
        gsap.to(burstEl, {
          duration: 0.75,
          ease: 'power3.out',
          x: clientX - 28 + bx,
          y: clientY - 28 + by,
          scale: 0.75,
          rotation: `+=${gsap.utils.random(-25, 25)}`,
          opacity: 0,
        });
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      items.forEach((item) => {
        gsap.killTweensOf(item);
      });
      ripples.forEach((rip) => {
        gsap.killTweensOf(rip);
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
    >
      {/* 冲击波光环池 */}
      {Array.from({ length: RIPPLE_POOL_SIZE }).map((_, i) => (
        <div
          key={`ripple-${i}`}
          ref={(el) => {
            ripplesRef.current[i] = el;
          }}
          className="pointer-events-none absolute left-0 top-0 h-20 w-20 rounded-full border border-cyan-400/90 shadow-[0_0_16px_rgba(34,211,238,0.6),inset_0_0_8px_rgba(34,211,238,0.4)] will-change-transform"
          style={{ opacity: 0 }}
        />
      ))}

      {/* 拖尾与迸发元件池 */}
      {Array.from({ length: POOL_SIZE }).map((_, index) => {
        const itemInfo = TRAIL_IMAGES[index % TRAIL_IMAGES.length];
        return (
          <div
            key={index}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            className="pointer-events-none absolute left-0 top-0 will-change-transform select-none"
            style={{ opacity: 0 }}
          >
            <div className="relative flex h-14 w-14 items-center justify-center p-1">
              <img
                src={itemInfo.src}
                alt={itemInfo.alt}
                draggable={false}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_0_10px_rgba(0,180,255,0.45)]"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
