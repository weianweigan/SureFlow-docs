'use client';

import React from 'react';
import { DG16Hole } from '@/lib/dg16-data';
import {
  CheckCircle2,
  Crosshair,
  Layers,
  ArrowRight,
  Info,
} from 'lucide-react';

interface HoleInfoCardProps {
  hole: DG16Hole | null;
  currentIndex: number;
  totalHoles: number;
  isComplete: boolean;
  lang: 'zh' | 'en';
}

export const HoleInfoCard: React.FC<HoleInfoCardProps> = ({
  hole,
  currentIndex,
  totalHoles,
  isComplete,
  lang,
}) => {
  const isZh = lang === 'zh';

  if (!hole) {
    return (
      <div className="rounded-2xl border border-hairline/80 bg-white/90 backdrop-blur-md p-6 shadow-xs flex flex-col justify-center min-h-[360px] text-center space-y-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-soft text-neutral-500 mx-auto">
          <Crosshair className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-ink">
          {isZh ? '准备就绪 · 点击开始引导' : 'Ready · Click Start Guide'}
        </h3>
        <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
          {isZh
            ? '可点击“开始引导”自动按工艺时序巡检 10 个标准孔位，或直接点击左侧任意孔位手动查看参数。'
            : 'Click "Start Guide" to inspect all 10 cavities sequentially, or click any hole on the left directly.'}
        </p>
      </div>
    );
  }

  return (
    <div
      id="hole-info-card"
      className="rounded-2xl border border-hairline/90 bg-white/95 backdrop-blur-md p-6 shadow-sm flex flex-col justify-between min-h-[380px] space-y-5 transition-all duration-300"
    >
      {/* 顶部序号、类别与进度 */}
      <div className="flex items-center justify-between pb-3 border-b border-hairline">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-ink text-white font-mono text-xs font-bold">
            {hole.order}
          </span>
          <span className="font-mono text-xs font-bold text-neutral-800">
            {hole.name}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200">
            {isZh ? hole.categoryZh : hole.categoryEn}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500">
          <span>{isZh ? '引导进度' : 'Progress'}</span>
          <span className="font-bold text-ink">
            {String(currentIndex + 1).padStart(2, '0')} / {String(totalHoles).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* 标题与描述说明 */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold tracking-tight text-ink flex items-center gap-2">
          <span>{isZh ? hole.titleZh : hole.titleEn}</span>
        </h3>
        <p className="text-xs text-neutral-600 leading-relaxed font-light">
          {isZh ? hole.descZh : hole.descEn}
        </p>
      </div>

      {/* 工程参数细节卡片 */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-600 font-bold">
          {isZh ? '制造工程规格参数' : 'ENGINEERING SPECIFICATIONS'}
        </span>
        <div className="p-3 rounded-xl bg-surface-soft/80 border border-hairline/70 space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between text-neutral-600">
            <span>{isZh ? '规格概要' : 'Spec'}</span>
            <span className="font-semibold text-ink">{isZh ? hole.specZh : hole.specEn}</span>
          </div>
          <div className="flex items-center justify-between text-neutral-600">
            <span>{isZh ? '基准相对坐标' : 'Relative (X, Y)'}</span>
            <span className="font-bold text-ink">({hole.x}, {hole.y}) mm</span>
          </div>
          {hole.flowDirection && (
            <div className="flex items-center justify-between text-neutral-600">
              <span>{isZh ? '流体拓扑' : 'Flow'}</span>
              <span className="font-medium text-blue-600">{hole.flowDirection}</span>
            </div>
          )}
        </div>
      </div>

      {/* 分阶阶梯孔切削剖面 */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-600 font-bold flex items-center gap-1">
          <Layers className="h-3 w-3" />
          <span>{isZh ? '切削分阶步骤 (Steps)' : 'Bore Step Decomposition'}</span>
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono">
          {hole.steps.map((st, i) => (
            <div
              key={i}
              className="rounded-lg bg-neutral-50 border border-hairline p-2 text-center"
            >
              <p className="text-[9px] text-neutral-600">Step {i + 1} ({st.type})</p>
              <p className="font-bold text-ink">⌀{st.diameter}mm</p>
              {st.length && <p className="text-[9px] text-neutral-600">L={st.length}mm</p>}
              {st.thread && <p className="text-[9px] text-blue-600">{st.thread}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* 引导状态指示条 */}
      <div className="pt-2 border-t border-hairline flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-1.5 text-neutral-600">
          <Info className="h-3.5 w-3.5 text-blue-500" />
          <span>{isZh ? '已聚焦目标孔腔' : 'Target Cavity Focused'}</span>
        </div>
        {isComplete && (
          <span className="flex items-center gap-1 text-emerald-600 font-bold animate-pulse">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>{isZh ? '引导已完成' : 'Completed'}</span>
          </span>
        )}
      </div>
    </div>
  );
};
