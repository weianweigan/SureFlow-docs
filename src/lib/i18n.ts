export type Locale = 'zh' | 'en';

export const LOCALES: Locale[] = ['zh', 'en'];
export const DEFAULT_LOCALE: Locale = 'zh';

export const DICTIONARY = {
  zh: {
    nav: {
      brand: 'SureFlow',
      docs: '使用文档',
      download: '下载客户端',
      openSource: '开源生态',
      github: 'GitHub',
    },
    hero: {
      tag: '液压阀块三维建模与校验',
      title: '新一代智能液压阀块设计平台',
      titleHighlight: '',
      description: '参数化孔腔布设、毫秒级壁厚与干涉检查，直出高保真 STEP 实体。',
      primaryAction: '探索设计文档',
      secondaryAction: 'GitHub 源码',
      badges: ['STEP AP214', 'OpenCASCADE 内核', '毫秒级干涉检查', '离线桌面原生'],
    },
    uiSection: {
      tag: '三维设计工作区',
      title: '清晰直观的三维布孔与装配工作流',
      description:
        '支持规则长方体与导入 STEP 异形外形作为基准几何。可直接在阀块各安装面上拾取坐标、拖拽布孔，实时呈现孔道空间走向与半透明截面交贯状态。',
      caption: 'SureFlow 桌面端主设计界面',
    },
    workflowSection: {
      tag: '核心设计链路',
      title: '贯穿阀块工程设计的四个关键阶段',
      subtitle: '以严谨的工程数据模型为核心，降低传统通用 CAD 逐孔布尔建模的操作成本与干涉风险',
      stages: [
        {
          num: '01',
          title: '外形定义与基准拾取',
          desc: '支持规则长方体外形参数化定义，并可导入外部 STEP 异形模型作为参考几何，快速选定阀块各装配基准面。',
          icon: '/icons/Block.svg',
        },
        {
          num: '02',
          title: '参数化孔腔库布孔',
          desc: '提供插装阀孔、板式阀安装面、螺纹接口与工艺堵孔等标准模板，直接拖拽至安装面并精确定义定位坐标与深度。',
          icon: '/icons/CartridgeValve.svg',
        },
        {
          num: '03',
          title: '实时干涉与安全壁厚检查',
          desc: '内置孔道空间几何碰撞分析与最小壁厚测量算法，在设计过程中实时发现孔间穿透、壁厚不足等隐患。',
          icon: '/icons/DrillHole.svg',
        },
        {
          num: '04',
          title: '高保真 STEP 实体导出',
          desc: '依托 OpenCASCADE (OCCT) 内核，将设计结果直接导出为标准 STEP (AP203/AP214) 实体模型，无缝接入下游制造与出图软件。',
          icon: '/icons/ImportStep.svg',
        },
      ],
    },
    librarySection: {
      tag: '孔腔数据管理',
      title: '内置标准孔腔库与自定义扩展',
      description:
        '内置涵盖工业标准螺纹插装阀、ISO 4401 板式阀、SAE/公制螺纹接口与工艺孔模板。支持二维剖面台阶与倒角参数的可视化编辑，并允许工程师基于 JSON 格式自由扩充企业专属库。',
      caption: '孔腔库模板管理与二维剖面参数编辑视图',
    },
    downloadPage: {
      title: '下载 SureFlow 客户端',
      subtitle: '通过 Cloudflare 边缘分发网络，获取最新官方发布的稳定安装包',
      autoDetectPrompt: '已为您匹配适合的安装包：',
      winCard: {
        title: 'Windows',
        arch: 'x64 (Windows 10 / 11 64位)',
        btn: '下载 Windows 安装包 (.exe)',
        status: '官方稳定支持',
      },
      macCard: {
        title: 'macOS',
        arch: 'Apple Silicon (M1/M2/M3/M4 系列芯片)',
        btn: '下载 macOS 安装包 (.dmg)',
        status: '原生优化支持',
      },
      linuxCard: {
        title: 'Linux',
        arch: 'x86_64 / AppImage',
        btn: '查看构建指南',
        status: '源码构建中',
      },
      checksumTitle: '安装包 SHA-512 安全校验值：',
      releaseNotesTitle: '最新版本更新说明：',
      proxyNotice: '所有安装包均通过 sureflow-update.hy3d.space 边缘反向代理节点统一缓存与加速下载。',
    },
    openSourcePage: {
      title: '开放透明的工业软件生态',
      subtitle: '以严谨的工程态度，共同推进工业基础软件与标准格式互通',
      licenseTitle: '开源许可证',
      licenseDesc: 'SureFlow 遵循公开透明的开源协议，保障开发者与企业用户的自由使用与技术延续性。',
      repoTitle: '主仓库与源代码',
      repoDesc: '随时在 GitHub 上查看源码、提交 Pull Request 或反馈问题。',
      links: {
        githubRepo: 'GitHub 仓库 (weianweigan/SureFlow)',
        issues: '问题反馈与建议 (Issues)',
        contribute: '贡献者开发指南',
        releases: 'GitHub Releases 归档',
      },
    },
    footer: {
      rights: '© 2026 SureFlow Project. All rights reserved.',
      tagline: '面向液压系统设计工程师的阀块三维建模与孔道校验桌面软件。',
    },
  },
  en: {
    nav: {
      brand: 'SureFlow',
      docs: 'Documentation',
      download: 'Download',
      openSource: 'Open Source',
      github: 'GitHub',
    },
    hero: {
      tag: 'Hydraulic Manifold 3D CAD',
      title: 'Precision Hydraulic Manifold Design',
      titleHighlight: '',
      description: 'Parametric cavity placement, live clearance verification, and production-ready STEP solids.',
      primaryAction: 'Explore Documentation',
      secondaryAction: 'GitHub',
      badges: ['STEP AP214', 'OpenCASCADE BRep', 'Live Clearance Check', 'Offline Native'],
    },
    uiSection: {
      tag: '3D Design Workspace',
      title: 'Intuitive 3D Cavity Placement & Assembly Workflow',
      description:
        'Define regular blocks or import external STEP models as reference geometry. Pick coordinates directly on mounting faces with real-time translucent section views.',
      caption: 'SureFlow Desktop 3D Design Interface',
    },
    workflowSection: {
      tag: 'Engineering Workflow',
      title: 'Four Key Phases of Manifold Engineering',
      subtitle: 'Built upon rigorous geometric models to reduce manual CAD boolean overhead and drilling interference risks',
      stages: [
        {
          num: '01',
          title: 'Stock Sizing & Datum Selection',
          desc: 'Parametric rectangular stock definition and external STEP reference geometry import for selecting mounting faces.',
          icon: '/icons/Block.svg',
        },
        {
          num: '02',
          title: 'Parametric Cavity Placement',
          desc: 'Extensive library of screw-in cartridge valves, ISO 4401 subplates, and plugs placed with exact coordinates.',
          icon: '/icons/CartridgeValve.svg',
        },
        {
          num: '03',
          title: 'Clearance & Wall Thickness Checks',
          desc: 'Real-time 3D collision inspection and minimum wall thickness analysis to prevent channel puncture and structural failure.',
          icon: '/icons/DrillHole.svg',
        },
        {
          num: '04',
          title: 'High-Fidelity STEP Solid Export',
          desc: 'Direct export of compliant STEP (AP203/AP214) solids powered by OpenCASCADE (OCCT), ready for CAM and manufacturing.',
          icon: '/icons/ImportStep.svg',
        },
      ],
    },
    librarySection: {
      tag: 'Cavity Data Management',
      title: 'Built-in Standard Library & Custom Extension',
      description:
        'Standard templates for cartridge valves, directional valves, ports, and construction plugs. Visual 2D step and chamfer parameter editor with custom JSON schema extension.',
      caption: 'Cavity library management and 2D cross-section parameter editor',
    },
    downloadPage: {
      title: 'Download SureFlow Desktop Client',
      subtitle: 'Fast global CDN delivery via Cloudflare Edge network for the latest official installers',
      autoDetectPrompt: 'Recommended installer for your detected operating system:',
      winCard: {
        title: 'Windows',
        arch: 'x64 (Windows 10 / 11 64-bit)',
        btn: 'Download for Windows (.exe)',
        status: 'Official Stable Support',
      },
      macCard: {
        title: 'macOS',
        arch: 'Apple Silicon (M1/M2/M3/M4 Series)',
        btn: 'Download for macOS (.dmg)',
        status: 'Native Silicon Support',
      },
      linuxCard: {
        title: 'Linux',
        arch: 'x86_64 / AppImage',
        btn: 'View Build Guide',
        status: 'Source Build',
      },
      checksumTitle: 'Installer SHA-512 Checksum Verification:',
      releaseNotesTitle: 'Latest Release Notes:',
      proxyNotice: 'All installation binaries are cached and accelerated globally via sureflow-update.hy3d.space edge proxy.',
    },
    openSourcePage: {
      title: 'Open & Transparent Industrial CAD Ecosystem',
      subtitle: 'Advancing open-source CAE/CAD foundations for engineering communities worldwide',
      licenseTitle: 'Core License',
      licenseDesc: 'SureFlow embraces modern open-source licensing to ensure engineering and commercial safety.',
      repoTitle: 'Source Repository & Community',
      repoDesc: 'Star, fork, submit pull requests, or share ideas directly on GitHub.',
      links: {
        githubRepo: 'GitHub Repository (weianweigan/SureFlow)',
        issues: 'Bug Reports & Feature Requests (Issues)',
        contribute: 'Contribution Guide',
        releases: 'GitHub Releases Archive',
      },
    },
    footer: {
      rights: '© 2026 SureFlow Project. All rights reserved.',
      tagline: 'Hydraulic manifold 3D design and clearance verification software for fluid power engineers.',
    },
  },
};
