'use client';

import React, { useRef, useId } from 'react';
import { DG16Hole, DG16_OUTLINE } from '@/lib/dg16-data';

interface DG16CanvasProps {
  holes: DG16Hole[];
  activeHoleId: string | null;
  visitedHoleIds: Set<string>;
  onSelectHole: (hole: DG16Hole) => void;
  lang: 'zh' | 'en';
}

export const DG16Canvas: React.FC<DG16CanvasProps> = ({
  holes,
  activeHoleId,
  visitedHoleIds,
  onSelectHole,
  lang,
}) => {
  const isZh = lang === 'zh';
  const filterId = useId();

  // Find active hole geometry
  const activeHole = holes.find((h) => h.id === activeHoleId);

  return (
    <div className="relative w-full aspect-square max-w-[540px] mx-auto select-none">
      {/* 极简网格纹理底板 */}
      <div className="absolute inset-0 rounded-2xl border border-hairline/80 bg-white/90 backdrop-blur-sm shadow-xs [background-image:linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* 顶部免责与规范角标 */}
      <div className="absolute top-3 left-4 right-4 z-10 flex items-center justify-between text-[11px] font-mono pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-soft/90 border border-hairline text-neutral-600">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          <span>DIN ISO 7368 · DG16</span>
        </div>
        <span className="px-2.5 py-1 rounded bg-amber-50 border border-amber-200/80 text-amber-700 font-medium">
          ⚠️ {isZh ? DG16_OUTLINE.disclaimerZh : DG16_OUTLINE.disclaimerEn}
        </span>
      </div>

      {/* 底部几何尺度注释 */}
      <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[10px] font-mono text-neutral-600 pointer-events-none">
        <span>STOCK: 65 × 65 mm</span>
        <span>PITCH: 46.0 mm (4×M8)</span>
      </div>

      {/* 核心高精度 SVG 画布 */}
      <svg
        viewBox="-48 -48 96 96"
        className="w-full h-full p-6 overflow-visible focus:outline-none"
        role="region"
        aria-label={isZh ? 'DG16 阀块孔位交互图' : 'DG16 Manifold Cavity Interactive Diagram'}
      >
        <defs>
          {/* 光晕与渐变 */}
          <radialGradient id={`tracer-glow-${filterId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>

          <filter id={`active-glow-${filterId}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. CAD 坐标十字中心线 */}
        <g id="canvas-axes" opacity="0.45" stroke="#94a3b8" strokeWidth="0.3" strokeDasharray="3 2">
          <line x1="-42" y1="0" x2="42" y2="0" />
          <line x1="0" y1="-42" x2="0" y2="42" />
        </g>

        {/* 2. 外廓 65×65mm 与倒角 */}
        <g id="canvas-block-outline">
          <rect
            x="-32.5"
            y="-32.5"
            width="65"
            height="65"
            rx="1.5"
            fill="rgba(255, 255, 255, 0.85)"
            stroke="#1e293b"
            strokeWidth="1.2"
          />
          {/* 角部倒角线 */}
          <line x1="-32.5" y1="-28" x2="-28" y2="-32.5" stroke="#64748b" strokeWidth="0.5" />
          <line x1="32.5" y1="-28" x2="28" y2="-32.5" stroke="#64748b" strokeWidth="0.5" />
          <line x1="-32.5" y1="28" x2="-28" y2="32.5" stroke="#64748b" strokeWidth="0.5" />
          <line x1="32.5" y1="28" x2="28" y2="32.5" stroke="#64748b" strokeWidth="0.5" />
        </g>

        {/* 3. 尺寸线与公差标尺 */}
        <g id="canvas-dimensions" opacity="0.6">
          {/* 顶端 65mm 宽度 */}
          <line x1="-32.5" y1="-37" x2="32.5" y2="-37" stroke="#64748b" strokeWidth="0.35" />
          <line x1="-32.5" y1="-38.5" x2="-32.5" y2="-33" stroke="#94a3b8" strokeWidth="0.25" />
          <line x1="32.5" y1="-38.5" x2="32.5" y2="-33" stroke="#94a3b8" strokeWidth="0.25" />
          <polygon points="-32.5,-37 -30.5,-36.4 -30.5,-37.6" fill="#64748b" />
          <polygon points="32.5,-37 30.5,-36.4 30.5,-37.6" fill="#64748b" />
          <text x="0" y="-39" textAnchor="middle" className="text-[2.6px] font-mono font-bold fill-neutral-600">65.00</text>

          {/* 右侧 46mm 螺栓孔距 */}
          <line x1="38" y1="-23" x2="38" y2="23" stroke="#64748b" strokeWidth="0.35" />
          <line x1="25" y1="-23" x2="39.5" y2="-23" stroke="#94a3b8" strokeWidth="0.25" />
          <line x1="25" y1="23" x2="39.5" y2="23" stroke="#94a3b8" strokeWidth="0.25" />
          <polygon points="38,-23 37.4,-21 38.6,-21" fill="#64748b" />
          <polygon points="38,23 37.4,21 38.6,21" fill="#64748b" />
          <text x="41" y="0.8" textAnchor="start" className="text-[2.4px] font-mono font-semibold fill-neutral-500">46.00</text>
        </g>

        {/* 4. 各孔位图元渲染 (10 个真实标准孔) */}
        <g id="canvas-holes">
          {holes.map((hole) => {
            const isActive = hole.id === activeHoleId;
            const isVisited = visitedHoleIds.has(hole.id);

            // 依据状态与类型确定视觉色彩
            let fillColor = '#f8fafc';
            let strokeColor = '#64748b';
            let strokeWidth = 0.6;
            let statusText = isZh ? '未查看' : 'Unvisited';

            if (isActive) {
              fillColor = '#eff6ff';
              strokeColor = '#0284c7';
              strokeWidth = 1.4;
              statusText = isZh ? '当前聚焦' : 'Active';
            } else if (isVisited) {
              fillColor = '#f0fdf4';
              strokeColor = '#16a34a';
              strokeWidth = 0.8;
              statusText = isZh ? '已查看' : 'Visited';
            }

            return (
              <g
                key={hole.id}
                id={`hole-group-${hole.id}`}
                tabIndex={0}
                role="button"
                aria-label={`${hole.name} (${hole.titleZh}) - ${statusText}`}
                onClick={() => onSelectHole(hole)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectHole(hole);
                  }
                }}
                className="cursor-pointer transition-all duration-200 focus:outline-none group"
              >
                {/* 聚焦时的微扩散波纹环 (Pulse Wave) */}
                {isActive && (
                  <circle
                    id="active-pulse-ring"
                    cx={hole.x}
                    cy={hole.y}
                    r={hole.radius + 3}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="0.8"
                    opacity="0.8"
                    className="animate-ping"
                    style={{ animationDuration: '2s' }}
                  />
                )}

                {/* 主切孔轮廓 */}
                {hole.id === 'CV' ? (
                  // CV 三阶同心圆
                  <g>
                    <circle cx={0} cy={0} r={16} fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
                    <circle cx={0} cy={0} r={12.5} fill="none" stroke={strokeColor} strokeWidth={strokeWidth * 0.7} />
                    <circle cx={0} cy={0} r={8} fill={isActive ? '#e0f2fe' : '#e2e8f0'} stroke={strokeColor} strokeWidth={strokeWidth} />
                    {/* CV 内部十字准心 */}
                    <line x1="-3" y1="0" x2="3" y2="0" stroke={strokeColor} strokeWidth="0.4" />
                    <line x1="0" y1="-3" x2="0" y2="3" stroke={strokeColor} strokeWidth="0.4" />
                  </g>
                ) : hole.type === 'bolt' ? (
                  // M8 螺栓孔（底孔 + 螺纹节圆）
                  <g>
                    <circle cx={hole.x} cy={hole.y} r={hole.radius} fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
                    <circle cx={hole.x} cy={hole.y} r={hole.radius * 0.8} fill="none" stroke="#94a3b8" strokeWidth="0.35" strokeDasharray="1.5 1" />
                  </g>
                ) : (
                  // 定位销与常规油口圆
                  <circle
                    cx={hole.x}
                    cy={hole.y}
                    r={hole.radius}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                  />
                )}

                {/* 键盘与鼠标 Hover 环形外框 */}
                <circle
                  cx={hole.x}
                  cy={hole.y}
                  r={hole.radius + 1.5}
                  fill="none"
                  stroke={isActive ? '#0284c7' : '#94a3b8'}
                  strokeWidth="0.4"
                  strokeDasharray={isActive ? 'none' : '1.5 1.5'}
                  className="group-hover:stroke-blue-500 group-focus-visible:stroke-blue-600 group-focus-visible:stroke-[1px]"
                />

                {/* 孔位文字编号与名称 (字体大小严格自适应，保证永不遮挡) */}
                <text
                  x={hole.x}
                  y={hole.y + (hole.id === 'CV' ? 1.0 : 0.8)}
                  textAnchor="middle"
                  className={`font-mono font-bold pointer-events-none ${
                    hole.id === 'CV'
                      ? 'text-[3.2px] fill-neutral-800'
                      : hole.type === 'bolt'
                      ? 'text-[2.2px] fill-neutral-700'
                      : 'text-[1.8px] fill-neutral-800'
                  }`}
                >
                  {hole.name}
                </text>

                {/* 状态辅助徽标 (仅依赖文字/图标传递状态，兼顾可访问性) */}
                {isVisited && !isActive && (
                  <circle
                    cx={hole.x + (hole.radius > 4 ? hole.radius - 1 : 2.5)}
                    cy={hole.y - (hole.radius > 4 ? hole.radius - 1 : 2.5)}
                    r="1"
                    fill="#16a34a"
                  />
                )}
              </g>
            );
          })}
        </g>

        {/* 5. 引导光点 (Guide Tracer) —— 随 GSAP timeline 沿孔位路径平滑移动 */}
        <g id="guide-tracer-group" opacity={activeHole ? 1 : 0} className="pointer-events-none will-change-transform">
          {/* 光晕背底 */}
          <circle
            id="tracer-glow-circle"
            cx={0}
            cy={0}
            r="7"
            fill={`url(#tracer-glow-${filterId})`}
          />
          {/* 核心光点 */}
          <circle
            id="tracer-core-dot"
            cx={0}
            cy={0}
            r="1.8"
            fill="#0284c7"
            stroke="#ffffff"
            strokeWidth="0.6"
          />
          {/* 旋转十字准星 */}
          <line id="tracer-cross-h" x1="-3" y1="0" x2="3" y2="0" stroke="#0284c7" strokeWidth="0.4" />
          <line id="tracer-cross-v" x1="0" y1="-3" x2="0" y2="3" stroke="#0284c7" strokeWidth="0.4" />
        </g>
      </svg>
    </div>
  );
};
