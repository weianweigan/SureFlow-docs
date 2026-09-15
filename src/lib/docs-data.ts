import { type Locale } from './i18n';

export interface DocItem {
  slug: string;
  title: string;
  description: string;
}

export interface DocCategory {
  category: string;
  items: DocItem[];
}

export const DOC_NAVIGATION: Record<Locale, DocCategory[]> = {
  zh: [
    {
      category: '新手引导',
      items: [
        {
          slug: '',
          title: '系统概览',
          description: '了解 SureFlow 工业级智能液压阀块协同设计平台的核心概念与架构',
        },
        {
          slug: 'installation',
          title: '安装与系统要求',
          description: '在 Windows 与 macOS (Apple Silicon) 上获取并安装 SureFlow',
        },
        {
          slug: 'quick-start',
          title: '5分钟快速上手',
          description: '建立你的第一个液压集成块工程，体验 AI 辅助流道规划',
        },
      ],
    },
    {
      category: '工程设计',
      items: [
        {
          slug: 'workflow',
          title: '完整设计工作流',
          description: '掌握从原理图导入、孔位拓扑、相贯线检查到工艺堵孔的工程闭环',
        },
        {
          slug: 'import-export',
          title: '导入与导出规范',
          description: 'STEP 实体交互、GLB 3D 交付与加工工序表规范',
        },
        {
          slug: 'faq',
          title: '常见问题解答',
          description: '关于许可证、离线使用、更新机制与硬件兼容的常见问题',
        },
      ],
    },
  ],
  en: [
    {
      category: 'Getting Started',
      items: [
        {
          slug: '',
          title: 'System Overview',
          description: 'Learn about the architecture and core capabilities of SureFlow',
        },
        {
          slug: 'installation',
          title: 'Installation & Requirements',
          description: 'System requirements and installation procedures for Windows and macOS',
        },
        {
          slug: 'quick-start',
          title: '5-Minute Quick Start',
          description: 'Build your first directional valve manifold with AI channel routing',
        },
      ],
    },
    {
      category: 'Engineering Guide',
      items: [
        {
          slug: 'workflow',
          title: 'Engineering Workflow',
          description: 'Master the 5-stage closed-loop manifold design workflow',
        },
        {
          slug: 'import-export',
          title: 'Import & Export Standards',
          description: 'STEP CAD solid exchange, GLB WebGL assets, and machining schedules',
        },
        {
          slug: 'faq',
          title: 'FAQ',
          description: 'Offline capability, update proxies, and algorithmic safety',
        },
      ],
    },
  ],
};
