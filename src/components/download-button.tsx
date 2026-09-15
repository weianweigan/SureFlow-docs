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

    fetchPlatformRelease('win').then(setWinRelease);
    fetchPlatformRelease('mac').then(setMacRelease);
  }, []);

  const t = DICTIONARY[lang];

  const primaryPlatform = userOS === 'mac' ? 'mac' : 'win';
  const primaryRelease = primaryPlatform === 'mac' ? macRelease : winRelease;
  const isMac = primaryPlatform === 'mac';

  const downloadUrl = primaryRelease?.downloadUrl || (isMac 
    ? 'https://sureflow-update.hy3d.space/SureFlow-0.1.0-arm64.dmg'
    : 'https://sureflow-update.hy3d.space/SureFlow-Setup-0.1.0.exe');

  const currentVersion = primaryRelease?.version || 'v0.1.0';

  return (
    <div className={`relative inline-flex flex-col sm:flex-row items-stretch sm:items-center gap-2 ${className}`}>
      {/* 胶囊主下载按钮 */}
      <div className="inline-flex rounded-pill border border-ink bg-ink shadow-sm">
        <a
          href={downloadUrl}
          download
          className="flex items-center justify-center gap-3 px-6 py-3 bg-ink hover:bg-neutral-800 text-white rounded-l-pill transition"
        >
          {isMac ? <Laptop className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold tracking-tight leading-tight">
              {t.hero.primaryAction} ({isMac ? 'macOS arm64' : 'Windows x64'})
            </span>
            <span className="text-[11px] font-mono text-neutral-300">
              {currentVersion} • 稳定版直链
            </span>
          </div>
          <Download className="h-4 w-4 ml-1" />
        </a>

        {/* 平台下拉选择切换 */}
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="px-3 bg-ink hover:bg-neutral-800 text-white rounded-r-pill border-l border-white/20 transition flex items-center justify-center"
          title="选择其他操作系统版本"
          aria-label="选择平台"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* 下拉浮层 */}
      {showDropdown && (
        <div className="absolute top-full left-0 mt-2 w-72 rounded-lg bg-canvas border border-hairline shadow-lg p-2 z-50 animate-fade-in text-xs">
          <div className="px-2 py-1.5 font-mono uppercase tracking-wider text-[10px] text-neutral-500 font-semibold">
            可选平台安装包 (Cloudflare 边缘加速)
          </div>
          <a
            href={winRelease?.downloadUrl || 'https://sureflow-update.hy3d.space/SureFlow-Setup-0.1.0.exe'}
            download
            className="flex items-center justify-between p-2.5 rounded-md hover:bg-surface-soft text-ink transition"
            onClick={() => setShowDropdown(false)}
          >
            <div className="flex items-center gap-2.5">
              <Monitor className="h-4 w-4 text-ink" />
              <div>
                <p className="font-semibold text-ink">Windows 64位 (.exe)</p>
                <p className="text-[11px] font-mono text-neutral-500">{winRelease?.version || 'v0.1.0'}</p>
              </div>
            </div>
            {primaryPlatform === 'win' && <CheckCircle2 className="h-4 w-4 text-semantic-success" />}
          </a>

          <a
            href={macRelease?.downloadUrl || 'https://sureflow-update.hy3d.space/SureFlow-0.1.0-arm64.dmg'}
            download
            className="flex items-center justify-between p-2.5 rounded-md hover:bg-surface-soft text-ink transition"
            onClick={() => setShowDropdown(false)}
          >
            <div className="flex items-center gap-2.5">
              <Laptop className="h-4 w-4 text-ink" />
              <div>
                <p className="font-semibold text-ink">macOS Apple Silicon (.dmg)</p>
                <p className="text-[11px] font-mono text-neutral-500">{macRelease?.version || 'v0.1.0'}</p>
              </div>
            </div>
            {primaryPlatform === 'mac' && <CheckCircle2 className="h-4 w-4 text-semantic-success" />}
          </a>

          <div className="pt-2 mt-1 border-t border-hairline-soft px-2">
            <Link
              href={`/${lang}/download`}
              className="text-ink hover:underline block text-center py-1 font-semibold"
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
