'use client';

import React, { useEffect, useState, useRef } from 'react';
import { RotateCw, RefreshCw, Layers } from 'lucide-react';

interface ModelViewerProps {
  src?: string;
  poster?: string;
  alt?: string;
  className?: string;
  autoRotate?: boolean;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({
  src = '/models/hydraulic-block.glb',
  alt = 'SureFlow 3D Hydraulic Manifold Block Model',
  className = 'w-full h-full min-h-[420px]',
  autoRotate = true,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [isRotating, setIsRotating] = useState(autoRotate);
  const viewerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // 客户端动态引入 @google/model-viewer 自定义元素
    import('@google/model-viewer')
      .then(() => {
        setLoaded(true);
      })
      .catch((err) => {
        console.error('Failed to load @google/model-viewer:', err);
      });
  }, []);

  const toggleRotate = () => {
    if (!viewerRef.current) return;
    const current = viewerRef.current.hasAttribute('auto-rotate');
    if (current) {
      viewerRef.current.removeAttribute('auto-rotate');
      setIsRotating(false);
    } else {
      viewerRef.current.setAttribute('auto-rotate', '');
      setIsRotating(true);
    }
  };

  const resetCamera = () => {
    if (viewerRef.current) {
      const viewer = viewerRef.current as unknown as { cameraOrbit?: string; jumpCameraToGoal?: () => void };
      if ('cameraOrbit' in viewer) {
        viewer.cameraOrbit = '45deg 55deg 2.5m';
      }
      if (typeof viewer.jumpCameraToGoal === 'function') {
        viewer.jumpCameraToGoal();
      }
    }
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 tech-grid-bg shadow-2xl ${className}`}>
      {/* 顶部状态角标 */}
      <div className="absolute top-3 left-4 z-20 flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-[11px] font-mono tracking-wide text-sky-300 bg-slate-950/80 px-2.5 py-1 rounded-full border border-sky-500/20 backdrop-blur-sm flex items-center gap-1.5">
          <Layers className="h-3 w-3 text-sky-400" />
          WebGL 2.0 / PBR 物理金属材质
        </span>
      </div>

      {/* 控制条 */}
      <div className="absolute top-3 right-4 z-20 flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 rounded-lg p-1 backdrop-blur-sm">
        <button
          onClick={toggleRotate}
          title={isRotating ? '暂停自动旋转' : '开启自动旋转'}
          className={`p-1.5 rounded text-xs transition ${
            isRotating ? 'text-sky-400 bg-sky-500/10' : 'text-slate-400 hover:text-white'
          }`}
        >
          <RotateCw className={`h-3.5 w-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
        </button>
        <button
          onClick={resetCamera}
          title="复位视角"
          className="p-1.5 rounded text-xs text-slate-400 hover:text-white transition"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* 模型渲染区 */}
      {loaded ? (
        React.createElement(
          'model-viewer',
          {
            ref: viewerRef,
            src,
            alt,
            'auto-rotate': isRotating ? '' : undefined,
            'auto-rotate-delay': '1000',
            'rotation-per-second': '20deg',
            'camera-controls': '',
            'touch-action': 'pan-y',
            'interaction-prompt': 'auto',
            'shadow-intensity': '1.5',
            'shadow-softness': '0.8',
            exposure: '1.0',
            'camera-orbit': '45deg 60deg 105%',
            'min-camera-orbit': 'auto auto 5%',
            'max-camera-orbit': 'auto auto 200%',
            style: { width: '100%', height: '100%', minHeight: '420px', background: 'transparent' },
          },
          React.createElement(
            'div',
            { slot: 'poster', className: 'w-full h-full flex flex-col items-center justify-center text-slate-400 p-8' },
            React.createElement('div', { className: 'h-10 w-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mb-4' }),
            React.createElement('p', { className: 'text-xs font-mono text-slate-400' }, '正在装配高保真液压流道模型...')
          )
        )
      ) : (
        <div className="w-full h-full min-h-[420px] flex flex-col items-center justify-center text-slate-400 p-8">
          <div className="h-10 w-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-xs font-mono text-slate-400">初始化 WebGL 3D 渲染管线...</p>
        </div>
      )}

      {/* 底部交互指引 */}
      <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <span className="text-[11px] text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800 backdrop-blur-sm">
          🖱️ 拖拽旋转 / 滚轮缩放 / 右键平移
        </span>
        <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
          标准 ISO 4401 安装面
        </span>
      </div>
    </div>
  );
};
