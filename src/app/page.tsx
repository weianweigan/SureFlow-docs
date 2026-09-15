'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    // 自动检测用户偏好语言并平滑跳转
    const userLang = navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
    router.replace(`/${userLang}`);
  }, [router]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-canvas text-ink selection:bg-neutral-900 selection:text-white">
      {/* 极简浅色 CAD 网格底纹 */}
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4">
        {/* 动态 CAD 旋转十字十字瞄准标 */}
        <div className="relative flex h-12 w-12 items-center justify-center">
          <div className="absolute h-12 w-12 rounded-full border border-hairline animate-spin [animation-duration:3s]" />
          <div className="h-6 w-6 rounded-full border-2 border-ink border-t-transparent animate-spin [animation-duration:0.8s]" />
          <div className="absolute h-1.5 w-1.5 rounded-full bg-semantic-success" />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <span className="font-mono text-xs font-bold tracking-widest text-ink uppercase">SureFlow Studio</span>
            <span className="h-1 w-1 rounded-full bg-neutral-400" />
            <span className="font-mono text-[11px] text-neutral-500">DIN ISO 7368</span>
          </div>
          <p className="text-xs font-mono text-neutral-400">正在载入工业级智能设计工作台...</p>
        </div>
      </div>
    </div>
  );
}
