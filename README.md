# SureFlow 官方网站与文档中心

本项目是 **SureFlow 工业级智能液压阀块协同设计平台** 的官方网站与技术文档中心，基于 **Next.js (App Router 静态导出) + TypeScript + Fumadocs + Tailwind CSS** 构建，原生支持 Cloudflare Pages 全球高速部署。

---

## 核心架构与设计

1. **静态导出架构**：
   - 采用 `output: 'export'`，运行 `npm run build` 直接输出标准 `out/` 静态网页目录；
   - 零服务端 Node.js 运行时依赖，天然适配 Cloudflare Pages 全球边缘 CDN。

2. **多语言与路由设计**：
   - 固定采用路径前缀 `/zh` 与 `/en`，不依赖 Cookie，最大化利于全球搜索引擎收录（SEO）与技术链接分享；
   - 根路径 `/` 客户端根据浏览器环境自动重定向至首选语言。

3. **Cloudflare Worker 下载代理接入**：
   - 客户端模块 `src/lib/updater.ts` 直接读取 `https://sureflow-update.hy3d.space/latest.yml` 与 `latest-mac.yml`；
   - 动态解析最新版本号、更新说明、发布日期、SHA-512 安全哈希及安装包直链；
   - “下载 SureFlow” 按钮统一指向 `sureflow-update.hy3d.space` 边缘加速直链，不在前端重复调用 GitHub API，也不额外生成版本清单；
   - 发布流程保持：创建 GitHub Release → 上传安装包 → 现有 Worker 提供统一下载与缓存 → 官网自动显示最新版。

4. **3D 液压阀块交互展示**：
   - 使用 `<model-viewer>` 异步加载 PBR 物理金属材质的标准 ISO 4401 液压集成块模型；
   - 支持鼠标左键 360° 自由旋转、视角复位、环境反射与高光。

5. **技术文档中心**：
   - 位于 `content/docs/zh` 与 `content/docs/en`，以标准 MDX 组织；
   - 包含系统概览、安装指南、5分钟快速上手、设计工作流、导入导出格式与 FAQ；
   - 配备响应式文档侧边栏、本页导读 TOC、面包屑导航与上一篇/下一篇切换。

---

## 本地开发与构建

### 1. 安装依赖
```bash
cd docs
npm install
```

### 2. 启动本地开发服务
```bash
npm run dev
# 浏览器访问 http://localhost:3000
```

### 3. 生成 3D 阀块示例模型（可选，已有生成好的模型）
```bash
node scripts/generate-glb.cjs
```

### 4. 静态导出打包
```bash
npm run build
# 构建产物位于 docs/out/ 目录
```

---

## Cloudflare Pages 部署指南

### 方式一：直接关联 GitHub 仓库（推荐）
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)，进入 **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**；
2. 选中本仓库；
3. 配置构建参数：
   - **Root directory**（根目录）：`docs`
   - **Build command**（构建命令）：`npm run build`
   - **Build output directory**（输出目录）：`out`
   - **Node.js Version**：环境变量添加 `NODE_VERSION=22`
4. 点击 **Save and Deploy** 即可，后续主分支每次 Push 或 Pull Request 均会自动生成预览与生产环境。

### 方式二：使用 Wrangler CLI 部署
```bash
cd docs
npm run build
npx wrangler pages deploy out --project-name=sureflow-docs
```

---

## 路由映射

- `/zh`：中文官网首页（Hero 定位、3D 视口、核心指标、特性速览、CTA）
- `/en`：英文官网首页
- `/zh/features`、`/en/features`：产品能力专题（AI 拓扑、壁厚校验、STEP 实体导出）
- `/zh/cases`、`/en/cases`：工程对比案例（250kN 锻压机、风电机组阀块）
- `/zh/download`、`/en/download`：下载中心（连接 `sureflow-update.hy3d.space` 接口）
- `/zh/open-source`、`/en/open-source`：开源生态与社区治理
- `/zh/docs`、`/en/docs`：技术文档中心
