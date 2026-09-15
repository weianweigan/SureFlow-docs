'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { DG16_HOLES, DG16Hole, SpeedPreset, SPEED_CONFIG } from '@/lib/dg16-data';
import { DG16Canvas } from './dg16-canvas';
import { HoleInfoCard } from './hole-info-card';
import { GuideControls } from './guide-controls';

interface DG16GuideStageProps {
  lang: 'zh' | 'en';
}

export const DG16GuideStage: React.FC<DG16GuideStageProps> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const masterTlRef = useRef<gsap.core.Timeline | null>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  // States
  const [activeHoleIndex, setActiveHoleIndex] = useState<number>(0);
  const [visitedHoleIds, setVisitedHoleIds] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<'idle' | 'playing' | 'paused' | 'completed'>('idle');
  const [speed, setSpeed] = useState<SpeedPreset>('standard');

  const currentHole = DG16_HOLES[activeHoleIndex] || DG16_HOLES[0];

  // Helper to check prefers-reduced-motion
  const isReducedMotion = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  // 1. Initialize Stage and Stagger Reveal Animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger light-up of all holes on initial mount
      gsap.from('#canvas-holes > g', {
        scale: 0.5,
        opacity: 0,
        stagger: 0.08,
        duration: isReducedMotion() ? 0.2 : 0.6,
        ease: 'back.out(1.4)',
        transformOrigin: 'center center',
      });

      // MatchMedia for responsive coordinate sanity
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        // Desktop: slight entrance drift
        gsap.from('#hole-info-card', {
          x: 40,
          autoAlpha: 0,
          duration: isReducedMotion() ? 0.1 : 0.6,
          ease: 'power2.out',
        });
      });
      mm.add('(max-width: 1023px)', () => {
        // Mobile: vertical slide
        gsap.from('#hole-info-card', {
          y: 30,
          autoAlpha: 0,
          duration: isReducedMotion() ? 0.1 : 0.5,
          ease: 'power2.out',
        });
      });

      // Initial tracer placement at hole 1 (LP)
      const firstHole = DG16_HOLES[0];
      gsap.set('#guide-tracer-group', {
        x: firstHole.x,
        y: firstHole.y,
        autoAlpha: 1,
        scale: 1,
      });

    }, containerRef);

    ctxRef.current = ctx;

    return () => {
      if (masterTlRef.current) {
        masterTlRef.current.kill();
      }
      ctx.revert();
    };
  }, []);

  // 2. Build and Run Sequential Guide Timeline
  const startGuiding = useCallback((fromIndex = 0) => {
    if (masterTlRef.current) {
      masterTlRef.current.kill();
    }

    const reduced = isReducedMotion();
    const tl = gsap.timeline({
      paused: false,
      onComplete: () => {
        setStatus('completed');
        // Mark all holes visited
        setVisitedHoleIds(new Set(DG16_HOLES.map((h) => h.id)));
      },
    });

    masterTlRef.current = tl;
    setStatus('playing');

    // Set timeScale from current speed preset
    tl.timeScale(SPEED_CONFIG[speed].scale);

    // Sequence through holes starting from fromIndex
    for (let i = fromIndex; i < DG16_HOLES.length; i++) {
      const prevHole = i > 0 ? DG16_HOLES[i - 1] : null;
      const targetHole = DG16_HOLES[i];

      tl.add(`step-${i}`)
        // Update active index
        .call(() => {
          setActiveHoleIndex(i);
          setVisitedHoleIds((prev) => {
            const next = new Set(prev);
            if (prevHole) next.add(prevHole.id);
            return next;
          });
        })
        // Card micro-transition
        .fromTo(
          '#hole-info-card',
          { autoAlpha: reduced ? 1 : 0.8, y: reduced ? 0 : 6 },
          { autoAlpha: 1, y: 0, duration: reduced ? 0.1 : 0.25, ease: 'power2.out' },
          '<'
        );

      if (i < DG16_HOLES.length - 1) {
        const nextHole = DG16_HOLES[i + 1];

        if (reduced) {
          // Reduced motion: instant jump after pause
          tl.to({}, { duration: 1.5 })
            .set('#guide-tracer-group', { x: nextHole.x, y: nextHole.y });
        } else {
          // Standard motion: Stay at current hole for inspection
          tl.to({}, { duration: 1.6 })
            // 光点加速离开当前孔位：位移、缩放、微旋转、淡出
            .to('#guide-tracer-group', {
              x: prevHole ? (targetHole.x + (nextHole.x - targetHole.x) * 0.4) : nextHole.x * 0.3,
              y: prevHole ? (targetHole.y + (nextHole.y - targetHole.y) * 0.4) : nextHole.y * 0.3,
              scale: 0.6,
              rotation: 15,
              autoAlpha: 0,
              duration: 0.35,
              ease: 'power2.in',
            })
            // 下一孔位淡入：从对向微缩放淡入
            .set('#guide-tracer-group', {
              x: nextHole.x,
              y: nextHole.y,
              rotation: -10,
              scale: 1.4,
            })
            .to('#guide-tracer-group', {
              scale: 1,
              rotation: 0,
              autoAlpha: 1,
              duration: 0.4,
              ease: 'back.out(1.6)',
            });
        }
      } else {
        // Last hole dwell time
        tl.to({}, { duration: 1.8 });
      }
    }
  }, [speed]);

  // 3. Pause
  const handlePause = useCallback(() => {
    if (masterTlRef.current && status === 'playing') {
      masterTlRef.current.pause();
      setStatus('paused');
    }
  }, [status]);

  // 4. Resume
  const handleResume = useCallback(() => {
    if (masterTlRef.current && status === 'paused') {
      masterTlRef.current.resume();
      setStatus('playing');
    } else {
      startGuiding(activeHoleIndex);
    }
  }, [status, startGuiding, activeHoleIndex]);

  // 5. Reset
  const handleReset = useCallback(() => {
    if (masterTlRef.current) {
      masterTlRef.current.kill();
      masterTlRef.current = null;
    }
    setActiveHoleIndex(0);
    setVisitedHoleIds(new Set());
    setStatus('idle');

    // Reset tracer to LP hole
    const firstHole = DG16_HOLES[0];
    gsap.to('#guide-tracer-group', {
      x: firstHole.x,
      y: firstHole.y,
      scale: 1,
      rotation: 0,
      autoAlpha: 1,
      duration: isReducedMotion() ? 0.05 : 0.4,
      ease: 'power2.out',
    });
  }, []);

  // 6. Manual Selection (Stops auto guiding to prevent override)
  const handleSelectHole = useCallback((hole: DG16Hole) => {
    // Stop ongoing timeline
    if (masterTlRef.current) {
      masterTlRef.current.kill();
      masterTlRef.current = null;
    }
    setStatus('paused');

    const index = DG16_HOLES.findIndex((h) => h.id === hole.id);
    if (index !== -1) {
      setActiveHoleIndex(index);
      setVisitedHoleIds((prev) => new Set([...Array.from(prev), hole.id]));

      // Move tracer immediately to clicked hole
      gsap.to('#guide-tracer-group', {
        x: hole.x,
        y: hole.y,
        scale: 1,
        rotation: 0,
        autoAlpha: 1,
        duration: isReducedMotion() ? 0.05 : 0.45,
        ease: 'back.out(1.5)',
      });

      // Card refresh feedback
      gsap.fromTo(
        '#hole-info-card',
        { autoAlpha: isReducedMotion() ? 1 : 0.85, y: isReducedMotion() ? 0 : 5 },
        { autoAlpha: 1, y: 0, duration: 0.25, ease: 'power2.out' }
      );
    }
  }, []);

  // 7. Speed Change (Modulates timeScale without rebuilding timeline or losing progress)
  const handleChangeSpeed = useCallback((newSpeed: SpeedPreset) => {
    setSpeed(newSpeed);
    const newScale = SPEED_CONFIG[newSpeed].scale;
    if (masterTlRef.current) {
      masterTlRef.current.timeScale(newScale);
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full space-y-6">
      {/* 核心操作控制条 */}
      <GuideControls
        status={status}
        onStart={() => startGuiding(activeHoleIndex >= DG16_HOLES.length - 1 ? 0 : activeHoleIndex)}
        onPause={handlePause}
        onResume={handleResume}
        onReset={handleReset}
        speed={speed}
        onChangeSpeed={handleChangeSpeed}
        currentIndex={activeHoleIndex}
        totalHoles={DG16_HOLES.length}
        lang={lang}
      />

      {/* 动画舞台：桌面端并列 / 手机端上下 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 左侧/上方：DG16 交互画布 */}
        <div className="lg:col-span-7">
          <DG16Canvas
            holes={DG16_HOLES}
            activeHoleId={currentHole.id}
            visitedHoleIds={visitedHoleIds}
            onSelectHole={handleSelectHole}
            lang={lang}
          />
        </div>

        {/* 右侧/下方：当前孔位规格信息卡 */}
        <div className="lg:col-span-5">
          <HoleInfoCard
            hole={currentHole}
            currentIndex={activeHoleIndex}
            totalHoles={DG16_HOLES.length}
            isComplete={status === 'completed'}
            lang={lang}
          />
        </div>
      </div>
    </div>
  );
};
