export type Locale = 'zh' | 'en';

export const LOCALES: Locale[] = ['zh', 'en'];
export const DEFAULT_LOCALE: Locale = 'zh';

export const DICTIONARY = {
  zh: {
    nav: {
      brand: 'SureFlow',
      features: '产品能力',
      cases: '工程案例',
      docs: '使用文档',
      download: '下载',
      openSource: '开源生态',
      github: 'GitHub',
    },
    hero: {
      tag: '工业级智能液压阀块协同设计平台',
      title: '重新定义液压阀块设计：',
      titleHighlight: 'AI 流道拓扑与实时规则校验',
      description:
        'SureFlow 结合高精度几何内核与 AI 流道寻优算法，自动化生成复杂液压集成块内部管路，消除人工布孔干涉，大幅压缩 80% 设计周期，直接导出标准工业 STEP 实体。',
      primaryAction: '免费下载 SureFlow',
      secondaryAction: '查阅设计文档',
      demoTag: '3D 交互式模型视口',
      demoHint: '按住鼠标左键可 360° 自由旋转体验',
      stats: {
        cycleReduction: '设计周期缩短',
        cycleReductionVal: '80%',
        accuracy: '规则防干涉检测',
        accuracyVal: '100%',
        nativeSpeed: '原生几何性能提升',
        nativeSpeedVal: '5x',
      },
    },
    featuresPage: {
      title: '工业级核心产品能力',
      subtitle: '专为机械装备与液压工程师打造的新一代智能化协同设计系统',
      list: [
        {
          id: 'ai-routing',
          title: 'AI 辅助流道寻优',
          desc: '自动根据各工作油口（P/T/A/B/X/Y）额定压力与通流截面积，智能探索三维空间最短路径并避让工艺堵孔。',
          tag: '智能拓扑',
        },
        {
          id: 'rule-check',
          title: '实时几何防干涉与壁厚校验',
          desc: '毫秒级全流道安全壁厚探测与相贯线校验，杜绝击穿渗油隐患，彻底告别传统 2D 投影校核低效模式。',
          tag: '生产级可靠',
        },
        {
          id: 'industry-export',
          title: '全流程高保真工业格式导出',
          desc: '原生支持 AP203/AP214/AP242 STEP 实体无损导出，一键输出加工制造孔深参数表及 GLB 轻量化交付格式。',
          tag: '标准生态',
        },
        {
          id: 'cross-platform',
          title: '跨平台原生极速体验',
          desc: '支持 Windows x64 与 Apple Silicon 架构原生硬件加速，无论是桌面工作站还是移动端均可顺畅操作万级特征。',
          tag: '高性能',
        },
      ],
    },
    casesPage: {
      title: '工业应用与工程案例',
      subtitle: '从复杂工程机械到高精密数控机床，验证 SureFlow 的极致设计效率',
      items: [
        {
          name: '某 250kN 锻压机液压主控总成阀块',
          specs: '外形尺寸：420 × 380 × 260 mm | 油口数量：38 个',
          before: '传统人工布孔耗时 5 个工作日，经过 3 轮手工防干涉核算，产生 12 个工艺斜孔。',
          after: 'SureFlow AI 自动布孔仅耗时 18 分钟，0 逻辑干涉，斜孔数减少至 4 个，总流阻压降降低 22%。',
          tag: '重型装备',
        },
        {
          name: '风力发电机组变桨距伺服阀组',
          specs: '外形尺寸：180 × 160 × 110 mm | 高洁净要求',
          before: '人工难以优化内部死油区，清洗死角导致早期伺服阀芯卡滞风险。',
          after: 'SureFlow 采用平滑过渡相交算法，死腔体积减小 64%，全面提高液压系统可靠寿命。',
          tag: '新能源',
        },
      ],
    },
    downloadPage: {
      title: '下载 SureFlow 客户端',
      subtitle: '通过 Cloudflare 高速分发边缘网络，获取最新官方稳定安装包',
      autoDetectPrompt: '已为您智能识别适合的安装包：',
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
      releaseNotesTitle: '最新版本更新日志：',
      proxyNotice: '所有安装包均通过 sureflow-update.hy3d.space 边缘反向代理节点统一缓存与加速下载。',
    },
    openSourcePage: {
      title: '开放透明的工业几何开源生态',
      subtitle: '用开放的心态，共同推动工业 CAE/CAD 工业基础软件的技术革新',
      licenseTitle: '核心许可证',
      licenseDesc: 'SureFlow 遵循开源与严谨的工业协议体系，确保用户与商业实体在安全合规的前提下享有自由。',
      repoTitle: '主仓库与源代码',
      repoDesc: '随时在 GitHub 上 Star、Fork、提交 Pull Request 或反馈问题。',
      links: {
        githubRepo: 'GitHub 仓库 (weianweigan/SureFlow)',
        issues: '提交缺陷或需求 (Issues)',
        contribute: '贡献者开发指南',
        releases: 'GitHub Releases 归档',
      },
    },
    footer: {
      rights: '© 2026 SureFlow Project. All rights reserved.',
      tagline: '重新定义工业级液压流体几何设计的未来。',
    },
  },
  en: {
    nav: {
      brand: 'SureFlow',
      features: 'Features',
      cases: 'Cases',
      docs: 'Documentation',
      download: 'Download',
      openSource: 'Open Source',
      github: 'GitHub',
    },
    hero: {
      tag: 'Industrial Hydraulic Manifold Intelligent Design Platform',
      title: 'Redefine Manifold Engineering:',
      titleHighlight: 'AI Channel Topology & Real-time Rule Validation',
      description:
        'SureFlow combines a high-precision geometry kernel with AI channel optimization to automate internal passages, eliminate interference, slash design cycles by 80%, and export production-ready STEP models.',
      primaryAction: 'Download SureFlow Free',
      secondaryAction: 'Explore Documentation',
      demoTag: 'Interactive 3D Viewport',
      demoHint: 'Click and drag with left mouse button to rotate 360°',
      stats: {
        cycleReduction: 'Design Cycle Reduction',
        cycleReductionVal: '80%',
        accuracy: 'Anti-Interference Accuracy',
        accuracyVal: '100%',
        nativeSpeed: 'Geometry Engine Speedup',
        nativeSpeedVal: '5x',
      },
    },
    featuresPage: {
      title: 'Industrial-grade Capabilities',
      subtitle: 'Next-generation intelligent design system engineered for hydraulic & mechanical designers',
      list: [
        {
          id: 'ai-routing',
          title: 'AI Assisted Channel Routing',
          desc: 'Automatically finds optimal shortest 3D channel paths based on port ratings (P/T/A/B/X/Y) and flow areas.',
          tag: 'Smart Topology',
        },
        {
          id: 'rule-check',
          title: 'Real-time Clearance & Wall Thickness Verification',
          desc: 'Millisecond-level wall thickness and intersection clearance analysis to eliminate oil seepage hazards.',
          tag: 'Production-ready',
        },
        {
          id: 'industry-export',
          title: 'Lossless Industrial Format Export',
          desc: 'Native support for AP203/AP214/AP242 STEP solid export, manufacturing depth tables, and lightweight GLB format.',
          tag: 'Industry Standard',
        },
        {
          id: 'cross-platform',
          title: 'High-Performance Native Experience',
          desc: 'Hardware-accelerated rendering on Windows x64 and Apple Silicon architectures with lightning responsiveness.',
          tag: 'High Performance',
        },
      ],
    },
    casesPage: {
      title: 'Engineering Case Studies',
      subtitle: 'Proven efficiency in heavy construction machinery, wind power, and precision CNC machine tools',
      items: [
        {
          name: '250kN Forging Press Main Hydraulic Manifold Block',
          specs: 'Dimensions: 420 × 380 × 260 mm | Ports: 38 ports',
          before: 'Manual design required 5 workdays and 3 rounds of clearance checking, with 12 auxiliary cross-holes.',
          after: 'SureFlow AI completed routing in 18 minutes with 0 interference, auxiliary holes reduced to 4, and 22% lower pressure drop.',
          tag: 'Heavy Machinery',
        },
        {
          name: 'Wind Turbine Pitch Control Servo Manifold',
          specs: 'Dimensions: 180 × 160 × 110 mm | Ultra-clean requirements',
          before: 'Manual design struggled to eliminate dead oil zones, causing early servo valve spool clogging risk.',
          after: 'SureFlow smooth-transition intersection algorithms reduced dead cavity volume by 64%, boosting system longevity.',
          tag: 'Clean Energy',
        },
      ],
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
      tagline: 'Pioneering the future of industrial hydraulic fluid geometric design.',
    },
  },
};
