'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Download, Monitor, Laptop, ChevronDown, CheckCircle2 } from 'lucide-react';
import { detectUserOS, fetchPlatformRelease, type PlatformRelease, type UserOS } from '@/lib/updater';
import { type Locale, DICTIONARY } from '@/lib/i18n';

interface DownloadButtonProps {
  lang: Locale;
  className?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ lang, className = '' }) => {
  const [userOS, setUserOS] = useState<UserOS>('windows');
  const [winRelease, setWinRelease] = useState<PlatformRelease | null>(null);
  const [macRelease, setMacRelease] = useState<PlatformRelease | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const os = detectUserOS();
    setUserOS(os);

    // 客户端异步获取 sureflow-update.hy3d.space 最新更新
    fetchPlatformRelease('win').then(setWinRelease);
    fetchPlatformRelease('mac').then(setMacRelease);
  }, []);

  const t = DICTIONARY[lang];

  // 根据当前系统挑选首选发布
  const primaryPlatform = userOS === 'mac' ? 'mac' : 'win';
  const primaryRelease = primaryPlatform === 'mac' ? macRelease : winRelease;
  const isMac = primaryPlatform === 'mac';

  const downloadUrl = primaryRelease?.downloadUrl || (isMac 
    ? 'https://sureflow-update.hy3d.space/SureFlow-0.1.0-arm64.dmg'
    : 'https://sureflow-update.hy3d.space/SureFlow-Setup-0.1.0.exe');

  const currentVersion = primaryRelease?.version || 'v0.1.0';

  return (
    <div className={`relative inline-flex flex-col sm:flex-row items-stretch sm:items-center gap-2 ${className}`}>
      {/* 智能主下载按钮 */}
      <div className="inline-flex rounded-xl shadow-lg shadow-sky-500/20">
        <a
          href={downloadUrl}
          download
          className="flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold rounded-l-xl transition-all duration-200 hover:shadow-sky-500/30"
        >
          {isMac ? <Laptop className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
          <div className="flex flex-col text-left">
            <span className="text-sm font-bold leading-tight">
              {t.hero.primaryAction} ({isMac ? 'macOS arm64' : 'Windows x64'})
            </span>
            <span className="text-[11px] font-mono text-sky-100 opacity-90">
              {currentVersion} • 稳定版直链
            </span>
          </div>
          <Download className="h-4 w-4 ml-1" />
        </a>

        {/* 平台下拉选择切换 */}
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="px-3 bg-blue-700 hover:bg-blue-600 text-white rounded-r-xl border-l border-blue-500/30 transition flex items-center justify-center"
          title="选择其他操作系统版本"
          aria-label="选择平台"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* 下拉浮层 */}
      {showDropdown && (
        <div className="absolute top-full left-0 mt-2 w-72 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 animate-fade-in text-xs">
          <div className="px-2 py-1.5 font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
            可选平台安装包 (Cloudflare 节点加速)
          </div>
          <a
            href={winRelease?.downloadUrl || 'https://sureflow-update.hy3d.space/SureFlow-Setup-0.1.0.exe'}
            download
            className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800 text-slate-200 transition"
            onClick={() => setShowDropdown(false)}
          >
            <div className="flex items-center gap-2.5">
              <Monitor className="h-4 w-4 text-sky-400" />
              <div>
                <p className="font-semibold text-white">Windows 64位 (.exe)</p>
                <p className="text-[11px] text-slate-400">{winRelease?.version || 'v0.1.0'}</p>
              </div>
            </div>
            {primaryPlatform === 'win' && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
          </a>

          <a
            href={macRelease?.downloadUrl || 'https://sureflow-update.hy3d.space/SureFlow-0.1.0-arm64.dmg'}
            download
            className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800 text-slate-200 transition"
            onClick={() => setShowDropdown(false)}
          >
            <div className="flex items-center gap-2.5">
              <Laptop className="h-4 w-4 text-sky-400" />
              <div>
                <p className="font-semibold text-white">macOS Apple Silicon (.dmg)</p>
                <p className="text-[11px] text-slate-400">{macRelease?.version || 'v0.1.0'}</p>
              </div>
            </div>
            {primaryPlatform === 'mac' && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
          </a>

          <div className="pt-2 mt-1 border-t border-slate-800/80 px-2">
            <Link
              href={`/${lang}/download`}
              className="text-sky-400 hover:underline block text-center py-1 font-medium"
              onClick={() => setShowDropdown(false)}
            >
              前往完整下载中心与校验值 →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
