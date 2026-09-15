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
  Github,
  ScrollText,
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
    <div className="bg-canvas text-ink py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 头部标题 */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-white border border-hairline text-neutral-700 text-xs font-mono font-medium shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-semantic-success" />
            <span>{lang === 'zh' ? '官方发行版 • 离线独立运行' : 'Official Desktop Release • Standalone Native'}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink">
            {t.downloadPage.title}
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 font-light max-w-2xl mx-auto">
            {t.downloadPage.subtitle}
          </p>

          {/* 快捷入口：去 GitHub Releases 下载 + 查看更新日志 */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="https://github.com/weianweigan/SureFlow/releases"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-pill bg-white border border-hairline hover:border-black text-ink text-xs font-mono font-medium shadow-2xs transition"
            >
              <Github className="h-3.5 w-3.5 text-ink" />
              <span>{t.downloadPage.githubReleasesBtn}</span>
              <ExternalLink className="h-3 w-3 text-neutral-400" />
            </a>
            <a
              href="#release-notes"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-pill bg-white border border-hairline hover:border-black text-ink text-xs font-mono font-medium shadow-2xs transition"
            >
              <ScrollText className="h-3.5 w-3.5 text-neutral-700" />
              <span>{t.downloadPage.changelogBtn}</span>
            </a>
          </div>
        </div>

        {/* 平台安装包卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Windows 卡片 */}
          <div
            className={`p-8 rounded-lg border transition duration-200 flex flex-col justify-between ${
              userOS === 'windows'
                ? 'bg-block-lime border-black shadow-sm'
                : 'bg-canvas border-hairline hover:border-black'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-canvas text-ink rounded-full border border-black/10">
                  <Monitor className="h-6 w-6" />
                </div>
                {userOS === 'windows' && (
                  <span className="text-xs font-mono font-semibold px-3 py-1 rounded-pill bg-ink text-white">
                    {lang === 'zh' ? '当前系统' : 'Current OS'}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-ink">{t.downloadPage.winCard.title}</h2>
                <p className="text-xs font-mono text-neutral-600 mt-1">
                  {t.downloadPage.winCard.arch}
                </p>
              </div>

              <div className="space-y-2 py-3 border-y border-black/10 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-600">最新版本</span>
                  <span className="font-mono text-ink font-semibold">
                    {winRelease?.version || 'v0.1.0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">发布日期</span>
                  <span className="font-mono text-neutral-800">
                    {winRelease?.releaseDate || '2026-09-15'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">状态</span>
                  <span className="text-semantic-success font-semibold">
                    {t.downloadPage.winCard.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <a
                href={winRelease?.downloadUrl || 'https://sureflow-update.hy3d.space/SureFlow-Setup-0.1.0.exe'}
                download
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-ink hover:bg-neutral-800 text-white font-semibold rounded-pill transition shadow-xs"
              >
                <Download className="h-4 w-4" />
                <span>{t.downloadPage.winCard.btn}</span>
              </a>
              <p className="text-[11px] font-mono text-center text-neutral-500">
                文件: {winRelease?.fileName || 'SureFlow-Setup.exe'}
              </p>
            </div>
          </div>

          {/* macOS 卡片 */}
          <div
            className={`p-8 rounded-lg border transition duration-200 flex flex-col justify-between ${
              userOS === 'mac'
                ? 'bg-block-lime border-black shadow-sm'
                : 'bg-canvas border-hairline hover:border-black'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-canvas text-ink rounded-full border border-black/10">
                  <Laptop className="h-6 w-6" />
                </div>
                {userOS === 'mac' && (
                  <span className="text-xs font-mono font-semibold px-3 py-1 rounded-pill bg-ink text-white">
                    {lang === 'zh' ? '当前系统' : 'Current OS'}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-ink">{t.downloadPage.macCard.title}</h2>
                <p className="text-xs font-mono text-neutral-600 mt-1">
                  {t.downloadPage.macCard.arch}
                </p>
              </div>

              <div className="space-y-2 py-3 border-y border-black/10 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-600">最新版本</span>
                  <span className="font-mono text-ink font-semibold">
                    {macRelease?.version || 'v0.1.0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">发布日期</span>
                  <span className="font-mono text-neutral-800">
                    {macRelease?.releaseDate || '2026-09-15'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">架构优化</span>
                  <span className="text-semantic-success font-semibold">Apple Silicon 原生</span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <a
                href={macRelease?.downloadUrl || 'https://sureflow-update.hy3d.space/SureFlow-0.1.0-arm64.dmg'}
                download
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-ink hover:bg-neutral-800 text-white font-semibold rounded-pill transition shadow-xs"
              >
                <Download className="h-4 w-4" />
                <span>{t.downloadPage.macCard.btn}</span>
              </a>
              <p className="text-[11px] font-mono text-center text-neutral-500">
                文件: {macRelease?.fileName || 'SureFlow-arm64.dmg'}
              </p>
            </div>
          </div>

          {/* Linux 卡片 */}
          <div className="p-8 rounded-lg border border-hairline bg-canvas hover:border-black transition flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-surface-soft text-ink rounded-full">
                  <Terminal className="h-6 w-6" />
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-pill bg-surface-soft text-neutral-600">
                  {t.downloadPage.linuxCard.status}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-ink">{t.downloadPage.linuxCard.title}</h2>
                <p className="text-xs font-mono text-neutral-500 mt-1">
                  {t.downloadPage.linuxCard.arch}
                </p>
              </div>

              <div className="space-y-2 py-3 border-y border-hairline-soft text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">支持状态</span>
                  <span className="font-mono text-ink">开源源码支持</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">二进制包</span>
                  <span className="text-neutral-500 font-medium">规划中</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">推荐方案</span>
                  <span className="text-ink font-semibold">源码 npm run build</span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <a
                href="https://github.com/weianweigan/SureFlow#building-from-source"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-surface-soft hover:bg-neutral-300 text-ink font-semibold rounded-pill transition"
              >
                <ExternalLink className="h-4 w-4" />
                <span>{t.downloadPage.linuxCard.btn}</span>
              </a>
              <p className="text-[11px] font-mono text-center text-neutral-400">
                可自行编译各 Linux 发行版
              </p>
            </div>
          </div>
        </div>

        {/* SHA-512 安全哈希校验区 */}
        <div className="p-8 sm:p-10 rounded-lg border border-hairline bg-surface-soft space-y-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-ink" />
            <h3 className="text-lg font-bold text-ink">
              {t.downloadPage.checksumTitle}
            </h3>
          </div>

          <div className="space-y-3 text-xs font-mono">
            {winRelease?.sha512 && (
              <div className="bg-canvas p-4 rounded-md border border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div>
                  <span className="text-ink font-bold block mb-1">Windows (.exe):</span>
                  <span className="text-neutral-600 break-all">{winRelease.sha512}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(winRelease.sha512 || '', 'win')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-soft hover:bg-neutral-300 text-ink rounded-pill shrink-0 transition font-medium"
                >
                  {copiedSha === 'win' ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-semantic-success" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>{copiedSha === 'win' ? '已复制' : '复制哈希'}</span>
                </button>
              </div>
            )}

            {macRelease?.sha512 && (
              <div className="bg-canvas p-4 rounded-md border border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div>
                  <span className="text-ink font-bold block mb-1">macOS arm64 (.dmg):</span>
                  <span className="text-neutral-600 break-all">{macRelease.sha512}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(macRelease.sha512 || '', 'mac')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-soft hover:bg-neutral-300 text-ink rounded-pill shrink-0 transition font-medium"
                >
                  {copiedSha === 'mac' ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-semantic-success" />
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
        <div id="release-notes" className="p-8 sm:p-10 rounded-2xl border border-hairline bg-white shadow-xs space-y-4 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
            <div className="flex items-center gap-2.5">
              <ScrollText className="h-5 w-5 text-neutral-700" />
              <h3 className="text-lg font-bold text-ink">
                {t.downloadPage.releaseNotesTitle}
              </h3>
            </div>
            <a
              href="https://github.com/weianweigan/SureFlow/releases"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-neutral-600 hover:text-ink transition"
            >
              <span>{t.downloadPage.viewFullChangelog}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="bg-surface-soft border border-hairline-soft rounded-xl p-6 text-sm text-neutral-800 font-mono whitespace-pre-line leading-relaxed">
            {winRelease?.releaseNotes || macRelease?.releaseNotes || (lang === 'zh' ? '正在获取最新发布说明，您也可以直接前往 GitHub Releases 查阅。' : 'Fetching latest release notes, or visit GitHub Releases directly.')}
          </div>
        </div>

        {/* GitHub Releases 统一入口 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-surface-soft border border-hairline">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-ink">
              {lang === 'zh' ? '需要查看全部历史版本或源码？' : 'Need past releases or source code?'}
            </h4>
            <p className="text-xs text-neutral-600 font-light">
              {lang === 'zh'
                ? '所有发布包、历史版本归档、各版本更新日志与源码均在 GitHub Releases 开放提供。'
                : 'All binary releases, historical tags, version changelogs, and source code are available on GitHub Releases.'}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://github.com/weianweigan/SureFlow/releases"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-pill bg-ink hover:bg-neutral-800 text-white text-xs font-mono font-medium shadow-xs transition"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub Releases</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
