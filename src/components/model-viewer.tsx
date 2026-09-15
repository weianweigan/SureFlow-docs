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
  className = 'w-full h-full min-h-[440px]',
  autoRotate = true,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [isRotating, setIsRotating] = useState(autoRotate);
  const viewerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
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
    <div className={`relative rounded-lg overflow-hidden border border-hairline bg-canvas light-grid-bg shadow-sm ${className}`}>
      {/* 顶部状态角标 */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <span className="flex h-2.5 w-2.5 rounded-full bg-semantic-success animate-pulse" />
        <span className="text-[12px] font-mono tracking-wide text-ink bg-canvas px-3 py-1 rounded-pill border border-hairline shadow-xs flex items-center gap-1.5 font-medium">
          <Layers className="h-3.5 w-3.5 text-ink" />
          WebGL 2.0 / PBR 金属材质
        </span>
      </div>

      {/* 控制条 */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-canvas border border-hairline rounded-pill p-1 shadow-xs">
        <button
          onClick={toggleRotate}
          title={isRotating ? '暂停自动旋转' : '开启自动旋转'}
          className={`h-8 w-8 rounded-full flex items-center justify-center text-xs transition ${
            isRotating ? 'bg-ink text-white' : 'text-neutral-700 hover:bg-surface-soft'
          }`}
        >
          <RotateCw className={`h-4 w-4 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
        </button>
        <button
          onClick={resetCamera}
          title="复位视角"
          className="h-8 w-8 rounded-full flex items-center justify-center text-xs text-neutral-700 hover:bg-surface-soft transition"
        >
          <RefreshCw className="h-4 w-4" />
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
            'rotation-per-second': '18deg',
            'camera-controls': '',
            'touch-action': 'pan-y',
            'interaction-prompt': 'auto',
            'shadow-intensity': '1.2',
            'shadow-softness': '0.6',
            exposure: '1.15',
            'camera-orbit': '45deg 60deg 105%',
            'min-camera-orbit': 'auto auto 5%',
            'max-camera-orbit': 'auto auto 200%',
            style: { width: '100%', height: '100%', minHeight: '440px', background: 'transparent' },
          },
          React.createElement(
            'div',
            { slot: 'poster', className: 'w-full h-full flex flex-col items-center justify-center text-neutral-500 p-8' },
            React.createElement('div', { className: 'h-10 w-10 border-2 border-ink border-t-transparent rounded-full animate-spin mb-4' }),
            React.createElement('p', { className: 'text-xs font-mono text-neutral-600' }, '正在装配高保真液压流道模型...')
          )
        )
      ) : (
        <div className="w-full h-full min-h-[440px] flex flex-col items-center justify-center text-neutral-500 p-8">
          <div className="h-10 w-10 border-2 border-ink border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-xs font-mono text-neutral-600">初始化 WebGL 3D 渲染管线...</p>
        </div>
      )}

      {/* 底部交互指引 */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <span className="text-[11px] font-mono text-neutral-700 bg-canvas px-3 py-1 rounded-pill border border-hairline shadow-xs">
          🖱️ 拖拽旋转 / 滚轮缩放 / 右键平移
        </span>
        <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline bg-canvas px-2.5 py-0.5 rounded border border-hairline-soft">
          ISO 4401 标准面
        </span>
      </div>
    </div>
  );
};
