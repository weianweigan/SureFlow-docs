/**
 * DG16 真实几何与孔位参数配置 (DG16 Standard Cavity Data)
 * 提取自 SureFlow 标准库 library.sflib
 * 规范：DIN ISO 7368 / 65×65mm 安装面
 * 
 * 严格真实的 10 个标准孔位：
 * LP (定位销) / CV (主插装阀孔) / X, Y, Z1, Z2 (先导控制油孔) / BH1, BH2, BH3, BH4 (紧固螺栓孔)
 * 数据与动画逻辑解耦，支持热插拔与多语言扩展。
 */

export interface StepBore {
  diameter: number;
  length?: number;
  thread?: string;
  type: 'straight' | 'tapered';
}

export interface DG16Hole {
  id: string;
  order: number; // 引导顺序 1 ~ 10
  name: string;
  type: 'cartridge' | 'locating-pin' | 'pilot' | 'bolt';
  x: number; // mm (viewBox 中心在 0, 0)
  y: number; // mm (SVG y 轴向下为正，转换自 CAD 坐标)
  radius: number; // SVG 显示半径 (mm)
  categoryZh: string;
  categoryEn: string;
  titleZh: string;
  titleEn: string;
  descZh: string;
  descEn: string;
  specZh: string;
  specEn: string;
  steps: StepBore[];
  flowDirection?: string;
}

export const DG16_OUTLINE = {
  width: 65,
  height: 65,
  cornerRadius: 1.5,
  pitch: 46, // 螺栓孔中心距 46mm
  disclaimerZh: '孔位示意，非加工图',
  disclaimerEn: 'Schematic only, not for fabrication',
};

export const DG16_HOLES: DG16Hole[] = [
  {
    id: 'LP',
    order: 1,
    name: 'LP',
    type: 'locating-pin',
    x: -10.5,
    y: -23, // CAD y=23 -> SVG y=-23
    radius: 2.0,
    categoryZh: '基准定位',
    categoryEn: 'Locating Pin',
    titleZh: '防错定位销孔 (LP)',
    titleEn: 'Locating Pin Hole (LP)',
    descZh: '用于插装阀盖板的机械防错定向装配，确保阀芯方向与内部油路极性唯一对应。',
    descEn: 'Mechanical poke-yoke orientation hole for valve cover, ensuring unambiguous spool alignment.',
    specZh: '⌀4.0 mm · 深度 4.8 mm · 锥角 118°',
    specEn: '⌀4.0 mm · Depth 4.8 mm · Taper 118°',
    steps: [
      { type: 'straight', diameter: 4, length: 4.8 },
      { type: 'tapered', diameter: 4 },
    ],
  },
  {
    id: 'CV',
    order: 2,
    name: 'CV',
    type: 'cartridge',
    x: 0,
    y: 0,
    radius: 16.0,
    categoryZh: '核心主孔',
    categoryEn: 'Main Cavity',
    titleZh: '主插装阀插孔 (CV16)',
    titleEn: '2-Way Cartridge Cavity (CV16)',
    descZh: '符合 DIN ISO 7368 标准的二通插装阀主级阀孔，采用三阶同心阶梯沉孔切削。',
    descEn: 'Standard DIN ISO 7368 2-way cartridge cavity with 3-tier concentric step bores.',
    specZh: '⌀32 / ⌀25 / ⌀16 mm · 装配深 43.0 mm · 侧油口 ⌀25 mm',
    specEn: '⌀32 / ⌀25 / ⌀16 mm · Depth 43.0 mm · Side Port ⌀25 mm',
    flowDirection: 'A ↔ B 主通径流道',
    steps: [
      { type: 'straight', diameter: 32, length: 43 },
      { type: 'straight', diameter: 25, length: 13 },
      { type: 'straight', diameter: 16, length: 82.2 },
      { type: 'tapered', diameter: 16 },
    ],
  },
  {
    id: 'X',
    order: 3,
    name: 'X',
    type: 'pilot',
    x: -25,
    y: 0,
    radius: 2.0,
    categoryZh: '先导油路',
    categoryEn: 'Pilot Port',
    titleZh: '先导控制油口 (X)',
    titleEn: 'Pilot Control Port (X)',
    descZh: '连通主级盖板控制腔的第一先导油路，用于引入先导控制压力或泄压开启。',
    descEn: 'First pilot channel connecting main cover control chamber for pressure or release.',
    specZh: '⌀4.0 mm 钻孔 · 深度 8.8 mm · 锥角 118°',
    specEn: '⌀4.0 mm Drill · Depth 8.8 mm · Taper 118°',
    steps: [
      { type: 'straight', diameter: 4, length: 8.8 },
      { type: 'tapered', diameter: 4 },
    ],
  },
  {
    id: 'Y',
    order: 4,
    name: 'Y',
    type: 'pilot',
    x: 25,
    y: 0,
    radius: 2.0,
    categoryZh: '先导油路',
    categoryEn: 'Pilot Port',
    titleZh: '先导泄油油口 (Y)',
    titleEn: 'Pilot Drain Port (Y)',
    descZh: '连接外部泄油或备用先导油路，防止控制腔背压蓄积造成阀芯动作滞后。',
    descEn: 'External drain or secondary pilot channel to prevent backpressure spool hesitation.',
    specZh: '⌀4.0 mm 钻孔 · 深度 8.8 mm · 锥角 118°',
    specEn: '⌀4.0 mm Drill · Depth 8.8 mm · Taper 118°',
    steps: [
      { type: 'straight', diameter: 4, length: 8.8 },
      { type: 'tapered', diameter: 4 },
    ],
  },
  {
    id: 'Z1',
    order: 5,
    name: 'Z1',
    type: 'pilot',
    x: 0,
    y: -25, // CAD y=25 -> SVG y=-25
    radius: 2.0,
    categoryZh: '先导油路',
    categoryEn: 'Pilot Port',
    titleZh: '备用先导油口 (Z1)',
    titleEn: 'Auxiliary Pilot Port (Z1)',
    descZh: '顶部正交布置的辅助控制通道，可加装单向节流阀或电磁先导阀组。',
    descEn: 'Orthogonal auxiliary control channel for pilot check valves or proportional pilots.',
    specZh: '⌀4.0 mm 钻孔 · 深度 8.8 mm · 锥角 118°',
    specEn: '⌀4.0 mm Drill · Depth 8.8 mm · Taper 118°',
    steps: [
      { type: 'straight', diameter: 4, length: 8.8 },
      { type: 'tapered', diameter: 4 },
    ],
  },
  {
    id: 'Z2',
    order: 6,
    name: 'Z2',
    type: 'pilot',
    x: 0,
    y: 25, // CAD y=-25 -> SVG y=25
    radius: 2.0,
    categoryZh: '先导油路',
    categoryEn: 'Pilot Port',
    titleZh: '备用先导油口 (Z2)',
    titleEn: 'Auxiliary Pilot Port (Z2)',
    descZh: '底部正交布置的对称控制口，满足多级复合控制或压力传感器测压引出需求。',
    descEn: 'Bottom symmetrical control port for multi-stage pilot circuit or pressure transducer tap.',
    specZh: '⌀4.0 mm 钻孔 · 深度 8.8 mm · 锥角 118°',
    specEn: '⌀4.0 mm Drill · Depth 8.8 mm · Taper 118°',
    steps: [
      { type: 'straight', diameter: 4, length: 8.8 },
      { type: 'tapered', diameter: 4 },
    ],
  },
  {
    id: 'BH1',
    order: 7,
    name: 'BH1',
    type: 'bolt',
    x: 23,
    y: -23, // CAD y=23 -> SVG y=-23
    radius: 4.5,
    categoryZh: '紧固螺纹',
    categoryEn: 'Bolt Thread',
    titleZh: '紧固螺栓孔 1 (BH1)',
    titleEn: 'Mounting Bolt Hole 1 (BH1)',
    descZh: '右上角紧固螺纹孔，通过高强度螺栓承受 31.5 MPa 系统额定承压载荷。',
    descEn: 'Top-right mounting bolt hole engineered to clamp cover under 31.5 MPa rating.',
    specZh: 'M8×1.25 公制螺纹 · 有效深 16.0 mm · 底孔 ⌀6.75 mm',
    specEn: 'M8×1.25 Metric Thread · Depth 16.0 mm · Drill ⌀6.75 mm',
    steps: [
      { type: 'straight', diameter: 8, length: 16, thread: 'M8x1.25' },
      { type: 'straight', diameter: 6.75, length: 4.0 },
      { type: 'tapered', diameter: 6.75 },
    ],
  },
  {
    id: 'BH2',
    order: 8,
    name: 'BH2',
    type: 'bolt',
    x: 23,
    y: 23, // CAD y=-23 -> SVG y=23
    radius: 4.5,
    categoryZh: '紧固螺纹',
    categoryEn: 'Bolt Thread',
    titleZh: '紧固螺栓孔 2 (BH2)',
    titleEn: 'Mounting Bolt Hole 2 (BH2)',
    descZh: '右下角对称紧固螺孔，与 BH1 保持 46.0 mm 标准螺距，保证密封预紧力均匀分布。',
    descEn: 'Bottom-right bolt hole, 46.0 mm pitch with BH1 to distribute O-ring compression evenly.',
    specZh: 'M8×1.25 公制螺纹 · 有效深 16.0 mm · 底孔 ⌀6.75 mm',
    specEn: 'M8×1.25 Metric Thread · Depth 16.0 mm · Drill ⌀6.75 mm',
    steps: [
      { type: 'straight', diameter: 8, length: 16, thread: 'M8x1.25' },
      { type: 'straight', diameter: 6.75, length: 4.0 },
      { type: 'tapered', diameter: 6.75 },
    ],
  },
  {
    id: 'BH3',
    order: 9,
    name: 'BH3',
    type: 'bolt',
    x: -23,
    y: 23, // CAD y=-23 -> SVG y=23
    radius: 4.5,
    categoryZh: '紧固螺纹',
    categoryEn: 'Bolt Thread',
    titleZh: '紧固螺栓孔 3 (BH3)',
    titleEn: 'Mounting Bolt Hole 3 (BH3)',
    descZh: '左下角紧固螺孔，SureFlow 内置干涉引擎实时监测其与内部油道的最小壁厚安全距离。',
    descEn: 'Bottom-left bolt hole monitored by SureFlow clearance engine for minimum safety wall.',
    specZh: 'M8×1.25 公制螺纹 · 有效深 16.0 mm · 底孔 ⌀6.75 mm',
    specEn: 'M8×1.25 Metric Thread · Depth 16.0 mm · Drill ⌀6.75 mm',
    steps: [
      { type: 'straight', diameter: 8, length: 16, thread: 'M8x1.25' },
      { type: 'straight', diameter: 6.75, length: 4.0 },
      { type: 'tapered', diameter: 6.75 },
    ],
  },
  {
    id: 'BH4',
    order: 10,
    name: 'BH4',
    type: 'bolt',
    x: -23,
    y: -23, // CAD y=23 -> SVG y=-23
    radius: 4.5,
    categoryZh: '紧固螺纹',
    categoryEn: 'Bolt Thread',
    titleZh: '紧固螺栓孔 4 (BH4)',
    titleEn: 'Mounting Bolt Hole 4 (BH4)',
    descZh: '左上角紧固螺孔，与定位销 LP 形成协同布局，完成四角均布法兰夹持闭环。',
    descEn: 'Top-left bolt hole cooperating with LP pin to complete 4-corner clamping loop.',
    specZh: 'M8×1.25 公制螺纹 · 有效深 16.0 mm · 底孔 ⌀6.75 mm',
    specEn: 'M8×1.25 Metric Thread · Depth 16.0 mm · Drill ⌀6.75 mm',
    steps: [
      { type: 'straight', diameter: 8, length: 16, thread: 'M8x1.25' },
      { type: 'straight', diameter: 6.75, length: 4.0 },
      { type: 'tapered', diameter: 6.75 },
    ],
  },
];

export type SpeedPreset = 'smooth' | 'standard' | 'fast';

export const SPEED_CONFIG: Record<SpeedPreset, { scale: number; labelZh: string; labelEn: string }> = {
  smooth: { scale: 0.6, labelZh: '平稳 0.6x', labelEn: 'Smooth 0.6x' },
  standard: { scale: 1.0, labelZh: '标准 1.0x', labelEn: 'Standard 1.0x' },
  fast: { scale: 2.0, labelZh: '高速 2.0x', labelEn: 'Fast 2.0x' },
};
