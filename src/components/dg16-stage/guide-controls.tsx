'use client';

import React from 'react';
import { SpeedPreset, SPEED_CONFIG } from '@/lib/dg16-data';
import {
  Play,
  Pause,
  RotateCcw,
  Gauge,
  CheckCircle2,
} from 'lucide-react';

interface GuideControlsProps {
  status: 'idle' | 'playing' | 'paused' | 'completed';
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  speed: SpeedPreset;
  onChangeSpeed: (newSpeed: SpeedPreset) => void;
  currentIndex: number;
  totalHoles: number;
  lang: 'zh' | 'en';
}

export const GuideControls: React.FC<GuideControlsProps> = ({
  status,
  onStart,
  onPause,
  onResume,
  onReset,
  speed,
  onChangeSpeed,
  currentIndex,
  totalHoles,
  lang,
}) => {
  const isZh = lang === 'zh';

  return (
    <div className="w-full rounded-2xl border border-hairline/80 bg-white/90 backdrop-blur-md p-4 sm:p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* 左侧：播放主控制按钮群 */}
        <div className="flex items-center gap-2.5">
          {status === 'idle' || status === 'completed' ? (
            <button
              onClick={onStart}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-pill bg-ink text-white font-mono text-xs font-bold hover:bg-neutral-800 transition active:scale-95 shadow-xs"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>{status === 'completed' ? (isZh ? '再次播放' : 'Replay') : (isZh ? '开始引导' : 'Start Guide')}</span>
            </button>
          ) : status === 'playing' ? (
            <button
              onClick={onPause}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-pill bg-amber-500 text-white font-mono text-xs font-bold hover:bg-amber-600 transition active:scale-95 shadow-xs"
            >
              <Pause className="h-3.5 w-3.5 fill-current" />
              <span>{isZh ? '暂停' : 'Pause'}</span>
            </button>
          ) : (
            <button
              onClick={onResume}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-pill bg-blue-600 text-white font-mono text-xs font-bold hover:bg-blue-700 transition active:scale-95 shadow-xs"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>{isZh ? '继续' : 'Resume'}</span>
            </button>
          )}

          <button
            onClick={onReset}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-pill bg-surface-soft hover:bg-neutral-200 text-neutral-800 font-mono text-xs font-medium border border-hairline transition active:scale-95"
            title={isZh ? '重置全部引导状态' : 'Reset all states'}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{isZh ? '重置' : 'Reset'}</span>
          </button>
        </div>

        {/* 右侧：平稳 / 标准 / 高速 三档速度切换器 */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="flex items-center gap-1 text-neutral-500 mr-1 hidden sm:flex">
            <Gauge className="h-3.5 w-3.5" />
            <span>{isZh ? '速度' : 'Speed'}:</span>
          </div>

          <div className="inline-flex rounded-pill bg-surface-soft p-1 border border-hairline">
            {(['smooth', 'standard', 'fast'] as SpeedPreset[]).map((sp) => {
              const isActive = speed === sp;
              const config = SPEED_CONFIG[sp];
              return (
                <button
                  key={sp}
                  onClick={() => onChangeSpeed(sp)}
                  className={`px-3 py-1 rounded-pill text-[11px] font-mono transition-all duration-150 ${
                    isActive
                      ? 'bg-ink text-white font-bold shadow-2xs'
                      : 'text-neutral-600 hover:text-ink'
                  }`}
                >
                  {isZh ? config.labelZh : config.labelEn}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 进度轨道条 */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span>{isZh ? '孔位时序扫描进度' : 'Hole Sequence Progress'}</span>
          <span className="font-bold text-ink">
            {status === 'completed'
              ? (isZh ? '10 / 10 (引导完成)' : '10 / 10 (Complete)')
              : `${Math.min(currentIndex + 1, totalHoles)} / ${totalHoles}`}
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-neutral-200 overflow-hidden">
          <div
            className="h-full bg-ink transition-all duration-300 ease-out"
            style={{
              width: `${status === 'completed' ? 100 : ((currentIndex + (status === 'idle' ? 0 : 1)) / totalHoles) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
