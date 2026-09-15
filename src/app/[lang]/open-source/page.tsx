import React from 'react';
import { type Locale, DICTIONARY } from '@/lib/i18n';
import {
  Github,
  GitPullRequest,
  AlertCircle,
  FileText,
  Heart,
  ExternalLink,
  ShieldCheck,
  Code2,
} from 'lucide-react';

interface OpenSourcePageProps {
  params: Promise<{ lang: string }>;
}

export default async function OpenSourcePage({ params }: OpenSourcePageProps) {
  const { lang: rawLang } = await params;
  const lang: Locale = rawLang === 'en' ? 'en' : 'zh';
  const t = DICTIONARY[lang];

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
            <Heart className="h-3.5 w-3.5 text-rose-400" />
            <span>{lang === 'zh' ? '开源开放 • 工业共赢' : 'Open Source Engineering'}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.openSourcePage.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-400">
            {t.openSourcePage.subtitle}
          </p>
        </div>

        {/* 核心板块 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* GitHub 仓库与贡献 */}
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-white">
                <Github className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-white">{t.openSourcePage.repoTitle}</h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t.openSourcePage.repoDesc}
            </p>

            <div className="space-y-3 pt-2">
              <a
                href="https://github.com/weianweigan/SureFlow"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/40 text-slate-200 transition group"
              >
                <div className="flex items-center gap-3">
                  <Code2 className="h-4 w-4 text-sky-400" />
                  <span className="text-sm font-medium">{t.openSourcePage.links.githubRepo}</span>
                </div>
                <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-sky-400 transition" />
              </a>

              <a
                href="https://github.com/weianweigan/SureFlow/issues"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/40 text-slate-200 transition group"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-4 w-4 text-amber-400" />
                  <span className="text-sm font-medium">{t.openSourcePage.links.issues}</span>
                </div>
                <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-sky-400 transition" />
              </a>

              <a
                href="https://github.com/weianweigan/SureFlow/pulls"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/40 text-slate-200 transition group"
              >
                <div className="flex items-center gap-3">
                  <GitPullRequest className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-medium">{t.openSourcePage.links.contribute}</span>
                </div>
                <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-sky-400 transition" />
              </a>
            </div>
          </div>

          {/* 许可证与合规 */}
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-sky-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-white">{t.openSourcePage.licenseTitle}</h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t.openSourcePage.licenseDesc}
            </p>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
                <FileText className="h-4 w-4" />
                <span>LICENSE 协议标准</span>
              </div>
              <p className="leading-relaxed text-slate-400">
                SureFlow 鼓励自由的学习、设计验证与协同演进。遵循透明开放的研发规范，保护用户工程数据产权与流体模型资产安全。
              </p>
              <div className="pt-2">
                <a
                  href="https://github.com/weianweigan/SureFlow/blob/main/LICENSE"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 hover:underline inline-flex items-center gap-1 font-mono"
                >
                  <span>查看完整许可证条款 (LICENSE)</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
