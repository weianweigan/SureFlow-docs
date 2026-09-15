'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Cpu, ShieldCheck, Layers } from 'lucide-react';

interface PageHeaderProps {
  lang: 'zh' | 'en';
}

export const PageHeader: React.FC<PageHeaderProps> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isZh = lang === 'zh';

  useEffect(() => {
    if (!containerRef.current) return;

    const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 统一编排入场动画：标题、状态数据依次从下方平滑进入
      gsap.from('.header-stagger-item', {
        y: isReduced ? 0 : 30,
        opacity: 0,
        stagger: isReduced ? 0.05 : 0.12,
        duration: isReduced ? 0.2 : 0.7,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={containerRef} className="space-y-6 max-w-4xl">
      {/* 顶部标签 */}
      <div className="header-stagger-item inline-flex items-center gap-2 px-3.5 py-1 rounded-pill bg-white/90 backdrop-blur-sm text-neutral-800 text-xs font-mono font-medium border border-hairline shadow-2xs">
        <Cpu className="h-3.5 w-3.5 text-blue-600" />
        <span>{isZh ? 'DIN ISO 7368 · DG16 标准孔位引导' : 'DIN ISO 7368 · DG16 CAVITY GUIDE DEMO'}</span>
      </div>

      {/* 页面大标题 */}
      <h1 className="header-stagger-item text-3xl sm:text-5xl font-bold tracking-tight text-ink leading-tight">
        {isZh ? 'DG16 二通插装阀块' : 'DG16 2-Way Cartridge Block'}
        <span className="block text-neutral-500 font-light text-2xl sm:text-4xl mt-1">
          {isZh ? '孔位时序引导演示工作台' : 'Cavity Sequence Guiding Workbench'}
        </span>
      </h1>

      {/* 描述与说明 */}
      <p className="header-stagger-item text-sm sm:text-base text-neutral-600 leading-relaxed font-light max-w-2xl">
        {isZh
          ? '基于 SureFlow 标准几何库的真实参数构建，展示 10 个标准孔腔（定位销、三阶主插孔、4 先导油孔与 4 螺栓紧固孔）的时序引导路径、分阶切削剖面与公差参数。'
          : 'Built on SureFlow standard library geometry, demonstrating sequential navigation across all 10 cavities (locating pin, stepped main cavity, 4 pilot ports, and 4 mounting bolts).'}
      </p>

      {/* 状态数据规格微标 */}
      <div className="header-stagger-item grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="rounded-xl bg-white/80 border border-hairline p-3">
          <p className="text-[10px] font-mono uppercase text-neutral-500">{isZh ? '基准外形' : 'Stock Dimension'}</p>
          <p className="text-xs font-mono font-bold text-ink mt-0.5">65 × 65 mm</p>
        </div>
        <div className="rounded-xl bg-white/80 border border-hairline p-3">
          <p className="text-[10px] font-mono uppercase text-neutral-500">{isZh ? '标准孔位数' : 'Standard Cavities'}</p>
          <p className="text-xs font-mono font-bold text-blue-600 mt-0.5">10 孔 (真实图元)</p>
        </div>
        <div className="rounded-xl bg-white/80 border border-hairline p-3">
          <p className="text-[10px] font-mono uppercase text-neutral-500">{isZh ? '主阀通径' : 'Nominal Size'}</p>
          <p className="text-xs font-mono font-bold text-ink mt-0.5">DN 16 (⌀32/25/16)</p>
        </div>
        <div className="rounded-xl bg-white/80 border border-hairline p-3">
          <p className="text-[10px] font-mono uppercase text-neutral-500">{isZh ? '设计标准' : 'Standard'}</p>
          <p className="text-xs font-mono font-bold text-ink mt-0.5">DIN ISO 7368</p>
        </div>
      </div>
    </header>
  );
};
