'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TRAIL_IMAGES = [
  { src: '/images/trail/cav-01.png', alt: 'CAV_01 Ø24×22.79' },
  { src: '/images/trail/top-01.png', alt: 'TOP_01 4×BH+DH' },
  { src: '/images/trail/cav-02.png', alt: 'CAV_02 Ø20×33' },
  { src: '/images/trail/top-02.png', alt: 'TOP_02 4×BH+P/A/B/T' },
  { src: '/images/trail/cav-03.png', alt: 'CAV_03 SAE#20' },
  { src: '/images/trail/top-03.png', alt: 'TOP_03 多孔位布局' },
  { src: '/images/trail/cav-04.png', alt: 'CAV_04 3-Port 通底' },
  { src: '/images/trail/top-04.png', alt: 'TOP_04 圆形法兰布局' },
  { src: '/images/trail/cav-05.png', alt: 'CAV_05 4-Port 阶梯孔' },
  { src: '/images/trail/cav-06.png', alt: 'CAV_06 P3 通底孔' },
];

const POOL_SIZE = 28;
const RIPPLE_POOL_SIZE = 8;
const DISTANCE_THRESHOLD = 36;
const HOLD_DRILL_DELAY = 240; // 鼠标长按 240ms 触发智能切削钻孔模式

export function CursorTrail() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ripplesRef = useRef<(HTMLDivElement | null)[]>([]);

  // 钻孔瞄准器与成型提示引用
  const drillReticleRef = useRef<HTMLDivElement | null>(null);
  const drillRotateRingRef = useRef<HTMLDivElement | null>(null);
  const drillBadgeRef = useRef<HTMLDivElement | null>(null);

  const currentIndexRef = useRef(0);
  const rippleIndexRef = useRef(0);
  const lastPosRef = useRef<{ x: number; y: number; time: number } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || isTouchDevice) {
      return;
    }

    const items = itemsRef.current.filter((el): el is HTMLDivElement => el !== null);
    const ripples = ripplesRef.current.filter((el): el is HTMLDivElement => el !== null);
    if (items.length === 0) return;

    // 初始状态隐藏所有池元素
    items.forEach((item) => {
      gsap.set(item, {
        opacity: 0,
        scale: 0.5,
        x: -400,
        y: -400,
        force3D: true,
      });
    });

    ripples.forEach((rip) => {
      gsap.set(rip, {
        opacity: 0,
        scale: 0,
        x: -400,
        y: -400,
        force3D: true,
      });
    });

    // 状态管理：长按智能切削
    let holdTimer: NodeJS.Timeout | null = null;
    let isDrilling = false;
    let pressOrigin = { x: 0, y: 0 };
    let drillSpinTween: gsap.core.Tween | null = null;

    // 启动切削钻孔动画
    const startDrilling = (x: number, y: number) => {
      isDrilling = true;
      if (!drillReticleRef.current || !drillRotateRingRef.current) return;

      gsap.killTweensOf(drillReticleRef.current);
      gsap.set(drillReticleRef.current, {
        x: x - 48,
        y: y - 48,
        scale: 0.4,
        opacity: 1,
      });
      gsap.to(drillReticleRef.current, {
        scale: 1.1,
        duration: 0.25,
        ease: 'back.out(2)',
      });

      drillSpinTween = gsap.to(drillRotateRingRef.current, {
        rotation: '+=360',
        duration: 0.4,
        repeat: -1,
        ease: 'none',
      });
    };

    // 结束切削，触发布尔布孔成型（超大范围冲击波与成型印戳）
    const finishDrilling = (x: number, y: number) => {
      isDrilling = false;
      if (drillSpinTween) {
        drillSpinTween.kill();
        drillSpinTween = null;
      }

      if (drillReticleRef.current) {
        gsap.to(drillReticleRef.current, {
          scale: 1.6,
          opacity: 0,
          duration: 0.2,
        });
      }

      // 1. 强力超大布尔切削冲击波
      const rippleEl = ripples[rippleIndexRef.current];
      rippleIndexRef.current = (rippleIndexRef.current + 1) % ripples.length;
      if (rippleEl) {
        gsap.killTweensOf(rippleEl);
        gsap.set(rippleEl, {
          x: x - 56,
          y: y - 56,
          scale: 0.2,
          opacity: 1,
        });
        gsap.to(rippleEl, {
          duration: 0.9,
          ease: 'expo.out',
          scale: 5.2,
          opacity: 0,
        });
      }

      // 2. 落地成型大孔腔印戳
      const stampEl = items[currentIndexRef.current];
      currentIndexRef.current = (currentIndexRef.current + 1) % items.length;
      if (stampEl) {
        gsap.killTweensOf(stampEl);
        gsap.set(stampEl, {
          x: x - 48,
          y: y - 48,
          scale: 0.4,
          rotation: 0,
          opacity: 1,
          transformOrigin: 'center center',
        });
        gsap.to(stampEl, {
          duration: 1.2,
          ease: 'elastic.out(1, 0.4)',
          scale: 1.85,
          opacity: 0,
        });
      }

      // 3. 6 枚微型零件碎片大范围爆炸散射 (120~220px)
      for (let i = 0; i < 6; i++) {
        const burstEl = items[currentIndexRef.current];
        currentIndexRef.current = (currentIndexRef.current + 1) % items.length;
        if (!burstEl) continue;

        const angle = (i * (Math.PI * 2)) / 6 + gsap.utils.random(-0.3, 0.3);
        const dist = gsap.utils.random(110, 210);
        const bx = Math.cos(angle) * dist;
        const by = Math.sin(angle) * dist;

        gsap.killTweensOf(burstEl);
        gsap.set(burstEl, {
          x: x - 48,
          y: y - 48,
          scale: 0.6,
          rotation: gsap.utils.random(-40, 40),
          opacity: 0.95,
          transformOrigin: 'center center',
        });
        gsap.to(burstEl, {
          duration: 0.9,
          ease: 'power3.out',
          x: x - 48 + bx,
          y: y - 48 + by,
          scale: 1.15,
          rotation: `+=${gsap.utils.random(-60, 60)}`,
          opacity: 0,
        });
      }

      // 4. 浮现加工完成提示微标
      if (drillBadgeRef.current) {
        gsap.killTweensOf(drillBadgeRef.current);
        gsap.set(drillBadgeRef.current, {
          x: x - 85,
          y: y - 75,
          scale: 0.8,
          opacity: 0,
        });
        gsap.to(drillBadgeRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.25,
          ease: 'power2.out',
        });
        gsap.to(drillBadgeRef.current, {
          y: y - 100,
          opacity: 0,
          duration: 0.65,
          delay: 0.7,
          ease: 'power2.in',
        });
      }
    };

    // 鼠标移动监听：放大尺寸 + 流速自适应拉伸
    const handlePointerMove = (e: PointerEvent) => {
      const { clientX, clientY } = e;
      const now = performance.now();

      if (holdTimer) {
        const moveDist = Math.hypot(clientX - pressOrigin.x, clientY - pressOrigin.y);
        if (moveDist > 20) {
          clearTimeout(holdTimer);
          holdTimer = null;
        }
      }

      if (!lastPosRef.current) {
        lastPosRef.current = { x: clientX, y: clientY, time: now };
        return;
      }

      const dx = clientX - lastPosRef.current.x;
      const dy = clientY - lastPosRef.current.y;
      const distance = Math.hypot(dx, dy);

      if (distance < DISTANCE_THRESHOLD) {
        return;
      }

      const dt = Math.max(now - lastPosRef.current.time, 8);
      const velocity = distance / dt;
      lastPosRef.current = { x: clientX, y: clientY, time: now };

      const activeIndex = currentIndexRef.current;
      const targetEl = items[activeIndex];
      currentIndexRef.current = (currentIndexRef.current + 1) % items.length;

      if (!targetEl) return;

      const halfW = 48;
      const halfH = 48;
      const motionAngle = Math.atan2(dy, dx) * (180 / Math.PI);

      // 增大默认拖尾基础尺寸 (原 0.52 -> 现 0.8)
      let scaleX = 0.8;
      let scaleY = 0.8;
      let startRot = gsap.utils.random(-12, 12);
      let endRot = startRot + gsap.utils.random(-10, 10);
      let driftX = gsap.utils.random(-20, 20);
      let driftY = gsap.utils.random(-28, 20);

      // 高速挥动时 (>0.85 px/ms)：高压流速形变拉伸
      if (velocity > 0.85) {
        const stretch = Math.min(1.0 + (velocity - 0.85) * 0.35, 1.5);
        const compress = Math.max(1.0 - (velocity - 0.85) * 0.2, 0.68);

        scaleX = 0.8 * stretch;
        scaleY = 0.8 * compress;
        startRot = motionAngle + 90;
        endRot = startRot + gsap.utils.random(-12, 12);
        driftX = (dx / distance) * 32;
        driftY = (dy / distance) * 32;
      }

      gsap.killTweensOf(targetEl);

      gsap.set(targetEl, {
        x: clientX - halfW,
        y: clientY - halfH,
        scaleX,
        scaleY,
        rotation: startRot,
        opacity: velocity > 1.2 ? 0.95 : 0.88,
        transformOrigin: 'center center',
      });

      gsap.to(targetEl, {
        duration: velocity > 1.2 ? 0.7 : 0.9,
        ease: 'power2.out',
        x: clientX - halfW + driftX,
        y: clientY - halfH + driftY,
        scaleX: 1.18,
        scaleY: 1.18,
        rotation: endRot,
        opacity: 0,
        overwrite: 'auto',
      });
    };

    // 鼠标按下：区分短按单击与长按切削
    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const { clientX, clientY } = e;
      pressOrigin = { x: clientX, y: clientY };

      holdTimer = setTimeout(() => {
        holdTimer = null;
        startDrilling(clientX, clientY);
      }, HOLD_DRILL_DELAY);
    };

    // 鼠标抬起：大范围爆炸冲击波与大号印戳
    const handlePointerUp = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const { clientX, clientY } = e;

      if (isDrilling) {
        finishDrilling(clientX, clientY);
        return;
      }

      if (holdTimer) {
        clearTimeout(holdTimer);
        holdTimer = null;
      }

      // (A) 单击超大扩散冲击波 (扩大至 4.2 倍)
      const rippleEl = ripples[rippleIndexRef.current];
      rippleIndexRef.current = (rippleIndexRef.current + 1) % ripples.length;
      if (rippleEl) {
        gsap.killTweensOf(rippleEl);
        gsap.set(rippleEl, {
          x: clientX - 56,
          y: clientY - 56,
          scale: 0.2,
          opacity: 1,
        });
        gsap.to(rippleEl, {
          duration: 0.8,
          ease: 'power2.out',
          scale: 4.2,
          opacity: 0,
        });
      }

      // (B) 单击大号中心印戳 (放大至 1.65)
      const stampEl = items[currentIndexRef.current];
      currentIndexRef.current = (currentIndexRef.current + 1) % items.length;
      if (stampEl) {
        gsap.killTweensOf(stampEl);
        gsap.set(stampEl, {
          x: clientX - 48,
          y: clientY - 48,
          scale: 0.4,
          rotation: gsap.utils.random(-15, 15),
          opacity: 1,
          transformOrigin: 'center center',
        });
        gsap.to(stampEl, {
          duration: 1.0,
          ease: 'back.out(2)',
          scale: 1.65,
          y: clientY - 60,
          opacity: 0,
        });
      }

      // (C) 4 枚零件碎片大范围爆炸散射 (85~165px，原 35~65px)
      for (let i = 0; i < 4; i++) {
        const burstEl = items[currentIndexRef.current];
        currentIndexRef.current = (currentIndexRef.current + 1) % items.length;
        if (!burstEl) continue;

        const angle = gsap.utils.random(0, Math.PI * 2);
        const dist = gsap.utils.random(85, 165);
        const bx = Math.cos(angle) * dist;
        const by = Math.sin(angle) * dist;

        gsap.killTweensOf(burstEl);
        gsap.set(burstEl, {
          x: clientX - 48,
          y: clientY - 48,
          scale: 0.6,
          rotation: gsap.utils.random(-35, 35),
          opacity: 0.9,
          transformOrigin: 'center center',
        });
        gsap.to(burstEl, {
          duration: 0.85,
          ease: 'power3.out',
          x: clientX - 48 + bx,
          y: clientY - 48 + by,
          scale: 1.05,
          rotation: `+=${gsap.utils.random(-40, 40)}`,
          opacity: 0,
        });
      }
    };

    const handleMouseLeave = () => {
      if (holdTimer) {
        clearTimeout(holdTimer);
        holdTimer = null;
      }
      if (isDrilling) {
        isDrilling = false;
        if (drillSpinTween) drillSpinTween.kill();
        if (drillReticleRef.current) gsap.set(drillReticleRef.current, { opacity: 0 });
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (holdTimer) clearTimeout(holdTimer);
      if (drillSpinTween) drillSpinTween.kill();
      items.forEach((item) => gsap.killTweensOf(item));
      ripples.forEach((rip) => gsap.killTweensOf(rip));
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
    >
      {/* 长按切削钻孔准星与齿圈 (Drilling Reticle) */}
      <div
        ref={drillReticleRef}
        className="pointer-events-none absolute left-0 top-0 h-24 w-24 will-change-transform"
        style={{ opacity: 0 }}
      >
        <div
          ref={drillRotateRingRef}
          className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400"
        />
        <div className="absolute inset-2.5 rounded-full border border-cyan-400/70 flex items-center justify-center">
          <div className="absolute h-full w-[1.5px] bg-cyan-400/50" />
          <div className="absolute w-full h-[1.5px] bg-cyan-400/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-cyan-950/95 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-300 border border-cyan-400/60 shadow-md">
          DRILLING...
        </div>
      </div>

      {/* 切削完成提示微标 (Cut Complete Badge) */}
      <div
        ref={drillBadgeRef}
        className="pointer-events-none absolute left-0 top-0 will-change-transform"
        style={{ opacity: 0 }}
      >
        <div className="flex items-center gap-1.5 whitespace-nowrap rounded-md bg-neutral-900/95 px-3 py-1.5 font-mono text-[11px] font-bold text-emerald-300 border border-emerald-500/60 shadow-2xl backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span>BORE CUT: Ø24 × 45mm</span>
        </div>
      </div>

      {/* 冲击波光环池 (更大规格 h-28 w-28) */}
      {Array.from({ length: RIPPLE_POOL_SIZE }).map((_, i) => (
        <div
          key={`ripple-${i}`}
          ref={(el) => {
            ripplesRef.current[i] = el;
          }}
          className="pointer-events-none absolute left-0 top-0 h-28 w-28 rounded-full border-2 border-cyan-400 shadow-[0_0_24px_rgba(34,211,238,0.7),inset_0_0_12px_rgba(34,211,238,0.5)] will-change-transform"
          style={{ opacity: 0 }}
        />
      ))}

      {/* 拖尾与迸发元件池 (更大规格 h-24 w-24) */}
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
            <div className="relative flex h-24 w-24 items-center justify-center p-1.5">
              <img
                src={itemInfo.src}
                alt={itemInfo.alt}
                draggable={false}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_0_14px_rgba(0,180,255,0.55)]"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
