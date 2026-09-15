'use client';

import React, { useEffect, useState } from 'react';
import { type Locale, DICTIONARY } from '@/lib/i18n';
import {
  detectUserOS,
  fetchPlatformRelease,
  type PlatformRelease,
  type UserOS,
} from '@/lib/updater';
import {
  Monitor,
  Laptop,
  Terminal,
  Download,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Server,
} from 'lucide-react';

interface DownloadClientProps {
  lang: Locale;
}

export const DownloadClient: React.FC<DownloadClientProps> = ({ lang }) => {
  const t = DICTIONARY[lang];

  const [userOS, setUserOS] = useState<UserOS>('windows');
  const [winRelease, setWinRelease] = useState<PlatformRelease | null>(null);
  const [macRelease, setMacRelease] = useState<PlatformRelease | null>(null);
  const [copiedSha, setCopiedSha] = useState<string | null>(null);

  useEffect(() => {
    setUserOS(detectUserOS());

    // 请求 sureflow-update.hy3d.space 更新接口，获取 Windows 与 macOS 最新清单
    Promise.all([fetchPlatformRelease('win'), fetchPlatformRelease('mac')])
      .then(([win, mac]) => {
        setWinRelease(win);
        setMacRelease(mac);
      });
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSha(id);
    setTimeout(() => setCopiedSha(null), 2000);
  };

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 头部标题 */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
            <Server className="h-3.5 w-3.5" />
            <span>Cloudflare Edge 分发网络</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.downloadPage.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-400">
            {t.downloadPage.subtitle}
          </p>
        </div>

        {/* 平台安装包卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Windows 卡片 */}
          <div
            className={`glass-panel p-8 rounded-3xl border transition duration-300 flex flex-col justify-between ${
              userOS === 'windows'
                ? 'border-sky-500/60 shadow-xl shadow-sky-500/10 ring-1 ring-sky-500/30'
                : 'border-slate-800'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20">
                  <Monitor className="h-7 w-7" />
                </div>
                {userOS === 'windows' && (
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-sky-500 text-white shadow-sm">
                    {lang === 'zh' ? '推荐当前系统' : 'Current OS'}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{t.downloadPage.winCard.title}</h2>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  {t.downloadPage.winCard.arch}
                </p>
              </div>

              <div className="space-y-2 py-3 border-y border-slate-800/80 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">最新版本</span>
                  <span className="font-mono text-white font-semibold">
                    {winRelease?.version || 'v0.1.0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">发布日期</span>
                  <span className="font-mono text-slate-300">
                    {winRelease?.releaseDate || '2026-09-15'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">状态</span>
                  <span className="text-emerald-400 font-medium">
                    {t.downloadPage.winCard.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <a
                href={winRelease?.downloadUrl || 'https://sureflow-update.hy3d.space/SureFlow-Setup-0.1.0.exe'}
                download
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold rounded-xl transition shadow-md shadow-sky-500/20"
              >
                <Download className="h-4 w-4" />
                <span>{t.downloadPage.winCard.btn}</span>
              </a>
              <p className="text-[11px] text-center text-slate-500">
                文件: {winRelease?.fileName || 'SureFlow-Setup.exe'}
              </p>
            </div>
          </div>

          {/* macOS 卡片 */}
          <div
            className={`glass-panel p-8 rounded-3xl border transition duration-300 flex flex-col justify-between ${
              userOS === 'mac'
                ? 'border-sky-500/60 shadow-xl shadow-sky-500/10 ring-1 ring-sky-500/30'
                : 'border-slate-800'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20">
                  <Laptop className="h-7 w-7" />
                </div>
                {userOS === 'mac' && (
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-sky-500 text-white shadow-sm">
                    {lang === 'zh' ? '推荐当前系统' : 'Current OS'}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{t.downloadPage.macCard.title}</h2>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  {t.downloadPage.macCard.arch}
                </p>
              </div>

              <div className="space-y-2 py-3 border-y border-slate-800/80 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">最新版本</span>
                  <span className="font-mono text-white font-semibold">
                    {macRelease?.version || 'v0.1.0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">发布日期</span>
                  <span className="font-mono text-slate-300">
                    {macRelease?.releaseDate || '2026-09-15'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">架构优化</span>
                  <span className="text-emerald-400 font-medium">Apple Silicon 原生</span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <a
                href={macRelease?.downloadUrl || 'https://sureflow-update.hy3d.space/SureFlow-0.1.0-arm64.dmg'}
                download
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold rounded-xl transition shadow-md shadow-sky-500/20"
              >
                <Download className="h-4 w-4" />
                <span>{t.downloadPage.macCard.btn}</span>
              </a>
              <p className="text-[11px] text-center text-slate-500">
                文件: {macRelease?.fileName || 'SureFlow-arm64.dmg'}
              </p>
            </div>
          </div>

          {/* Linux 卡片 */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-slate-800 text-slate-300 rounded-xl border border-slate-700">
                  <Terminal className="h-7 w-7" />
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {t.downloadPage.linuxCard.status}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{t.downloadPage.linuxCard.title}</h2>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  {t.downloadPage.linuxCard.arch}
                </p>
              </div>

              <div className="space-y-2 py-3 border-y border-slate-800/80 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">支持状态</span>
                  <span className="font-mono text-slate-300">开源源码支持</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">二进制包</span>
                  <span className="text-slate-400 font-medium">规划中</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">推荐方案</span>
                  <span className="text-sky-400 font-medium">源码 npm run build</span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <a
                href="https://github.com/weianweigan/SureFlow#building-from-source"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition border border-slate-700"
              >
                <ExternalLink className="h-4 w-4" />
                <span>{t.downloadPage.linuxCard.btn}</span>
              </a>
              <p className="text-[11px] text-center text-slate-500">
                可自行编译各 Linux 发行版
              </p>
            </div>
          </div>
        </div>

        {/* SHA-512 安全哈希校验区 */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-sky-400" />
            <h3 className="text-lg font-bold text-white">
              {t.downloadPage.checksumTitle}
            </h3>
          </div>

          <div className="space-y-4 text-xs font-mono">
            {winRelease?.sha512 && (
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-sky-400 font-bold block mb-1">Windows (.exe):</span>
                  <span className="text-slate-400 break-all">{winRelease.sha512}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(winRelease.sha512 || '', 'win')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md shrink-0 transition"
                >
                  {copiedSha === 'win' ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>{copiedSha === 'win' ? '已复制' : '复制哈希'}</span>
                </button>
              </div>
            )}

            {macRelease?.sha512 && (
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-sky-400 font-bold block mb-1">macOS arm64 (.dmg):</span>
                  <span className="text-slate-400 break-all">{macRelease.sha512}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(macRelease.sha512 || '', 'mac')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md shrink-0 transition"
                >
                  {copiedSha === 'mac' ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>{copiedSha === 'mac' ? '已复制' : '复制哈希'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 更新说明与 Release Notes */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white">
            {t.downloadPage.releaseNotesTitle}
          </h3>
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 font-mono whitespace-pre-line leading-relaxed">
            {winRelease?.releaseNotes || macRelease?.releaseNotes || '正在从 sureflow-update.hy3d.space 获取最新发布日志...'}
          </div>
        </div>

        {/* 提示条 */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-300">
          <Server className="h-4 w-4 shrink-0 text-sky-400" />
          <span>{t.downloadPage.proxyNotice}</span>
        </div>
      </div>
    </div>
  );
};
