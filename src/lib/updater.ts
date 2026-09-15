import yaml from 'js-yaml';

export interface ReleaseFile {
  url: string;
  sha512?: string;
  size?: number;
}

export interface PlatformRelease {
  platform: 'win' | 'mac';
  version: string;
  releaseDate: string;
  releaseNotes: string;
  downloadUrl: string;
  fileName: string;
  sha512?: string;
  size?: number;
  isFallback?: boolean;
}

export interface ReleaseManifest {
  version: string;
  releaseDate?: string;
  releaseNotes?: string;
  path?: string;
  sha512?: string;
  files?: Array<{ url: string; sha512?: string; size?: number }>;
}

const UPDATE_BASE_URL = 'https://sureflow-update.hy3d.space';

// 兜底备用默认数据（在首次发布之前或 Worker 维护冷启动 404 时生效）
const FALLBACK_RELEASES: Record<'win' | 'mac', PlatformRelease> = {
  win: {
    platform: 'win',
    version: '0.1.0',
    releaseDate: '2026-09-15',
    releaseNotes: '• 初次发布 SureFlow 工业级智能液压阀块设计平台\n• 支持 AI 拓扑流道生成与 STEP 格式无损导出\n• 集成流道几何防干涉与壁厚智能校验',
    downloadUrl: `${UPDATE_BASE_URL}/SureFlow-Setup-0.1.0.exe`,
    fileName: 'SureFlow-Setup-0.1.0.exe',
    sha512: 'b3f5c9281... (首发生成后自动同步)',
    isFallback: true,
  },
  mac: {
    platform: 'mac',
    version: '0.1.0',
    releaseDate: '2026-09-15',
    releaseNotes: '• 初次发布 SureFlow 工业级智能液压阀块设计平台 (Apple Silicon arm64 专属架构优化)\n• 原生 Metal/GPU 几何加速引擎支持\n• STEP / GLB 快速交互预览',
    downloadUrl: `${UPDATE_BASE_URL}/SureFlow-0.1.0-arm64.dmg`,
    fileName: 'SureFlow-0.1.0-arm64.dmg',
    sha512: 'e98a1074... (首发生成后自动同步)',
    isFallback: true,
  },
};

/**
 * 从 sureflow-update.hy3d.space 获取特定平台的最新更新清单
 */
export async function fetchPlatformRelease(platform: 'win' | 'mac'): Promise<PlatformRelease> {
  const ymlFile = platform === 'mac' ? 'latest-mac.yml' : 'latest.yml';
  const manifestUrl = `${UPDATE_BASE_URL}/${ymlFile}`;

  try {
    const res = await fetch(manifestUrl, {
      cache: 'no-cache',
      headers: {
        Accept: 'text/yaml, text/plain, */*',
      },
    });

    if (!res.ok) {
      console.warn(`[Updater] ${manifestUrl} responded with HTTP ${res.status}. Falling back to default metadata.`);
      return FALLBACK_RELEASES[platform];
    }

    const text = await res.text();
    const parsed = yaml.load(text) as ReleaseManifest;

    if (!parsed || !parsed.version) {
      return FALLBACK_RELEASES[platform];
    }

    const fileName = parsed.path || (parsed.files && parsed.files[0]?.url) || '';
    const downloadUrl = `${UPDATE_BASE_URL}/${fileName}`;

    return {
      platform,
      version: parsed.version.startsWith('v') ? parsed.version : `v${parsed.version}`,
      releaseDate: parsed.releaseDate ? new Date(parsed.releaseDate).toISOString().split('T')[0] : 'Latest',
      releaseNotes: parsed.releaseNotes || '性能优化与常规功能更新。',
      downloadUrl,
      fileName,
      sha512: parsed.sha512 || parsed.files?.[0]?.sha512,
      size: parsed.files?.[0]?.size,
      isFallback: false,
    };
  } catch (error) {
    console.warn(`[Updater] Failed to fetch manifest for ${platform}:`, error);
    return FALLBACK_RELEASES[platform];
  }
}

/**
 * 客户端识别用户操作系统
 */
export type UserOS = 'windows' | 'mac' | 'linux' | 'unknown';

export function detectUserOS(): UserOS {
  if (typeof window === 'undefined' || !navigator) return 'windows';

  const userAgent = (navigator.userAgent || '').toLowerCase();
  const platform = (navigator.platform || '').toLowerCase();

  if (userAgent.includes('win') || platform.includes('win')) {
    return 'windows';
  }
  if (userAgent.includes('mac') || platform.includes('mac')) {
    return 'mac';
  }
  if (userAgent.includes('linux') || platform.includes('linux')) {
    return 'linux';
  }
  return 'unknown';
}
