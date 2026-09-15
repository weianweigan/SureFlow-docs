'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    // 自动检测用户偏好语言并跳转
    const userLang = navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
    router.replace(`/${userLang}`);
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-slate-300">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-500 border-t-transparent" />
        <p className="text-xs font-mono text-slate-400">正在进入 SureFlow 官方工作空间...</p>
      </div>
    </div>
  );
}
