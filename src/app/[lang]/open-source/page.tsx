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
    <div className="bg-canvas text-ink py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-surface-soft text-ink text-xs font-mono font-medium">
            <Heart className="h-3.5 w-3.5 text-accent-magenta" />
            <span>{lang === 'zh' ? '开源开放 • 工业共赢' : 'Open Source Engineering'}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink">
            {t.openSourcePage.title}
          </h1>
          <p className="text-lg text-neutral-700 font-light">
            {t.openSourcePage.subtitle}
          </p>
        </div>

        {/* 核心板块 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* GitHub 仓库与贡献 */}
          <div className="bg-canvas p-8 sm:p-12 rounded-lg border border-hairline space-y-6 hover:border-black transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-surface-soft rounded-full text-ink">
                <Github className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-ink">{t.openSourcePage.repoTitle}</h2>
            </div>
            <p className="text-base text-neutral-700 leading-relaxed font-light">
              {t.openSourcePage.repoDesc}
            </p>

            <div className="space-y-3 pt-2">
              <a
                href="https://github.com/weianweigan/SureFlow"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-4 rounded-md bg-surface-soft hover:bg-neutral-200 text-ink transition group"
              >
                <div className="flex items-center gap-3">
                  <Code2 className="h-4 w-4 text-ink" />
                  <span className="text-sm font-semibold">{t.openSourcePage.links.githubRepo}</span>
                </div>
                <ExternalLink className="h-4 w-4 text-neutral-500 group-hover:text-ink transition" />
              </a>

              <a
                href="https://github.com/weianweigan/SureFlow/issues"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-4 rounded-md bg-surface-soft hover:bg-neutral-200 text-ink transition group"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-4 w-4 text-ink" />
                  <span className="text-sm font-semibold">{t.openSourcePage.links.issues}</span>
                </div>
                <ExternalLink className="h-4 w-4 text-neutral-500 group-hover:text-ink transition" />
              </a>

              <a
                href="https://github.com/weianweigan/SureFlow/pulls"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-4 rounded-md bg-surface-soft hover:bg-neutral-200 text-ink transition group"
              >
                <div className="flex items-center gap-3">
                  <GitPullRequest className="h-4 w-4 text-ink" />
                  <span className="text-sm font-semibold">{t.openSourcePage.links.contribute}</span>
                </div>
                <ExternalLink className="h-4 w-4 text-neutral-500 group-hover:text-ink transition" />
              </a>
            </div>
          </div>

          {/* 许可证与合规 */}
          <div className="bg-block-lilac p-8 sm:p-12 rounded-lg border border-black/10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-canvas rounded-full text-ink border border-black/10">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-ink">{t.openSourcePage.licenseTitle}</h2>
            </div>
            <p className="text-base text-neutral-800 leading-relaxed font-light">
              {t.openSourcePage.licenseDesc}
            </p>

            <div className="bg-canvas border border-black/10 rounded-lg p-6 space-y-3 text-xs text-neutral-800 shadow-xs">
              <div className="flex items-center gap-2 text-ink font-bold text-sm">
                <FileText className="h-4 w-4" />
                <span>LICENSE 协议标准</span>
              </div>
              <p className="leading-relaxed text-neutral-600 font-light">
                SureFlow 鼓励自由的学习、设计验证与协同演进。遵循透明开放的研发规范，保护用户工程数据产权与流体模型资产安全。
              </p>
              <div className="pt-2">
                <a
                  href="https://github.com/weianweigan/SureFlow/blob/main/LICENSE"
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink font-bold hover:underline inline-flex items-center gap-1 font-mono"
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
